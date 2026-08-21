import Link from "next/link";
import { ServiceFeatureGrid, type ServiceFeatureItem } from "@/components/services/ServiceFeatureGrid";
import styles from "@/components/inner/inner-page.module.css";

export interface ServiceBannerHeroProps {
  eyebrow: string;
  h1: string;
  h1Accent?: string;
  bannerImage: string;
  bannerAlt?: string;
  bannerPosition?: string;
  summary?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function ServiceBannerHero({
  eyebrow,
  h1,
  h1Accent,
  bannerImage,
  bannerAlt = "",
  bannerPosition,
  summary,
  primaryCta,
  secondaryCta,
  features,
}: ServiceBannerHeroProps & { features?: ServiceFeatureItem[] }) {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={`${styles.headingRow} reveal`}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              {h1}
              {h1Accent ? <span className={styles.heroAccent}> {h1Accent}</span> : null}
            </h1>
            {summary ? <p className={styles.heroSummary}>{summary}</p> : null}
            {primaryCta || secondaryCta ? (
              <div className={styles.heroActions}>
                {primaryCta ? (
                  <Link href={primaryCta.href} className="btn-architectural-cta">
                    <span className="btn-arch-label">{primaryCta.label}</span>
                    <span className="btn-arch-arrow">→</span>
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link href={secondaryCta.href} className="mandate-link-check">
                    <span>{secondaryCta.label}</span>
                    <span>↗</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className={`${styles.bannerSurface} reveal delay-1`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed, CSS-sized editorial banner */}
          <img src={bannerImage} alt={bannerAlt} className={styles.bannerImage} style={bannerPosition ? { objectPosition: bannerPosition } : undefined} />
          {features ? <ServiceFeatureGrid items={features} /> : null}
        </div>
      </div>
    </section>
  );
}
