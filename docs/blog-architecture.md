# Blog Architecture

*Last updated: 11 Feb 2026*

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
| `coverImage` | string | No | Reserved for future use (not yet rendered) |

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
    → rehype-slug                ← Adds id attributes to headings
      → rehype-autolink-headings ← Wraps headings in <a> links (behavior: 'wrap')
        → rehype-pretty-code     ← Syntax highlighting via Shiki (theme: one-dark-pro)
          → rehype-stringify      ← HAST → HTML string
```

### Dependencies (all build-time only)

| Package | Purpose |
|---------|---------|
| `gray-matter` | Parse YAML frontmatter from .md |
| `unified` + `remark-parse` + `remark-rehype` + `rehype-stringify` | Markdown → HTML pipeline |
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
| `BlogHeader` | `src/components/blog/BlogHeader.tsx` | Server | Title (6xl), description, formatted date, read time, tag pills, gradient divider |
| `ReadingProgress` | `src/components/blog/ReadingProgress.tsx` | Client | 3px red gradient progress bar fixed at viewport top. Tracks scroll through `<article>` element using `scaleX` transform |
| `BlogCard` | `src/components/ui/BlogCard.tsx` | Server | `<Link>` card to `/blog/[slug]`. `featured` prop controls bento size + min-height. Formats dates via `toLocaleDateString` |
| `Blog` (section) | `src/components/sections/Blog.tsx` | Client | Homepage section. Accepts `posts: BlogPostMeta[]` prop. Featured layout (1 large + 3 small) if ≥4 posts, flat grid otherwise. "View all posts →" link |

---

## Routes & SEO

| Route | File | Rendering | Metadata |
|-------|------|-----------|----------|
| `/blog` | `src/app/blog/page.tsx` | Static | Static export: `title: "Blog \| Abhay Rana"` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | SSG | `generateMetadata()`: per-post title, description, canonical URL, OpenGraph (type: article, publishedTime) |

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

### Blog post page layout

- Gradient hero area extends behind navbar using `-mt-16 pt-16` trick (no gap between navbar and glow)
- Header container uses `max-w-4xl`, article body uses `max-w-[1000px]` — visual narrowing funnel
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
