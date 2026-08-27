import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

const LOCATION_PAGE_UID = 'api::location-page.location-page';
const BLOG_UID = 'api::blog.blog';

/**
 * Content seed runs only when RUN_CONTENT_SEED=true.
 * Prod: leave unset/false on normal boots; set true for one controlled restart, then turn off.
 * Local: set true in .env when you intentionally want to seed.
 */
const SHOULD_RUN_CONTENT_SEED = process.env.RUN_CONTENT_SEED === 'true';

const LOCATION_SEED_FILES = [
  'data/seeds/location-pages-aeo-cities.json',
  'data/seeds/b2b-performance-marketing-services-new-york.json',
  'data/seeds/b2c-performance-marketing-location-pages.json',
  'data/seeds/brandstory-ai-development-location-pages.json',
  'data/seeds/brandstory-ai-development-15-us-location-pages-v2.json',
];

/** Overwrite existing by fullPath. Keep empty for prod-safe create-only seeding.
 * Temporary: v2 AI pages upsert for one prod seed run, then clear this set.
 */
const LOCATION_UPSERT_FILES = new Set<string>([
  'data/seeds/brandstory-ai-development-15-us-location-pages-v2.json',
]);

/** Blog seed files (create-only unless listed in BLOG_UPSERT_FILES). */
const BLOG_SEED_FILES: string[] = [];

/** Overwrite existing by blogSlug. Keep empty for prod-safe create-only seeding. */
const BLOG_UPSERT_FILES = new Set<string>([]);

async function seedLocationPagesFromFile(
  strapi: Core.Strapi,
  relativePath: string
) {
  const seedPath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(seedPath)) {
    strapi.log.warn(`[seed] missing file: ${seedPath}`);
    return;
  }

  const raw = JSON.parse(fs.readFileSync(seedPath, 'utf8')) as {
    locationPages?: Array<Record<string, unknown> & { fullPath?: string }>;
  };
  const pages = raw.locationPages || [];
  const upsert = LOCATION_UPSERT_FILES.has(relativePath);

  if (pages.length === 0) {
    strapi.log.warn(`[seed] no locationPages in ${relativePath}`);
    return;
  }

  for (const entry of pages) {
    const fullPath = String(entry.fullPath || '');
    if (!fullPath) {
      strapi.log.warn(`[seed] skip entry missing fullPath in ${relativePath}`);
      continue;
    }

    const existing = await strapi.documents(LOCATION_PAGE_UID).findMany({
      filters: { fullPath },
      limit: 1,
    });

    if (existing.length > 0) {
      if (!upsert) {
        strapi.log.info(
          `[seed] skip existing location-page: ${fullPath} (${existing[0].documentId})`
        );
        continue;
      }

      const updated = await strapi.documents(LOCATION_PAGE_UID).update({
        documentId: existing[0].documentId,
        data: entry,
        status: 'published',
      });

      strapi.log.info(
        `[seed] updated location-page ${fullPath} (${updated.documentId || existing[0].documentId})`
      );
      continue;
    }

    const created = await strapi.documents(LOCATION_PAGE_UID).create({
      data: entry,
      status: 'published',
    });

    strapi.log.info(
      `[seed] created location-page ${fullPath} (${created.documentId})`
    );
  }
}

async function seedBlogsFromFile(strapi: Core.Strapi, relativePath: string) {
  const seedPath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(seedPath)) {
    strapi.log.warn(`[seed] missing file: ${seedPath}`);
    return;
  }

  const raw = JSON.parse(fs.readFileSync(seedPath, 'utf8')) as {
    blogs?: Array<Record<string, unknown> & { blogSlug?: string }>;
  };
  const blogs = raw.blogs || [];
  const upsert = BLOG_UPSERT_FILES.has(relativePath);

  if (blogs.length === 0) {
    strapi.log.warn(`[seed] no blogs in ${relativePath}`);
    return;
  }

  for (const entry of blogs) {
    const blogSlug = String(entry.blogSlug || '');
    if (!blogSlug) {
      strapi.log.warn(`[seed] skip blog missing blogSlug in ${relativePath}`);
      continue;
    }

    const existing = await strapi.documents(BLOG_UID).findMany({
      filters: { blogSlug },
      limit: 1,
    });

    if (existing.length > 0) {
      if (!upsert) {
        strapi.log.info(
          `[seed] skip existing blog: ${blogSlug} (${existing[0].documentId})`
        );
        continue;
      }

      const updated = await strapi.documents(BLOG_UID).update({
        documentId: existing[0].documentId,
        data: entry,
        status: 'published',
      });

      strapi.log.info(
        `[seed] updated blog ${blogSlug} (${updated.documentId || existing[0].documentId})`
      );
      continue;
    }

    const created = await strapi.documents(BLOG_UID).create({
      data: entry,
      status: 'published',
    });

    strapi.log.info(`[seed] created blog ${blogSlug} (${created.documentId})`);
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (!SHOULD_RUN_CONTENT_SEED) {
      strapi.log.info(
        '[seed] skipped (set RUN_CONTENT_SEED=true to seed on boot)'
      );
      return;
    }

    try {
      strapi.log.info('[seed] RUN_CONTENT_SEED=true — starting content seed');
      for (const file of LOCATION_SEED_FILES) {
        await seedLocationPagesFromFile(strapi, file);
      }
      for (const file of BLOG_SEED_FILES) {
        await seedBlogsFromFile(strapi, file);
      }
      strapi.log.info('[seed] content seed finished');
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      strapi.log.error(`[seed] content seed failed: ${detail}`);
    }
  },
};
