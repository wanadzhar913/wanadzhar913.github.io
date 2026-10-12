#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { join } from 'path';
import { loadPosts, escapeHtml, DIST_DIR, SITE_URL, AUTHOR_NAME } from './lib/posts.mjs';

const posts = loadPosts();
const items = posts
  .map(
    (p) => `    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeHtml(p.description)}</description>
    </item>`,
  )
  .join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${AUTHOR_NAME}</title>
    <link>${SITE_URL}/</link>
    <description>Navigating Dilemmas &amp; Deficiencies</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
writeFileSync(join(DIST_DIR, 'index.xml'), xml);
console.log('RSS written');
