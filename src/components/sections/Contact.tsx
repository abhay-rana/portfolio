"use client";

import { Mail, MapPin } from "lucide-react";
import { personalInfo } from "~/data/personal";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Button } from "~/components/ui/Button";

export function Contact() {
  return (
    <AnimatedSection id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or just want to say hello?"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Mail size={18} />
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-zinc-200 transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <MapPin size={18} />
            <span>{personalInfo.location}</span>
          </div>
          <div className="mt-4 flex gap-4">
            {personalInfo.socials.map((social) => (
              <Button key={social.platform} href={social.url} variant="outline" size="sm">
                {social.platform}
              </Button>
            ))}
          </div>
          <div className="mt-6">
            <Button href={`mailto:${personalInfo.email}`} variant="primary" size="lg">
              <Mail size={18} className="mr-2" />
              Send me an email
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
