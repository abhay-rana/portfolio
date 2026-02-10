"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "~/data/personal";
import { fadeInUp, staggerContainer } from "~/lib/motion";
import { Button } from "~/components/ui/Button";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center px-4 md:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        <motion.p variants={fadeInUp} className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-400">
          {personalInfo.title}
        </motion.p>
        <motion.h1 variants={fadeInUp} className="text-5xl font-bold tracking-tight sm:text-7xl text-zinc-100">
          {personalInfo.name}
        </motion.h1>
        <motion.p variants={fadeInUp} className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
          {personalInfo.tagline}
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-4">
          <Button href="#projects" variant="primary" size="lg">
            View Projects
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            Contact Me
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down">
          <ArrowDown size={20} className="text-zinc-600 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
