import { Experience } from "~/types/data";

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "TechCorp Global",
    role: "Senior Full Stack Developer",
    period: "2023 - Present",
    highlights: [
      "Led a team of 5 developers building a customer-facing SaaS platform serving 50K+ users",
      "Architected microservices migration reducing API latency by 40%",
      "Implemented CI/CD pipelines with 95% test coverage and zero-downtime deployments",
      "Mentored junior developers and established code review best practices",
    ],
    techUsed: ["Next.js", "TypeScript", "Node.js", "AWS", "PostgreSQL", "Docker"],
  },
  {
    id: "exp-2",
    company: "StartupX",
    role: "Full Stack Developer",
    period: "2021 - 2023",
    highlights: [
      "Built the MVP from scratch that secured $2M seed funding",
      "Designed and implemented RESTful APIs handling 1M+ daily requests",
      "Optimized React rendering performance improving page load by 60%",
      "Integrated third-party services including Stripe, SendGrid, and Twilio",
    ],
    techUsed: ["React", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS"],
  },
  {
    id: "exp-3",
    company: "Digital Agency Co",
    role: "Frontend Developer",
    period: "2019 - 2021",
    highlights: [
      "Developed 20+ responsive web applications for enterprise clients",
      "Introduced component-driven development with Storybook",
      "Improved Lighthouse scores from 60 to 95+ across all client projects",
      "Created reusable design system used across 10+ projects",
    ],
    techUsed: ["React", "Vue.js", "SCSS", "JavaScript", "Figma", "Storybook"],
  },
  {
    id: "exp-4",
    company: "Freelance",
    role: "Web Developer",
    period: "2017 - 2019",
    highlights: [
      "Delivered 30+ client projects ranging from landing pages to full-stack applications",
      "Built a personal brand generating consistent inbound leads",
      "Specialized in WordPress custom theme development and e-commerce solutions",
    ],
    techUsed: ["JavaScript", "PHP", "WordPress", "MySQL", "HTML/CSS"],
  },
];
