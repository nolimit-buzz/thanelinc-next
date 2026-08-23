"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/components/sectors/sector-page.module.css";

export interface SectionNavItem {
  id: string;
  label: string;
}

const DEFAULT_SECTIONS: SectionNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline" },
  { id: "why-it-matters", label: "Why It Matters" },
  { id: "questions", label: "Common Questions" },
  { id: "get-started", label: "Get Started" },
];

export function SectionNav({ sections = DEFAULT_SECTIONS }: { sections?: SectionNavItem[] } = {}) {
  const stableSections = useMemo(() => sections, [sections]);
  const [active, setActive] = useState(stableSections[0]?.id ?? "");
  const [pinned, setPinned] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    stableSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [stableSections]);

  useEffect(() => {
    let frame = 0;
    const updatePinned = () => {
      const slot = slotRef.current;
      const main = slot?.closest("main");
      if (!slot || !main) return;

      const topOffset = 64;
      const slotTop = slot.getBoundingClientRect().top + window.scrollY;
      const mainBottom = main.getBoundingClientRect().bottom + window.scrollY;
      const navHeight = slot.offsetHeight;
      const nextPinned = window.scrollY + topOffset >= slotTop
        && window.scrollY + topOffset + navHeight < mainBottom;
      setPinned(nextPinned);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePinned);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    frame = requestAnimationFrame(updatePinned);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div ref={slotRef} className={styles.sectionNavSlot}>
      <nav aria-label="Page sections" className={`${styles.sectionNav} ${pinned ? styles.sectionNavPinned : ""}`}>
        <div className={styles.sectionNavScroller}>
          <div className={styles.sectionNavList}>
            {stableSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active === section.id ? "location" : undefined}
                className={`${styles.sectionNavLink} ${active === section.id ? styles.sectionNavLinkActive : ""}`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
