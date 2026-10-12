import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Comments } from '../components/Comments';
import { PageSeo } from '../components/PageSeo';
import { postUrl } from '../constants/site';
import { formatDate, getPostBySlug } from '../utils/blog';

export function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="mx-auto max-w-2xl px-6 pb-16">
      <PageSeo title={post.title} description={post.description} canonical={postUrl(post.slug)} ogType="article" />

      <header className="mb-12 border-b border-gray-100 pb-8 dark:border-gray-800">
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200"
        >
          <ArrowLeft size={14} /> Blog
        </Link>
        <h1 className="mb-3 text-3xl font-medium leading-tight text-gray-900 dark:text-white">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <time>{formatDate(post.date)}</time>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {post.tag}
          </span>
        </div>
      </header>

      <article className="prose-post" dangerouslySetInnerHTML={{ __html: post.content }} />
      <Comments />
    </div>
  );
}
