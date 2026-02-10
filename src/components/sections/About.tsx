"use client";

import { personalInfo } from "~/data/personal";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";

const stats = [
  { value: "7+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5K+", label: "GitHub Stars" },
];

export function About() {
  return (
    <AnimatedSection id="about">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="About Me" subtitle="Get to know me better" />
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Profile photo placeholder with blue glow border */}
          <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl opacity-50" />
            <span className="relative text-[#a1a1aa]/60 text-sm font-mono">Profile Photo</span>
          </div>

          <div>
            <p className="text-[#a1a1aa] leading-relaxed text-base">{personalInfo.bio}</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-lg p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  <p className="text-2xl font-bold text-[#fafafa]">{stat.value}</p>
                  <p className="text-sm text-[#a1a1aa]/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
