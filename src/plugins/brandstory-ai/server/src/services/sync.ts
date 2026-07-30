import type { Core } from '@strapi/strapi';
import type { BrandstoryPost, PluginSettings, PublishStatus, SyncResult } from './types';
import { SYNC_ID_FIELD } from './types';
import {
  prepareContentHtml,
  resolveApiId,
  resolveCoverS3Key,
  resolveFeaturedImageSrc,
  resolveSeoDescription,
  resolveSeoTitle,
  resolveSlug,
  resolveSyncId,
  resolveTitle,
} from './content';
import { formatBodyForAttributeType } from './html-to-blocks';

const IMPORTED_IDS_STORE = 'imported-ids';

type RunImportOptions = {
  source?: 'manual' | 'cron';
  publishStatus?: PublishStatus;
  /** If set, only import these sync ids from the current queue fetch. */
  onlySyncIds?: string[];
  posts?: BrandstoryPost[];
  files?: string[];
};

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  importedStore() {
    return strapi.store({ type: 'plugin', name: 'brandstory-ai', key: IMPORTED_IDS_STORE });
  },

  importedOptionKey(settings: PluginSettings): string {
    const api = strapi.plugin('brandstory-ai').service('settings').insertApiUrl(settings);
    return `${api}\x1e${settings.folderPair}\x1e${settings.firebaseUid}`;
  },

  async getImportedIds(settings: PluginSettings): Promise<string[]> {
    const raw = (await this.importedStore().get({})) as Record<string, string[]> | null;
    const key = this.importedOptionKey(settings);
    const list = raw?.[key];
    return Array.isArray(list) ? list.map(String) : [];
  },

  async addImportedIds(settings: PluginSettings, ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    const raw = ((await this.importedStore().get({})) as Record<string, string[]>) || {};
    const key = this.importedOptionKey(settings);
    const prev = Array.isArray(raw[key]) ? raw[key] : [];
    raw[key] = Array.from(new Set([...prev.map(String), ...ids.map(String)]));
    await this.importedStore().set({ value: raw });
  },

  async findExistingBySyncId(
    contentTypeUid: string,
    syncField: string,
    syncId: string
  ): Promise<{ documentId: string } | null> {
    try {
      const rows = await strapi.documents(contentTypeUid).findMany({
        filters: { [syncField]: { $eq: syncId } },
        status: 'draft',
        limit: 1,
      });
      if (rows?.[0]?.documentId) {
        return { documentId: String(rows[0].documentId) };
      }
      const published = await strapi.documents(contentTypeUid).findMany({
        filters: { [syncField]: { $eq: syncId } },
        status: 'published',
        limit: 1,
      });
      if (published?.[0]?.documentId) {
        return { documentId: String(published[0].documentId) };
      }
    } catch (err) {
      strapi.log.warn(
        `[brandstory-ai] findExistingBySyncId failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    return null;
  },

  async buildEntryData(
    item: BrandstoryPost,
    settings: PluginSettings,
    existingEntry?: Record<string, unknown> | null
  ): Promise<Record<string, unknown>> {
    const fm = settings.fieldMap;
    const title = resolveTitle(item);
    let content = prepareContentHtml(item);
    content = await strapi
      .plugin('brandstory-ai')
      .service('media')
      .rewriteInlineDataImages(content, title);

    const syncId = resolveSyncId(item);
    const seoTitle = resolveSeoTitle(item, title);
    const seoDescription = resolveSeoDescription(item, content);
    const excerpt =
      typeof item.excerpt === 'string'
        ? item.excerpt.replace(/^\d+\.\s*/gm, '').trim()
        : seoDescription;

    const ctAttrs = (strapi.contentTypes[settings.contentTypeUid]?.attributes ||
      {}) as Record<string, { type?: string }>;
    const writeIfMapped = (field: string | undefined, value: unknown) => {
      if (!field || value === undefined || value === null) return;
      if (!ctAttrs[field]) {
        strapi.log.warn(`[brandstory-ai] skip unknown mapped field "${field}"`);
        return;
      }
      data[field] = value;
    };

    const data: Record<string, unknown> = {};
    writeIfMapped(fm.title, title);
    writeIfMapped(fm.slug, resolveSlug(item, title));

    const mode = settings.contentMode === 'dynamiczone' ? 'dynamiczone' : 'field';
    const dz = settings.dynamicZone;
    if (mode === 'dynamiczone' && dz?.field && dz.component && dz.htmlField) {
      if (!ctAttrs[dz.field] || ctAttrs[dz.field].type !== 'dynamiczone') {
        throw new Error(`Dynamic zone field "${dz.field}" missing on ${settings.contentTypeUid}`);
      }
      const bodyValue = this.formatMappedBody(dz.component, dz.htmlField, content);
      data[dz.field] = this.mergeDynamicZoneContent(
        existingEntry?.[dz.field],
        dz.component,
        dz.htmlField,
        bodyValue
      );
    } else if (fm.content) {
      const flatType = ctAttrs[fm.content]?.type;
      writeIfMapped(fm.content, formatBodyForAttributeType(content, flatType));
    }

    writeIfMapped(fm.excerpt, excerpt);
    if (syncId) writeIfMapped(SYNC_ID_FIELD, syncId);
    writeIfMapped(fm.seoTitle, seoTitle);
    writeIfMapped(fm.seoDescription, seoDescription);

    const publishedAt =
      typeof item.published_at === 'string' && item.published_at.trim()
        ? item.published_at.trim()
        : '';
    if (fm.publishedAt && publishedAt && ctAttrs[fm.publishedAt]) {
      // Date-only attributes need YYYY-MM-DD
      const attrType = ctAttrs[fm.publishedAt]?.type;
      data[fm.publishedAt] =
        attrType === 'date' && publishedAt.length >= 10 ? publishedAt.slice(0, 10) : publishedAt;
    }

    const coverS3Key = resolveCoverS3Key(item);
    if (coverS3Key) writeIfMapped(fm.coverS3Key, coverS3Key);

    const coverSrc = resolveFeaturedImageSrc(item);
    if (fm.featuredImage && ctAttrs[fm.featuredImage] && coverSrc) {
      const file = await strapi
        .plugin('brandstory-ai')
        .service('media')
        .uploadCover(coverSrc, coverS3Key, title);
      if (file) {
        data[fm.featuredImage] = file.id;
      }
    }

    return data;
  },

  /**
   * Convert body HTML to the target component attribute type (blocks vs richtext/text).
   */
  formatMappedBody(componentUid: string, htmlField: string, html: string): unknown {
    const compAttrs = (strapi.components[componentUid]?.attributes || {}) as Record<
      string,
      { type?: string }
    >;
    const attrType = compAttrs[htmlField]?.type;
    return formatBodyForAttributeType(html, attrType);
  },

  /**
   * Upsert body into the mapped DZ component without wiping sibling blocks
   * (e.g. keep blogImage components next to BlogContent).
   */
  mergeDynamicZoneContent(
    existingZone: unknown,
    componentUid: string,
    htmlField: string,
    bodyValue: unknown
  ): Array<Record<string, unknown>> {
    const block = {
      __component: componentUid,
      [htmlField]: bodyValue,
    };
    if (!Array.isArray(existingZone) || existingZone.length === 0) {
      return [block];
    }

    let updated = false;
    const next = existingZone.map((row) => {
      if (!row || typeof row !== 'object' || Array.isArray(row)) return row as Record<string, unknown>;
      const r = row as Record<string, unknown>;
      if (!updated && r.__component === componentUid) {
        updated = true;
        return {
          ...r,
          [htmlField]: bodyValue,
        };
      }
      return r;
    }) as Array<Record<string, unknown>>;

    if (!updated) {
      next.unshift(block);
    }
    return next;
  },

  async loadExistingForMerge(
    uid: string,
    documentId: string,
    dzField: string
  ): Promise<Record<string, unknown> | null> {
    try {
      const doc = await strapi.documents(uid).findOne({
        documentId,
        populate: { [dzField]: true },
        status: 'draft',
      });
      if (doc) return doc as Record<string, unknown>;
      const published = await strapi.documents(uid).findOne({
        documentId,
        populate: { [dzField]: true },
        status: 'published',
      });
      return (published as Record<string, unknown>) || null;
    } catch (err) {
      strapi.log.warn(
        `[brandstory-ai] loadExistingForMerge failed: ${err instanceof Error ? err.message : String(err)}`
      );
      return null;
    }
  },

  async upsertPost(
    item: BrandstoryPost,
    settings: PluginSettings,
    publishStatus: PublishStatus
  ): Promise<{ action: 'inserted' | 'updated'; documentId: string; syncId: string; title: string }> {
    const uid = settings.contentTypeUid;
    const syncId = resolveSyncId(item);
    const title = resolveTitle(item);
    if (!syncId) {
      throw new Error(`Missing sync id for "${title}"`);
    }

    const ctAttrs = strapi.contentTypes[uid]?.attributes || {};
    if (!ctAttrs[SYNC_ID_FIELD]) {
      throw new Error(
        `Add unique string field "${SYNC_ID_FIELD}" on ${uid} before importing. Sync ID mapping is fixed.`
      );
    }
    if (settings.contentMode === 'dynamiczone') {
      const dz = settings.dynamicZone;
      if (!dz?.field || !dz.component || !dz.htmlField) {
        throw new Error('Dynamic zone mapping incomplete (zone + component + HTML field).');
      }
    } else if (!settings.fieldMap.content) {
      throw new Error('Map a Content field, or switch to Dynamic zone mode.');
    }

    const existing = await this.findExistingBySyncId(uid, SYNC_ID_FIELD, syncId);
    const status = publishStatus === 'draft' ? 'draft' : 'published';

    let existingEntry: Record<string, unknown> | null = null;
    if (
      existing &&
      settings.contentMode === 'dynamiczone' &&
      settings.dynamicZone?.field
    ) {
      existingEntry = await this.loadExistingForMerge(
        uid,
        existing.documentId,
        settings.dynamicZone.field
      );
    }

    const data = await this.buildEntryData(item, settings, existingEntry);

    try {
      if (existing) {
        const updated = await strapi.documents(uid).update({
          documentId: existing.documentId,
          data,
          status,
        });
        return {
          action: 'updated',
          documentId: String(updated.documentId || existing.documentId),
          syncId,
          title,
        };
      }

      const created = await strapi.documents(uid).create({
        data,
        status,
      });
      return {
        action: 'inserted',
        documentId: String(created.documentId),
        syncId,
        title,
      };
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      strapi.log.error(`[brandstory-ai] upsert failed for "${title}" (${syncId}): ${detail}`);
      throw new Error(detail);
    }
  },

  async runImport(options: RunImportOptions = {}): Promise<SyncResult> {
    const started = Date.now();
    const source = options.source || 'manual';
    const settings: PluginSettings = await strapi.plugin('brandstory-ai').service('settings').get();
    const publishStatus: PublishStatus =
      options.publishStatus || settings.defaultPublishStatus || 'published';

    if (!settings.siteUrl || !settings.workspace) {
      const result: SyncResult = {
        inserted: 0,
        updated: 0,
        skipped: 0,
        failed: 0,
        errors: ['Plugin is not configured.'],
        message: 'Plugin is not configured.',
        entries: [],
        archiveS3Keys: [],
      };
      await strapi.plugin('brandstory-ai').service('logger').write({
        source,
        status: 'error',
        message: result.message,
        durationMs: Date.now() - started,
        errors: result.errors,
      });
      return result;
    }

    if (!settings.contentTypeUid) {
      const result: SyncResult = {
        inserted: 0,
        updated: 0,
        skipped: 0,
        failed: 0,
        errors: ['contentTypeUid is not configured.'],
        message: 'contentTypeUid is not configured.',
        entries: [],
        archiveS3Keys: [],
      };
      await strapi.plugin('brandstory-ai').service('logger').write({
        source,
        status: 'error',
        message: result.message,
        durationMs: Date.now() - started,
        errors: result.errors,
      });
      return result;
    }

    let posts = options.posts;
    let files = options.files || [];
    if (!posts) {
      const importedIds = await this.getImportedIds(settings);
      const fetched = await strapi
        .plugin('brandstory-ai')
        .service('brandstoryClient')
        .fetchFullQueue(importedIds);
      if (fetched.error) {
        const result: SyncResult = {
          inserted: 0,
          updated: 0,
          skipped: 0,
          failed: 0,
          errors: [fetched.error],
          message: fetched.error,
          entries: [],
          archiveS3Keys: [],
        };
        await strapi.plugin('brandstory-ai').service('logger').write({
          source,
          status: 'error',
          message: result.message,
          durationMs: Date.now() - started,
          errors: result.errors,
        });
        return result;
      }
      posts = fetched.posts;
      files = fetched.files;
    }

    let work = posts.filter((p) => resolveSyncId(p));
    if (options.onlySyncIds?.length) {
      const allow = new Set(options.onlySyncIds.map(String));
      work = work.filter((p) => allow.has(resolveSyncId(p)));
    }

    const importedIds = await this.getImportedIds(settings);
    const importedSet = new Set(importedIds);
    // Upsert every queued item by sync_id (create or update).
    const queue = work;
    const result: SyncResult = {
      inserted: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      errors: [],
      message: '',
      entries: [],
      archiveS3Keys: [],
    };

    const newlyImported: string[] = [];
    const archiveKeys: string[] = [];

    for (const item of queue) {
      const apiId = resolveApiId(item) || resolveSyncId(item);
      const isNewExport = Boolean(apiId && !importedSet.has(apiId));
      try {
        const upserted = await this.upsertPost(item, settings, publishStatus);
        if (upserted.action === 'inserted') {
          result.inserted += 1;
        } else {
          result.updated += 1;
        }
        result.entries.push({
          documentId: upserted.documentId,
          title: upserted.title,
          syncId: upserted.syncId,
          action: upserted.action,
        });
        if (isNewExport && apiId) {
          newlyImported.push(apiId);
          importedSet.add(apiId);
        }
        const s3 =
          typeof item.s3_content_key === 'string' ? item.s3_content_key.trim() : '';
        if (isNewExport && s3) archiveKeys.push(s3);
      } catch (err) {
        result.failed += 1;
        result.errors.push(
          `${resolveTitle(item)}: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    if (newlyImported.length > 0) {
      await this.addImportedIds(settings, newlyImported);
    }

    let keysForArchive = [...archiveKeys];
    if (result.inserted > 0 && keysForArchive.length === 0) {
      keysForArchive = files.filter((f) => typeof f === 'string' && f.trim());
    }
    if (result.inserted > 0 && keysForArchive.length > 0) {
      await strapi.plugin('brandstory-ai').service('brandstoryClient').requestArchive(keysForArchive);
    }
    result.archiveS3Keys = keysForArchive;

    if (queue.length === 0) {
      result.message = 'No posts in queue.';
    } else if (result.inserted > 0 && result.updated > 0) {
      result.message = `Inserted ${result.inserted}, updated ${result.updated}.`;
    } else if (result.updated > 0) {
      result.message = `Updated ${result.updated} entr${result.updated === 1 ? 'y' : 'ies'}.`;
    } else if (result.inserted > 0) {
      result.message = `Inserted ${result.inserted} entr${result.inserted === 1 ? 'y' : 'ies'}.`;
    } else if (result.failed > 0) {
      result.message = `Failed to import ${result.failed} entr${result.failed === 1 ? 'y' : 'ies'}.`;
    } else {
      result.message = 'Nothing to import.';
    }

    result.skipped = Math.max(0, work.length - result.inserted - result.updated - result.failed);

    const status =
      result.failed > 0 && (result.inserted > 0 || result.updated > 0)
        ? 'partial'
        : result.failed > 0
          ? 'error'
          : 'success';

    await strapi.plugin('brandstory-ai').service('logger').write({
      source,
      status,
      message: result.message,
      inserted: result.inserted,
      updated: result.updated,
      skipped: result.skipped,
      failed: result.failed,
      durationMs: Date.now() - started,
      errors: result.errors,
      meta: { contentTypeUid: settings.contentTypeUid, publishStatus },
    });

    return result;
  },

  async fetchPreview() {
    const settings = await strapi.plugin('brandstory-ai').service('settings').get();
    const importedIds = await this.getImportedIds(settings);
    const fetched = await strapi
      .plugin('brandstory-ai')
      .service('brandstoryClient')
      .fetchFullQueue(importedIds);

    if (fetched.error) {
      return { error: fetched.error, posts: [], files: [], meta: {}, counts: null };
    }

    const posts = fetched.posts;
    let newCount = 0;
    let updateCount = 0;
    for (const p of posts) {
      const syncId = resolveSyncId(p);
      const apiId = resolveApiId(p) || syncId;
      if (!syncId) continue;
      const existing = await this.findExistingBySyncId(
        settings.contentTypeUid,
        SYNC_ID_FIELD,
        syncId
      );
      if (existing) updateCount += 1;
      else if (apiId && !importedIds.includes(apiId)) newCount += 1;
      else newCount += 1;
    }

    return {
      error: null,
      posts: posts.map((p) => ({
        id: resolveApiId(p),
        sync_id: resolveSyncId(p),
        title: resolveTitle(p),
        has_content: Boolean(prepareContentHtml(p)),
      })),
      files: fetched.files,
      meta: fetched.meta,
      counts: { total: posts.length, new: newCount, update: updateCount },
    };
  },
});
