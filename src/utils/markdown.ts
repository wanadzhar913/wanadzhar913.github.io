import MarkdownIt from 'markdown-it';
import katex from '@vscode/markdown-it-katex';

// Keep in sync with scripts/lib/markdown.mjs (used for prerendering).
export function createMarkdown() {
  const md = new MarkdownIt({ html: true, breaks: true, linkify: true, typographer: true });
  const plugin = (katex as unknown as { default?: typeof katex }).default ?? katex;
  md.use(plugin);
  return md;
}
