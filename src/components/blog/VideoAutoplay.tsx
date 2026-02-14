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

  video.controls = true;
  video.muted = true;
  video.playsInline = true;
  // Switch from metadata-only to full preload so the browser buffers
  video.preload = "auto";

  wrapper.style.position = "relative";

  const overlay = createLoadingOverlay();
  wrapper.appendChild(overlay);

  let removed = false;

  function hideOverlay() {
    if (removed) return;
    removed = true;
    overlay.classList.add("blog-video-overlay-hidden");
    setTimeout(() => overlay.remove(), 400);
    cleanupListeners();
  }

  // Clicking the overlay tries to play and dismisses it
  function onOverlayClick() {
    attemptPlay(video);
    hideOverlay();
  }
  overlay.style.cursor = "pointer";
  overlay.addEventListener("click", onOverlayClick);

  // Multiple event listeners — whichever fires first wins
  function onVideoReady() {
    hideOverlay();
  }

  const events = [
    "canplay",
    "canplaythrough",
    "playing",
    "timeupdate",
    "loadeddata",
  ];
  events.forEach((e) => video.addEventListener(e, onVideoReady, { once: true }));

  // Poll readyState as safety net (catches events that fired before mount)
  const interval = setInterval(() => {
    if (video.readyState >= 2 || !video.paused) {
      hideOverlay();
    }
  }, 300);

  // Hard timeout — never block the user for more than 8 seconds
  const timeout = setTimeout(() => {
    hideOverlay();
  }, 8000);

  function cleanupListeners() {
    clearInterval(interval);
    clearTimeout(timeout);
    overlay.removeEventListener("click", onOverlayClick);
    events.forEach((e) => video.removeEventListener(e, onVideoReady));
  }

  // Immediate check: video might already be ready or playing
  if (video.readyState >= 2 || !video.paused) {
    hideOverlay();
  }
}

export function VideoAutoplay() {
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(
      "video[data-autoplay-on-scroll]"
    );
    if (!videos.length) return;

    videos.forEach(enhanceVideo);

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
