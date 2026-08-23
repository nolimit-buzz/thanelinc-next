import Link from "next/link";
import type { ReactNode } from "react";
import styles from "@/components/inner/inner-page.module.css";

export interface EditorialBannerHeroProps {
  eyebrow: string;
  h1: string;
  h1Accent?: string;
  bannerImage: string;
  bannerAlt?: string;
  bannerPosition?: string;
  summary?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
}

/** Shared 420px editorial opening for inner pages. */
export function EditorialBannerHero({
  eyebrow,
  h1,
  h1Accent,
  bannerImage,
  bannerAlt = "",
  bannerPosition,
  summary,
  primaryCta,
  secondaryCta,
  children,
}: EditorialBannerHeroProps) {
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
                    <span aria-hidden>↗</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className={`${styles.bannerSurface} reveal delay-1`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed editorial image is CSS-sized and may be decorative */}
          <img src={bannerImage} alt={bannerAlt} className={styles.bannerImage} style={bannerPosition ? { objectPosition: bannerPosition } : undefined} />
          {children}
        </div>
      </div>
    </section>
  );
}
