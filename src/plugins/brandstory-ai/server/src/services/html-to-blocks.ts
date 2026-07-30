/**
 * Convert HTML (Brandstory body) into Strapi Blocks JSON.
 * Used when the mapped field type is `blocks` (not richtext).
 */

export type BlocksTextNode = {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

export type BlocksLinkNode = {
  type: 'link';
  url: string;
  children: BlocksTextNode[];
};

export type BlocksInline = BlocksTextNode | BlocksLinkNode;

export type BlocksNode =
  | { type: 'paragraph'; children: BlocksInline[] }
  | { type: 'heading'; level: number; children: BlocksInline[] }
  | {
      type: 'list';
      format: 'ordered' | 'unordered';
      children: Array<{ type: 'list-item'; children: BlocksInline[] }>;
    }
  | { type: 'quote'; children: BlocksInline[] }
  | { type: 'code'; children: [BlocksTextNode] };

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function emptyText(): BlocksTextNode {
  return { type: 'text', text: '' };
}

function imageAsParagraph(src: string, alt = ''): BlocksNode {
  const label = (alt || 'Image').trim() || 'Image';
  if (!src) {
    return { type: 'paragraph', children: [textNode(label)] };
  }
  return {
    type: 'paragraph',
    children: [
      textNode(`${label}: `),
      {
        type: 'link',
        url: src,
        children: [textNode(src)],
      },
    ],
  };
}

function textNode(text: string, mods: Partial<BlocksTextNode> = {}): BlocksTextNode {
  const node: BlocksTextNode = { type: 'text', text: decodeEntities(text) };
  if (mods.bold) node.bold = true;
  if (mods.italic) node.italic = true;
  if (mods.underline) node.underline = true;
  if (mods.strikethrough) node.strikethrough = true;
  if (mods.code) node.code = true;
  return node;
}

function parseInlines(html: string, mods: Partial<BlocksTextNode> = {}): BlocksInline[] {
  const out: BlocksInline[] = [];
  const re =
    /<(strong|b|em|i|u|s|strike|del|code|a)(\s[^>]*)?>([\s\S]*?)<\/\1>|([^<]+)|<br\s*\/?>/gi;
  let m: RegExpExecArray | null;
  let matched = false;
  while ((m = re.exec(html))) {
    matched = true;
    if (m[4] !== undefined) {
      const t = decodeEntities(m[4]);
      if (t) out.push(textNode(t, mods));
      continue;
    }
    if (m[0].toLowerCase().startsWith('<br')) {
      out.push(textNode('\n', mods));
      continue;
    }
    const tag = (m[1] || '').toLowerCase();
    const attrs = m[2] || '';
    const inner = m[3] || '';
    if (tag === 'a') {
      const href = attrs.match(/href\s*=\s*["']([^"']+)["']/i)?.[1] || '#';
      const kids = parseInlines(inner, mods).filter((n) => n.type === 'text') as BlocksTextNode[];
      out.push({
        type: 'link',
        url: decodeEntities(href),
        children: kids.length ? kids : [emptyText()],
      });
      continue;
    }
    const next = { ...mods };
    if (tag === 'strong' || tag === 'b') next.bold = true;
    if (tag === 'em' || tag === 'i') next.italic = true;
    if (tag === 'u') next.underline = true;
    if (tag === 's' || tag === 'strike' || tag === 'del') next.strikethrough = true;
    if (tag === 'code') next.code = true;
    out.push(...parseInlines(inner, next));
  }
  if (!matched) {
    const plain = stripTags(html);
    if (plain) out.push(textNode(plain, mods));
  }
  return out.length ? out : [emptyText()];
}

function attr(html: string, name: string): string {
  const m = html.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, 'i'));
  return m ? decodeEntities(m[1]) : '';
}

function listItems(html: string): Array<{ type: 'list-item'; children: BlocksInline[] }> {
  const items: Array<{ type: 'list-item'; children: BlocksInline[] }> = [];
  const re = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const inner = m[1].replace(/<\/?p[^>]*>/gi, ' ').trim();
    items.push({ type: 'list-item', children: parseInlines(inner) });
  }
  if (items.length === 0) {
    items.push({ type: 'list-item', children: parseInlines(stripTags(html) || ' ') });
  }
  return items;
}

/**
 * Best-effort HTML → Strapi Blocks. Unknown tags fall back to paragraphs.
 */
export function htmlToBlocks(html: string): BlocksNode[] {
  const cleaned = (html || '')
    .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?(html|head|body|meta|link|script|style)[^>]*>/gi, '')
    .trim();

  if (!cleaned) {
    return [{ type: 'paragraph', children: [emptyText()] }];
  }

  const blocks: BlocksNode[] = [];
  // Match top-level block-ish tags; keep leftover text as paragraphs.
  const chunkRe =
    /<(h([1-6])|p|ul|ol|blockquote|pre|figure|div)(\s[^>]*)?>([\s\S]*?)<\/\1>|<(img)(\s[^>]*?)\/?>/gi;

  let lastIndex = 0;
  let m: RegExpExecArray | null;
  const pushPlain = (slice: string) => {
    const plain = stripTags(slice);
    if (plain) blocks.push({ type: 'paragraph', children: parseInlines(slice) });
  };

  while ((m = chunkRe.exec(cleaned))) {
    if (m.index > lastIndex) {
      pushPlain(cleaned.slice(lastIndex, m.index));
    }
    lastIndex = m.index + m[0].length;

    // Lone <img ...>
    if ((m[5] || '').toLowerCase() === 'img') {
      const tag = m[0];
      const src = attr(tag, 'src');
      if (src) {
        blocks.push(imageAsParagraph(src, attr(tag, 'alt')));
      }
      continue;
    }

    const tag = (m[1] || '').toLowerCase();
    const level = m[2] ? Number(m[2]) : 0;
    const inner = m[4] || '';

    if (tag.startsWith('h') && level >= 1 && level <= 6) {
      blocks.push({
        type: 'heading',
        level: Math.min(6, Math.max(1, level)) as number,
        children: parseInlines(inner),
      });
      continue;
    }

    if (tag === 'p' || tag === 'div') {
      // Nested images inside figure/div — avoid invalid Blocks image nodes
      if (/<img[\s>]/i.test(inner)) {
        const imgTag = inner.match(/<img\b[^>]*>/i)?.[0] || '';
        const src = attr(imgTag, 'src');
        if (src) {
          blocks.push(imageAsParagraph(src, attr(imgTag, 'alt')));
        }
        const rest = stripTags(inner.replace(/<img\b[^>]*>/gi, ''));
        if (rest) blocks.push({ type: 'paragraph', children: parseInlines(rest) });
        continue;
      }
      const kids = parseInlines(inner);
      if (kids.some((n) => (n.type === 'text' ? n.text.trim() : true))) {
        blocks.push({ type: 'paragraph', children: kids });
      }
      continue;
    }

    if (tag === 'ul' || tag === 'ol') {
      blocks.push({
        type: 'list',
        format: tag === 'ol' ? 'ordered' : 'unordered',
        children: listItems(inner),
      });
      continue;
    }

    if (tag === 'blockquote') {
      blocks.push({ type: 'quote', children: parseInlines(inner) });
      continue;
    }

    if (tag === 'pre') {
      blocks.push({
        type: 'code',
        children: [textNode(stripTags(inner))],
      });
      continue;
    }

    if (tag === 'figure') {
      const imgTag = inner.match(/<img\b[^>]*>/i)?.[0] || '';
      const src = attr(imgTag, 'src');
      if (src) {
        const alt =
          attr(imgTag, 'alt') ||
          stripTags(inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1] || '');
        blocks.push(imageAsParagraph(src, alt));
      } else {
        const plain = stripTags(inner);
        if (plain) blocks.push({ type: 'paragraph', children: parseInlines(inner) });
      }
      continue;
    }

    pushPlain(m[0]);
  }

  if (lastIndex < cleaned.length) {
    pushPlain(cleaned.slice(lastIndex));
  }

  if (blocks.length === 0) {
    blocks.push({ type: 'paragraph', children: parseInlines(cleaned) });
  }

  return blocks;
}

/** Format body value for the target Strapi attribute type. */
export function formatBodyForAttributeType(html: string, attrType: string | undefined): unknown {
  if (attrType === 'blocks' || attrType === 'json') {
    return htmlToBlocks(html);
  }
  return html;
}
