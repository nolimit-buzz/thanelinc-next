import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IndexSplitHero } from "@/components/inner/IndexSplitHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import type { SectorsPageContent } from "@/lib/cms/mapSectors";
import styles from "@/components/sectors/sectors-directory.module.css";

export function SectorsDirectory({ content }: { content: SectorsPageContent }) {
  const { hero, directory, coverage, closing } = content;
  return (
    <main>
      <IndexSplitHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleAccent={hero.titleAccent}
        summary={hero.summary}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
        metrics={hero.metrics}
        image={hero.image}
        floatingPanel={hero.floatingPanel}
        credentialPanel={hero.credentialPanel}
        variant="sectors"
      />

      <section id="sector-directory" className={styles.directorySection}>
        <div className="container">
          <div className={styles.intro}>
            <div className={`${styles.eyebrow} reveal`}>{directory.eyebrow}</div>
            <div className="reveal delay-1">
              <h2>{directory.h2}</h2>
              <p>{directory.subhead}</p>
            </div>
          </div>

          <div className={styles.sectorGrid}>
            {directory.cards.map((card, index) => (
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
          <div className={`${styles.coverageEyebrow} reveal`}>{coverage.eyebrow}</div>
          <div className="reveal delay-1">
            <h2>{coverage.h2}</h2>
            <p>{coverage.body}</p>
            <Link href={coverage.cta.href} className={styles.coverageLink}>
              <span>{coverage.cta.label}</span><ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <InnerPageCta
        heading={closing.heading}
        primary={closing.primary}
        secondary={closing.secondary}
        backgroundImage={closing.backgroundImage ?? "/hero-hologram.jpg"}
        cutoutImage={closing.cutoutImage ?? "/services-hero-cutout-bust.png"}
      />
      <ScrollReveals />
    </main>
  );
}
