"use client";

import { Download } from "lucide-react";
import { personalInfo } from "~/data/personal";
import { AnimatedSection } from "~/components/ui/AnimatedSection";

export function ResumeCTA() {
  return (
    <AnimatedSection className="text-center">
      <div className="mx-auto max-w-3xl rounded-2xl p-10 md:p-14 bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 border border-white/10 relative overflow-hidden">
        {/* Gradient background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#fafafa]">
            Want to know more<span className="text-red-400">?</span>
          </h2>
          <p className="mt-4 text-[#a1a1aa] text-lg">
            Download my resume for a detailed look at my experience, skills, and education.
          </p>
          <div className="mt-8">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-lg pulse-glow-btn transition-all duration-300 hover:from-red-500 hover:to-orange-500"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
