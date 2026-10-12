import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectItem } from '../types';

export function ItemLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

interface TimelineProps {
  items: ProjectItem[];
  title?: string;
  badge?: ReactNode;
}

export function Timeline({ items, title, badge }: TimelineProps) {
  return (
    <section className="mb-12">
      {(title || badge) && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {title && (
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{title}</h2>
          )}
          {badge}
        </div>
      )}

      <div className="relative">
        <div className="absolute bottom-2 left-[4px] top-2 w-px bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-8">
          {items.map((item) => {
            const statusLabel = item.isNew ? (item.type === 'job' ? 'current' : 'active') : null;
            const hasLinks = Boolean(item.links?.length);
            const body = (
              <>
                <div className="mb-1.5 flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    {statusLabel && (
                      <span className="shrink-0 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {statusLabel}
                      </span>
                    )}
                    {item.link && hasLinks ? (
                      <ItemLink
                        href={item.link}
                        className="text-[15px] font-medium leading-snug text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                      >
                        {item.title}
                      </ItemLink>
                    ) : (
                      <h3 className="text-[15px] font-medium leading-snug text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>
                    )}
                  </div>
                  <p className="shrink-0 pt-0.5 text-xs text-gray-500">{item.date}</p>
                </div>

                {item.role && <p className="mb-2 text-[13px] text-gray-600 dark:text-gray-400">{item.role}</p>}

                {item.stack && item.stack.length > 0 && (
                  <div className="mb-2.5 flex flex-wrap gap-1.5">
                    {item.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-[#252525] dark:text-blue-200/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.description && !item.bulletPoints?.length && (
                  <p className="mb-2.5 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                )}

                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul className="space-y-1.5">
                    {item.bulletPoints.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400"
                      >
                        <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {hasLinks && (
                  <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
                    {item.links!.map((link) => (
                      <ItemLink
                        key={link.href}
                        href={link.href}
                        className="text-xs text-gray-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {link.label}
                      </ItemLink>
                    ))}
                  </div>
                )}
              </>
            );

            const wrapWholeCard = Boolean(item.link && !hasLinks);

            return (
              <article key={`${item.title}-${item.date}`} className="group relative pl-7">
                <div
                  className={`absolute left-0 top-[8px] h-2 w-2 rounded-full border-2 ${
                    item.isNew
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 bg-[#fafafa] dark:border-gray-600 dark:bg-[#1a1a1a]'
                  }`}
                />
                {wrapWholeCard ? (
                  <ItemLink
                    href={item.link!}
                    className="block transition-colors group-hover:[&_h3]:text-blue-600 dark:group-hover:[&_h3]:text-blue-400"
                  >
                    {body}
                  </ItemLink>
                ) : (
                  body
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
