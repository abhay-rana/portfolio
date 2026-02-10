"use client";

import { motion } from "framer-motion";
import { experience } from "~/data/experience";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "~/lib/motion";

export function Experience() {
  return (
    <AnimatedSection id="experience">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Experience" subtitle="My professional journey" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative space-y-8"
        >
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800" />

          {experience.map((exp) => (
            <motion.div key={exp.id} variants={staggerItem} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-zinc-700 bg-zinc-950" />

              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-lg font-semibold text-zinc-100">{exp.role}</h3>
                  <span className="text-sm text-zinc-500">{exp.period}</span>
                </div>
                <p className="text-sm font-medium text-blue-400 mt-1">{exp.company}</p>
                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-zinc-400 leading-relaxed flex gap-2">
                      <span className="text-zinc-600 shrink-0">&bull;</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
