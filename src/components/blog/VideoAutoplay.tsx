"use client";

import { useEffect } from "react";

function createLoadingOverlay(): HTMLDivElement {
  const overlay = document.createElement("div");
  overlay.className = "blog-video-overlay";
  overlay.innerHTML = `
    <div class="blog-video-spinner"></div>
    <span class="blog-video-loading-text">Loading video…</span>
  `;
  return overlay;
}

function attemptPlay(video: HTMLVideoElement) {
  video.muted = true;
  video.playsInline = true;

  const promise = video.play();
  if (promise !== undefined) {
    promise.catch(() => {
      // Autoplay blocked — controls are visible so user can tap play.
    });
  }
}

function enhanceVideo(video: HTMLVideoElement) {
  const wrapper = video.closest(".blog-video") as HTMLElement | null;
  if (!wrapper) return;

  // Enable native controls so user can play/pause/volume/fullscreen
  video.controls = true;
  video.muted = true;
  video.playsInline = true;

  // Make wrapper position relative for overlay
  wrapper.style.position = "relative";

  const overlay = createLoadingOverlay();
  wrapper.appendChild(overlay);

  function hideOverlay() {
    overlay.classList.add("blog-video-overlay-hidden");
    // Remove from DOM after fade-out transition
    setTimeout(() => overlay.remove(), 400);
  }

  // If the video already has enough data (cached), hide immediately
  if (video.readyState >= 3) {
    hideOverlay();
    return;
  }

  // Hide overlay once the video can actually play through
  video.addEventListener("canplaythrough", hideOverlay, { once: true });

  // Fallback: if canplaythrough never fires, hide after canplay
  video.addEventListener(
    "canplay",
    () => {
      // Give a small buffer for canplaythrough to fire first
      setTimeout(() => {
        if (wrapper.contains(overlay)) hideOverlay();
      }, 500);
    },
    { once: true }
  );
}

export function VideoAutoplay() {
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(
      "video[data-autoplay-on-scroll]"
    );
    if (!videos.length) return;

    // Enhance each video with loading overlay + controls
    videos.forEach(enhanceVideo);

    // Autoplay on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            attemptPlay(video);
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
