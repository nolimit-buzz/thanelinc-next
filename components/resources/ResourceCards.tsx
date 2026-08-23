import Image from "next/image";
import Link from "next/link";
import type { ResourceArticle } from "@/lib/content/resources";
import styles from "@/components/resources/resource-cards.module.css";

export function ResourceCards({ articles, compact = false }: { articles: ResourceArticle[]; compact?: boolean }) {
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
            <div className={styles.tags}>{article.audience.map((audience) => <span key={audience}>{audience}</span>)}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
