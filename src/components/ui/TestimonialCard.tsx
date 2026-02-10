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
        "rounded-xl border border-zinc-800 bg-zinc-900/50 p-6",
        className
      )}
    >
      <p className="text-zinc-300 text-sm leading-relaxed italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-200">{testimonial.name}</p>
          <p className="text-xs text-zinc-500">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
