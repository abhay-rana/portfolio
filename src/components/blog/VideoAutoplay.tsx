"use client";

import { useEffect } from "react";

export function VideoAutoplay() {
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(
      "video[data-autoplay-on-scroll]"
    );
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  return null;
}
