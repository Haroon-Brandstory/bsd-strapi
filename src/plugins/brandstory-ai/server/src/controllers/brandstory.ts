import type { Core } from '@strapi/strapi';
import { listComponents, listContentTypes } from '../services/schema';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getSettings(ctx: any) {
    const settings = await strapi.plugin('brandstory-ai').service('settings').get();
    ctx.body = {
      ...settings,
      insertApiUrl: strapi.plugin('brandstory-ai').service('settings').insertApiUrl(settings),
    };
  },

  async updateSettings(ctx: any) {
    const body = ctx.request.body || {};
    const settings = await strapi.plugin('brandstory-ai').service('settings').set(body);
    ctx.body = {
      ...settings,
      insertApiUrl: strapi.plugin('brandstory-ai').service('settings').insertApiUrl(settings),
    };
  },

  async testConnection(ctx: any) {
    const result = await strapi.plugin('brandstory-ai').service('brandstoryClient').testConnection();
    await strapi.plugin('brandstory-ai').service('logger').write({
      source: 'test',
      status: result.ok ? 'success' : 'error',
      message: result.message,
    });
    ctx.body = result;
  },

  async loadFolders(ctx: any) {
    try {
      const pairs = await strapi
        .plugin('brandstory-ai')
        .service('brandstoryClient')
        .loadFolderPairs();
      ctx.body = { pairs };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { error: err instanceof Error ? err.message : String(err) };
    }
  },

  async fetchQueue(ctx: any) {
    const preview = await strapi.plugin('brandstory-ai').service('sync').fetchPreview();
    if (preview.error) {
      ctx.status = 400;
      ctx.body = preview;
      return;
    }
    ctx.body = preview;
  },

  async importQueue(ctx: any) {
    const body = ctx.request.body || {};
    const result = await strapi.plugin('brandstory-ai').service('sync').runImport({
      source: 'manual',
      publishStatus: body.publishStatus,
      onlySyncIds: Array.isArray(body.onlySyncIds) ? body.onlySyncIds.map(String) : undefined,
    });
    ctx.body = result;
  },

  async listLogs(ctx: any) {
    const limit = Number(ctx.query?.limit) || 50;
    const logs = await strapi.plugin('brandstory-ai').service('logger').list(limit);
    ctx.body = { logs };
  },

  async listContentTypes(ctx: any) {
    ctx.body = {
      contentTypes: listContentTypes(strapi),
      components: listComponents(strapi),
    };
  },
});

export default controller;
