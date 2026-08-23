"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ResourceArticle } from "@/lib/content/resources";
import styles from "@/components/resources/resource-article.module.css";

export function ArticleSidebar({ article }: { article: ResourceArticle }) {
  const [activeId, setActiveId] = useState(article.sections[0]?.id ?? "");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveId(current.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    article.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [article.sections]);

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterStatus("Newsletter delivery will open when the approved subscription backend is connected.");
  }

  return (
    <aside className={styles.sidebar} aria-label="Article tools">
      <div className={styles.newsletter}>
        <p className={styles.sideLabel}>Compliance notes</p>
        <h2>Stay close to the updates that matter.</h2>
        <p>Practical explainers, guidance updates, and deadlines for compliance owners.</p>
        <form onSubmit={handleNewsletterSubmit}>
          <label className="sr-only" htmlFor="resource-newsletter-email">Email address</label>
          <input id="resource-newsletter-email" name="email" type="email" autoComplete="email" required placeholder="Your email address" />
          <button type="submit">Subscribe <span aria-hidden>→</span></button>
        </form>
        <p className={styles.formStatus} aria-live="polite">{newsletterStatus || "Subscription delivery will be enabled with the approved backend."}</p>
      </div>
      <div className={styles.toc}>
        <p className={styles.sideLabel}>Table of contents</p>
        <nav>
          {article.sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`} className={activeId === section.id ? styles.active : undefined} aria-current={activeId === section.id ? "location" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>{section.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
