import type { ProjectItem } from '../types';

export interface TalkItem {
  title: string;
  description: string;
  date: string;
  venue: string;
  links: { label: string; href: string }[];
}

export interface PublicationItem {
  title: string;
  authors: string;
  venue: string;
  year: string;
  abstract: string;
  links: { label: string; href: string }[];
}

export interface OpensourceBullet {
  status: 'merged' | 'open';
  label: string;
  text: string;
  href: string;
}

export interface OpensourceHighlight {
  project: string;
  summary: string;
  bullets?: OpensourceBullet[];
  links: { label: string; href: string }[];
}

export const workItems: ProjectItem[] = [
  {
    type: 'job',
    title: 'Sandisk',
    role: 'AI/ML Software Engineer',
    date: 'May 2025 — Present',
    description: 'Enterprise RAG and model inference engineering (Vision Language Models), Penang, Malaysia.',
    isNew: true,
    bulletPoints: [
      'Architected a RAG platform for engineering document ingestion: 100k+ multi-format docs with Airflow-orchestrated pipelines and document versioning.',
      'Deployed and tuned vLLM on k3s on an H200 cluster for VLM inference; optimised serving and Docling pipelines to cut p50 document-processing latency from ~4 min to ~45 sec (8x).',
      'Built a LangGraph supervisor agent with hybrid-search (BM25 + dense) subagents, and a transactional outbox for document ingest (API → RabbitMQ → workers without dual-write loss).',
      'Sole developer of a CP-SAT wafer-splitting allocation app, delivering ~$300k annual cost and planner-time savings.',
    ],
    stack: ['vLLM', 'PyTorch', 'Docling', 'LangGraph', 'RabbitMQ', 'Airflow', 'k3s', 'FastAPI'],
  },
  {
    type: 'job',
    title: 'Maybank',
    role: 'Data Scientist',
    date: 'Feb 2024 — Apr 2025',
    description: 'Data science for retail banking.',
    bulletPoints: [
      'Detected bonuses credited into accounts (text classification, Prophet) and automated a Dataiku push-notification pipeline: 22% test/control uplift and MYR18 million ADB growth.',
      'Engineered 100+ features for Auto-Loan/Hire Purchase, lifting recommender precision by 20% (target-as-a-feature LightGBM).',
      'Customer segmentation for the MAE Goal Based Investing feature, driving ~MYR5 million AUM in its first two months.',
    ],
    stack: ['Python', 'LightGBM', 'Prophet', 'Dataiku'],
  },
  {
    type: 'job',
    title: 'Malaysia-AI',
    role: 'Open Source Contributor',
    date: 'Aug 2023 — Apr 2025',
    description: 'Open-source NLP and speech work for Bahasa Malaysia.',
    link: 'https://github.com/malaysia-ai',
    bulletPoints: [
      'Prepared datasets and fine-tuning scripts for a Malaysian Mistral-based reranker (64M, 191M and 474M variants, trained on 4x A100s and included in Malaya).',
      'Trained an LLM2Vec classifier for the safe-for-work text classifier; the paper reached #2 Paper of the Day on Hugging Face.',
      'Contributed 400,000+ scraped webpages, and spoke at Cloud Native AI Day Malaysia (Apr 2025).',
    ],
    stack: ['PyTorch', 'DeepSpeed', 'Hugging Face', 'Weights & Biases'],
  },
  {
    type: 'job',
    title: 'INVOKE',
    role: 'Senior Data Scientist (previously Data Scientist, Commercial & Research)',
    date: 'Sep 2021 — Jan 2024',
    description: 'Data science and market research for digital marketing and recruitment products.',
    bulletPoints: [
      'Productionized an LLM resume-parser API on AWS Lambda that outperformed a GPT-4 alternative on latency and cost.',
      'Built a predictive-maintenance PoC accepted into a final proposal for a federal hospital client (potential reach: 80 hospitals).',
      'Led the PRN election simulation dashboard (226/245 seats predicted accurately); mentored 2 interns.',
    ],
    stack: ['Python', 'FastAPI', 'Azure Databricks', 'Streamlit', 'R'],
  },
];

export const projectItems: ProjectItem[] = [
  {
    type: 'project',
    title: 'ElectionData.MY MCP Server',
    date: 'Open source',
    description:
      'A production-grade MCP server that lets an LLM answer questions about historical Malaysian electoral results, built on ElectionData.MY.',
    link: 'https://github.com/wanadzhar913/electiondata-my-mcp',
    stack: ['Python', 'MCP'],
  },
  {
    type: 'project',
    title: 'LLMem GPU VRAM Calculator',
    date: 'Open source',
    description: 'A GPU VRAM calculator loosely based on the LLMem paper (Kim et al., 2024).',
    link: 'https://github.com/wanadzhar913/llmem-gpu-vram-calculator',
    stack: ['TypeScript'],
  },
  {
    type: 'project',
    title: 'OpenClaw SLM Coding Benchmarks',
    date: 'Open source',
    description: 'Benchmarks, profiling and optimization experiments for OpenClaw coding agents running on small language models.',
    link: 'https://github.com/wanadzhar913/openclaw-slm-coding-benchmarks',
    stack: ['Python'],
  },
  {
    type: 'project',
    title: 'Transport Law Deep Agent',
    date: 'Work in progress',
    description: 'A team of Malaysian road transport legal research agents.',
    link: 'https://github.com/wanadzhar913/transport-law-deepagent-aks',
    stack: ['Python', 'LangGraph', 'AKS'],
  },
  {
    type: 'project',
    title: 'Bank Transaction Classification (DeBERTaV3)',
    date: 'Open source',
    description:
      'Fine-tunes DeBERTaV3 to predict bank transaction categories, on text alone and on text combined with categorical/datetime features.',
    link: 'https://github.com/wanadzhar913/bank-transaction-classification-debertav3',
    stack: ['PyTorch', 'DeBERTaV3'],
  },
  {
    type: 'project',
    title: 'Scraping Projects',
    date: 'Open source',
    description: 'A collection of websites I have scraped, for open-source contributions and personal use.',
    link: 'https://github.com/wanadzhar913/faiq-scraping-projects',
    stack: ['Python'],
  },
];

export const talkItems: TalkItem[] = [
  {
    title: 'Breaking Language Barriers: Developing Speech Recognition for Bahasa Malaysia and Dialects',
    description:
      "One of three speakers at Microsoft Malaysia's Cloud Native AI Day, presenting our open-source project: a deep dive into developing speech recognition for Bahasa Malaysia and its many dialects.",
    date: 'April 2025',
    venue: 'Cloud Native AI Day, Microsoft Sdn. Bhd., Kuala Lumpur, Malaysia',
    links: [
      {
        label: 'Slides',
        href: 'https://docs.google.com/presentation/d/1LUR0Ar05Ddsj6o7tiHaLE6fXm5HZT2Gx8m_NuhEhyRs/edit?usp=sharing',
      },
      {
        label: 'Event',
        href: 'https://www.linkedin.com/posts/sujaypillai_excited-to-share-list-of-speakers-for-our-activity-7313123561148141569-QHUq',
      },
    ],
  },
];

export const publicationItems: PublicationItem[] = [
  {
    title:
      'Adapting Safe-for-Work Classifier for Malaysian Language Text: Enhancing Alignment in LLM-Ops Framework',
    authors: 'Aisyah Razak, Ariff Nazhan, Kamarul Adha, Wan Adzhar Faiq Adzlan, Mas Aisyah Ahmad, Ammar Azman',
    venue: 'arXiv',
    year: '2024',
    abstract:
      'We present a novel safe-for-work text classifier tailored specifically for Malaysian language content. By curating and annotating a first-of-its-kind dataset of Malaysian text spanning multiple content categories, we trained a classification model capable of identifying potentially unsafe material using state-of-the-art natural language processing techniques.',
    links: [
      { label: 'Paper', href: 'https://huggingface.co/papers/2407.20729' },
      { label: 'Code', href: 'https://github.com/malaysia-ai/sfw-classifier' },
    ],
  },
];

const RAY = 'https://github.com/ray-project/ray/pull';
const LLMC = 'https://github.com/vllm-project/llm-compressor/pull';

export const opensourceHighlights: OpensourceHighlight[] = [
  {
    project: 'Ray',
    summary: 'Contributions to Ray Serve, Ray Data and the Serve LLM docs, from locality-aware routing to batch-inference benchmarks.',
    bullets: [
      { status: 'open', label: '#63629', text: 'Serve [1/2]: wire locality-routing variables through the deployment config, protobuf and YAML.', href: `${RAY}/63629` },
      { status: 'open', label: '#66580', text: 'Serve [2/2]: apply per-deployment locality routing in routers, with an env fallback if unset.', href: `${RAY}/66580` },
      { status: 'open', label: '#66230', text: 'Serve LLM: docs and tests for the Anthropic Messages API via direct streaming.', href: `${RAY}/66230` },
      { status: 'merged', label: '#64504', text: 'Docs: update the vLLM embedding model example in Ray Serve LLM.', href: `${RAY}/64504` },
      { status: 'merged', label: '#64345', text: 'Serve: make gang-scheduling tests avoid handle-based placement checks.', href: `${RAY}/64345` },
      { status: 'merged', label: '#63912', text: 'Data/LLM: add vLLM engine metrics and request-latency overhead to the single-node batch benchmark.', href: `${RAY}/63912` },
      { status: 'merged', label: '#62560', text: 'Data: compute expressions for struct field_by_index.', href: `${RAY}/62560` },
    ],
    links: [
      { label: 'All merged commits', href: 'https://github.com/ray-project/ray/commits/master/?author=wanadzhar913' },
    ],
  },
  {
    project: 'vLLM / llm-compressor',
    summary: 'Model-compression tooling for vLLM: AWQ support for new architectures and faster subgraph tracing.',
    bullets: [
      { status: 'merged', label: '#2999', text: 'Speed up subgraph tracing with direct dict lookups for O(1) node-membership checks.', href: `${LLMC}/2999` },
      { status: 'merged', label: '#2770', text: 'Add AWQ model mappings for Step3p5.', href: `${LLMC}/2770` },
    ],
    links: [
      { label: 'All merged commits', href: 'https://github.com/vllm-project/llm-compressor/commits/main/?author=wanadzhar913' },
    ],
  },
  {
    project: 'Malaysia-AI',
    summary: 'Speech recognition, rerankers and a safe-for-work classifier for Bahasa Malaysia.',
    links: [
      { label: 'Speech recognition', href: 'https://github.com/malaysia-ai/speech-recognition' },
      { label: 'SFW classifier', href: 'https://github.com/malaysia-ai/sfw-classifier' },
    ],
  },
];
