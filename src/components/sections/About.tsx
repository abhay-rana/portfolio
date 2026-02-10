"use client";

import { personalInfo } from "~/data/personal";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";

export function About() {
  return (
    <AnimatedSection id="about">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="About Me" subtitle="Get to know me better" />
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="aspect-square rounded-2xl bg-zinc-800/50 flex items-center justify-center">
            <span className="text-zinc-600 text-sm">Profile Photo</span>
          </div>
          <div>
            <p className="text-zinc-300 leading-relaxed">{personalInfo.bio}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-zinc-900 p-4 text-center">
                <p className="text-2xl font-bold text-zinc-100">7+</p>
                <p className="text-sm text-zinc-500">Years Experience</p>
              </div>
              <div className="rounded-lg bg-zinc-900 p-4 text-center">
                <p className="text-2xl font-bold text-zinc-100">50+</p>
                <p className="text-sm text-zinc-500">Projects Delivered</p>
              </div>
              <div className="rounded-lg bg-zinc-900 p-4 text-center">
                <p className="text-2xl font-bold text-zinc-100">30+</p>
                <p className="text-sm text-zinc-500">Happy Clients</p>
              </div>
              <div className="rounded-lg bg-zinc-900 p-4 text-center">
                <p className="text-2xl font-bold text-zinc-100">5K+</p>
                <p className="text-sm text-zinc-500">GitHub Stars</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
