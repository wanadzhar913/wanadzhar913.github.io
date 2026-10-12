import { PageSeo } from '../components/PageSeo';
import { Timeline } from '../components/Timeline';
import { SITE_URL } from '../constants/site';
import { projectItems } from '../data/portfolio';

export function Projects() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-20">
      <PageSeo title="Projects" description="Side projects in LLM serving, agents, MCP, NLP and model benchmarking." canonical={`${SITE_URL}/projects`} />
      <header className="mb-12">
        <h1 className="mb-3 text-2xl font-medium dark:text-white">Projects</h1>
        <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
          Side projects and experiments: LLM serving, agents, MCP servers, NLP and benchmarking.
        </p>
      </header>
      <Timeline items={projectItems} />
    </div>
  );
}
