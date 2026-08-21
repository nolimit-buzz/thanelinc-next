import Link from "next/link";
import type { ReactNode } from "react";

const CHAMFER = "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)";

export interface TwoTonedHeroProps {
  variant: "light" | "dark";
  eyebrow: string;
  h1: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** The floating accent card's content — used in split layout */
  accentCard?: ReactNode;
  /** Layout mode: "split" (2 columns with accent card) or "full-width" (centered single column) */
  layout?: "split" | "full-width";
  /** Sizing scale: "default" (standard 3rem H1, 120px padding) or "large" (enlarged ~3.75-4rem H1, 160px+ padding) */
  size?: "default" | "large";
}

/**
 * Split or full-width two-tone hero — dominant colour (light or dark), with
 * tones invertible via `variant`.
 */
export function TwoTonedHero({
  variant,
  eyebrow,
  h1,
  subhead,
  primaryCta,
  secondaryCta,
  accentCard,
  layout = "split",
  size = "default",
}: TwoTonedHeroProps) {
  const isDark = variant === "dark";
  const isFullWidth = layout === "full-width";
  const isLarge = size === "large";

  const bg = isDark ? "var(--color-forest-dark)" : "var(--color-mineral-canvas)";
  const textPrimary = isDark ? "#FFFFFF" : "var(--color-forest-dark)";
  const textMuted = isDark ? "#94A3B8" : "var(--color-text-body)";
  const cardBg = isDark ? "#FFFFFF" : "var(--color-forest-dark)";
  const cardText = isDark ? "var(--color-forest-dark)" : "#FFFFFF";

  return (
    <section
      style={{
        background: bg,
        padding: isLarge ? "160px 0 100px" : "120px 0 90px",
      }}
    >
      <div
        className="container"
        style={
          isFullWidth
            ? { maxWidth: "880px", textAlign: "center" }
            : {
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "56px",
                alignItems: "center",
              }
        }
      >
        <div style={isFullWidth ? { display: "flex", flexDirection: "column", alignItems: "center" } : undefined}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: isDark ? "rgba(255,255,255,0.06)" : "#F0F5F4",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(10,28,30,0.08)",
              borderRadius: "4px",
              padding: "6px 14px",
              fontFamily: "var(--font-outfit)",
              fontSize: "0.775rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: isDark ? "#CBD5E1" : "var(--color-text-headline-teal)",
              marginBottom: "20px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-teal-accent)", display: "inline-block" }} />
            {eyebrow}
          </div>

          <h1
            style={{
              fontSize: isLarge ? "clamp(2.75rem, 5vw, 3.85rem)" : "3rem",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: textPrimary,
              marginBottom: "20px",
            }}
          >
            {h1}
          </h1>

          <p
            style={{
              fontSize: isLarge ? "1.2rem" : "1.1rem",
              lineHeight: 1.6,
              color: textMuted,
              maxWidth: isFullWidth ? "680px" : "540px",
              marginBottom: "32px",
            }}
          >
            {subhead}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: isFullWidth ? "center" : "flex-start",
              gap: "20px",
            }}
          >
            <Link href={primaryCta.href} className={`btn-architectural-cta ${isDark ? "btn-architectural-cta-light" : ""}`}>
              <span className="btn-arch-label">{primaryCta.label}</span>
              <span className="btn-arch-arrow">→</span>
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="mandate-link-check"
                style={isDark ? { color: "#FFFFFF", borderColor: "var(--color-teal-accent)" } : undefined}
              >
                <span>{secondaryCta.label}</span>
                <span>↗</span>
              </Link>
            ) : null}
          </div>
        </div>

        {!isFullWidth && accentCard ? (
          <div
            style={{
              background: cardBg,
              color: cardText,
              clipPath: CHAMFER,
              boxShadow: isDark ? "0 30px 70px -15px rgba(0,0,0,0.4)" : "var(--shadow-feature)",
              padding: "40px",
              minHeight: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "fade-in-up 0.6s var(--ease-out-cubic) both",
            }}
          >
            {accentCard}
          </div>
        ) : null}
      </div>
    </section>
  );
}
