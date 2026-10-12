export const SITE_URL = 'https://wanadzhar913.github.io';
export const SITE_NAME = 'Faiq Adzlan';
export const SITE_TAGLINE = 'Navigating Dilemmas & Deficiencies';
export const AUTHOR_NAME = 'Faiq Adzlan';
export const DEFAULT_DESCRIPTION =
  'Faiq Adzlan, AI/ML software engineer at Sandisk working on enterprise RAG and VLM inference. Open-source contributor to Ray and vLLM llm-compressor.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;
export const RESUME_URL = '/resume.pdf';
export const GA_ID = 'G-R86690PBWG';

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}
