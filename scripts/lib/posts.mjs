import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import frontMatter from 'front-matter';
import MarkdownIt from 'markdown-it';
import katexPlugin from '@vscode/markdown-it-katex';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(__dirname, '..', '..');
export const DIST_DIR = join(ROOT, 'dist');
export const SITE_URL = 'https://wanadzhar913.github.io';
export const AUTHOR_NAME = 'Faiq Adzlan';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;

// Keep in sync with src/utils/markdown.ts
const md = new MarkdownIt({ html: true, breaks: true, linkify: true, typographer: true });
md.use(katexPlugin.default ?? katexPlugin);

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeDate(value) {
  return (value instanceof Date ? value.toISOString() : String(value)).split('T')[0];
}

export function loadPosts() {
  const dir = join(ROOT, 'src', 'content', 'blog');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { attributes, body } = frontMatter(readFileSync(join(dir, file), 'utf8'));
      return {
        slug: file.replace(/\.md$/, ''),
        title: attributes.title,
        description: attributes.description,
        tag: attributes.tag,
        date: normalizeDate(attributes.date),
        html: md.render(body.replace(/^\s*#\s+.+\n/, '')),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
