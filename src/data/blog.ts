import { BlogPost } from "~/types/data";

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Building Scalable React Applications with Next.js 15",
    excerpt:
      "A deep dive into the App Router, Server Components, and the new patterns that make Next.js 15 a game-changer for production applications.",
    date: "2025-01-15",
    readTime: "8 min read",
    url: "https://blog.abhayrana.com/nextjs-15-patterns",
    tags: ["Next.js", "React", "Architecture"],
  },
  {
    id: "blog-2",
    title: "The Art of TypeScript: Advanced Patterns You Should Know",
    excerpt:
      "From discriminated unions to template literal types — advanced TypeScript patterns that will level up your codebase.",
    date: "2024-11-20",
    readTime: "12 min read",
    url: "https://blog.abhayrana.com/advanced-typescript",
    tags: ["TypeScript", "Best Practices"],
  },
  {
    id: "blog-3",
    title: "Micro-Animations That Make Your UI Feel Alive",
    excerpt:
      "How subtle Framer Motion animations can transform a static page into an engaging experience. Includes code examples and performance tips.",
    date: "2024-09-05",
    readTime: "6 min read",
    url: "https://blog.abhayrana.com/micro-animations",
    tags: ["Animation", "Framer Motion", "UX"],
  },
  {
    id: "blog-4",
    title: "From Monolith to Microservices: A Practical Migration Guide",
    excerpt:
      "Lessons learned from migrating a 500K LOC monolith to microservices — what worked, what didn't, and what I'd do differently.",
    date: "2024-07-12",
    readTime: "15 min read",
    url: "https://blog.abhayrana.com/microservices-migration",
    tags: ["Architecture", "DevOps", "Backend"],
  },
];
