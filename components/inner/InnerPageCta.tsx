import Link from "next/link";
import styles from "@/components/inner/inner-page.module.css";

export interface InnerPageCtaProps {
  heading: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  backgroundImage?: string;
  cutoutImage?: string;
}

export function InnerPageCta({ heading, primary, secondary, backgroundImage = "/hero-hologram.jpg", cutoutImage }: InnerPageCtaProps) {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={`${styles.ctaFrame} ${cutoutImage ? styles.ctaFrameWithCutout : ""} reveal`}>
          <div className={`${styles.ctaCard} ${cutoutImage ? styles.ctaCardWithCutout : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative, CSS-sized background media */}
            <img src={backgroundImage} alt="" className={styles.ctaImage} />
            <div aria-hidden className={styles.ctaOverlay} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaHeading}>{heading}</h2>
              <div className={styles.ctaActions}>
                <Link href={primary.href} className="btn-architectural-cta btn-architectural-cta-light">
                  <span className="btn-arch-label">{primary.label}</span>
                  <span className="btn-arch-arrow">→</span>
                </Link>
                {secondary ? (
                  <Link href={secondary.href} className="mandate-link-check" style={{ color: "#fff", borderColor: "var(--color-teal-accent)" }}>
                    <span>{secondary.label}</span>
                    <span>↗</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          {cutoutImage ? (
            <div className={styles.ctaCutout} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative cutout supplied by the approved page content */}
              <img src={cutoutImage} alt="" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
