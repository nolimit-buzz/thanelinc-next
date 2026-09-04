"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ResourceArticleSidebarContent } from "@/lib/cms/mapResourceArticle";
import type { ResourceArticle } from "@/lib/content/resources";
import styles from "@/components/resources/resource-article.module.css";

export function ArticleSidebar({ article, sidebar }: { article: ResourceArticle; sidebar: ResourceArticleSidebarContent }) {
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
    setNewsletterStatus(sidebar.newsletterSubmittedStatus);
  }

  return (
    <aside className={styles.sidebar} aria-label={sidebar.sidebarAriaLabel}>
      <div className={styles.newsletter}>
        <p className={styles.sideLabel}>{sidebar.newsletterLabel}</p>
        <h2>{sidebar.newsletterHeading}</h2>
        <p>{sidebar.newsletterBody}</p>
        <form onSubmit={handleNewsletterSubmit}>
          <label className="sr-only" htmlFor="resource-newsletter-email">{sidebar.newsletterEmailLabel}</label>
          <input id="resource-newsletter-email" name="email" type="email" autoComplete="email" required placeholder={sidebar.newsletterEmailPlaceholder} />
          <button type="submit">{sidebar.newsletterSubmitLabel} <span aria-hidden>→</span></button>
        </form>
        <p className={styles.formStatus} aria-live="polite">{newsletterStatus || sidebar.newsletterIdleStatus}</p>
      </div>
      <div className={styles.toc}>
        <p className={styles.sideLabel}>{sidebar.tocLabel}</p>
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
