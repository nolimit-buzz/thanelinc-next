"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { legalDocuments, type LegalDocumentContent } from "@/lib/content/legal";
import styles from "@/components/legal/legal-document.module.css";

export function LegalDocument({ document }: { document: LegalDocumentContent }) {
  const [activeSection, setActiveSection] = useState(document.sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-22% 0px -66% 0px", threshold: 0 },
    );
    document.sections.forEach((section) => {
      const element = globalThis.document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [document.sections]);

  return (
    <>
      <SiteNav variant="light" />
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className="container">
            <p className={styles.eyebrow}>{document.eyebrow}</p>
            <div className={styles.heroGrid}>
              <h1>{document.title}</h1>
              <div>
                <p className={styles.summary}>{document.summary}</p>
                <p className={styles.updated}>Last updated: {document.updated}</p>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.contentShell}>
          <div className={`container ${styles.contentGrid}`}>
            <aside className={styles.sidebar} aria-label="Legal document navigation">
              <p className={styles.sidebarLabel}>On this page</p>
              <nav className={styles.sectionNav}>
                {document.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={activeSection === section.id ? styles.active : undefined}
                    aria-current={activeSection === section.id ? "location" : undefined}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
              <div className={styles.related}>
                <p className={styles.sidebarLabel}>Legal pages</p>
                {legalDocuments.map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} aria-current={item.slug === document.slug ? "page" : undefined}>
                    {item.navLabel}
                  </Link>
                ))}
              </div>
            </aside>

            <article className={styles.article}>
              <aside className={styles.draftNotice} aria-label="Draft status">
                <span>Review status</span>
                <p>{document.draftNotice}</p>
              </aside>
              {document.sections.map((section) => (
                <section id={section.id} key={section.id} className={styles.section}>
                  <p className={styles.sectionNumber}>{section.label}</p>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? (
                    <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  ) : null}
                  {section.links ? (
                    <div className={styles.references}>
                      {section.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden>↗</span></a>)}
                    </div>
                  ) : null}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>
      <ScrollReveals />
      <SiteFooter />
    </>
  );
}
