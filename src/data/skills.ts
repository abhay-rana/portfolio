import { SkillCategory } from "~/types/data";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", proficiency: 95 },
      { name: "Next.js", proficiency: 92 },
      { name: "TypeScript", proficiency: 90 },
      { name: "Tailwind CSS", proficiency: 95 },
      { name: "Framer Motion", proficiency: 85 },
      { name: "Vue.js", proficiency: 75 },
      { name: "HTML/CSS", proficiency: 98 },
      { name: "JavaScript", proficiency: 95 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", proficiency: 90 },
      { name: "Python", proficiency: 80 },
      { name: "PostgreSQL", proficiency: 85 },
      { name: "MongoDB", proficiency: 82 },
      { name: "GraphQL", proficiency: 78 },
      { name: "Redis", proficiency: 75 },
      { name: "REST APIs", proficiency: 92 },
      { name: "Prisma", proficiency: 85 },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git", proficiency: 92 },
      { name: "Docker", proficiency: 82 },
      { name: "AWS", proficiency: 78 },
      { name: "CI/CD", proficiency: 85 },
      { name: "Vercel", proficiency: 90 },
      { name: "Linux", proficiency: 80 },
      { name: "Figma", proficiency: 72 },
      { name: "VS Code", proficiency: 95 },
    ],
  },
];
