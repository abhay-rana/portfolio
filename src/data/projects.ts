import { Project } from "~/types/data";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "CloudSync Platform",
    description:
      "A real-time cloud collaboration platform enabling teams to sync documents, manage workflows, and communicate seamlessly. Built with microservices architecture handling 10K+ concurrent users.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "AWS"],
    liveUrl: "https://cloudsync.demo.com",
    githubUrl: "https://github.com/abhayrana/cloudsync",
    image: "/projects/cloudsync.jpg",
    featured: true,
  },
  {
    id: "project-2",
    title: "AI Content Studio",
    description:
      "An AI-powered content creation tool that generates, edits, and optimizes marketing copy using GPT-4 and custom fine-tuned models. Features real-time collaboration and version history.",
    techStack: ["React", "Python", "FastAPI", "OpenAI", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://aistudio.demo.com",
    githubUrl: "https://github.com/abhayrana/ai-studio",
    image: "/projects/aistudio.jpg",
    featured: true,
  },
  {
    id: "project-3",
    title: "DevMetrics Dashboard",
    description:
      "A comprehensive developer productivity dashboard aggregating data from GitHub, Jira, and CI/CD pipelines. Provides actionable insights with interactive charts and team analytics.",
    techStack: ["Next.js", "D3.js", "Node.js", "GraphQL", "Prisma"],
    liveUrl: "https://devmetrics.demo.com",
    githubUrl: "https://github.com/abhayrana/devmetrics",
    image: "/projects/devmetrics.jpg",
    featured: true,
  },
  {
    id: "project-4",
    title: "E-Commerce Starter Kit",
    description:
      "A production-ready e-commerce boilerplate with Stripe payments, inventory management, and admin dashboard. Includes SEO optimization and PWA support.",
    techStack: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/abhayrana/ecommerce-kit",
    image: "/projects/ecommerce.jpg",
    featured: false,
  },
  {
    id: "project-5",
    title: "TaskFlow CLI",
    description:
      "A blazing-fast command-line task manager written in Rust. Supports kanban boards, time tracking, and git integration with fuzzy search.",
    techStack: ["Rust", "SQLite", "CLI"],
    githubUrl: "https://github.com/abhayrana/taskflow",
    image: "/projects/taskflow.jpg",
    featured: false,
  },
  {
    id: "project-6",
    title: "Open Source Contributions",
    description:
      "Active contributor to popular open source projects including Next.js, Tailwind CSS, and Prisma. Focused on documentation improvements and bug fixes.",
    techStack: ["TypeScript", "React", "Node.js"],
    githubUrl: "https://github.com/abhayrana",
    image: "/projects/opensource.jpg",
    featured: false,
  },
];
