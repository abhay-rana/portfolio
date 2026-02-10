"use client";

import { useState } from "react";
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
    <nav className="fixed top-0 z-50 w-full glass border-b border-white/5">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#hero" className="text-lg font-bold text-[#fafafa] font-mono tracking-tight">
          {personalInfo.name.split(" ")[0].toLowerCase()}
          <span className="text-blue-500">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm transition-colors duration-200 py-1",
                activeSection === item.href.replace("#", "")
                  ? "text-[#fafafa]"
                  : "text-[#a1a1aa] hover:text-[#fafafa]"
              )}
            >
              {item.label}
              {activeSection === item.href.replace("#", "") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 glass">
          <div className="flex flex-col px-4 py-4 gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm py-2 transition-colors duration-200",
                  activeSection === item.href.replace("#", "")
                    ? "text-[#fafafa] border-l-2 border-blue-500 pl-3"
                    : "text-[#a1a1aa] hover:text-[#fafafa] pl-3"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
