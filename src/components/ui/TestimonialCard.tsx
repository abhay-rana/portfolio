import { cn } from "~/lib/cn";
import type { Testimonial } from "~/types/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  rotation?: number;
}

export function TestimonialCard({ testimonial, className, rotation = 0 }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "bento-card p-6 transition-all duration-300",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Large red quote mark */}
      <span className="text-5xl font-extrabold text-red-500/30 leading-none block -mb-4">
        &ldquo;
      </span>
      <p className="text-[#a1a1aa] text-sm leading-relaxed">
        {testimonial.text}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-sm font-extrabold text-white">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-[#fafafa]">{testimonial.name}</p>
          <p className="text-xs text-zinc-500">
            {testimonial.role} at <span className="text-red-400/70">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
