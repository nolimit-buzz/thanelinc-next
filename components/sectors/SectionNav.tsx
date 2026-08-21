"use client";

import { useEffect, useMemo, useState } from "react";
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

  return (
    <nav aria-label="Page sections" className={styles.sectionNav}>
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
  );
}
