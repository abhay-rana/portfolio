"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "~/data/navigation";
import { useActiveSection } from "~/hooks/useActiveSection";
import { cn } from "~/lib/cn";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = navItems.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      {/* Desktop floating pill */}
      <div className="hidden md:flex items-center gap-1 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 px-2 py-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "relative text-sm px-3 py-1.5 rounded-xl transition-all duration-200",
              activeSection === item.href.replace("#", "")
                ? "text-white bg-red-500/15 text-red-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            {item.label}
          </a>
        ))}

        {/* CTA */}
        <a
          href="#contact"
          className="ml-2 px-4 py-1.5 rounded-xl bg-red-500 text-white text-sm font-medium transition-all duration-200 hover:bg-red-600"
        >
          Contact
        </a>
      </div>

      {/* Mobile floating pill */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 px-4 py-2.5">
          <span className="text-sm font-medium text-[#fafafa]">Menu</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-[#fafafa] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="mt-2 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 px-3 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm px-3 py-2 rounded-xl transition-all duration-200",
                  activeSection === item.href.replace("#", "")
                    ? "text-red-400 bg-red-500/10"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-1 px-3 py-2 rounded-xl bg-red-500 text-white text-sm font-medium text-center transition-all duration-200 hover:bg-red-600"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
