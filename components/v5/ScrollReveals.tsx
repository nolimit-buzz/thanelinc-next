"use client";

import { useEffect } from "react";

/**
 * v5's triggerScrollReveals(): elements with .reveal gain .active on entry.
 * Ported as an effect so it runs per route rather than on DOMContentLoaded.
 *
 * The scan cannot be one-shot: `.reveal` markup routinely enters the DOM after
 * this effect runs (Suspense boundaries resolving, the mega menu opening, tool
 * results rendering), and anything missed stays stuck at opacity: 0. A
 * MutationObserver re-scans whenever nodes are added.
 */
export function ScrollReveals() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("active"));
      return;
    }

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

    // Re-observing an already-observed element is a no-op, so this is safe to
    // call as often as the DOM changes.
    const observeAll = () =>
      document
        .querySelectorAll(".reveal:not(.active)")
        .forEach((el) => io.observe(el));

    observeAll();

    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return; // coalesce a burst of mutations into one rescan
      frame = requestAnimationFrame(() => {
        frame = 0;
        observeAll();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
