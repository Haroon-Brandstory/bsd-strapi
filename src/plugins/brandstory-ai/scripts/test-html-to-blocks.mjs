#!/usr/bin/env node
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load TS via ts-node/register if available; else run a tiny inline mirror.
// Prefer compiling through a simple dynamic import of the built logic by duplicating call via tsx-less eval.

async function main() {
  let htmlToBlocks;
  let formatBodyForAttributeType;
  try {
    // When Strapi compiles plugin TS into dist, this may exist; for local plugin source use transpile.
    const mod = await import('../server/src/services/html-to-blocks.ts').catch(() => null);
    if (mod) {
      htmlToBlocks = mod.htmlToBlocks;
      formatBodyForAttributeType = mod.formatBodyForAttributeType;
    }
  } catch {
    // ignore
  }

  if (!htmlToBlocks) {
    // Fallback: spawn node with --experimental-strip-types if Node 22+
    const { pathToFileURL } = await import('node:url');
    const file = pathToFileURL(
      path.join(__dirname, '../server/src/services/html-to-blocks.ts')
    ).href;
    const mod = await import(file);
    htmlToBlocks = mod.htmlToBlocks;
    formatBodyForAttributeType = mod.formatBodyForAttributeType;
  }

  const html = `
    <h2>Hello</h2>
    <p>This is <strong>bold</strong> and <em>italic</em>.</p>
    <ul><li>One</li><li>Two</li></ul>
    <figure class="x"><img src="/uploads/a.jpg" alt="A" /></figure>
  `;

  const blocks = htmlToBlocks(html);
  assert.ok(Array.isArray(blocks) && blocks.length >= 3);
  assert.equal(blocks[0].type, 'heading');
  assert.equal(blocks[0].level, 2);
  assert.equal(blocks[1].type, 'paragraph');
  assert.ok(blocks[1].children.some((c) => c.type === 'text' && c.bold));
  assert.equal(blocks[2].type, 'list');
  assert.equal(blocks[2].format, 'unordered');
  const img = blocks.find((b) => b.type === 'paragraph' && JSON.stringify(b).includes('/uploads/a.jpg'));
  assert.ok(img);

  const asBlocks = formatBodyForAttributeType('<p>Hi</p>', 'blocks');
  assert.ok(Array.isArray(asBlocks));
  const asHtml = formatBodyForAttributeType('<p>Hi</p>', 'richtext');
  assert.equal(asHtml, '<p>Hi</p>');

  console.log('html-to-blocks smoke tests passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
