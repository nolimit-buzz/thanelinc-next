import Link from "next/link";
import { EditorialBannerHero } from "@/components/inner/EditorialBannerHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import type { AboutPageContent } from "@/lib/content/about";
import styles from "@/components/about/about.module.css";

export function AboutPage({ content }: { content: AboutPageContent }) {
  return (
    <main className={styles.page}>
      <EditorialBannerHero
        eyebrow={content.hero.eyebrow}
        h1={content.hero.h1}
        h1Accent={content.hero.h1Accent}
        summary={content.hero.summary}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
        bannerImage="/services-banner-glass-architecture.jpg"
        bannerAlt=""
      />

      <section className={styles.positioningSection}>
        <div className={`container ${styles.readingWidth}`}>
          <div className={`${styles.positioning} reveal`}>
            <div className={styles.eyebrow}>{content.positioning.eyebrow}</div>
            <h2>{content.positioning.heading}</h2>
            <p>{content.positioning.body}</p>
          </div>
        </div>
      </section>

      <section className={styles.pathwaysSection}>
        <div className={`container ${styles.pathways}`}>
          {content.pathways.map((pathway, index) => (
            <article className={`${styles.pathway} reveal delay-${index + 1}`} key={pathway.title}>
              <div className={styles.eyebrow}>{pathway.eyebrow}</div>
              <h2>{pathway.title}</h2>
              <p>{pathway.body}</p>
              <Link href={pathway.href} className="mandate-link-check">
                <span>{pathway.ctaLabel}</span><span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={`container ${styles.processCard} reveal`}>
          <div>
            <div className={styles.eyebrow}>Before you start</div>
            <h2>{content.process.heading}</h2>
            <p>{content.process.body}</p>
          </div>
          <Link href={content.process.href} className="btn-architectural-cta">
            <span className="btn-arch-label">{content.process.ctaLabel}</span><span className="btn-arch-arrow">→</span>
          </Link>
        </div>
      </section>

      <InnerPageCta heading={content.closingCta.heading} primary={content.closingCta.primary} secondary={content.closingCta.secondary} cutoutImage="/services-hero-cutout-bust.png" />
      <ScrollReveals />
    </main>
  );
}
