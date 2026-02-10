"use client";

import { useState } from "react";
import { cn } from "~/lib/cn";
import type { Skill } from "~/types/data";

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "group glass glass-hover rounded-lg px-4 py-3 cursor-pointer transition-all duration-300",
        isExpanded && "glow-accent-sm",
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#fafafa]">{skill.name}</span>
        <span
          className={cn(
            "text-xs font-mono transition-all duration-300",
            isExpanded ? "text-red-400" : "text-[#a1a1aa]/60"
          )}
        >
          {skill.proficiency}%
        </span>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-4 mt-2 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-700 ease-out"
            style={{ width: isExpanded ? `${skill.proficiency}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
