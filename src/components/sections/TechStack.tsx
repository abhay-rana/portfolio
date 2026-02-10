"use client";

import { motion } from "framer-motion";
import { skillCategories } from "~/data/skills";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { SkillBadge } from "~/components/ui/SkillBadge";
import { staggerContainer, staggerItem } from "~/lib/motion";

export function TechStack() {
  return (
    <AnimatedSection id="skills">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Tech Stack" subtitle="Technologies I work with" />
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.category}>
              <h3 className="mb-5 text-sm font-mono font-medium uppercase tracking-[0.15em] text-red-400">
                {category.category}
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.skills.map((skill) => (
                  <motion.div key={skill.name} variants={staggerItem}>
                    <SkillBadge skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
