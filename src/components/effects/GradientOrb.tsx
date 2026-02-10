"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function GradientOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  // Transform 0-1 range to percentage strings for CSS left/top
  const leftPrimary = useTransform(springX, (v) => `${v * 100}%`);
  const topPrimary = useTransform(springY, (v) => `${v * 100}%`);
  const leftSecondary = useTransform(springX, (v) => `${v * 100 + 10}%`);
  const topSecondary = useTransform(springY, (v) => `${v * 100 - 10}%`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ pointerEvents: "auto" }} aria-hidden="true">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.3) 40%, transparent 70%)",
          left: leftPrimary,
          top: topPrimary,
          x: "-50%",
          y: "-50%",
        }}
      />
      {/* Secondary smaller orb for depth */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
          left: leftSecondary,
          top: topSecondary,
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  );
}
