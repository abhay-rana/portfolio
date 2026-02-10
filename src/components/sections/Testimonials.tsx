"use client";

import { testimonials } from "~/data/testimonials";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { TestimonialCard } from "~/components/ui/TestimonialCard";

export function Testimonials() {
  // Duplicate testimonials for infinite marquee
  const doubled = [...testimonials, ...testimonials];

  return (
    <AnimatedSection id="testimonials">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Testimonials" subtitle="What people say about working with me" />
      </div>
      {/* Full-width marquee container */}
      <div className="overflow-hidden -mx-4 md:-mx-6">
        <div className="marquee gap-6 py-4">
          {doubled.map((testimonial, i) => (
            <TestimonialCard
              key={`${testimonial.id}-${i}`}
              testimonial={testimonial}
              className="mx-3"
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
