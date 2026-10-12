#!/usr/bin/env node
/**
 * Pre-renders blog routes into static HTML (meta tags + article body) so crawlers
 * and link-preview bots see real content, and writes redirect stubs for the old
 * Hugo /posts/<slug>/ URLs.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { loadPosts, escapeHtml, DIST_DIR, SITE_URL, AUTHOR_NAME, DEFAULT_OG_IMAGE } from './lib/posts.mjs';

const indexHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf8');

function writePage(relPath, html) {
  const dir = join(DIST_DIR, relPath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

function pageFor(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | ${AUTHOR_NAME}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    image: DEFAULT_OG_IMAGE,
    author: { '@type': 'Person', name: AUTHOR_NAME, url: SITE_URL },
    articleSection: post.tag,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  const meta = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(post.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(post.description)}" />
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}" />
    <meta property="article:published_time" content="${post.date}" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;

  const staticBody = `<main class="mx-auto max-w-2xl px-6 py-16"><h1>${escapeHtml(post.title)}</h1><article class="prose-post">${post.html}</article></main>`;

  return indexHtml
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta name="description"[^>]*>/i, '')
    .replace('</head>', `${meta}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticBody}</div>`);
}

const posts = loadPosts();
for (const post of posts) {
  writePage(join('blog', post.slug), pageFor(post));

  // Old Hugo URL -> new URL
  const target = `${SITE_URL}/blog/${post.slug}`;
  writePage(
    join('posts', post.slug),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>
<link rel="canonical" href="${target}"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=/blog/${post.slug}"></head>
<body><a href="/blog/${post.slug}">Moved to ${escapeHtml(post.title)}</a></body></html>`,
  );
}
writePage(
  'posts',
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>
<link rel="canonical" href="${SITE_URL}/blog"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=/blog"></head><body><a href="/blog">Blog</a></body></html>`,
);
console.log(`Prerendered ${posts.length} post(s)`);
