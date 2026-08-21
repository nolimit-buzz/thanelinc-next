import Link from "next/link";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { QuestionAccordion } from "@/components/sectors/QuestionAccordion";
import type { SectorPageContent } from "@/components/sectors/SectorPageTemplate";
import { TurnaroundTracker } from "@/components/sectors/TurnaroundTracker";
import { ServiceBannerHero } from "@/components/services/ServiceBannerHero";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { designReview } from "@/lib/content/designReview";
import styles from "@/components/design-review/sector-preview.module.css";

const PREVIEW_IMAGES = [
  "/hero-hologram.jpg",
  "/services-banner-glass-architecture.jpg",
  "/hero-portrait-sectors.jpg",
  "/hero-portrait-audit.jpg",
];

function ReviewBar({ option, reference }: { option: string; reference: string }) {
  return (
    <div className={styles.reviewBar}>
      <div className={`container ${styles.reviewBarInner}`}>
        <span>{designReview.eyebrow} · {option}</span>
        <span>{reference} · <Link href="/design-review">Back to comparison</Link></span>
      </div>
    </div>
  );
}

function Actions({ content }: { content: SectorPageContent }) {
  return (
    <div className={styles.actions}>
      <Link href={content.hero.primaryCta.href} className="btn-architectural-cta">
        <span className="btn-arch-label">{content.hero.primaryCta.label}</span><span className="btn-arch-arrow">→</span>
      </Link>
      <Link href={content.hero.secondaryCta.href} className="mandate-link-check">
        <span>{content.hero.secondaryCta.label}</span><span>↗</span>
      </Link>
    </div>
  );
}

export function GuidedJourneyPreview({ content }: { content: SectorPageContent }) {
  const labels = designReview.sector.guided;
  const [titleLead, ...titleAccentParts] = content.hero.h1.split(" for ");
  const titleAccent = titleAccentParts.length ? `for ${titleAccentParts.join(" for ")}` : undefined;
  return (
    <main className={styles.page}>
      <ReviewBar option={labels.optionLabel} reference={labels.reference} />
      <ServiceBannerHero
        eyebrow={content.badge}
        h1={titleLead}
        h1Accent={titleAccent}
        summary={content.hero.subhead}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
        bannerImage="/hero-portrait-sectors.jpg"
        bannerAlt=""
        bannerPosition="50% 28%"
      />

      {content.reasons ? (
        <section className={styles.journeySection}>
          <div className={`container ${styles.journeyGrid}`}>
            <div className={styles.reasonPanel}>
              <h2 className={`${styles.sectionTitle} reveal`}>{labels.reasonHeading}</h2>
              <div className={styles.reasonList}>
                {content.reasons.map((reason, index) => (
                  <article className={`${styles.reasonItem} reveal delay-${Math.min(index + 1, 4)}`} key={reason.title}>
                    <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
                    <div><h3>{reason.title}</h3><p>{reason.body}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <aside className={`${styles.credentialPanel} reveal delay-2`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- CSS-sized placeholder review media */}
              <img src={content.credentialBlock.backgroundImage ?? PREVIEW_IMAGES[0]} alt="" />
              <div className={styles.credentialCopy}>
                <div className={styles.eyebrow}>{labels.credentialLabel}</div>
                <p>{content.credentialBlock.body}</p>
                <Link href={content.credentialBlock.cta.href} className="mandate-link-check" style={{ color: "#fff" }}>
                  <span>{content.credentialBlock.cta.label}</span><span>→</span>
                </Link>
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {content.turnarounds ? (
        <section className={styles.sequenceSection}>
          <div className={`container ${styles.narrow}`}>
            <h2 className={`${styles.sectionTitle} reveal`}>{labels.sequenceHeading}</h2>
            <p className={`${styles.summary} reveal delay-1`} style={{ marginBottom: "28px" }}>{content.turnarounds.intro}</p>
            <div className="reveal delay-2"><TurnaroundTracker steps={content.turnarounds.steps} /></div>
          </div>
        </section>
      ) : null}

      <section className={styles.questionsSection}>
        <div className={`container ${styles.narrow}`}>
          <h2 className={`${styles.sectionTitle} reveal`}>{labels.questionsHeading}</h2>
          <div className="reveal delay-1"><QuestionAccordion items={content.accordion} defaultOpen={0} /></div>
        </div>
      </section>
      <InnerPageCta heading={`${content.closingCta.headingLead} ${content.closingCta.headingAccent}`} primary={content.closingCta.primary} secondary={content.closingCta.secondary} backgroundImage="/hero-hologram.jpg" cutoutImage={content.closingCta.cutoutImage} />
      <ScrollReveals />
    </main>
  );
}

export function EditorialGridPreview({ content }: { content: SectorPageContent }) {
  const labels = designReview.sector.editorial;
  const storyItems = [
    { label: labels.credentialLabel, title: content.badge, body: content.credentialBlock.body },
    ...content.accordion.slice(0, 2).map((item) => ({ label: item.number, title: item.heading, body: item.body ?? "" })),
    ...(content.proof ? [{ label: labels.proofLabel, title: content.proof.clientName, body: content.proof.body }] : []),
  ];

  return (
    <main className={styles.page}>
      <ReviewBar option={labels.optionLabel} reference={labels.reference} />
      <section className={styles.editorialHeader}>
        <div className="container">
          <div className={styles.editorialHeadingRow}>
            <div className={styles.eyebrow}>{content.badge}</div>
            <div>
              <h1 className={styles.title}>{content.hero.h1}</h1>
              <p className={styles.summary}>{content.hero.subhead}</p>
              <Actions content={content} />
            </div>
          </div>
          <div className={styles.editorialBanner}>
            {/* eslint-disable-next-line @next/next/no-img-element -- CSS-sized placeholder review media */}
            <img src="/services-banner-glass-architecture.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={`container ${styles.storyRows}`}>
          {storyItems.map((item, index) => (
            <article className={styles.storyRow} key={`${item.label}-${item.title}`}>
              <div className={styles.storyMedia}>
                {/* eslint-disable-next-line @next/next/no-img-element -- CSS-sized placeholder review media */}
                <img src={PREVIEW_IMAGES[index % PREVIEW_IMAGES.length]} alt="" />
              </div>
              <div className={styles.storyCopy}>
                <div className={styles.eyebrow}>{item.label}</div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {content.reasons ? (
        <section className={styles.matrixSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>{labels.matrixHeading}</h2>
            <div className={styles.matrix}>
              {content.reasons.map((reason, index) => (
                <article key={reason.title} className={styles.matrixItem}>
                  <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
                  <h3>{reason.title}</h3><p>{reason.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.questionsSection} style={{ paddingTop: "104px" }}>
        <div className={`container ${styles.narrow}`}>
          <h2 className={styles.sectionTitle}>{labels.questionsHeading}</h2>
          <QuestionAccordion items={content.accordion} defaultOpen={0} />
        </div>
      </section>
      <InnerPageCta heading={`${content.closingCta.headingLead} ${content.closingCta.headingAccent}`} primary={content.closingCta.primary} secondary={content.closingCta.secondary} backgroundImage="/hero-portrait-sectors.jpg" />
      <ScrollReveals />
    </main>
  );
}
