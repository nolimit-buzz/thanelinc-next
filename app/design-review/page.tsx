import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { designReview } from "@/lib/content/designReview";
import styles from "@/components/design-review/sector-preview.module.css";

export const metadata: Metadata = {
  title: "Design Review",
  robots: { index: false, follow: false },
};

export default function DesignReviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className={styles.indexPage}>
      <div className="container">
        <div className={styles.indexIntro}>
          <div className={styles.eyebrow}>{designReview.eyebrow}</div>
          <h1 className={styles.title}>{designReview.h1}</h1>
          <p className={styles.summary}>{designReview.intro}</p>
          <ul className={styles.checklist}>
            {designReview.viewportChecklist.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className={styles.indexGrid}>
          {designReview.pages.map((page) => (
            <Link key={page.href} href={page.href} className={styles.indexCard}>
              <small>{page.label}</small>
              <strong>{page.title}</strong>
              <span>{page.reference} →</span>
            </Link>
          ))}
        </div>
        <p className={styles.assetNote}>{designReview.assetNote}</p>
      </div>
    </main>
  );
}
