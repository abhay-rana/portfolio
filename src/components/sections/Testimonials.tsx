"use client";

import { motion } from "framer-motion";
import { testimonials } from "~/data/testimonials";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { TestimonialCard } from "~/components/ui/TestimonialCard";
import { staggerContainer, staggerItem } from "~/lib/motion";

export function Testimonials() {
  return (
    <AnimatedSection id="testimonials">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Testimonials" subtitle="What people say about working with me" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={staggerItem}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
