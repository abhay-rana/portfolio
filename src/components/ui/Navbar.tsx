"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "~/data/navigation";
import { personalInfo } from "~/data/personal";
import { useActiveSection } from "~/hooks/useActiveSection";
import { cn } from "~/lib/cn";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = navItems.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl">
      <div className="rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#hero" className="text-lg font-extrabold text-white">
            {personalInfo.name.split(" ")[0]}
            <span className="text-red-500">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-red-500/15 border border-red-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-400 hover:text-red-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 p-4"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-bold transition-all",
                      isActive
                        ? "text-red-400 bg-red-500/10"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
