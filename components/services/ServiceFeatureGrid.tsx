import styles from "@/components/inner/inner-page.module.css";

export interface ServiceFeatureItem {
  number: string;
  title: string;
  body: string;
}

/**
 * A continuous numbered rail. It caps each row at four columns, wraps larger
 * item sets, and uses only shared dividers rather than outlined cards.
 */
export function ServiceFeatureGrid({ items }: { items: ServiceFeatureItem[] }) {
  if (items.length === 0) return null;

  const columnCount = Math.min(Math.max(items.length, 1), 4) as 1 | 2 | 3 | 4;
  const columnClass = styles[`featureCols${columnCount}`];

  return (
    <div className={`${styles.featureRail} ${columnClass}`}>
      {items.map((item, i) => (
        <article
          key={`${item.number}-${item.title}`}
          className={styles.featureItem}
          style={{ animationDelay: `${0.05 + i * 0.05}s` }}
        >
          <div className={styles.featureNumber}>{item.number}</div>
          <h2 className={styles.featureTitle}>{item.title}</h2>
          <p className={styles.featureBody}>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
