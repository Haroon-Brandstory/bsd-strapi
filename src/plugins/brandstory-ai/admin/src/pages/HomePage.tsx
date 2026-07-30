import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Field,
  Flex,
  SingleSelect,
  SingleSelectOption,
  Table,
  Tbody,
  Td,
  TextInput,
  Textarea,
  Th,
  Thead,
  Tr,
  Typography,
  Alert,
} from '@strapi/design-system';
import { Layouts, Page, useFetchClient } from '@strapi/strapi/admin';
import pluginId from '../pluginId';
import {
  FIELD_MAP_LABELS,
  SYNC_ID_FIELD,
  attrsForSlot,
  suggestMapping,
  type AttrInfo,
  type ComponentInfo,
  type ContentTypeInfo,
  type ContentWriteMode,
  type DynamicZoneMap,
  type FieldMap,
} from '../utils/fieldMapping';

type Settings = {
  siteUrl: string;
  workspace: string;
  apiKey: string;
  firebaseUid: string;
  folderPair: string;
  contentTypeUid: string;
  fieldMap: FieldMap;
  contentMode: ContentWriteMode;
  dynamicZone: DynamicZoneMap;
  defaultPublishStatus: 'draft' | 'published';
  importChunkSize: number;
  insertApiUrl?: string;
};

type QueuePost = { id: string; sync_id: string; title: string; has_content: boolean };
type SyncLog = {
  documentId: string;
  source: string;
  status: string;
  message: string;
  inserted: number;
  updated: number;
  skipped: number;
  failed: number;
  durationMs?: number;
  createdAt?: string;
};

const emptyFieldMap: FieldMap = {
  title: 'blogTitle',
  content: '',
  excerpt: '',
  syncId: SYNC_ID_FIELD,
  seoTitle: 'blogMetaTitle',
  seoDescription: 'blogMetaDescription',
  featuredImage: 'blogImage',
  publishedAt: 'blogDate',
  coverS3Key: '',
  slug: 'blogSlug',
};

const emptySettings: Settings = {
  siteUrl: '',
  workspace: '',
  apiKey: '',
  firebaseUid: '',
  folderPair: '',
  contentTypeUid: 'api::blog.blog',
  fieldMap: { ...emptyFieldMap },
  contentMode: 'dynamiczone',
  dynamicZone: {
    field: 'contentSection',
    component: 'element.blog-content',
    htmlField: 'blogContent',
  },
  defaultPublishStatus: 'published',
  importChunkSize: 5,
};

const NONE = '__none__';

const FieldSelect = ({
  label,
  hint,
  value,
  options,
  onChange,
  allowEmpty = true,
}: {
  label: string;
  hint?: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (v: string) => void;
  allowEmpty?: boolean;
}) => (
  <Field.Root name={label} hint={hint}>
    <Field.Label>{label}</Field.Label>
    <SingleSelect
      value={value || NONE}
      onChange={(v: string) => onChange(v === NONE ? '' : v)}
      placeholder="— not mapped —"
    >
      {allowEmpty && <SingleSelectOption value={NONE}>— not mapped —</SingleSelectOption>}
      {options.map((o) => (
        <SingleSelectOption key={o.value} value={o.value}>
          {o.label}
        </SingleSelectOption>
      ))}
      {value && !options.some((o) => o.value === value) && (
        <SingleSelectOption value={value}>{value} (missing on type)</SingleSelectOption>
      )}
    </SingleSelect>
    {hint ? <Field.Hint /> : null}
  </Field.Root>
);

const HomePage = () => {
  const { get, post, put } = useFetchClient();
  const apiPrefix = `/${pluginId}`;

  const apiGet = async <T,>(path: string): Promise<T> => {
    const res = await get(`${apiPrefix}${path}`);
    return res.data as T;
  };
  const apiPost = async <T,>(path: string, body?: unknown): Promise<T> => {
    const res = await post(`${apiPrefix}${path}`, body ?? {});
    return res.data as T;
  };
  const apiPut = async <T,>(path: string, body?: unknown): Promise<T> => {
    const res = await put(`${apiPrefix}${path}`, body ?? {});
    return res.data as T;
  };

  const [tab, setTab] = useState<'settings' | 'queue' | 'logs'>('settings');
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [contentTypes, setContentTypes] = useState<ContentTypeInfo[]>([]);
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [statusMsg, setStatusMsg] = useState<{
    variant: 'success' | 'danger' | 'default';
    text: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [connStatus, setConnStatus] = useState('Not checked');
  const [queuePosts, setQueuePosts] = useState<QueuePost[]>([]);
  const [queueCounts, setQueueCounts] = useState<{
    total: number;
    new: number;
    update: number;
  } | null>(null);
  const [importResult, setImportResult] = useState('');
  const [logs, setLogs] = useState<SyncLog[]>([]);

  const show = (text: string, variant: 'success' | 'danger' | 'default' = 'default') => {
    setStatusMsg({ text, variant });
  };

  const selectedCt = useMemo(
    () => contentTypes.find((ct) => ct.uid === settings.contentTypeUid),
    [contentTypes, settings.contentTypeUid]
  );

  const dzFields = useMemo(
    () => (selectedCt?.attributes || []).filter((a) => a.type === 'dynamiczone'),
    [selectedCt]
  );

  const selectedDz = useMemo(
    () => dzFields.find((a) => a.name === settings.dynamicZone.field),
    [dzFields, settings.dynamicZone.field]
  );

  const dzComponents = useMemo(() => {
    const uids = selectedDz?.components || [];
    return components.filter((c) => uids.includes(c.uid));
  }, [components, selectedDz]);

  const selectedComponent = useMemo(
    () => components.find((c) => c.uid === settings.dynamicZone.component),
    [components, settings.dynamicZone.component]
  );

  const htmlFieldsOnComponent = useMemo(() => {
    const attrs = selectedComponent?.attributes || [];
    return attrs.filter((a) =>
      ['richtext', 'text', 'string', 'blocks', 'customField', 'json'].includes(a.type)
    );
  }, [selectedComponent]);

  const loadSettings = useCallback(async () => {
    try {
      const data = await apiGet<Settings>('/settings');
      setSettings({
        ...emptySettings,
        ...data,
        fieldMap: { ...emptyFieldMap, ...data.fieldMap },
        dynamicZone: {
          field: '',
          component: '',
          htmlField: '',
          ...data.dynamicZone,
        },
        contentMode: data.contentMode === 'dynamiczone' ? 'dynamiczone' : 'field',
      });
      if (data.folderPair) {
        setFolders((prev) =>
          prev.includes(data.folderPair) ? prev : [...prev, data.folderPair]
        );
      }
    } catch (e) {
      show(e instanceof Error ? e.message : 'Failed to load settings', 'danger');
    }
  }, [get]);

  const loadContentTypes = useCallback(async () => {
    try {
      const data = await apiGet<{
        contentTypes: ContentTypeInfo[];
        components: ComponentInfo[];
      }>('/content-types');
      setContentTypes(data.contentTypes || []);
      setComponents(data.components || []);
    } catch {
      // ignore
    }
  }, [get]);

  const loadLogs = useCallback(async () => {
    try {
      const data = await apiGet<{ logs: SyncLog[] }>('/logs');
      setLogs(data.logs || []);
    } catch (e) {
      show(e instanceof Error ? e.message : 'Failed to load logs', 'danger');
    }
  }, [get]);

  useEffect(() => {
    loadSettings();
    loadContentTypes();
  }, [loadSettings, loadContentTypes]);

  useEffect(() => {
    if (tab === 'logs') loadLogs();
  }, [tab, loadLogs]);

  const applyAutoMap = (uid: string, cts = contentTypes, comps = components) => {
    const ct = cts.find((c) => c.uid === uid);
    const suggested = suggestMapping(ct, comps);
    setSettings((s) => ({
      ...s,
      contentTypeUid: uid,
      fieldMap: suggested.fieldMap,
      contentMode: suggested.contentMode,
      dynamicZone: suggested.dynamicZone,
    }));
  };

  const onContentTypeChange = (uid: string) => {
    applyAutoMap(uid);
    show(`Mapped fields for ${uid}. Review dropdowns, then Save.`, 'success');
  };

  const saveSettings = async () => {
    setBusy(true);
    try {
      const data = await apiPut<Settings>('/settings', settings);
      setSettings({
        ...emptySettings,
        ...data,
        fieldMap: { ...emptyFieldMap, ...data.fieldMap },
        dynamicZone: { field: '', component: '', htmlField: '', ...data.dynamicZone },
        contentMode: data.contentMode === 'dynamiczone' ? 'dynamiczone' : 'field',
      });
      show('Connection settings saved.', 'success');
    } catch (e) {
      show(e instanceof Error ? e.message : 'Save failed', 'danger');
    } finally {
      setBusy(false);
    }
  };

  const testConnection = async () => {
    setBusy(true);
    setConnStatus('Checking…');
    try {
      const data = await apiPost<{ ok: boolean; message: string }>('/test-connection');
      setConnStatus(data.ok ? `Connected — ${data.message}` : `Failed — ${data.message}`);
      show(data.message, data.ok ? 'success' : 'danger');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Connection test failed';
      setConnStatus(`Failed — ${msg}`);
      show(msg, 'danger');
    } finally {
      setBusy(false);
    }
  };

  const loadFolders = async () => {
    setBusy(true);
    try {
      await apiPut('/settings', settings);
      const data = await apiPost<{ pairs?: string[]; error?: string }>('/folders');
      if (data.error) {
        show(data.error, 'danger');
        return;
      }
      const pairs = data.pairs || [];
      setFolders(pairs);
      show(pairs.length ? `${pairs.length} folder(s) loaded.` : 'No folders returned.', 'success');
    } catch (e) {
      show(e instanceof Error ? e.message : 'Failed to load folders', 'danger');
    } finally {
      setBusy(false);
    }
  };

  const refreshQueue = async () => {
    setBusy(true);
    setImportResult('');
    try {
      await apiPut('/settings', settings);
      const data = await apiPost<{
        error?: string;
        posts?: QueuePost[];
        counts?: { total: number; new: number; update: number };
      }>('/fetch');
      if (data.error) {
        show(data.error, 'danger');
        setQueuePosts([]);
        setQueueCounts(null);
        return;
      }
      setQueuePosts(data.posts || []);
      setQueueCounts(data.counts || null);
      show(`Queue refreshed: ${data.counts?.total ?? 0} item(s).`, 'success');
    } catch (e) {
      show(e instanceof Error ? e.message : 'Refresh failed', 'danger');
    } finally {
      setBusy(false);
    }
  };

  const runImport = async () => {
    setBusy(true);
    try {
      const data = await apiPost<{
        message: string;
        inserted: number;
        updated: number;
        failed: number;
        errors: string[];
      }>('/import', { publishStatus: settings.defaultPublishStatus });
      setImportResult(
        `${data.message}${data.errors?.length ? ` Errors: ${data.errors.join('; ')}` : ''}`
      );
      show(data.message, data.failed > 0 ? 'danger' : 'success');
      await refreshQueue();
      if (tab === 'logs') await loadLogs();
    } catch (e) {
      show(e instanceof Error ? e.message : 'Import failed', 'danger');
    } finally {
      setBusy(false);
    }
  };

  const setField = (key: keyof Settings, value: string | number) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  const setMap = (key: keyof FieldMap, value: string) => {
    setSettings((s) => ({ ...s, fieldMap: { ...s.fieldMap, [key]: value } }));
  };

  const optionLabel = (a: AttrInfo) => `${a.name} (${a.type}${a.multiple ? ', multi' : ''})`;

  return (
    <Page.Main>
      <Layouts.Header
        title="Brandstory AI"
        subtitle="Sync Brandstory AI CONTENT FACTORY blogs into Strapi"
        primaryAction={
          <Flex gap={2}>
            <Button
              variant={tab === 'settings' ? 'default' : 'tertiary'}
              onClick={() => setTab('settings')}
            >
              Settings
            </Button>
            <Button
              variant={tab === 'queue' ? 'default' : 'tertiary'}
              onClick={() => setTab('queue')}
            >
              Content queue
            </Button>
            <Button variant={tab === 'logs' ? 'default' : 'tertiary'} onClick={() => setTab('logs')}>
              Sync logs
            </Button>
          </Flex>
        }
      />
      <Layouts.Content>
        {statusMsg && (
          <Box paddingBottom={4}>
            <Alert
              closeLabel="Close"
              title={statusMsg.variant === 'danger' ? 'Error' : 'Notice'}
              variant={
                statusMsg.variant === 'danger'
                  ? 'danger'
                  : statusMsg.variant === 'success'
                    ? 'success'
                    : 'default'
              }
              onClose={() => setStatusMsg(null)}
            >
              {statusMsg.text}
            </Alert>
          </Box>
        )}

        {tab === 'settings' && (
          <Box background="neutral0" padding={6} hasRadius shadow="filterShadow">
            <Typography variant="delta">App connection</Typography>
            <Box paddingTop={2} paddingBottom={4}>
              <Typography variant="pi" textColor="neutral600">
                Resolved insert endpoint:{' '}
                <Typography as="span" fontWeight="bold">
                  {settings.insertApiUrl || '— configure URL + workspace —'}
                </Typography>
              </Typography>
            </Box>

            <Flex direction="column" gap={4} alignItems="stretch">
              <Field.Root name="siteUrl" hint="Brandstory app origin, e.g. https://app.brandstory.ai">
                <Field.Label>App site URL</Field.Label>
                <TextInput
                  value={settings.siteUrl}
                  onChange={(e: any) => setField('siteUrl', e.target.value)}
                  placeholder="https://app.brandstory.ai"
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root name="workspace" hint="Workspace slug from Brandstory (email-derived).">
                <Field.Label>Workspace</Field.Label>
                <TextInput
                  value={settings.workspace}
                  onChange={(e: any) => setField('workspace', e.target.value)}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root
                name="apiKey"
                hint="Optional. Sent as Bearer + X-API-Key when Brandstory enables API keys."
              >
                <Field.Label>API key (optional)</Field.Label>
                <TextInput
                  type="password"
                  value={settings.apiKey}
                  onChange={(e: any) => setField('apiKey', e.target.value)}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root
                name="firebaseUid"
                hint="Required for folder-scoped sync. From app Settings → Export & API."
              >
                <Field.Label>Firebase UID</Field.Label>
                <TextInput
                  value={settings.firebaseUid}
                  onChange={(e: any) => setField('firebaseUid', e.target.value)}
                />
                <Field.Hint />
              </Field.Root>

              <Field.Root name="folderPair">
                <Field.Label>Project / folder</Field.Label>
                <SingleSelect
                  value={settings.folderPair || NONE}
                  onChange={(v: string) => setField('folderPair', v === NONE ? '' : v)}
                  placeholder="Entire workspace"
                >
                  <SingleSelectOption value={NONE}>— Entire workspace —</SingleSelectOption>
                  {folders.map((p) => (
                    <SingleSelectOption key={p} value={p}>
                      {p}
                    </SingleSelectOption>
                  ))}
                </SingleSelect>
              </Field.Root>

              <Flex gap={2}>
                <Button onClick={loadFolders} loading={busy} variant="secondary">
                  Load project folders
                </Button>
                <Button onClick={testConnection} loading={busy} variant="secondary">
                  Test connection
                </Button>
                <Typography variant="pi">API: {connStatus}</Typography>
              </Flex>

              <Divider />

              <Typography variant="delta">Target article content type</Typography>
              <Typography variant="pi" textColor="neutral600">
                Pick the collection type that should receive Brandstory posts. Field mapping
                dropdowns fill automatically — adjust if needed.
              </Typography>

              <Field.Root name="contentTypeUid">
                <Field.Label>Content type</Field.Label>
                <SingleSelect
                  value={settings.contentTypeUid || NONE}
                  onChange={(v: string) => {
                    if (v === NONE) {
                      setField('contentTypeUid', '');
                      return;
                    }
                    onContentTypeChange(v);
                  }}
                  placeholder="Select a content type"
                >
                  <SingleSelectOption value={NONE}>— select —</SingleSelectOption>
                  {contentTypes.map((ct) => (
                    <SingleSelectOption key={ct.uid} value={ct.uid}>
                      {ct.displayName} ({ct.uid})
                    </SingleSelectOption>
                  ))}
                </SingleSelect>
              </Field.Root>

              <Flex gap={2}>
                <Button
                  variant="tertiary"
                  disabled={!settings.contentTypeUid}
                  onClick={() => {
                    if (!settings.contentTypeUid) return;
                    applyAutoMap(settings.contentTypeUid);
                    show('Field mapping re-suggested from schema.', 'success');
                  }}
                >
                  Auto-map fields again
                </Button>
              </Flex>

              <Field.Root name="defaultPublishStatus">
                <Field.Label>Default publish status</Field.Label>
                <SingleSelect
                  value={settings.defaultPublishStatus}
                  onChange={(v: string) => setField('defaultPublishStatus', v)}
                >
                  <SingleSelectOption value="published">Published</SingleSelectOption>
                  <SingleSelectOption value="draft">Draft</SingleSelectOption>
                </SingleSelect>
              </Field.Root>

              <Divider />

              <Typography variant="delta">Article body destination</Typography>
              <Field.Root
                name="contentMode"
                hint="Use Dynamic zone when your article content lives in a DZ (common on marketing sites)."
              >
                <Field.Label>Write HTML into</Field.Label>
                <SingleSelect
                  value={settings.contentMode}
                  onChange={(v: string) =>
                    setField('contentMode', v === 'dynamiczone' ? 'dynamiczone' : 'field')
                  }
                >
                  <SingleSelectOption value="field">Single field (richtext / text)</SingleSelectOption>
                  <SingleSelectOption value="dynamiczone" disabled={dzFields.length === 0}>
                    Dynamic zone{dzFields.length === 0 ? ' (none on this type)' : ''}
                  </SingleSelectOption>
                </SingleSelect>
                <Field.Hint />
              </Field.Root>

              {settings.contentMode === 'dynamiczone' ? (
                <Flex direction="column" gap={4} alignItems="stretch">
                  <FieldSelect
                    label="Dynamic zone field"
                    hint="Attribute of type dynamiczone on the content type."
                    value={settings.dynamicZone.field}
                    options={dzFields.map((a) => ({
                      value: a.name,
                      label: optionLabel(a),
                    }))}
                    onChange={(v) => {
                      setSettings((s) => ({
                        ...s,
                        dynamicZone: { field: v, component: '', htmlField: '' },
                      }));
                    }}
                  />
                  <FieldSelect
                    label="Component inside zone"
                    hint="Which __component entry receives the article HTML."
                    value={settings.dynamicZone.component}
                    options={dzComponents.map((c) => ({
                      value: c.uid,
                      label: `${c.displayName} (${c.uid})`,
                    }))}
                    onChange={(v) => {
                      const comp = components.find((c) => c.uid === v);
                      const html =
                        comp?.attributes.find((a) =>
                          ['body', 'content', 'html', 'text', 'richtext'].includes(
                            a.name.toLowerCase()
                          )
                        ) ||
                        comp?.attributes.find((a) =>
                          ['richtext', 'text', 'string', 'blocks'].includes(a.type)
                        );
                      setSettings((s) => ({
                        ...s,
                        dynamicZone: {
                          ...s.dynamicZone,
                          component: v,
                          htmlField: html?.name || '',
                        },
                      }));
                    }}
                  />
                  <FieldSelect
                    label="HTML field on component"
                    hint="Component attribute for body (richtext/text/blocks)."
                    value={settings.dynamicZone.htmlField}
                    options={htmlFieldsOnComponent.map((a) => ({
                      value: a.name,
                      label: optionLabel(a),
                    }))}
                    onChange={(v) => {
                      setSettings((s) => ({
                        ...s,
                        dynamicZone: { ...s.dynamicZone, htmlField: v },
                      }));
                    }}
                  />
                </Flex>
              ) : (
                <FieldSelect
                  label="Content (HTML / rich text field)"
                  hint="Direct richtext/text/blocks field on the content type."
                  value={settings.fieldMap.content}
                  options={attrsForSlot(selectedCt?.attributes || [], 'content').map((a) => ({
                    value: a.name,
                    label: optionLabel(a),
                  }))}
                  onChange={(v) => setMap('content', v)}
                />
              )}

              <Divider />
              <Typography variant="delta">Field mapping</Typography>
              <Typography variant="pi" textColor="neutral600">
                Each Brandstory value maps to one attribute on the selected content type.
              </Typography>

              <Box padding={3} background="neutral100" hasRadius>
                <Typography>
                  Sync ID (fixed):{' '}
                  <Typography as="span" fontWeight="bold">
                    {SYNC_ID_FIELD}
                  </Typography>
                </Typography>
                <Typography variant="pi" textColor="neutral600">
                  Always written from Brandstory sync_id. Add this unique string field on the
                  content type — it is not configurable.
                </Typography>
              </Box>

              {FIELD_MAP_LABELS.filter(([key]) => key !== 'content').map(([key, label]) => (
                <FieldSelect
                  key={key}
                  label={label}
                  value={settings.fieldMap[key]}
                  options={attrsForSlot(selectedCt?.attributes || [], key).map((a) => ({
                    value: a.name,
                    label: optionLabel(a),
                  }))}
                  onChange={(v) => setMap(key, v)}
                />
              ))}

              {settings.contentTypeUid &&
                !selectedCt?.attributes?.some((a) => a.name === SYNC_ID_FIELD) && (
                <Box padding={3} background="danger100" hasRadius>
                  <Typography textColor="danger700">
                    Missing required field{' '}
                    <Typography as="span" fontWeight="bold">
                      {SYNC_ID_FIELD}
                    </Typography>{' '}
                    on this content type (unique string). Create it in Content-Type Builder, then
                    reload settings.
                  </Typography>
                </Box>
              )}

              {settings.contentMode === 'dynamiczone' &&
                settings.dynamicZone.field &&
                settings.dynamicZone.component && (
                  <Box padding={3} background="secondary100" hasRadius>
                    <Typography textColor="neutral700">
                      HTML writes to{' '}
                      <Typography as="span" fontWeight="bold">
                        {settings.dynamicZone.field} → {settings.dynamicZone.component}.
                        {settings.dynamicZone.htmlField}
                      </Typography>
                      . Sibling zone components (e.g. blogImage) are kept on update.
                    </Typography>
                  </Box>
                )}

              <Box>
                <Button onClick={saveSettings} loading={busy}>
                  Save connection
                </Button>
              </Box>
            </Flex>
          </Box>
        )}

        {tab === 'queue' && (
          <Box background="neutral0" padding={6} hasRadius shadow="filterShadow">
            <Typography variant="delta">Content queue</Typography>
            <Box paddingTop={2} paddingBottom={4}>
              <Typography variant="pi" textColor="neutral600">
                {queueCounts
                  ? `Total ${queueCounts.total} · new ${queueCounts.new} · update ${queueCounts.update}`
                  : 'Click Refresh from API to load the queue.'}
              </Typography>
            </Box>
            <Flex gap={2} paddingBottom={4}>
              <Button onClick={refreshQueue} loading={busy} variant="secondary">
                Refresh from API
              </Button>
              <Button onClick={runImport} loading={busy} disabled={queuePosts.length === 0}>
                Import queued posts
              </Button>
            </Flex>
            {importResult && (
              <Box paddingBottom={4}>
                <Textarea value={importResult} readOnly />
              </Box>
            )}
            <Table colCount={3} rowCount={queuePosts.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">Title</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Sync ID</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">API ID</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {queuePosts.map((p) => (
                  <Tr key={p.sync_id || p.id}>
                    <Td>
                      <Typography>{p.title}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral600">{p.sync_id}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral600">{p.id}</Typography>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {queuePosts.length === 0 && (
              <Box paddingTop={4}>
                <Typography textColor="neutral600">No items in queue.</Typography>
              </Box>
            )}
          </Box>
        )}

        {tab === 'logs' && (
          <Box background="neutral0" padding={6} hasRadius shadow="filterShadow">
            <Flex justifyContent="space-between" paddingBottom={4}>
              <Typography variant="delta">Sync logs</Typography>
              <Button variant="tertiary" onClick={loadLogs} loading={busy}>
                Refresh
              </Button>
            </Flex>
            <Table colCount={6} rowCount={logs.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">When</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Source</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Status</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Message</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">I / U / F</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">ms</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {logs.map((l) => (
                  <Tr key={l.documentId}>
                    <Td>
                      <Typography variant="pi">
                        {l.createdAt ? new Date(l.createdAt).toLocaleString() : '—'}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography>{l.source}</Typography>
                    </Td>
                    <Td>
                      <Typography>{l.status}</Typography>
                    </Td>
                    <Td>
                      <Typography>{l.message}</Typography>
                    </Td>
                    <Td>
                      <Typography>
                        {l.inserted}/{l.updated}/{l.failed}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography>{l.durationMs ?? '—'}</Typography>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {logs.length === 0 && (
              <Box paddingTop={4}>
                <Typography textColor="neutral600">No sync logs yet.</Typography>
              </Box>
            )}
          </Box>
        )}
      </Layouts.Content>
    </Page.Main>
  );
};

export default HomePage;
