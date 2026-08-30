import Image from "next/image";
import Link from "next/link";
import styles from "@/components/resources/resource-cards.module.css";

/**
 * Only the fields a card actually renders. Narrower than `ResourceArticle` so
 * the homepage can pass CMS-sourced items (which carry no article body) —
 * `ResourceArticle` still satisfies it structurally, so the /resources callers
 * pass their static articles unchanged.
 */
export interface ResourceCardItem {
  slug: string;
  kind: string;
  title: string;
  summary: string;
  lastReviewed: string;
  image: { src: string; alt: string };
  audience: string[];
}

export function ResourceCards({ articles, compact = false }: { articles: ResourceCardItem[]; compact?: boolean }) {
  return (
    <div className={compact ? styles.compactGrid : styles.grid}>
      {articles.map((article) => (
        <article key={article.slug} className={styles.card}>
          <Link href={`/resources/${article.slug}`} className={styles.imageLink} aria-label={`Read ${article.title}`}>
            <Image src={article.image.src} alt={article.image.alt} fill sizes={compact ? "(max-width: 720px) 100vw, 280px" : "(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"} className={styles.image} />
          </Link>
          <div className={styles.cardBody}>
            <div className={styles.meta}><span>{article.kind}</span><span>Reviewed {article.lastReviewed}</span></div>
            <h3><Link href={`/resources/${article.slug}`}>{article.title}<span aria-hidden>↗</span></Link></h3>
            <p>{article.summary}</p>
            {article.audience.length > 0 && (
              <div className={styles.tags}>{article.audience.map((audience) => <span key={audience}>{audience}</span>)}</div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
