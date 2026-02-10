import { cn } from "~/lib/cn";
import type { Testimonial } from "~/types/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 min-w-[320px] max-w-[400px] shrink-0",
        className
      )}
    >
      <p className="text-[#a1a1aa] text-sm leading-relaxed italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-sm font-bold text-blue-400">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-[#fafafa]">{testimonial.name}</p>
          <p className="text-xs text-[#a1a1aa]/60">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
