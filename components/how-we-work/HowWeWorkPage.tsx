import Link from "next/link";
import { EditorialBannerHero } from "@/components/inner/EditorialBannerHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { SectionNav } from "@/components/sectors/SectionNav";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { JourneyStageGroup } from "@/components/how-we-work/JourneyStageGroup";
import type { HowWeWorkPageContent } from "@/lib/content/howWeWork";
import styles from "@/components/how-we-work/how-we-work.module.css";

export function HowWeWorkPage({ content }: { content: HowWeWorkPageContent }) {
  return (
    <main className={styles.page}>
      <div id="overview">
        <EditorialBannerHero
          eyebrow={content.hero.eyebrow}
          h1={content.hero.h1}
          h1Accent={content.hero.h1Accent}
          summary={content.hero.summary}
          primaryCta={content.hero.primaryCta}
          secondaryCta={content.hero.secondaryCta}
          bannerImage="/hero-portrait-audit.jpg"
          bannerAlt=""
          bannerPosition="50% 46%"
        />
      </div>

      <SectionNav sections={content.sectionNav} />

      <section id="six-stages" className={styles.stagesSection}>
        <div className={`container ${styles.readingWidth}`}>
          <div className={`${styles.sectionIntro} reveal`}>
            <div className={styles.eyebrow}>The full sequence</div>
            <h2>Six stages, with the details still visible.</h2>
            <p>Every granular deliverable and stated turnaround remains attached to the stage where it happens.</p>
          </div>
          <div className={styles.stages}>
            {content.stages.map((stage) => <JourneyStageGroup key={stage.number} {...stage} />)}
          </div>
        </div>
      </section>

      <section id="what-we-need" className={styles.supportSection}>
        <div className={`container ${styles.supportGrid}`}>
          <div className={`${styles.supportCopy} reveal`}>
            <div className={styles.eyebrow}>Your part</div>
            <h2>{content.involvement.heading}</h2>
            <p>{content.involvement.body}</p>
          </div>
          <aside id="breach-response" className={`${styles.breachCard} reveal delay-1`}>
            <div className={styles.eyebrow}>Outside the normal sequence</div>
            <h2>{content.breachAside.heading}</h2>
            <p>{content.breachAside.body}</p>
            <Link href={content.breachAside.href} className="mandate-link-check" style={{ color: "#fff", borderColor: "var(--color-teal-accent)" }}>
              <span>{content.breachAside.ctaLabel}</span><span aria-hidden>→</span>
            </Link>
          </aside>
        </div>
      </section>

      <div id="get-started">
        <InnerPageCta heading={content.closingCta.heading} primary={content.closingCta.primary} secondary={content.closingCta.secondary} cutoutImage="/services-hero-cutout-bust.png" />
      </div>
      <ScrollReveals />
    </main>
  );
}
