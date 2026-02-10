"use client";

import { ExternalLink, Github } from "lucide-react";
import type { Project } from "~/types/data";
import { cn } from "~/lib/cn";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  className?: string;
}

export function ProjectCard({ project, featured, className }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl glass glass-hover p-6 transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
        featured && "md:col-span-2",
        className
      )}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-[#fafafa] group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">{project.description}</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-[#a1a1aa] font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-blue-400 transition-colors"
          >
            <Github size={16} />
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
