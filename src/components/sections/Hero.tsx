"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { personalInfo } from "~/data/personal";
import { fadeInUp, staggerContainer } from "~/lib/motion";
import { GradientOrb } from "~/components/effects/GradientOrb";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden"
    >
      {/* Mouse-tracking gradient orb */}
      <GradientOrb />

      {/* Bottom warm glow */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] hero-warm-glow pointer-events-none z-[1]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Large headline */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl text-[#fafafa] leading-[1.1]"
        >
          I build and craft digital experiences{" "}
          <br className="hidden sm:block" />
          that deliver{" "}
          <span className="font-serif italic text-[#fafafa]">
            real impact
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg text-[#a1a1aa]"
        >
          Hello, I&apos;m{" "}
          <span className="text-[#fafafa] font-semibold">
            {personalInfo.name}
          </span>
        </motion.p>

        {/* Role badge */}
        <motion.div variants={fadeInUp} className="mt-4 flex justify-center">
          <span className="inline-flex items-center bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            {personalInfo.title}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 text-[#fafafa] text-sm font-medium transition-all duration-300 hover:border-zinc-500 hover:bg-white/5"
          >
            Let&apos;s Connect
            <ArrowRight size={16} />
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 text-[#a1a1aa] text-sm hover:text-[#fafafa] transition-colors cursor-pointer"
          >
            {personalInfo.email}
            {copied ? (
              <Check size={14} className="text-red-400" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
