export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectItem {
  type: 'project' | 'job';
  title: string;
  date: string;
  description: string;
  role?: string;
  link?: string;
  isNew?: boolean;
  bulletPoints?: string[];
  stack?: string[];
  links?: ProjectLink[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  description: string;
  tag: 'Tech' | 'Life' | 'Other';
  isNew?: boolean;
}

export interface BlogFrontmatter {
  title: string;
  date: string | Date;
  tag: 'Tech' | 'Life' | 'Other';
  description: string;
}
