import Link from "next/link";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesHeroCutout } from "@/components/services/ServicesHeroCutout";
import { IconAccentBox } from "@/components/services/IconAccentBox";
import { IndustrySectors } from "@/components/services/IndustrySectors";
import {
  servicesIndexHero,
  servicesIndexProblem,
  servicesIndexClosing,
  type ServiceRow,
} from "@/lib/content/servicesIndex";

const CHAMFER = "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)";

function ProblemCardIcon({ name }: { name: "alert-circle" | "grid" | "shield-alert" }) {
  if (name === "alert-circle") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
    );
  }
  if (name === "grid") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ServicesArchive({ services }: { services: ServiceRow[] }) {
  return (
    <main id="view-services-archive">
      {/* 1. HERO + cutout — wrapped together so the cutout can overlap past
          the hero's 480px bottom edge into "The Problem" below it. */}
      <div style={{ position: "relative" }}>
        <ServicesHero
          eyebrow={servicesIndexHero.eyebrow}
          h1={servicesIndexHero.h1}
          subhead={servicesIndexHero.subhead}
          primaryCta={servicesIndexHero.primaryCta}
        />
        <ServicesHeroCutout />

      {/* 2. THE PROBLEM — Full-bleed dark 3-column section */}
      <section
        style={{
          background: "var(--color-forest-dark)",
          color: "#FFFFFF",
          padding: "100px 0 110px",
          position: "relative",
        }}
      >
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div style={{ maxWidth: "780px", marginBottom: "64px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "4px",
                padding: "6px 14px",
                fontFamily: "var(--font-outfit)",
                fontSize: "0.775rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#CBD5E1",
                marginBottom: "20px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-teal-accent)", display: "inline-block" }} />
              {servicesIndexProblem.eyebrow}
            </div>

            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginBottom: "20px",
              }}
            >
              {servicesIndexProblem.h2}
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.65,
                color: "#94A3B8",
                maxWidth: "720px",
                margin: 0,
              }}
            >
              {servicesIndexProblem.description}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {servicesIndexProblem.cards.map((card, idx) => (
              <div
                key={card.title}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  clipPath: CHAMFER,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                  animation: "fade-in-up 0.6s var(--ease-out-cubic) both",
                  animationDelay: `${idx * 0.12}s`,
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "8px",
                    background: "rgba(28, 176, 184, 0.12)",
                    border: "1px solid rgba(28, 176, 184, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ProblemCardIcon name={card.icon} />
                </div>
                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    margin: "4px 0 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: "#94A3B8",
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* 3. THE SOLUTION — 8 Alternating Rows (white section so the grey
          row cards pop against it) */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "100px 0 110px",
        }}
      >
        <div className="container" style={{ maxWidth: "1140px" }}>
          <div style={{ maxWidth: "720px", marginBottom: "72px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#F0F5F4",
                border: "1px solid rgba(10,28,30,0.08)",
                borderRadius: "4px",
                padding: "6px 14px",
                fontFamily: "var(--font-outfit)",
                fontSize: "0.775rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--color-text-headline-teal)",
                marginBottom: "20px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-teal-accent)", display: "inline-block" }} />
              THE SOLUTION
            </div>

            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--color-forest-dark)",
                marginBottom: "16px",
              }}
            >
              Eight compliance services. One licensed DPCO partner.
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.6,
                color: "var(--color-text-body)",
                margin: 0,
              }}
            >
              Every service comes with a stated deliverable and a confirmed turnaround, structured to take your organisation from exposure to full statutory standing.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {services.map((service, index) => {
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isReversed ? "0.9fr 1.1fr" : "1.1fr 0.9fr",
                    gap: "40px",
                    alignItems: "center",
                    background: "var(--color-mineral-canvas)",
                    boxShadow: "0 6px 20px rgba(10, 28, 30, 0.05)",
                    clipPath: CHAMFER,
                    padding: "32px",
                    animation: "fade-in-up 0.6s var(--ease-out-cubic) both",
                    animationDelay: `${(index % 4) * 0.1}s`,
                  }}
                >
                  {/* Text Column */}
                  <div style={{ order: isReversed ? 2 : 1, display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        alignSelf: "flex-start",
                        alignItems: "center",
                        gap: "6px",
                        background: "#FFFFFF",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        fontSize: "0.725rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: service.shade,
                      }}
                    >
                      {service.category}
                    </div>

                    <h3
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        color: "var(--color-forest-dark)",
                        margin: 0,
                      }}
                    >
                      {service.name}
                    </h3>

                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        color: "var(--color-text-body)",
                        margin: 0,
                      }}
                    >
                      {service.summary}
                    </p>

                    {/* 3-item arrow bullet list */}
                    <ul
                      style={{
                        listStyle: "none",
                        margin: "6px 0 0",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            fontSize: "0.925rem",
                            lineHeight: 1.55,
                            color: "var(--color-forest-dark)",
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              color: service.shade,
                              fontWeight: 800,
                              fontSize: "1.05rem",
                              lineHeight: 1.3,
                              flexShrink: 0,
                            }}
                          >
                            →
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags & Action Link */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        paddingTop: "10px",
                        marginTop: "4px",
                        borderTop: "1px solid rgba(10, 28, 30, 0.07)",
                      }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        <span className="ui-tag-status ui-tag-success" style={{ fontSize: "0.8rem", padding: "5px 12px" }}>
                          {service.deliverable}
                        </span>
                        <span className="ui-tag-status ui-tag-teal" style={{ fontSize: "0.8rem", padding: "5px 12px" }}>
                          {service.turnaround}
                        </span>
                      </div>

                      <Link
                        href={`/services/${service.slug}`}
                        className="mandate-link-check"
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          padding: "6px 12px",
                          borderRadius: "var(--radius-sm)",
                          border: `1px solid ${service.shade}`,
                          color: service.shade,
                          textDecoration: "none",
                        }}
                      >
                        <span>View details</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Just the animated icon, on the service's own colour — no
                      repeat of the row's own title/description/CTA */}
                  <div style={{ order: isReversed ? 1 : 2 }}>
                    <IconAccentBox service={service} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INDUSTRY SECTORS — Solutions Across Every Sector */}
      <IndustrySectors />

      {/* 5. CLOSING CTA */}
      <section style={{ padding: "0 0 110px", background: "var(--color-mineral-canvas)" }}>
        <div className="container">
          <div
            style={{
              background: "var(--color-forest-dark)",
              clipPath: CHAMFER,
              padding: "64px 48px",
              textAlign: "center",
              boxShadow: "0 24px 60px rgba(8, 23, 25, 0.35)",
            }}
          >
            <h2
              className="section-h2-title"
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(1.9rem, 3.2vw, 2.5rem)",
                marginBottom: "14px",
              }}
            >
              {servicesIndexClosing.heading}
            </h2>
            <p
              className="hero-lede-text"
              style={{
                color: "#94A3B8",
                maxWidth: "520px",
                margin: "0 auto 32px",
                fontSize: "1.05rem",
              }}
            >
              {servicesIndexClosing.body}
            </p>
            <Link
              href={servicesIndexClosing.primary.href}
              className="btn-architectural-cta btn-architectural-cta-filled"
            >
              <span className="btn-arch-label">{servicesIndexClosing.primary.label}</span>
              <span className="btn-arch-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
