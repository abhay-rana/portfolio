"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "~/data/personal";
import { fadeInUp, staggerContainer } from "~/lib/motion";
import { Button } from "~/components/ui/Button";
import { GradientOrb } from "~/components/effects/GradientOrb";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden">
      {/* Mouse-tracking gradient orb */}
      <GradientOrb />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-sm font-mono font-medium uppercase tracking-[0.2em] text-blue-400"
        >
          {personalInfo.title}
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl text-[#fafafa] text-glow"
        >
          {personalInfo.name}
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-2xl mx-auto text-lg text-[#a1a1aa] leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Button href="#projects" variant="primary" size="lg">
            View Projects
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            Contact Me
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down" className="group">
          <ArrowDown size={20} className="text-[#a1a1aa]/40 scroll-indicator group-hover:text-blue-400 transition-colors" />
        </a>
      </motion.div>
    </section>
  );
}
