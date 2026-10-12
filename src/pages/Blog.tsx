import { Link } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { SITE_URL } from '../constants/site';
import { formatDate, getAllPosts } from '../utils/blog';

export function Blog() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-20">
      <PageSeo title="Blog" description="Debugging notes and learnings from AI/ML side projects and open source contributions." canonical={`${SITE_URL}/blog`} />
      <header className="mb-16">
        <h1 className="mb-4 text-2xl font-medium dark:text-white">Blog</h1>
        <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-300">
          Documenting the debugging and learnings from my AI/ML side projects and open source contributions.
        </p>
      </header>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {posts.map((post) => (
          <article key={post.slug} className="group py-6 first:pt-0">
            <Link
              to={`/blog/${post.slug}`}
              className="-m-4 block rounded-lg p-4 transition-all group-hover:bg-white group-hover:shadow-sm dark:group-hover:bg-[#242424]"
            >
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center self-start rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {post.tag}
                </span>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-[15px] font-medium transition-colors group-hover:text-blue-600 dark:text-gray-200 dark:group-hover:text-blue-400">
                    {post.title}
                    {post.isNew && (
                      <span className="ml-2 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-medium leading-none text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                        NEW
                      </span>
                    )}
                  </h2>
                  <time className="shrink-0 text-sm text-gray-500 dark:text-gray-400">{formatDate(post.date)}</time>
                </div>
                <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">{post.description}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
