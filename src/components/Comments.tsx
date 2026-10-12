import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Load Giscus once per mount, using the current theme.
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    const attrs: Record<string, string> = {
      'data-repo': 'wanadzhar913/wanadzhar913.github.io',
      'data-repo-id': 'R_kgDOTdP1SQ',
      'data-category': 'Blog',
      'data-category-id': 'DIC_kwDOTdP1Sc4DBhXD',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': theme,
      'data-lang': 'en',
    };
    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
    container.appendChild(script);
    return () => {
      container.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the widget in sync when the theme toggles.
  useEffect(() => {
    const frame = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    frame?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);

  return (
    <section className="mt-14">
      <a
        href="https://github.com/wanadzhar913"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 flex items-center justify-center gap-2 rounded-lg border border-gray-300/60 bg-gray-500/5 px-3 py-2.5 font-mono text-sm text-gray-600 transition-colors hover:border-gray-400/70 hover:bg-gray-500/10 dark:border-gray-600/50 dark:text-gray-400"
      >
        <span className="font-bold text-violet-500">$</span>
        <span className="opacity-70">open</span>
        <span>github follow --user wanadzhar913</span>
        <span className="inline-block h-[1.1em] w-[7px] animate-pulse bg-current opacity-60" />
      </a>
      <div ref={ref} />
    </section>
  );
}
