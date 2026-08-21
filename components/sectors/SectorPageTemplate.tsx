import Link from "next/link";
import { QuestionAccordion, type AccordionItem } from "@/components/sectors/QuestionAccordion";
import { ReasonCard } from "@/components/sectors/ReasonCard";
import { TurnaroundTracker } from "@/components/sectors/TurnaroundTracker";
import { SectionNav, type SectionNavItem } from "@/components/sectors/SectionNav";
import styles from "@/components/sectors/sector-page.module.css";

const CHAMFER = "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)";

// Four flat shades from the brand's green family, light to dark.
const REASON_SHADES = ["#7C918F", "#1D4B50", "#153C40", "#0E2325"];

export interface SectorPageContent {
  badge: string;
  guidedLabels: {
    credential: string;
    sequence: string;
    questions: string;
    reasonsFallback: string;
  };
  hero: {
    h1: string;
    subhead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  credentialBlock: {
    body: string;
    cta: { label: string; href: string };
    backgroundImage?: string;
  };
  /** Omitted where the approved copy has no turnaround table. */
  turnarounds?: { intro: string; steps: { step: string; deliverable: string; turnaround: string }[] };
  /** Omitted where the approved copy has no four-reason set. */
  reasons?: { title: string; body: string; cta?: { label: string; href: string } }[];
  reasonsHeading?: { lead: string; accent: string };
  accordion: AccordionItem[];
  /** Widens the accordion's container beyond the default 780px reading width
   *  — needed when a row contains a `StageTable` (3 columns need more room
   *  than prose does). Omit for accordions that are pure Q&A prose. */
  accordionMaxWidth?: string;
  /** Omitted under a documented R5 exception (no cleared client to name). */
  proof?: { clientName: string; body: string; cta: { label: string; href: string } };
  closingCta: {
    headingLead: string;
    headingAccent: string;
    eyebrow: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    cutoutImage: string;
  };
  sectionNav?: SectionNavItem[];
}

/**
 * Shared sector page shell, extracted from `/sectors/regulated-businesses`
 * (2026-08-20) so every sector route reads as one page type. That page's
 * treatments are reused verbatim — v5's `.process-portrait-card` recipe on the
 * cards, the photo-and-dark-overlay credential block, and the closing CTA's
 * rings-plus-cut-out construction.
 *
 * Turnarounds, reason cards and the proof block are optional because the
 * approved copy for each sector differs: inventing a turnaround table or a
 * proof item to fill a slot would breach the content rules in AGENTS.md.
 *
 * W-028 authorises this template to supersede the v5 port on
 * `/sectors/tertiary-institutions`.
 */
export function SectorPageTemplate({ content, viewId }: { content: SectorPageContent; viewId: string }) {
  return (
    <main id={viewId}>
      <SectionNav sections={content.sectionNav} />

      {/* Hero */}
      <section id="overview" className="section-light" style={{ padding: "100px 0 60px" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <div className="micro-cred-badge">
            <span className="micro-cred-dot"></span>
            <span>{content.badge}</span>
          </div>
          <h1 className="hero-h1-clean reveal active" style={{ marginTop: "12px" }}>
            <span className="h1-line-primary">{content.hero.h1}</span>
          </h1>
          <p className="hero-lede-text reveal active delay-1" style={{ maxWidth: "760px", margin: "20px auto 40px" }}>
            {content.hero.subhead}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={content.hero.primaryCta.href} className="btn-architectural-cta">
              <span className="btn-arch-label">{content.hero.primaryCta.label}</span>
              <span className="btn-arch-arrow">→</span>
            </Link>
            <Link href={content.hero.secondaryCta.href} className="mandate-link-check">
              <span>{content.hero.secondaryCta.label}</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Credential block — R10, independent of homepage */}
      <section className="section-light" style={{ padding: "0 0 60px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div
            className="reveal"
            style={{
              position: "relative",
              overflow: "hidden",
              color: "var(--color-text-white)",
              boxShadow: "var(--shadow-feature)",
              clipPath: CHAMFER,
              padding: "72px 56px",
              minHeight: "260px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative background photo behind a semi-transparent overlay, sized via plain CSS background rather than next/image's layout box */}
            <img
              src={content.credentialBlock.backgroundImage ?? "/hero-hologram.jpg"}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(115deg, rgba(8,23,25,0.97) 0%, rgba(8,23,25,0.94) 45%, rgba(8,23,25,0.86) 100%)",
                zIndex: 1,
              }}
            />
            <p className="hero-lede-text" style={{ position: "relative", zIndex: 2, color: "var(--color-text-white)", maxWidth: "620px", marginBottom: 0, fontSize: "1.05rem" }}>
              {content.credentialBlock.body}{" "}
              <Link href={content.credentialBlock.cta.href} className="underline decoration-[var(--color-teal-accent)] underline-offset-4">
                {content.credentialBlock.cta.label} →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Turnarounds */}
      {content.turnarounds ? (
        <section id="timeline" className="section-light" style={{ padding: "40px 0 80px" }}>
          <div className="container" style={{ maxWidth: "980px" }}>
            <p className="hero-lede-text reveal" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 32px" }}>
              {content.turnarounds.intro}
            </p>
            <TurnaroundTracker steps={content.turnarounds.steps} />
          </div>
        </section>
      ) : null}

      {/* Four reasons */}
      {content.reasons ? (
        <section id="why-it-matters" className="section-light" style={{ padding: "0 0 90px" }}>
          <div className="container" style={{ maxWidth: "1080px" }}>
            {content.reasonsHeading ? (
              <div className="process-header-center reveal" style={{ marginBottom: "40px" }}>
                <h2 className="section-h2-title">
                  <span style={{ color: "var(--color-forest-dark)" }}>{content.reasonsHeading.lead}</span>{" "}
                  <span style={{ color: "var(--color-teal-accent)" }}>{content.reasonsHeading.accent}</span>
                </h2>
              </div>
            ) : null}
            <div className={styles.reasonsGrid}>
              {content.reasons.map((reason, i) => (
                <ReasonCard
                  key={reason.title}
                  title={reason.title}
                  body={reason.body}
                  cta={reason.cta}
                  shade={REASON_SHADES[i]}
                  index={`0${i + 1}`}
                  delayIndex={i}
                />
              ))}
            </div>
            <div className="process-bottom-action reveal">
              <Link href="/am-i-covered" className="mandate-link-check">
                <span>Confirm which of these applies to you</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Numbered accordion */}
      <section id="questions" className="section-light" style={{ padding: "0 0 90px" }}>
        <div className="container" style={{ maxWidth: content.accordionMaxWidth ?? "780px" }}>
          <QuestionAccordion items={content.accordion} defaultOpen={0} />
        </div>
      </section>

      {/* Proof */}
      {content.proof ? (
        <section className="section-light" style={{ padding: "0 0 90px" }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <div
              className="reveal"
              style={{
                background: "#fff",
                border: "1px solid rgba(10, 28, 30, 0.09)",
                boxShadow: "0 6px 24px rgba(10, 28, 30, 0.05)",
                clipPath: CHAMFER,
                padding: "36px 40px 30px",
              }}
            >
              <p className="process-step-desc" style={{ marginBottom: 0 }}>
                <strong style={{ color: "var(--color-forest-dark)" }}>{content.proof.clientName}</strong> — {content.proof.body}{" "}
                <Link href={content.proof.cta.href} className="mandate-link-check">
                  <span>{content.proof.cta.label}</span>
                  <span>→</span>
                </Link>
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing CTA — centered, with a cut-out portrait "pasted" above the card edge */}
      <section id="get-started" style={{ padding: "80px 0 140px" }}>
        <div className="container">
          <div className={styles.closingFrame}>
            <div
              className={`${styles.closingCard} reveal`}
            >
              {/* Decorative concentric rings behind the portrait, same idea as the homepage self-check's .orbital-ring */}
              {[220, 300, 380].map((size) => (
                <div
                  key={size}
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: "50%",
                    border: `1px ${size === 300 ? "dashed" : "solid"} rgba(14, 35, 37, 0.08)`,
                    transform: "translate(-50%, -30%)",
                  }}
                />
              ))}

              <div className={styles.closingContent}>
                <div className={styles.closingEyebrow}>{content.closingCta.eyebrow}</div>
                <h2 className={`${styles.closingHeading} section-h2-title`}>
                  <span style={{ color: "var(--color-forest-dark)" }}>{content.closingCta.headingLead}</span>{" "}
                  <span style={{ color: "#FFFFFF" }}>{content.closingCta.headingAccent}</span>
                </h2>
                <div className={styles.closingActions}>
                  <Link href={content.closingCta.primary.href} className="btn-architectural-cta">
                    <span className="btn-arch-label">{content.closingCta.primary.label}</span>
                    <span className="btn-arch-arrow">→</span>
                  </Link>
                  <Link href={content.closingCta.secondary.href} className="mandate-link-check">
                    <span>{content.closingCta.secondary.label}</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* The cutout — bottom pinned exactly to the card's bottom edge (image is pre-cropped
                so the figure ends in a clean cut there), sized tall enough that the head
                overflows above the card's top edge. */}
            <div className={styles.closingCutout}>
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image's `fill` mode
                  mispainted this element's content well inside its actual (correctly computed)
                  bounding box, breaking the overflow effect; a plain img reproduces the intended
                  box exactly. */}
              <img
                src={content.closingCta.cutoutImage}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
