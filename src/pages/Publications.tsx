import { PageSeo } from '../components/PageSeo';
import { ItemLink } from '../components/Timeline';
import { SITE_URL } from '../constants/site';
import { publicationItems } from '../data/portfolio';

export function Publications() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-20">
      <PageSeo title="Papers" description="Publications: a safe-for-work text classifier for Malaysian language content." canonical={`${SITE_URL}/publications`} />
      <header className="mb-12">
        <h1 className="mb-4 text-2xl font-medium dark:text-white">Papers</h1>
      </header>
      <div className="space-y-10">
        {publicationItems.map((pub) => (
          <article key={pub.title}>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-[15px] font-medium text-gray-900 dark:text-gray-100">{pub.title}</h2>
              <span className="text-xs text-gray-500">
                {pub.venue}, {pub.year}
              </span>
            </div>
            <p className="mb-2 text-[13px] text-gray-500">{pub.authors}</p>
            <p className="mb-3 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">{pub.abstract}</p>
            <div className="flex gap-4">
              {pub.links.map((l) => (
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
