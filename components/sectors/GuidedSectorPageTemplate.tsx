import Link from "next/link";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { QuestionAccordion } from "@/components/sectors/QuestionAccordion";
import type { SectorPageContent } from "@/components/sectors/SectorPageTemplate";
import { SectionNav } from "@/components/sectors/SectionNav";
import { TurnaroundTracker } from "@/components/sectors/TurnaroundTracker";
import { EditorialBannerHero } from "@/components/inner/EditorialBannerHero";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import styles from "@/components/sectors/guided-sector.module.css";

function splitTitle(title: string) {
  const [lead, ...accentParts] = title.split(" for ");
  return { lead, accent: accentParts.length ? `for ${accentParts.join(" for ")}` : undefined };
}

export function GuidedSectorPageTemplate({ content }: { content: SectorPageContent }) {
  const title = splitTitle(content.hero.h1);

  return (
    <main className={styles.page}>
      <div id="overview">
        <EditorialBannerHero
          eyebrow={content.badge}
          h1={title.lead}
          h1Accent={title.accent}
          summary={content.hero.subhead}
          primaryCta={content.hero.primaryCta}
          secondaryCta={content.hero.secondaryCta}
          bannerImage="/hero-portrait-sectors.jpg"
          bannerAlt=""
          bannerPosition="50% 28%"
        />
      </div>

      <SectionNav sections={content.sectionNav} />

      {content.reasons ? (
        <section id={content.reasonsId ?? "why-it-matters"} className={styles.journeySection}>
          <div className={`container ${styles.journeyGrid}`}>
            <div className={styles.reasonPanel}>
              <h2 className={`${styles.sectionTitle} reveal`}>{content.reasonsHeading ? `${content.reasonsHeading.lead} ${content.reasonsHeading.accent}` : content.guidedLabels.reasonsFallback}</h2>
              <div className={styles.reasonList}>
                {content.reasons.map((reason, index) => (
                  <article className={`${styles.reasonItem} reveal delay-${Math.min(index + 1, 4)}`} key={reason.title}>
                    <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.body}</p>
                      {reason.cta ? (
                        <Link href={reason.cta.href} className="mandate-link-check">
                          <span>{reason.cta.label}</span><span aria-hidden>→</span>
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <aside className={`${styles.credentialPanel} reveal delay-2`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- CSS-sized approved review media */}
              <img src={content.credentialBlock.backgroundImage ?? "/hero-hologram.jpg"} alt="" />
              <div className={styles.credentialCopy}>
                <div className={styles.eyebrow}>{content.guidedLabels.credential}</div>
                <p>{content.credentialBlock.body}</p>
                <Link href={content.credentialBlock.cta.href} className="mandate-link-check" style={{ color: "#fff" }}>
                  <span>{content.credentialBlock.cta.label}</span><span aria-hidden>→</span>
                </Link>
                {content.proof ? (
                  <div className={styles.proofNote}>
                    <strong>{content.proof.clientName}</strong>
                    <p>{content.proof.body}</p>
                    <Link href={content.proof.cta.href}>{content.proof.cta.label} →</Link>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {content.turnarounds ? (
        <section id="timeline" className={styles.sequenceSection}>
          <div className={`container ${styles.narrow}`}>
            <h2 className={`${styles.sectionTitle} reveal`}>{content.guidedLabels.sequence}</h2>
            <p className={`${styles.summary} reveal delay-1`}>{content.turnarounds.intro}</p>
            <div className="reveal delay-2"><TurnaroundTracker steps={content.turnarounds.steps} /></div>
          </div>
        </section>
      ) : null}

      <section id="questions" className={styles.questionsSection}>
        <div className={`container ${styles.narrow}`} style={{ maxWidth: content.accordionMaxWidth }}>
          <h2 className={`${styles.sectionTitle} reveal`}>{content.guidedLabels.questions}</h2>
          <div className="reveal delay-1"><QuestionAccordion items={content.accordion} defaultOpen={0} /></div>
        </div>
      </section>

      <div id="get-started">
        <InnerPageCta
          heading={`${content.closingCta.headingLead} ${content.closingCta.headingAccent}`}
          primary={content.closingCta.primary}
          secondary={content.closingCta.secondary}
          backgroundImage="/hero-hologram.jpg"
          cutoutImage={content.closingCta.cutoutImage}
        />
      </div>
      <ScrollReveals />
    </main>
  );
}
