# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (runs on port 3001)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (ESLint with Next.js core-web-vitals + TypeScript rules)
- **Start prod**: `npm run start`

## Architecture

Single-page portfolio site built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **TypeScript**.

### Path alias

`~/` maps to `./src/` (configured in tsconfig.json). Always use `~/` for imports.

### Source structure

- `src/app/` — Single route (`page.tsx`) composing all sections top-to-bottom; `layout.tsx` loads three Google Fonts (Inter, JetBrains Mono, Playfair Display) and sets metadata from `siteConfig`
- `src/components/sections/` — Page sections rendered in order: Hero → About → Projects → TechStack → Experience → Blog → Testimonials → ResumeCTA → Contact
- `src/components/ui/` — Reusable UI components (Navbar, Footer, Button, AnimatedSection, cards, badges)
- `src/components/effects/` — Visual effects (StarField, CursorFollower, GradientOrb, DotGrid, GlowEffect)
- `src/data/` — All content as typed TypeScript constants (personal info, projects, skills, experience, blog, testimonials, navigation, site-config). Edit these files to update portfolio content.
- `src/types/data.ts` — Shared TypeScript interfaces for all data structures
- `src/lib/cn.ts` — `cn()` utility combining clsx + tailwind-merge
- `src/lib/motion.ts` — Reusable Framer Motion variants (fadeInUp, fadeIn, scaleIn, slideInLeft/Right, staggerContainer, staggerItem)
- `src/hooks/useActiveSection.ts` — IntersectionObserver hook for navbar active state

### Key patterns

- **Client components**: All interactive components use `"use client"`. Section components that animate use `AnimatedSection` wrapper (Framer Motion `useInView` with `once: true`).
- **Data-driven content**: All portfolio content lives in `src/data/`. Components import and render these typed constants — no hardcoded content in components.
- **Design system**: Dark theme (#0a0a0a background) with warm red accent (#ef4444). CSS custom properties defined in `globals.css` under `@theme inline`. Custom utility classes: `.glass`, `.glass-hover`, `.glow-accent`, `.bento-grid`, `.bento-card`.
- **Tailwind v4**: Uses `@import "tailwindcss"` and `@theme inline` syntax (not v3 `@tailwind` directives). PostCSS plugin is `@tailwindcss/postcss`.
- **Icons**: lucide-react for all icons.
