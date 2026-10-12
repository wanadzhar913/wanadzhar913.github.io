import frontMatter from 'front-matter';
import type { BlogFrontmatter, BlogPost } from '../types';
import { createMarkdown } from './markdown';

const files = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });
const md = createMarkdown();

function normalizeDate(value: string | Date): string {
  return (value instanceof Date ? value.toISOString() : String(value)).split('T')[0];
}

function stripLeadingH1(body: string) {
  return body.replace(/^\s*#\s+.+\n/, '');
}

export function getAllPosts(): BlogPost[] {
  return Object.entries(files)
    .map(([filepath, content]) => {
      const slug = (filepath.split('/').pop() ?? '').replace(/\.md$/, '');
      const { attributes, body } = frontMatter<BlogFrontmatter>(content as string);
      return {
        slug,
        title: attributes.title,
        date: normalizeDate(attributes.date),
        content: md.render(stripLeadingH1(body)),
        description: attributes.description,
        tag: attributes.tag,
        isNew: new Date(normalizeDate(attributes.date)).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
      } satisfies BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
