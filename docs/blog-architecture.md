# Blog Architecture

*Last updated: 13 Feb 2026*

Markdown-powered static blog using Next.js SSG. Posts are authored as `.md` files, parsed at build time, and served as static HTML.

---

## How to Add a New Blog Post

1. Create `content/blog/your-post-slug.md`
2. Add frontmatter + markdown body
3. Run `npm run build`

The post appears at `/blog/your-post-slug` and on the homepage (if within latest 4).

### Frontmatter Template

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
date: "2026-02-11"
description: "Short description for cards and SEO."
tags: ["Tag1", "Tag2"]
published: true
---

Your markdown content here...
```

### Frontmatter Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Displayed in header, cards, SEO title |
| `slug` | string | No | URL slug. Falls back to filename if omitted |
| `date` | string (YYYY-MM-DD) | Yes | Used for sorting (newest first) and display |
| `description` | string | Yes | Card text, meta description, OpenGraph |
| `tags` | string[] | Yes | YAML array. Rendered as pills in header and dots in cards |
| `published` | boolean | Yes | `false` = draft (excluded from build) |
| `coverImage` | string | No | Path to cover image (e.g. `/blog/cover.png`). Rendered in `BlogHeader` + used for OG/Twitter cards |

---

## Architecture Overview

```
content/blog/*.md              ← Markdown source (frontmatter + body)
        │
        ▼
src/lib/blog.ts                ← Server-only parsing layer
  ├── getAllPosts()             → BlogPostMeta[] (published, sorted by date desc)
  ├── getAllSlugs()             → string[] (for generateStaticParams)
  ├── getPostBySlug(slug)      → BlogPostFull | null (HTML via unified)
  └── getLatestPosts(n)        → BlogPostMeta[] (first N for homepage)
        │
        ├──▶ src/app/page.tsx              ← getLatestPosts(4) → Blog section
        ├──▶ src/app/blog/page.tsx         ← getAllPosts() → card grid
        └──▶ src/app/blog/[slug]/page.tsx  ← getPostBySlug() → full post (SSG)
```

### Data Flow

- **Homepage:** `page.tsx` calls `getLatestPosts(4)` → passes `BlogPostMeta[]` as prop to `<Blog>` section (client component for animations) → renders `BlogCard` components
- **Blog list:** `blog/page.tsx` calls `getAllPosts()` → adaptive layout: centered single card (1 post), responsive grid (2-3 posts), or bento-grid (4+ posts)
- **Blog post:** `blog/[slug]/page.tsx` calls `getPostBySlug(slug)` → gradient hero header (extends behind navbar) → `BlogHeader` → glass container with `<article>` + `ReadingProgress` bar

---

## Markdown Rendering Pipeline

Defined in `src/lib/blog.ts`, runs at build time only (zero client-side cost).

```
remark-parse                    ← Markdown → MDAST
  → remark-rehype               ← MDAST → HAST (allowDangerousHtml: true)
    → rehype-raw                 ← Re-parses raw HTML nodes into proper HAST
      → rehype-slug              ← Adds id attributes to headings
        → rehype-autolink-headings ← Wraps headings in <a> links (behavior: 'wrap')
          → rehype-pretty-code   ← Syntax highlighting via Shiki (theme: one-dark-pro)
            → rehype-stringify    ← HAST → HTML string
```

`rehype-raw` is required for raw HTML in markdown (callout boxes, stat blocks, comparison grids, etc.) to render. Without it, raw HTML nodes are silently dropped.

### Exported Utilities

| Function | Returns | Purpose |
|----------|---------|---------|
| `extractHeadings(html)` | `BlogHeading[]` | Regex-extracts `<h2>` ids and text from rendered HTML for the TOC sidebar |

### Dependencies (all build-time only)

| Package | Purpose |
|---------|---------|
| `gray-matter` | Parse YAML frontmatter from .md |
| `unified` + `remark-parse` + `remark-rehype` + `rehype-stringify` | Markdown → HTML pipeline |
| `rehype-raw` | Parse raw HTML in markdown into proper HAST nodes |
| `rehype-pretty-code` | Syntax highlighting (Shiki engine) |
| `rehype-slug` + `rehype-autolink-headings` | Heading IDs + clickable anchors |
| `reading-time` | Auto-compute read time from word count |

---

## Types

Defined in `src/types/data.ts`:

```typescript
interface BlogPostMeta {       // Cards, list page, homepage
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;            // Auto-computed by reading-time
  tags: string[];
  coverImage?: string;
  published: boolean;
}

interface BlogPostFull extends BlogPostMeta {
  content: string;             // Rendered HTML string from unified pipeline
}
```

---

## Components

| Component | File | Server/Client | Purpose |
|-----------|------|---------------|---------|
| `BlogHeader` | `src/components/blog/BlogHeader.tsx` | Server | Title (6xl), description, formatted date, read time, tag pills, cover image (if `coverImage` set), gradient divider |
| `TableOfContents` | `src/components/blog/TableOfContents.tsx` | Client | Sticky sidebar TOC on `xl:` screens. `IntersectionObserver` highlights active `<h2>`. Hidden below `xl` breakpoint |
| `ReadingProgress` | `src/components/blog/ReadingProgress.tsx` | Client | 3px red gradient progress bar fixed at viewport top. Tracks scroll through `<article>` element using `scaleX` transform |
| `BlogCard` | `src/components/ui/BlogCard.tsx` | Server | `<Link>` card to `/blog/[slug]`. `featured` prop controls bento size + min-height. Formats dates via `toLocaleDateString` |
| `Blog` (section) | `src/components/sections/Blog.tsx` | Client | Homepage section. Accepts `posts: BlogPostMeta[]` prop. Featured layout (1 large + 3 small) if ≥4 posts, flat grid otherwise. "View all posts →" link |

---

## Routes & SEO

| Route | File | Rendering | Metadata |
|-------|------|-----------|----------|
| `/blog` | `src/app/blog/page.tsx` | Static | Static export: `title: "Blog \| Abhay Rana"` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | SSG | `generateMetadata()`: per-post title, description, canonical URL, OpenGraph (type: article, publishedTime, image from `coverImage`), Twitter `summary_large_image` card |

`generateStaticParams()` in `[slug]/page.tsx` calls `getAllSlugs()` to pre-build all published posts at build time.

**Next.js 16 / React 19 note:** `params` is a `Promise` — always `await params` in both `generateMetadata` and page components.

---

## Styling

Blog post body uses `.prose-blog` class in `src/app/globals.css`:

- Text: `#d4d4d8` (zinc-300), line-height 1.8
- Headings: `#fafafa`, bold, scaled sizes (h1 → h4). H2 has red bottom border accent
- Strong text: `#fafafa`, weight 700
- Links: `#ef4444` (red accent), underline on hover
- Code blocks: `#111111` bg, `var(--font-mono)`, rounded-xl, border. List bullet leak fixed (`:has()` hides markers for `li` containing `pre`)
- Inline code: `#f87171` text, red-tinted bg
- Lists: red markers via `::marker`
- Blockquote: red left border, italic
- HR: gradient divider (transparent → red → transparent)
- rehype-pretty-code: `[data-rehype-pretty-code-figure]` wrapped with margin, border-radius, overflow hidden. `[data-line]`, `[data-highlighted-line]` for line highlighting

### Visual blog components (raw HTML in markdown)

These CSS classes style raw HTML blocks inside `.prose-blog`. Enabled by `rehype-raw`.

| Class | Purpose |
|-------|---------|
| `.callout`, `.callout-tldr`, `.callout-tip`, `.callout-warning`, `.callout-key` | Colored info boxes with left border accent (red/green/amber/blue) |
| `.comparison`, `.comparison-card`, `.comparison-before`, `.comparison-after` | Side-by-side grid cards (red "before" / green "after") |
| `.stat-grid`, `.stat-block`, `.stat-number`, `.stat-label` | 3-column stat highlights with big red numbers |
| `.blog-meme`, `.meme-caption` | Styled blog images with italic caption |
| `.pull-quote` | Large highlighted statement with red left border |
| `.section-break` | Styled divider between major sections |
| `.badge-row`, `.github-cta` | shields.io badge row + red CTA button |

### Blog post page layout

- Gradient hero area extends behind navbar using `-mt-16 pt-16` trick (no gap between navbar and glow)
- **Unified container** `max-w-[1000px] xl:max-w-[1280px]` holds both header and article body
- Header sits above the grid with `xl:mr-[260px]` to align with the article column
- At `xl:` breakpoint, article body + TOC sidebar use CSS Grid `[1fr_220px]` with `gap-10`
- TOC sidebar is hidden below `xl:` (`hidden xl:block`), sticky at `top-24`
- Article wrapped in glass container: `bg-zinc-900/30 border-zinc-800/50 rounded-2xl`
- Content fade-in: `.blog-fade-in` CSS animation (0.6s ease-out translateY)
- Reading progress: 3px red gradient bar at `z-[60]` fixed to viewport top

---

## Navbar Dual-Mode

The Navbar (`src/components/ui/Navbar.tsx`) handles two contexts:

| Context | Active State | Link Hrefs | Logo Href |
|---------|-------------|------------|-----------|
| Homepage (`/`) | `IntersectionObserver` via `useActiveSection` | `#section` (hash) | `#hero` |
| Blog pages (`/blog/*`) | Pathname detection: "Blog" always active | `/#section` (prefixed) | `/` |

Uses `usePathname()` from `next/navigation`. `isHome = pathname === "/"` drives all conditional logic.

---

## Layout Structure

`src/app/layout.tsx` provides shared chrome for all routes:

```
<html>
  <body>
    <StarField />      ← Visual continuity across all pages
    <Navbar />         ← Dual-mode navigation
    <main>
      {children}       ← Page content
    </main>
    <Footer />
  </body>
</html>
```

`CursorFollower` stays in `src/app/page.tsx` (homepage-only — CPU-intensive mouse tracking, unnecessary on reading pages).
