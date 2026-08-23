import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IndexSplitHero } from "@/components/inner/IndexSplitHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import {
  sectorsIndexClosing,
  sectorsIndexCoverage,
  sectorsIndexDirectory,
  sectorsIndexHero,
} from "@/lib/content/sectorsIndex";
import styles from "@/components/sectors/sectors-directory.module.css";

export function SectorsDirectory() {
  return (
    <main>
      <IndexSplitHero
        eyebrow={sectorsIndexHero.eyebrow}
        title={sectorsIndexHero.title}
        titleAccent={sectorsIndexHero.titleAccent}
        summary={sectorsIndexHero.summary}
        primaryCta={sectorsIndexHero.primaryCta}
        secondaryCta={sectorsIndexHero.secondaryCta}
        metrics={sectorsIndexHero.metrics}
        image={{ src: "/regulated-businesses-cutout.png", alt: "Thanelinc compliance adviser carrying an NDPC report", width: 500, height: 810 }}
        floatingPanel={sectorsIndexHero.floatingPanel}
        credentialPanel={sectorsIndexHero.credentialPanel}
        variant="sectors"
      />

      <section id="sector-directory" className={styles.directorySection}>
        <div className="container">
          <div className={styles.intro}>
            <div className={`${styles.eyebrow} reveal`}>{sectorsIndexDirectory.eyebrow}</div>
            <div className="reveal delay-1">
              <h2>{sectorsIndexDirectory.h2}</h2>
              <p>{sectorsIndexDirectory.subhead}</p>
            </div>
          </div>

          <div className={styles.sectorGrid}>
            {sectorsIndexDirectory.cards.map((card, index) => (
              <article key={card.href} className={`${styles.sectorCard} reveal delay-${index + 1}`}>
                <div className={styles.cardTop}>
                  <div className={styles.icon}><ServiceRowIcon name={card.icon} size={40} /></div>
                  <div className={styles.number}>{card.number}</div>
                </div>
                <div className={styles.cardEyebrow}>{card.eyebrow}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <ul className={styles.categories} aria-label={`${card.title} categories`}>
                  {card.categories.map((category) => <li key={category}>{category}</li>)}
                </ul>
                <Link href={card.href} className={styles.cardLink}>
                  <span>{card.cta}</span><ArrowUpRight aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.coverageSection}>
        <div className={`container ${styles.coverageGrid}`}>
          <div className={`${styles.coverageEyebrow} reveal`}>{sectorsIndexCoverage.eyebrow}</div>
          <div className="reveal delay-1">
            <h2>{sectorsIndexCoverage.h2}</h2>
            <p>{sectorsIndexCoverage.body}</p>
            <Link href={sectorsIndexCoverage.cta.href} className={styles.coverageLink}>
              <span>{sectorsIndexCoverage.cta.label}</span><ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <InnerPageCta
        heading={sectorsIndexClosing.heading}
        primary={sectorsIndexClosing.primary}
        secondary={sectorsIndexClosing.secondary}
        backgroundImage="/hero-hologram.jpg"
        cutoutImage="/services-hero-cutout-bust.png"
      />
      <ScrollReveals />
    </main>
  );
}
