# wanadzhar913.github.io

Personal site and AI/ML notes, built with [Hugo](https://gohugo.io/) and the [Blowfish](https://blowfish.page/) theme.

- **Live site:** https://wanadzhar913.github.io
- **Inspiration:** [nejckorasa/nejckorasa.github.io](https://github.com/nejckorasa/nejckorasa.github.io/tree/443e9b0d06131953240920ab7fcbfa068aa9eca2)

## Stack

| Piece | Notes |
| --- | --- |
| Hugo Extended | `0.164.0` (matches [CI](.github/workflows/deploy_gh_pages.yaml)) |
| Theme | Blowfish under `themes/blowfish` |
| Comments | [Giscus](https://giscus.app/) via `layouts/partials/comments.html` |
| Deploy | GitHub Actions → GitHub Pages on push to `master` |

## Project layout

```
config/_default/     # hugo.toml, params, menus, languages
content/             # markdown posts and pages
assets/              # images and other processed assets
layouts/             # site overrides (e.g. comments partial)
themes/blowfish/     # Blowfish theme
static/              # files copied as-is to the site root
```

## Local development

### 1. Install Hugo Extended

You need the **extended** build (for Sass/Tailwind in Blowfish). Version should match CI: **0.164.0**.

**WSL 2/Linux (deb):**

```bash
HUGO_VERSION=0.164.0
wget -O /tmp/hugo.deb \
  "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb"
sudo dpkg -i /tmp/hugo.deb
hugo version
```

**Windows:**

Download the Extended zip from the [Hugo releases](https://github.com/gohugoio/hugo/releases) page and add it to your `PATH`.

### 2. Clone and run the site

```bash
git clone https://github.com/wanadzhar913/wanadzhar913.github.io.git
cd wanadzhar913.github.io

# Draft + live reload at http://localhost:1313
hugo server -D
```

Useful variants:

```bash
# Production-like build (no drafts)
hugo server

# Bind so other devices on the LAN can open the preview
hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313/
```

### 3. Build a static site locally

```bash
hugo --minify
# Output lands in ./public
```

Open `public/index.html` or serve the folder with any static file server.

## Writing a post

1. Add a markdown file under `content/posts/`, e.g. `content/posts/my-post.md`.
2. Include front matter (title, date, tags, draft, etc.).
3. Run `hugo server -D` and preview at http://localhost:1313.
4. Set `draft: false` when ready, commit, and push to `master` for GitHub Pages deploy.

Quick scaffold (optional):

```bash
hugo new content/posts/my-post.md
```

## Comments (Giscus)

Comments are wired in `layouts/partials/comments.html` and enabled with `showComments = true` in `config/_default/params.toml`.

To reconnect or change the discussion repo, re-run the setup wizard at https://giscus.app/ and update the `data-*` attributes in that partial.

## Deploy

Pushes to `master` trigger [.github/workflows/deploy_gh_pages.yaml](.github/workflows/deploy_gh_pages.yaml), which builds with Hugo Extended and publishes to GitHub Pages. Pull requests only run the build job.
