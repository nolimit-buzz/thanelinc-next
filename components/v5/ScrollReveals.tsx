"use client";

import { useEffect } from "react";

/**
 * v5's triggerScrollReveals(): elements with .reveal gain .active on entry.
 * Ported as an effect so it runs per route rather than on DOMContentLoaded.
 */
export function ScrollReveals() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
