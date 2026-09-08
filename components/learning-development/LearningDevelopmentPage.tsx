import { EditorialBannerHero } from "@/components/inner/EditorialBannerHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { ServiceFeatureGrid } from "@/components/services/ServiceFeatureGrid";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { DeliveryImpactBand } from "@/components/learning-development/DeliveryImpactBand";
import { TrainedForStrip } from "@/components/learning-development/TrainedForStrip";
import styles from "@/components/learning-development/learning-development.module.css";
import type { LearningDevelopmentPageContent } from "@/lib/cms/mapLearningDevelopment";

export function LearningDevelopmentPage({ content }: { content: LearningDevelopmentPageContent }) {
  const { hero, delivery, clients, focusAreas, closing } = content;

  return (
    <main id="view-learning-development">
      <EditorialBannerHero
        eyebrow={hero.eyebrow}
        h1={hero.h1}
        bannerImage={hero.bannerImage}
        bannerAlt={hero.bannerAlt}
        summary={hero.summary}
        primaryCta={hero.primaryCta.href ? hero.primaryCta : undefined}
      />

      <DeliveryImpactBand content={delivery} />

      <TrainedForStrip content={clients} />

      <section className={styles.focusSection}>
        <div className="container">
          <h2 className={styles.focusLabel}>{focusAreas.label}</h2>
          {/* h3 so the ten items rank below this section's own "Focus Areas" heading. */}
          <ServiceFeatureGrid items={focusAreas.items} titleAs="h3" />
        </div>
      </section>

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
