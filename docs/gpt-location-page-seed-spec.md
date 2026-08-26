# Strapi Location Page — GPT Seed Spec

Use this document to generate valid JSON for Brandstory Strapi **Location Page** entries.

## Output contract

Return **only** valid JSON (no markdown fences unless asked):

```json
{
  "locationPages": [ /* one or more page objects */ ]
}
```

Each page must be ready for Strapi Document Service create / seed append into `data/seeds/location-pages-aeo-cities.json`.

---

## Hard rules (must follow)

1. **Exact field names** — camelCase as listed. Do not invent fields.
2. **Exact `__component` UIDs** — only values from the allowed list.
3. **All fields optional** in Strapi schema — still fill useful content for every section when asked to generate a full page.
4. **Media / images — NEVER break seed**
   - Media fields are optional.
   - **Do NOT include** `img`, `image`, or any media object.
   - Do NOT invent URLs, file IDs, hashes, or `"img": null`.
   - **Omit the key entirely.** Missing images will not break Strapi.
5. **`fullPath`** — unique kebab-case slug, no leading `/`. Example: `aeo-services-pune`.
6. **Do not invent section types** — only the 16 listed below.
7. **Blocks vs text** — use the correct format per field (see Formats).
8. Prefer British spelling when writing Brandstory AEO copy (`optimisation`, `organise`) unless told otherwise.
9. No guaranteed AI citation / ranking claims.
10. **Banner title split is wrong** — `section.banner.sectionHeading` = full title (include city). `section.banner.orangeText` = short highlight tagline only (not city name / not title suffix).

---

## Formats

### Type: string (short text)

Plain string.

### Type: text (long text)

Plain string (can be multi-sentence). **Not** blocks.

### Type: boolean

`true` or `false`.

### Type: blocks (Strapi rich text)

Always an array of block nodes. Minimal paragraph shape:

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

### Type: media

**Omit entirely in GPT output.** Upload later in Admin.

### Type: component (repeatable)

JSON array of nested objects with the nested fields listed.

---

## Collection type: `location-page`

| Field | Type | Notes |
|---|---|---|
| `pageTitle` | string | Page name / H1 style. e.g. `AEO Services in Pune` |
| `fullPath` | uid/string | Unique slug. e.g. `aeo-services-pune` |
| `seotitle` | string | ~50–60 chars |
| `seodescription` | string | ~140–160 chars |
| `sections` | dynamiczone array | Ordered list of section components |

Draft & publish supported. Seed typically publishes.

---

## Allowed section `__component` values

Only these:

| UID | Display | Typical role |
|---|---|---|
| `section.banner` | banner | Hero |
| `section.whystrategic` | Why Strategic | Strategy narrative + bullets |
| `section.services-sec` | services_sec | Service cards |
| `section.whyaeomatters` | Why AEO Matters | Why-now cards |
| `section.outcome` | outcome | Business outcomes |
| `section.thepeople` | The People | Team / roles |
| `section.casestudy` | casestudy | Case examples |
| `section.accordion1` | accordion1 | Why Brandstory (title + orangeText) |
| `section.accordion2` | accordion2 | Process / steps |
| `section.yourbrandyourstrategy` | yourbrandyourstrategy | 3 strategy pillars |
| `section.whyyourpartner` | whyyourpartner | Partner benefits |
| `section.vertical-tab` | verticalTab | Workstreams |
| `section.horizontaltab` | horizontaltab | Industries |
| `section.testimonials` | testimonials | Quotes |
| `section.faq` | faq | FAQs |
| `section.adv` | adv | Final CTA |

### Recommended section order for a full AEO city page

1. `section.banner`
2. `section.whystrategic`
3. `section.services-sec`
4. `section.whyaeomatters`
5. `section.outcome`
6. `section.thepeople`
7. `section.casestudy`
8. `section.accordion1`
9. `section.accordion2`
10. `section.yourbrandyourstrategy`
11. `section.whyyourpartner`
12. `section.vertical-tab`
13. `section.horizontaltab`
14. `section.testimonials`
15. `section.faq`
16. `section.adv`

---

## Nested element components

### `element.button`

| Field | Type |
|---|---|
| `buttonLabel` | string |
| `buttonUrl` | string (path e.g. `/contact`) |

### `element.list` (used as `points[]`)

| Field | Type |
|---|---|
| `point` | text |

### `element.imgcard` (used as `imgcards[]`)

| Field | Type | Seed rule |
|---|---|---|
| `title` | string | include |
| `para` | blocks | include |
| `img` | media | **OMIT** |

### `element.card` (used as `card[]` in outcome)

| Field | Type |
|---|---|
| `title` | string |
| `para` | blocks |

### `element.card1` (used as `cards[]`)

| Field | Type | Seed rule |
|---|---|---|
| `title` | string | include |
| `para` | blocks | include |
| `bgcolor` | string | optional hex e.g. `#FFF5EE` |
| `img` | media | **OMIT** |

### `element.casestudy-card` (used as `casestudyCard[]`)

| Field | Type | Seed rule |
|---|---|---|
| `title` | string | include |
| `goal` | string | include |
| `solution` | string | include |
| `result` | string | include |
| `image` | media | **OMIT** |

### `element.accordion` (used as `accordion[]`)

| Field | Type |
|---|---|
| `title` | string |
| `para` | blocks |

### `element.faq` (used as `faq[]`)

| Field | Type |
|---|---|
| `question` | string |
| `answer` | blocks |

### `element.tabs` (used as `tabs[]`)

| Field | Type |
|---|---|
| `title` | string |
| `para` | blocks |

### `element.testimonials` (used as `testimonials[]`)

| Field | Type |
|---|---|
| `author` | string |
| `position` | string |
| `review` | text |

---

## Section field maps

### 1) `section.banner`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.banner"` | required |
| `sectionHeading` | string | **Full hero title** including city/service. Do not split the title across fields. Example: `B2C Performance Marketing Company in New York` |
| `orangeText` | string | **Highlight tagline only** — short emphasised supporting line under/beside the title. Not the city name alone. Not a second half of the title. Example: `Accountable growth. Measurable demand.` |
| `bannerPara` | blocks | hero intro |
| `buttons` | `element.button[]` | typically 2 |

**Banner title rules (critical):**
- Put the complete H1-style headline in `sectionHeading`.
- Use `orangeText` for a short highlighted tagline / accent phrase (value prop, positioning line).
- Do **not** put city name alone in `orangeText` while leaving a truncated title in `sectionHeading` (wrong: `sectionHeading: "… in"`, `orangeText: "New York"`).
- City belongs inside `sectionHeading` when it is part of the page title.

---

### 2) `section.whystrategic`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.whystrategic"` | required |
| `title` | string | |
| `subtitle` | text | prefer this over empty |
| `para` | text | **plain text, not blocks** |
| `text1` | text | plain text |
| `text2` | text | plain text |
| `orangeText` | text | highlight line |
| `imageAlt` | string | alt text only; OK without image |
| `imageReverse` | boolean | default `false` |
| `points` | `element.list[]` | each `{ "point": "..." }` |
| `bottomPara` | text | plain text |
| `img` | media | **OMIT** |

Recommended: 4–6 points.

---

### 3) `section.services-sec`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.services-sec"` | required |
| `title` | string | |
| `para` | blocks | |
| `imgcards` | `element.imgcard[]` | services |
| `bottomPara` | blocks | |

Recommended: 5–6 cards. **No `img` keys.**

---

### 4) `section.whyaeomatters`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.whyaeomatters"` | required |
| `title` | string | |
| `para` | blocks | |
| `imgcards` | `element.imgcard[]` | reasons |
| `bottomPara` | blocks | |

Recommended: 3 cards. **No `img` keys.**

---

### 5) `section.outcome`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.outcome"` | required |
| `title` | string | |
| `para` | blocks | |
| `orangeText` | string | tagline |
| `card` | `element.card[]` | field name is `card` not `cards` |
| `bottomPara` | blocks | |

Recommended: 3 cards.

---

### 6) `section.thepeople`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.thepeople"` | required |
| `title` | string | |
| `para` | text | **plain text** |
| `subtext` | string | short label |
| `points` | `element.list[]` | |
| `bottomPara` | text | **plain text** |

Recommended: 4–5 points. No media.

---

### 7) `section.casestudy`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.casestudy"` | required |
| `title` | string | |
| `para` | blocks | |
| `casestudyCard` | `element.casestudy-card[]` | |
| `bottomPara` | blocks | |

Recommended: 3 cards. **Omit `image`.**

---

### 8) `section.accordion1`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.accordion1"` | required |
| `title` | string | left/plain part |
| `orangeText` | string | emphasised part |
| `para` | blocks | |
| `accordion` | `element.accordion[]` | |
| `bottomPara` | blocks | |

Recommended: 3–4 items.

---

### 9) `section.accordion2`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.accordion2"` | required |
| `title` | string | |
| `para` | blocks | |
| `accordion` | `element.accordion[]` | steps |

No `orangeText` / `bottomPara` on this component. Recommended: 4–5 steps.

---

### 10) `section.yourbrandyourstrategy`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.yourbrandyourstrategy"` | required |
| `title` | string | |
| `cards` | `element.card1[]` | |

Recommended: 3 cards. Optional `bgcolor`. **Omit `img`.**

Suggested bgcolors: `#FFF5EE`, `#F0F7FF`, `#F5FFF0`.

---

### 11) `section.whyyourpartner`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.whyyourpartner"` | required |
| `title` | string | |
| `para` | blocks | |
| `cards` | `element.card1[]` | |
| `bottomPara` | blocks | |

Recommended: 3 cards. **Omit `img`.**

---

### 12) `section.vertical-tab`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.vertical-tab"` | required |
| `title` | string | |
| `para` | blocks | |
| `tabs` | `element.tabs[]` | |

Recommended: 3–4 tabs.

---

### 13) `section.horizontaltab`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.horizontaltab"` | required |
| `title` | string | |
| `description` | blocks | note field name `description` not `para` |
| `tabs` | `element.tabs[]` | industries |

Recommended: 3–4 industries localised to city.

---

### 14) `section.testimonials`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.testimonials"` | required |
| `title` | string | |
| `testimonials` | `element.testimonials[]` | |

Recommended: 2–3 quotes.

---

### 15) `section.faq`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.faq"` | required |
| `title` | string | |
| `faq` | `element.faq[]` | |

Recommended: 5 FAQs. Include one that says AI citations cannot be guaranteed.

---

### 16) `section.adv`

| Field | Type | Notes |
|---|---|---|
| `__component` | `"section.adv"` | required |
| `title` | string | |
| `para` | blocks | |
| `button1Label` | string | |
| `button1Url` | string | |
| `button2Label` | string | |
| `button2Url` | string | |

Typical URLs: `/contact`, `/services`.

---

## Minimal valid page skeleton (images omitted)

```json
{
  "locationPages": [
    {
      "pageTitle": "AEO Services in Example City",
      "fullPath": "aeo-services-example-city",
      "seotitle": "AEO Services in Example City | Brandstory",
      "seodescription": "Improve AI search and organic visibility with Brandstory AEO services in Example City.",
      "sections": [
        {
          "__component": "section.banner",
          "sectionHeading": "Answer Engine Optimisation in Example City",
          "orangeText": "Cited. Trusted. Chosen.",
          "bannerPara": [
            {
              "type": "paragraph",
              "children": [
                { "type": "text", "text": "Intro paragraph." }
              ]
            }
          ],
          "buttons": [
            { "buttonLabel": "Talk to our AEO team", "buttonUrl": "/contact" },
            { "buttonLabel": "Explore our services", "buttonUrl": "/services" }
          ]
        },
        {
          "__component": "section.whystrategic",
          "title": "Why Example City brands need strategic AEO",
          "subtitle": "AI visibility needs connected signals.",
          "para": "Plain text paragraph.",
          "text1": "Plain text.",
          "text2": "Plain text.",
          "orangeText": "Build authority before chasing citations",
          "imageAlt": "Strategic AEO planning",
          "imageReverse": false,
          "points": [
            { "point": "First point." },
            { "point": "Second point." }
          ],
          "bottomPara": "Closing plain text."
        },
        {
          "__component": "section.services-sec",
          "title": "AEO services for businesses in Example City",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Services intro." }]
            }
          ],
          "imgcards": [
            {
              "title": "AI search visibility audit",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Card body." }]
                }
              ]
            }
          ],
          "bottomPara": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Services close." }]
            }
          ]
        },
        {
          "__component": "section.whyaeomatters",
          "title": "Why AEO matters now",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Why-now intro." }]
            }
          ],
          "imgcards": [
            {
              "title": "Reason one",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Reason body." }]
                }
              ]
            }
          ],
          "bottomPara": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "AEO complements SEO." }]
            }
          ]
        },
        {
          "__component": "section.outcome",
          "title": "Business outcomes",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Outcomes intro." }]
            }
          ],
          "orangeText": "More visibility. More trust.",
          "card": [
            {
              "title": "Outcome one",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Outcome body." }]
                }
              ]
            }
          ],
          "bottomPara": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Outcomes close." }]
            }
          ]
        },
        {
          "__component": "section.thepeople",
          "title": "A cross-functional AEO team",
          "para": "Plain text about collaboration.",
          "subtext": "One connected team",
          "points": [
            { "point": "Strategists map questions." },
            { "point": "Writers produce citation-ready content." }
          ],
          "bottomPara": "Closing plain text."
        },
        {
          "__component": "section.casestudy",
          "title": "Example engagements",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Case intro." }]
            }
          ],
          "casestudyCard": [
            {
              "title": "B2B visibility programme",
              "goal": "Goal text",
              "solution": "Solution text",
              "result": "Directional result text"
            }
          ],
          "bottomPara": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "No guaranteed citations." }]
            }
          ]
        },
        {
          "__component": "section.accordion1",
          "title": "Why businesses choose",
          "orangeText": "Brandstory for AEO",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Why us intro." }]
            }
          ],
          "accordion": [
            {
              "title": "Strategy first",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Item body." }]
                }
              ]
            }
          ],
          "bottomPara": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Why us close." }]
            }
          ]
        },
        {
          "__component": "section.accordion2",
          "title": "Our delivery process",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Process intro." }]
            }
          ],
          "accordion": [
            {
              "title": "1. Discover",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Step body." }]
                }
              ]
            }
          ]
        },
        {
          "__component": "section.yourbrandyourstrategy",
          "title": "Your brand needs its own AEO strategy",
          "cards": [
            {
              "title": "Entity positioning",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Pillar body." }]
                }
              ],
              "bgcolor": "#FFF5EE"
            }
          ]
        },
        {
          "__component": "section.whyyourpartner",
          "title": "Why choose Brandstory",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Partner intro." }]
            }
          ],
          "cards": [
            {
              "title": "Integrated search expertise",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Benefit body." }]
                }
              ],
              "bgcolor": "#FFFFFF"
            }
          ],
          "bottomPara": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Partner close." }]
            }
          ]
        },
        {
          "__component": "section.vertical-tab",
          "title": "Core AEO workstreams",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Workstreams intro." }]
            }
          ],
          "tabs": [
            {
              "title": "Question intelligence",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Tab body." }]
                }
              ]
            }
          ]
        },
        {
          "__component": "section.horizontaltab",
          "title": "Industries we support",
          "description": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "Industries intro." }]
            }
          ],
          "tabs": [
            {
              "title": "Technology and SaaS",
              "para": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Industry body." }]
                }
              ]
            }
          ]
        },
        {
          "__component": "section.testimonials",
          "title": "What clients value",
          "testimonials": [
            {
              "author": "Marketing Lead",
              "position": "B2B Company",
              "review": "Quote text."
            }
          ]
        },
        {
          "__component": "section.faq",
          "title": "FAQs about AEO services",
          "faq": [
            {
              "question": "What is Answer Engine Optimisation?",
              "answer": [
                {
                  "type": "paragraph",
                  "children": [{ "type": "text", "text": "Answer text." }]
                }
              ]
            }
          ]
        },
        {
          "__component": "section.adv",
          "title": "Build stronger visibility",
          "para": [
            {
              "type": "paragraph",
              "children": [{ "type": "text", "text": "CTA body." }]
            }
          ],
          "button1Label": "Discuss your AEO strategy",
          "button1Url": "/contact",
          "button2Label": "Explore Brandstory services",
          "button2Url": "/services"
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
| Banner `sectionHeading: "… in"` + `orangeText: "City"` | Put **full title** in `sectionHeading`; use `orangeText` for a highlight tagline |
| City-only `orangeText` | `orangeText` = short value-prop / accent line, not the city name |
| `"img": null` or fake URL | Omit `img` / `image` keys |
| Using blocks for `whystrategic.para` | Use plain string (`text`) |
| Using string for `services-sec.para` | Use blocks array |
| `cards` on outcome | Field is `card` |
| `para` on horizontaltab intro | Field is `description` |
| New `__component` values | Not allowed |
| Duplicate `fullPath` | Must be unique |
| Leading `/` in `fullPath` | Use `aeo-services-city` not `/aeo-services-city` |

---

## Localisation rules for city pages

For each city, localise at least:

- `pageTitle`, `fullPath`, `seotitle`, `seodescription`
- Banner `sectionHeading` (full title including city) and a city-relevant `orangeText` tagline
- Why AEO Matters market context
- Horizontal tab industries
- FAQ title / local questions

Vary body copy between cities. Do not clone identical pages with only city name swapped in one place.

---

## Image safety summary (for GPT + seed)

- All media fields optional.
- GPT must **omit** media fields.
- Seed JSON without images is valid.
- Strapi create/publish works without media.
- Images can be added later in Admin without changing text structure.

---

## Existing seeded cities (reference)

| City | `fullPath` |
|---|---|
| Bangalore | `aeo-services-bangalore` |
| Mumbai | `aeo-services-mumbai` |
| Delhi | `aeo-services-delhi` |
| Hyderabad | `aeo-services-hyderabad` |
| Chennai | `aeo-services-chennai` |

New cities: same structure, new unique `fullPath`, append to `data/seeds/location-pages-aeo-cities.json` (or create in Admin).
