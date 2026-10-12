# wanadzhar913.github.io

Personal site and AI/ML notes, built with React, Vite and Tailwind. The layout is modelled on
[kriyanshii/kriyanshii.github.io](https://github.com/kriyanshii/kriyanshii.github.io).

- **Live site:** https://wanadzhar913.github.io

## Stack

| Piece | Notes |
| --- | --- |
| Framework | React 18 + Vite 5 + TypeScript, react-router-dom 7 |
| Styling | Tailwind 3, dark by default (`class` strategy), toggle in the nav |
| Posts | Markdown in `src/content/blog/`, rendered with markdown-it + KaTeX (`$…$`, `$$…$$`) |
| Comments | [Giscus](https://giscus.app/), `src/components/Comments.tsx` |
| Deploy | GitHub Actions → GitHub Pages on push to `master` |

## Layout

```
src/content/blog/    # blog posts (frontmatter: title, date, tag, description)
src/data/portfolio.ts# experience, projects, open source, talks, papers
src/pages/           # one component per route
scripts/             # post-build: prerender posts, sitemap, RSS
public/              # static files (favicons, og image, resume.pdf)
```

## Development

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # tsc + vite build + prerender + sitemap + RSS into dist/
npm run preview
npm run lint
```

## Writing a post

Add `src/content/blog/<slug>.md`:

```markdown
---
title: "Post title"
description: "One-line summary"
date: 2026-07-19
tag: Tech   # Tech | Life | Other
---
```

The post is served at `/blog/<slug>`. The build also writes `/posts/<slug>/` redirects for the old Hugo URLs.

## Resume

Put the PDF at `public/resume.pdf`; the nav links to `/resume.pdf`.
