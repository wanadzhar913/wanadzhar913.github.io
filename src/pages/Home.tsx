import { ArrowRight, Github, Linkedin, Rss, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { Timeline } from '../components/Timeline';
import { DEFAULT_DESCRIPTION, SITE_TAGLINE, SITE_URL, AUTHOR_NAME } from '../constants/site';
import { opensourceHighlights, projectItems, talkItems, workItems } from '../data/portfolio';
import { getAllPosts } from '../utils/blog';

const iconClass = 'text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200';

function HuggingFaceIcon() {
  return <span className="text-[15px] leading-none">🤗</span>;
}

export function Home() {
  const latest = getAllPosts().find((p) => p.isNew) ?? null;
  const openPrs = opensourceHighlights.flatMap((h) => h.bullets ?? []).filter((b) => b.status === 'open').length;

  return (
    <div className="mx-auto max-w-2xl px-6 pb-20">
      <PageSeo title={AUTHOR_NAME} description={DEFAULT_DESCRIPTION} canonical={`${SITE_URL}/`} />

      <header className="mb-10">
        <h1 className="mb-2 font-serif text-3xl text-gray-900 dark:text-white">Faiq Adzlan</h1>
        <p className="mb-1 text-[13px] italic text-gray-500">{SITE_TAGLINE}</p>
        <p className="mb-4 text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
          AI/ML software engineer at Sandisk, building enterprise RAG and VLM inference (vLLM on H200s). I started in
          data science and pivoted to the backend. Interested in model inference optimization and distributed systems,
          and I contribute to Ray and vLLM llm-compressor.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/wanadzhar913" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="https://www.linkedin.com/in/wan-adzhar-faiq-adzlan-19a27baa/" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="https://x.com/FaiqAdzlan" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="X">
            <Twitter size={16} />
          </a>
          <a href="https://huggingface.co/wanadzhar913" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Hugging Face">
            <HuggingFaceIcon />
          </a>
          <a href="/index.xml" className={iconClass} aria-label="RSS">
            <Rss size={16} />
          </a>
        </div>
      </header>

      {latest && (
        <Link
          to={`/blog/${latest.slug}`}
          className="group mb-10 flex items-start justify-between gap-4 rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3.5 transition-colors hover:border-amber-300 dark:border-amber-900/50 dark:bg-amber-950/30"
        >
          <div className="min-w-0">
            <span className="mb-1.5 inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-medium leading-none text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
              NEW
            </span>
            <p className="text-[14px] font-medium text-gray-900 dark:text-gray-100">{latest.title}</p>
            <p className="mt-1 line-clamp-2 text-[13px] text-gray-600 dark:text-gray-400">{latest.description}</p>
          </div>
          <ArrowRight size={16} className="mt-1 shrink-0 text-amber-700/70 dark:text-amber-300/70" />
        </Link>
      )}

      <Timeline
        items={workItems}
        title="experience"
        badge={
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Open to inference &amp; distributed systems roles
          </span>
        }
      />

      <section className="mb-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">open source</h2>
          <Link to="/opensource" className="text-xs text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200">
            View all
          </Link>
        </div>
        <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
          Merged work in <a className="hover:text-blue-600 dark:hover:text-blue-400" href="https://github.com/ray-project/ray/commits/master/?author=wanadzhar913" target="_blank" rel="noopener noreferrer">Ray</a>{' '}
          (Serve, Data, Serve LLM) and{' '}
          <a className="hover:text-blue-600 dark:hover:text-blue-400" href="https://github.com/vllm-project/llm-compressor/commits/main/?author=wanadzhar913" target="_blank" rel="noopener noreferrer">vLLM llm-compressor</a>
          , with {openPrs} Ray pull requests in review, including locality-aware routing for Serve.
        </p>
      </section>

      <Timeline items={projectItems.slice(0, 4)} title="projects" />
      <div className="-mt-6 mb-12">
        <Link to="/projects" className="text-xs text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200">
          All projects
        </Link>
      </div>

      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">talks</h2>
          <Link to="/talks" className="text-xs text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-200">
            View all
          </Link>
        </div>
        {talkItems.slice(0, 1).map((talk) => (
          <article key={talk.title}>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[15px] font-medium text-gray-900 dark:text-gray-100">{talk.title}</h3>
              <span className="text-xs text-gray-500">{talk.date}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">{talk.venue}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
