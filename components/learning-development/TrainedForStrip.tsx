import styles from "@/components/learning-development/learning-development.module.css";
import type { LearningDevelopmentClientsContent } from "@/lib/cms/mapLearningDevelopment";

/**
 * "Who we have trained for" — names as text.
 *
 * Not `TrackRecord`: that component requires a raw-SVG `logoMarkup` for every
 * entry, and not every name published here has one. A text strip keeps the
 * names accurate without inventing or omitting a mark.
 */
export function TrainedForStrip({ content }: { content: LearningDevelopmentClientsContent }) {
  if (content.clients.length === 0) return null;

  return (
    <section className={styles.clientsSection}>
      <div className="container">
        <div className="reveal">
          <h2 className={styles.clientsLabel}>{content.label}</h2>
          <ul className={styles.clientsList}>
            {content.clients.map((name) => (
              <li key={name} className={styles.clientName}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
