# DOCS-MAP — Code → Documentation Routing

*Last updated: 11 Feb 2026*

Smart routing for `/update-docs`. Maps code changes to specific doc files/sections.

## Code → Doc Routing

| Code Pattern | Documentation Target | Section Anchor |
|--------------|---------------------|----------------|
| `content/blog/**` | `docs/blog-architecture.md` | `#how-to-add-a-new-blog-post` |
| `src/lib/blog.ts` | `docs/blog-architecture.md` | `#architecture-overview` |
| `src/components/blog/**` | `docs/blog-architecture.md` | `#components` |
| `src/components/blog/ReadingProgress.tsx` | `docs/blog-architecture.md` | `#blog-post-page-layout` |
| `src/app/blog/**` | `docs/blog-architecture.md` | `#routes--seo` |
| `src/app/globals.css` | `docs/blog-architecture.md` | `#styling` |
| `src/components/ui/Navbar.tsx` | `docs/blog-architecture.md` | `#navbar-dual-mode` |
| `src/components/ui/BlogCard.tsx` | `docs/blog-architecture.md` | `#components` |
| `src/components/sections/Blog.tsx` | `docs/blog-architecture.md` | `#components` |
| `src/types/data.ts` | `docs/blog-architecture.md` | `#types` |
| `src/components/sections/**` | `CLAUDE.md` | `#source-structure` |
| `src/components/ui/**` | `CLAUDE.md` | `#source-structure` |
| `src/components/effects/**` | `CLAUDE.md` | `#source-structure` |
| `src/data/**` | `CLAUDE.md` | `#source-structure` |
| `src/hooks/**` | `CLAUDE.md` | `#key-patterns` |
| `src/lib/cn.ts` | `CLAUDE.md` | `#source-structure` |
| `src/lib/motion.ts` | `CLAUDE.md` | `#source-structure` |
| `src/app/layout.tsx` | `CLAUDE.md` | `#source-structure` |
| `src/app/page.tsx` | `CLAUDE.md` | `#routes` |
| `package.json` | `CLAUDE.md` | `#commands` |

## IGNORE Paths

```
node_modules/**
.next/**
public/**
```
