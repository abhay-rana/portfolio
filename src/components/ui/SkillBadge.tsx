import { cn } from "~/lib/cn";
import type { Skill } from "~/types/data";

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3", className)}>
      <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
      <div className="flex-1 h-1.5 rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
      <span className="text-xs text-zinc-500">{skill.proficiency}%</span>
    </div>
  );
}
