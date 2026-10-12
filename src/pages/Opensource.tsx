import { PageSeo } from '../components/PageSeo';
import { ItemLink } from '../components/Timeline';
import { SITE_URL } from '../constants/site';
import { opensourceHighlights } from '../data/portfolio';

export function Opensource() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-20">
      <PageSeo title="Open Source" description="Open-source contributions to Ray, vLLM llm-compressor and Malaysia-AI." canonical={`${SITE_URL}/opensource`} />
      <header className="mb-16">
        <h1 className="mb-4 text-2xl font-medium dark:text-white">Open Source</h1>
        <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-300">
          Contributions to model-serving and compression infrastructure: Ray, vLLM llm-compressor, and Malaysia-AI.
        </p>
      </header>

      <div className="space-y-6">
        {opensourceHighlights.map((item) => (
          <article key={item.project} className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-gray-700">
            <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">{item.project}</h2>
            <p className="mb-4 text-[15px] text-gray-700 dark:text-gray-300">{item.summary}</p>
            {item.bullets && (
              <ul className="mb-4 space-y-3">
                {item.bullets.map((b) => (
                  <li key={b.href} className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                    <span
                      className={`mr-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                        b.status === 'open'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {b.status === 'open' ? 'Open' : 'Merged'}
                    </span>
                    <ItemLink href={b.href} className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400">
                      {b.label}
                    </ItemLink>
                    <span> — {b.text}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap gap-4">
              {item.links.map((l) => (
                <ItemLink key={l.href} href={l.href} className="text-sm text-blue-600 underline-offset-2 hover:underline dark:text-blue-400">
                  {l.label}
                </ItemLink>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
