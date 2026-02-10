"use client";

import { Download } from "lucide-react";
import { personalInfo } from "~/data/personal";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { Button } from "~/components/ui/Button";

export function ResumeCTA() {
  return (
    <AnimatedSection className="text-center">
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-10">
        <h2 className="text-3xl font-bold text-zinc-100">Want to know more?</h2>
        <p className="mt-3 text-zinc-400">
          Download my resume for a detailed look at my experience, skills, and education.
        </p>
        <div className="mt-6">
          <Button href={personalInfo.resumeUrl} variant="primary" size="lg">
            <Download size={18} className="mr-2" />
            Download Resume
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
