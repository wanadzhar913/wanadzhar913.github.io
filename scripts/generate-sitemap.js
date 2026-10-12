#!/usr/bin/env node
import { writeFileSync } from 'fs';
import { join } from 'path';
import { loadPosts, DIST_DIR, SITE_URL } from './lib/posts.mjs';

const pages = ['/', '/blog', '/projects', '/opensource', '/talks', '/publications'];
const posts = loadPosts();
const urls = [
  ...pages.map((p) => ({ loc: `${SITE_URL}${p}` })),
  ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date })),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST_DIR, 'sitemap.xml'), xml);
writeFileSync(join(DIST_DIR, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Sitemap: ${urls.length} urls`);
