import { PageSeo } from '../components/PageSeo';
import { ItemLink } from '../components/Timeline';
import { SITE_URL } from '../constants/site';
import { talkItems } from '../data/portfolio';

export function Talks() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-20">
      <PageSeo title="Talks" description="Conference talks on open-source speech recognition for Bahasa Malaysia." canonical={`${SITE_URL}/talks`} />
      <header className="mb-12">
        <h1 className="mb-4 text-2xl font-medium dark:text-white">Talks</h1>
      </header>
      <div className="space-y-10">
        {talkItems.map((talk) => (
          <article key={talk.title}>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-[15px] font-medium text-gray-900 dark:text-gray-100">{talk.title}</h2>
              <span className="text-xs text-gray-500">{talk.date}</span>
            </div>
            <p className="mb-2 text-[13px] text-gray-500">{talk.venue}</p>
            <p className="mb-3 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">{talk.description}</p>
            <div className="flex gap-4">
              {talk.links.map((l) => (
                <ItemLink key={l.href} href={l.href} className="text-xs text-gray-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
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
