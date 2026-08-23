import Link from "next/link";
import type { ResourcesHomeContent } from "@/lib/content/resources";
import { ResourceCards } from "@/components/resources/ResourceCards";
import { resourceArticles } from "@/lib/content/resources";
import styles from "@/components/resources/resources-home.module.css";

export function Resources({ content }: { content: ResourcesHomeContent }) {
  return (
    <section className={styles.section} id="resources">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2>{content.heading}</h2>
            <p className={styles.intro}>{content.body}</p>
          </div>
          <Link href={content.cta.href} className={styles.libraryLink}>{content.cta.label}<span aria-hidden>↗</span></Link>
        </div>

        <div className={`${styles.categoryRail} reveal delay-1`} aria-label="Resource categories">
          {content.categories.map((category) => (
            <div key={category.id} className={category.state === "live" ? styles.categoryLive : styles.categoryFuture}>
              <strong>{category.label}</strong>
              <span>{category.detail}</span>
              <small>{category.state === "live" ? "Published" : "Coming next"}</small>
            </div>
          ))}
        </div>

        <div className="reveal delay-2"><ResourceCards articles={resourceArticles} /></div>
      </div>
    </section>
  );
}
