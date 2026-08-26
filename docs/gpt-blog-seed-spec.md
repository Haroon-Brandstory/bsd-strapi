# Strapi Blog — GPT Seed Spec

Use this document to generate valid JSON for Brandstory Strapi **blog** entries.

## Output contract

Return **only** valid JSON (no markdown fences unless asked):

```json
{
  "blogs": [ /* one or more blog objects */ ]
}
```

Each entry must be ready for Strapi Document Service create / seed append into `data/seeds/blogs-*.json`.

---

## Hard rules (must follow)

1. **Exact field names** — camelCase as listed. Do not invent fields.
2. **Exact `__component` UIDs** — only values from the allowed list in `contentSection`.
3. **All schema fields are optional** — still fill useful content for a complete article when asked.
4. **Media / images — NEVER break seed**
   - Media fields are optional.
   - **Do NOT include** `blogImage` (featured) or nested `blogImage` media inside `element.blog-image`.
   - Do NOT invent URLs, file IDs, hashes, or `"blogImage": null`.
   - **Omit media keys entirely.** Missing images will not break Strapi.
5. **`blogSlug`** — unique kebab-case slug, no leading `/`. Example: `how-aeo-changes-b2b-search`.
6. **Do not invent section types** — only `element.blog-content` and `element.blog-image`.
7. **For seed without media, prefer only `element.blog-content` blocks.** Skip `element.blog-image` components unless a real media upload flow exists.
8. **Blocks vs text** — use the correct format per field (see Formats).
9. Prefer British spelling for Brandstory editorial copy (`optimisation`, `organise`) unless told otherwise.
10. No guaranteed ranking / AI-citation claims unless the brief explicitly allows cautious wording.
11. **Relations** — omit `blog_categories` in GPT seed output unless documentIds are provided. Categories can be linked later in Admin.
12. **Omit `brandstorySyncId`** unless explicitly asked (used by Brandstory AI sync plugin).

---

## Formats

### Type: string (short text)

Plain string.

### Type: text (long text)

Plain string (can be multi-sentence / multi-paragraph as one string). **Not** blocks.

### Type: date

ISO date string: `YYYY-MM-DD`. Example: `2026-08-26`.

### Type: blocks (Strapi rich text)

Always an array of block nodes. Minimal paragraph:

```json
[
  {
    "type": "paragraph",
    "children": [
      { "type": "text", "text": "Your paragraph here." }
    ]
  }
]
```

Optional bold:

```json
[
  {
    "type": "paragraph",
    "children": [
      { "type": "text", "text": "Lead phrase. ", "bold": true },
      { "type": "text", "text": "Rest of sentence." }
    ]
  }
]
```

Useful block types GPT may use when needed:

```json
[
  {
    "type": "heading",
    "level": 2,
    "children": [{ "type": "text", "text": "Section heading" }]
  },
  {
    "type": "paragraph",
    "children": [{ "type": "text", "text": "Body paragraph." }]
  },
  {
    "type": "list",
    "format": "unordered",
    "children": [
      {
        "type": "list-item",
        "children": [{ "type": "text", "text": "First item" }]
      },
      {
        "type": "list-item",
        "children": [{ "type": "text", "text": "Second item" }]
      }
    ]
  }
]
```

### Type: media

**Omit entirely in GPT output.** Upload later in Admin.

### Type: relation

Omit in seed JSON unless connecting by known `documentId`:

```json
"blog_categories": {
  "connect": [{ "documentId": "existingCategoryDocumentId" }]
}
```

Prefer omit for GPT-generated seeds.

---

## Collection type: `blog`

UID: `api::blog.blog`  
Draft & publish: enabled (seed typically publishes).

| Field | Type | Notes |
|---|---|---|
| `blogTitle` | text | Article title / H1 |
| `blogSlug` | string | Unique URL slug (kebab-case) |
| `blogMetaTitle` | text | SEO title (~50–60 chars) |
| `blogMetaDescription` | text | SEO description (~140–160 chars) |
| `blogDate` | date | `YYYY-MM-DD` |
| `blogImage` | media | Featured image — **OMIT** in seed |
| `contentSection` | dynamiczone | Ordered content blocks |
| `blogQuote` | text | Optional pull quote |
| `blog_categories` | relation oneToMany → `api::blog-category.blog-category` | Prefer **OMIT** in GPT seed |
| `brandstorySyncId` | string (unique) | Prefer **OMIT** unless syncing |

---

## Allowed `contentSection` `__component` values

Only these:

| UID | Display | Typical role | Seed rule |
|---|---|---|---|
| `element.blog-content` | blogContent | Rich text body / section | **Use this** for seed content |
| `element.blog-image` | blogImage | Inline image | **Omit** unless media available |

### Recommended contentSection pattern for a full article

Prefer **one** `element.blog-content` component containing the full article body (headings, paragraphs, lists) in a single `blogContent` blocks array.

Only split into multiple `element.blog-content` components when you intentionally need separate CMS chunks (e.g. insert an image component between sections).

Optional `blogQuote` at entry level for a featured pull quote.

---

## Nested component field maps

### `element.blog-content`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"element.blog-content"` | required |
| `blogContent` | blocks | Article body for this chunk |

### `element.blog-image`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"element.blog-image"` | required |
| `blogImage` | media | **OMIT key / omit whole component in seed** |

---

## Related collection (reference only): `blog-category`

UID: `api::blog-category.blog-category`

| Field | Type |
|---|---|
| `catName` | string |
| `catSlug` | uid (from `catName`) |

Do **not** invent category objects inside a blog entry. Seed categories separately if needed, then connect by `documentId`.

---

## Minimal valid blog skeleton (images omitted, single content component)

```json
{
  "blogs": [
    {
      "blogTitle": "How Answer Engine Optimisation Changes B2B Discovery",
      "blogSlug": "how-aeo-changes-b2b-discovery",
      "blogMetaTitle": "How AEO Changes B2B Discovery | Brandstory",
      "blogMetaDescription": "Learn how answer engine optimisation helps B2B brands become more visible in AI-assisted search and conversational discovery journeys.",
      "blogDate": "2026-08-26",
      "blogQuote": "Visibility increasingly depends on whether your expertise can be understood, trusted and cited.",
      "contentSection": [
        {
          "__component": "element.blog-content",
          "blogContent": [
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "text": "Intro paragraph covering the main topic."
                }
              ]
            },
            {
              "type": "heading",
              "level": 2,
              "children": [{ "type": "text", "text": "Section heading" }]
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "text": "Body paragraph with practical guidance."
                }
              ]
            },
            {
              "type": "list",
              "format": "unordered",
              "children": [
                {
                  "type": "list-item",
                  "children": [
                    { "type": "text", "text": "First item" }
                  ]
                },
                {
                  "type": "list-item",
                  "children": [
                    { "type": "text", "text": "Second item" }
                  ]
                }
              ]
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "text": "Closing paragraph / soft CTA."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Common mistakes to avoid

| Mistake | Fix |
|---|---|
| `"blogImage": null` or fake URL | Omit `blogImage` keys entirely |
| Including empty `element.blog-image` | Omit that component in seed |
| Putting plain string in `blogContent` | Use blocks array |
| Using blocks for `blogTitle` / `blogQuote` | Use plain text strings |
| Inventing `__component` values | Only `element.blog-content` / `element.blog-image` |
| Duplicate `blogSlug` | Must be unique |
| Leading `/` in `blogSlug` | Use `my-article-slug` not `/my-article-slug` |
| Nesting categories as full objects | Omit or `connect` by `documentId` only |
| Date like `26/08/2026` | Use `YYYY-MM-DD` |

---

## Writing guidance for Brandstory blogs

- One clear primary topic per article.
- Useful H2 structure that matches reader questions.
- Practical guidance over vague thought-leadership filler.
- Include a short closing CTA when appropriate.
- Keep meta title/description distinct from the H1 when useful, but aligned to the same topic.
- If writing a series, keep slugs consistent and unique.

---

## Image safety summary (for GPT + seed)

- Featured `blogImage`: omit.
- Inline `element.blog-image`: omit for text-only seed.
- Seed JSON without images is valid.
- Strapi create/publish works without media.
- Images can be added later in Admin without changing text structure.

---

## Seeding notes (engineering)

- Unique match field for idempotent seed: `blogSlug`
- Collection UID: `api::blog.blog`
- Seed root key: `blogs`
- Example seed path: `data/seeds/blogs-example.json`
- Publish status on create: `published`
- Restart Strapi after adding a new seed file to `SEED_FILES` / bootstrap list
