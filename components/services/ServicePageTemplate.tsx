import Link from "next/link";
import type { ReactNode } from "react";
import { Clock3, FileCheck } from "lucide-react";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import innerStyles from "@/components/inner/inner-page.module.css";
import { QuestionAccordion, type AccordionItem } from "@/components/sectors/QuestionAccordion";
import { ServiceBannerHero, type ServiceBannerHeroProps } from "@/components/services/ServiceBannerHero";
import type { ServiceFeatureItem } from "@/components/services/ServiceFeatureGrid";
import { TwoTonedHero, type TwoTonedHeroProps } from "@/components/services/TwoTonedHero";
import { ScrollReveals } from "@/components/v5/ScrollReveals";

const CHAMFER = "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)";

export interface ServiceBodyBlock {
  heading: string;
  body?: string;
  steps?: string[];
  links?: { label: string; href: string }[];
}

export interface ServicePageContent {
  hero: Omit<TwoTonedHeroProps, "variant" | "accentCard">;
  heroVariant: "light" | "dark";
  bannerHero?: ServiceBannerHeroProps;
  features?: ServiceFeatureItem[];
  whatYouGet: { label: string; body: string; deliverable: string; turnaround: string };
  bodyBlocks: ServiceBodyBlock[];
  whoThisIsFor: { label: string; href: string }[];
  closingCta: {
    heading: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
    backgroundImage?: string;
    cutoutImage?: string;
  };
}

function EditorialOutcome({ content, icon }: { content: ServicePageContent; icon?: ReactNode }) {
  return (
    <section className={innerStyles.outcomeSection}>
      <div className="container">
        <div className={`${innerStyles.outcomeBand} reveal`}>
          {icon ? <div className={innerStyles.outcomeIcon}>{icon}</div> : null}
          <div>
            <div className={innerStyles.outcomeLabel}>{content.whatYouGet.label}</div>
            <p className={innerStyles.outcomeBody}>{content.whatYouGet.body}</p>
          </div>
          <div className={innerStyles.outcomeFacts} aria-label="Service outcome">
            <div className={innerStyles.outcomeFact}>
              <FileCheck aria-hidden className={innerStyles.outcomeFactIcon} />
              <div>
                <div className={innerStyles.outcomeFactLabel}>Deliverable</div>
                <div className={innerStyles.outcomeFactValue}>{content.whatYouGet.deliverable}</div>
              </div>
            </div>
            <div className={innerStyles.outcomeFact}>
              <Clock3 aria-hidden className={innerStyles.outcomeFactIcon} />
              <div>
                <div className={innerStyles.outcomeFactLabel}>Turnaround</div>
                <div className={innerStyles.outcomeFactValue}>{content.whatYouGet.turnaround}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialNarrative({ content }: { content: ServicePageContent }) {
  return (
    <section className={innerStyles.narrativeSection}>
      <div className="container">
        <div className={innerStyles.narrativeGrid}>
          <div className={innerStyles.storyList}>
            {content.bodyBlocks.map((block, blockIndex) => (
              <article key={block.heading} className={`${innerStyles.storyBlock} reveal delay-${Math.min(blockIndex + 1, 4)}`}>
                <div className={innerStyles.storyNumber}>{String(blockIndex + 1).padStart(2, "0")}</div>
                <div>
                  <h2 className={innerStyles.storyHeading}>{block.heading}</h2>
                  {block.body ? <p className={innerStyles.storyBody}>{block.body}</p> : null}
                  {block.steps ? (
                    <ol className={innerStyles.storySteps}>
                      {block.steps.map((step, stepIndex) => (
                        <li key={step} className={innerStyles.storyStep}>
                          <span aria-hidden className={innerStyles.stepDot}>{stepIndex + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {block.links?.length ? (
                    <div className={innerStyles.storyLinks}>
                      {block.links.map((link) => (
                        <Link key={link.href} href={link.href} className="mandate-link-check">
                          <span>{link.label}</span>
                          <span aria-hidden>→</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <aside className={`${innerStyles.audiencePanel} reveal delay-2`}>
            <h2 className={innerStyles.audienceHeading}>Who this is for</h2>
            <div className={innerStyles.audienceLinks}>
              {content.whoThisIsFor.map((item) => (
                <Link key={item.href} href={item.href} className={innerStyles.audienceLink}>
                  <span>{item.label}</span>
                  <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LegacyOutcome({ content, icon }: { content: ServicePageContent; icon?: ReactNode }) {
  return (
    <section className="section-light" style={{ padding: "60px 0 0" }}>
      <div className="container" style={{ maxWidth: "820px" }}>
        <div style={{ background: "var(--color-forest-dark)", color: "#fff", clipPath: CHAMFER, padding: "44px 40px", boxShadow: "var(--shadow-feature)", animation: "fade-in-up 0.6s var(--ease-out-cubic) both" }}>
          {icon ? <div style={{ marginBottom: "18px" }}>{icon}</div> : null}
          <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-teal-accent)", marginBottom: "10px" }}>{content.whatYouGet.label}</div>
          <p className="hero-lede-text" style={{ color: "#fff", maxWidth: "none", marginBottom: "20px" }}>{content.whatYouGet.body}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <span className="ui-tag-status ui-tag-success" style={{ fontSize: "0.85rem", padding: "6px 14px" }}>{content.whatYouGet.deliverable}</span>
            <span className="ui-tag-status ui-tag-teal" style={{ fontSize: "0.85rem", padding: "6px 14px" }}>{content.whatYouGet.turnaround}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegacyClosingCta({ content }: { content: ServicePageContent }) {
  return (
    <section style={{ padding: "80px 0 140px" }}>
      <div className="container">
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative", overflow: "hidden", clipPath: CHAMFER, textAlign: "center", padding: "64px 40px 48px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative background photo */}
            <img src={content.closingCta.backgroundImage ?? "/hero-hologram.jpg"} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(8,23,25,0.97) 0%, rgba(8,23,25,0.94) 45%, rgba(8,23,25,0.86) 100%)", zIndex: 1 }} />
            {[220, 300, 380].map((size) => (
              <div key={size} aria-hidden style={{ position: "absolute", top: 0, left: "50%", width: `${size}px`, height: `${size}px`, borderRadius: "50%", border: `1px ${size === 300 ? "dashed" : "solid"} rgba(255,255,255,0.10)`, transform: "translate(-50%, -30%)", zIndex: 2 }} />
            ))}
            <h2 className="section-h2-title" style={{ color: "#fff", maxWidth: "560px", margin: "0 auto", position: "relative", zIndex: 3 }}>{content.closingCta.heading}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "28px", position: "relative", zIndex: 3 }}>
              <Link href={content.closingCta.primary.href} className="btn-architectural-cta btn-architectural-cta-light">
                <span className="btn-arch-label">{content.closingCta.primary.label}</span><span className="btn-arch-arrow">→</span>
              </Link>
              {content.closingCta.secondary ? (
                <Link href={content.closingCta.secondary.href} className="mandate-link-check" style={{ color: "#fff", borderColor: "var(--color-teal-accent)" }}>
                  <span>{content.closingCta.secondary.label}</span><span>↗</span>
                </Link>
              ) : null}
            </div>
          </div>
          {content.closingCta.cutoutImage ? (
            <div style={{ position: "absolute", bottom: 0, right: "70px", width: "300px", height: "490px", zIndex: 4, filter: "drop-shadow(0 24px 30px rgba(10,28,30,0.35))", pointerEvents: "none" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- CSS-sized decorative cutout */}
              <img src={content.closingCta.cutoutImage} alt="" style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom" }} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function ServicePageTemplate({ content, icon }: { content: ServicePageContent; icon?: ReactNode }) {
  const isEditorial = Boolean(content.bannerHero);
  const accordionItems: AccordionItem[] = [
    ...content.bodyBlocks.map((block, i) => ({ number: `0${i + 1}`, heading: block.heading, body: block.body, steps: block.steps })),
    { number: `0${content.bodyBlocks.length + 1}`, heading: "Who this is for", links: content.whoThisIsFor },
  ];

  return (
    <main>
      {content.bannerHero ? (
        <ServiceBannerHero
          {...content.bannerHero}
          summary={content.bannerHero.summary ?? content.hero.subhead}
          primaryCta={content.bannerHero.primaryCta ?? content.hero.primaryCta}
          secondaryCta={content.bannerHero.secondaryCta ?? content.hero.secondaryCta}
          features={content.features}
        />
      ) : (
        <TwoTonedHero variant={content.heroVariant} layout="full-width" {...content.hero} />
      )}

      {isEditorial ? <EditorialOutcome content={content} icon={icon} /> : <LegacyOutcome content={content} icon={icon} />}

      {isEditorial ? (
        <EditorialNarrative content={content} />
      ) : (
        <section className="section-light" style={{ padding: "70px 0 90px" }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <QuestionAccordion items={accordionItems} defaultOpen={0} />
          </div>
        </section>
      )}

      {isEditorial ? (
        <InnerPageCta
          heading={content.closingCta.heading}
          primary={content.closingCta.primary}
          secondary={content.closingCta.secondary}
          backgroundImage={content.closingCta.backgroundImage}
          cutoutImage={content.closingCta.cutoutImage}
        />
      ) : (
        <LegacyClosingCta content={content} />
      )}
      <ScrollReveals />
    </main>
  );
}
