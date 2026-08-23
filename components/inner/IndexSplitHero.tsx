import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import styles from "@/components/inner/index-split-hero.module.css";

export interface IndexHeroMetric {
  value: string;
  label: string;
}

export interface IndexHeroPanel {
  eyebrow: string;
  title: string;
  body: string;
}

export interface IndexSplitHeroProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  summary: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  metrics: IndexHeroMetric[];
  image: { src: string; alt: string; width: number; height: number };
  floatingPanel: IndexHeroPanel;
  credentialPanel: IndexHeroPanel;
  variant: "services" | "sectors";
}

export interface IndexHeroVisualProps {
  eyebrow: string;
  image: IndexSplitHeroProps["image"];
  floatingPanel: IndexHeroPanel;
  credentialPanel: IndexHeroPanel;
  variant: IndexSplitHeroProps["variant"];
  /** Lets the exact visual construction live inside the homepage carousel. */
  carousel?: boolean;
}

/**
 * Shared right-hand visual used verbatim by the two index heroes. It is also
 * the homepage carousel's artwork so the visual construction cannot drift.
 */
export function IndexHeroVisual({
  eyebrow,
  image,
  floatingPanel,
  credentialPanel,
  variant,
  carousel = false,
}: IndexHeroVisualProps) {
  return (
    <div
      className={`${styles.visual} ${styles[variant]}`}
      aria-label={`${eyebrow} overview`}
      style={carousel ? { height: "100%", minHeight: 0, animation: "none" } : undefined}
    >
      <div className={styles.visualFrame} aria-hidden>
        <div className={styles.orbitOne} />
        <div className={styles.orbitTwo} />
      </div>

      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={styles.portrait}
        priority
      />

      <div className={styles.floatingPanel}>
        <div className={styles.panelEyebrow}>{floatingPanel.eyebrow}</div>
        <strong>{floatingPanel.title}</strong>
        <p>{floatingPanel.body}</p>
      </div>

      <div className={styles.credentialPanel}>
        <CheckCircle2 aria-hidden />
        <div>
          <div className={styles.panelEyebrow}>{credentialPanel.eyebrow}</div>
          <strong>{credentialPanel.title}</strong>
          <p>{credentialPanel.body}</p>
        </div>
      </div>
    </div>
  );
}

export function IndexSplitHero({
  eyebrow,
  title,
  titleAccent,
  summary,
  primaryCta,
  secondaryCta,
  metrics,
  image,
  floatingPanel,
  credentialPanel,
  variant,
}: IndexSplitHeroProps) {
  return (
    <section className={`${styles.hero} ${styles[variant]}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h1>
            <span>{title}</span>{" "}
            <span className={styles.accent}>{titleAccent}</span>
          </h1>
          <p className={styles.summary}>{summary}</p>

          <div className={styles.actions}>
            <Link href={primaryCta.href} className={styles.primaryAction}>
              <span>{primaryCta.label}</span>
              <ArrowRight aria-hidden />
            </Link>
            <Link href={secondaryCta.href} className={styles.secondaryAction}>
              <span>{secondaryCta.label}</span>
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <dl className={styles.metrics} aria-label="At a glance">
            {metrics.map((metric) => (
              <div key={`${metric.value}-${metric.label}`}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <IndexHeroVisual
          eyebrow={eyebrow}
          image={image}
          floatingPanel={floatingPanel}
          credentialPanel={credentialPanel}
          variant={variant}
        />
      </div>
    </section>
  );
}
