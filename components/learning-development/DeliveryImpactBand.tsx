import innerStyles from "@/components/inner/inner-page.module.css";
import styles from "@/components/learning-development/learning-development.module.css";
import type { LearningDevelopmentDeliveryContent } from "@/lib/cms/mapLearningDevelopment";

/**
 * "How We Deliver" and "Our Impact" as one band.
 *
 * Deliberately reuses the dark outcome band from `inner-page.module.css` that
 * the service pages already use, rather than introducing a second dark-band
 * treatment. `EditorialOutcome` in ServicePageTemplate.tsx cannot be reused
 * directly — it is local to that file and hardwired to exactly two facts
 * (Deliverable/Turnaround); this one takes however many metrics the CMS holds.
 */
export function DeliveryImpactBand({ content }: { content: LearningDevelopmentDeliveryContent }) {
  return (
    <section className={innerStyles.outcomeSection}>
      <div className="container">
        <div className={`${innerStyles.outcomeBand} ${styles.band} reveal`}>
          <div>
            <h2 className={innerStyles.outcomeLabel}>{content.label}</h2>
            <p className={innerStyles.outcomeBody}>{content.body}</p>
          </div>
          {content.metrics.length > 0 ? (
            <div className={innerStyles.outcomeFacts} aria-label={content.metricsLabel || "Our impact"}>
              {content.metricsLabel ? <h2 className={styles.metricsHeading}>{content.metricsLabel}</h2> : null}
              {content.metrics.map((metric) => (
                <div key={metric.label} className={`${innerStyles.outcomeFact} ${styles.metricFact}`}>
                  <div className={styles.metricValue}>{metric.value}</div>
                  <div className={styles.metricLabel}>{metric.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
