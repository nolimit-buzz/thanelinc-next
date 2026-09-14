import { IndexSplitHero } from "@/components/inner/IndexSplitHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { TrackRecord } from "@/components/v5/TrackRecord";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import styles from "@/components/services/services-directory.module.css";
import ldStyles from "@/components/learning-development/learning-development.module.css";
import type { LearningDevelopmentPageContent } from "@/lib/cms/mapLearningDevelopment";

/**
 * Mirrors ServicesDirectory.tsx's structure and reuses its CSS module
 * directly, so this page reads as the same design system as /services:
 * IndexSplitHero, then a dark "approach" band styled like Services' Problem
 * band, a numbered directory band for the focus areas, then the same
 * infinite-scroll logo marquee (TrackRecord) the homepage and /about use.
 * Unlike ServicesDirectory, the directory here is a single ungrouped set (the
 * 10 focus areas were never grouped in the CMS) — its card renderer below is
 * local and simpler rather than a reuse of ServicesDirectory's own.
 */
export function LearningDevelopmentPage({ content }: { content: LearningDevelopmentPageContent }) {
  const { hero, approach, clients, focusAreas, closing } = content;

  return (
    <main>
      <IndexSplitHero
        eyebrow={hero.eyebrow}
        title={hero.h1}
        titleAccent={hero.titleAccent}
        summary={hero.summary}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        metrics={hero.metrics}
        image={hero.image}
        floatingPanel={hero.floatingPanel}
        credentialPanel={hero.credentialPanel}
        variant="learning-development"
      />

      <section className={styles.problemSection}>
        <div className="container">
          <div className={styles.problemIntro}>
            <div className={`${styles.sectionEyebrow} reveal`}>{approach.eyebrow}</div>
            <div className="reveal delay-1">
              <h2>{approach.h2}</h2>
              <p>{approach.body}</p>
            </div>
          </div>
          <div className={styles.problemGrid}>
            {approach.cards.map((card, index) => (
              <article key={card.title} className={`${styles.problemCard} reveal delay-${index + 1}`}>
                <div className={styles.problemIcon}>
                  <ServiceRowIcon name={card.icon} size={25} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.directorySection} id="focus-areas">
        <div className="container">
          <div className={styles.directoryIntro}>
            <div className={`${styles.sectionEyebrow} reveal`}>{focusAreas.eyebrow}</div>
            <div className="reveal delay-1">
              <h2>{focusAreas.h2}</h2>
              {focusAreas.subhead ? <p>{focusAreas.subhead}</p> : null}
            </div>
          </div>
          <div className={styles.serviceGrid}>
            {focusAreas.items.map((item, index) => (
              <article key={item.number} className={`${styles.serviceCard} reveal delay-${Math.min((index % 4) + 1, 4)}`}>
                <div className={styles.serviceCardTop}>
                  <div className={styles.serviceNumber}>{item.number}</div>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {clients.logos.length > 0 ? (
        <TrackRecord
          className={ldStyles.trainedFor}
          content={{ badge: clients.eyebrow, heading: clients.heading, body: "", logos: clients.logos }}
        />
      ) : null}

      <InnerPageCta
        heading={closing.heading}
        primary={closing.primaryCta}
        backgroundImage={closing.backgroundImage}
      />

      {/* Must stay last — this is what activates the `reveal` classes above. */}
      <ScrollReveals />
    </main>
  );
}
