"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const article = document.querySelector("article");
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = articleTop;
      const end = articleTop + articleHeight - windowHeight;
      const current = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));

      setProgress(current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-red-500 to-red-400 origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
