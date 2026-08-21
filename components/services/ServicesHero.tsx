/**
 * `/services` hero — 620px fixed height, two-tone background (left #B1BFC0,
 * right #819293, the client's exact values), text column only.
 *
 * The dark zone uses the exact same technique and 32% figure as the
 * homepage's own `.hero-right-dark-backdrop` (app/v5.css) — a flat
 * `position:absolute; top:0; right:0; width:32%; height:100%` rect — instead
 * of the previous version's "anchor to the grid's image column" trick. That
 * approach put the boundary at a different x-position than the nav's, which
 * anchored to the Contact button — the two didn't line up. Using the same
 * flat 32% rule as `SiteNav.tsx`'s light variant on both makes them align
 * automatically, and the rect being `height:100%` of the section itself
 * (not nested inside a grid cell that might not stretch full height) is
 * what makes it flush to the section's bottom edge with no gap.
 *
 * The cutout image + floating chips are NOT rendered here — see
 * `ServicesHeroCutout.tsx`.
 */

export interface ServicesHeroProps {
  eyebrow: string;
  h1: string;
  subhead: string;
  primaryCta: { label: string; href: string };
}

export function ServicesHero({ eyebrow, h1, subhead, primaryCta }: ServicesHeroProps) {
  return (
    <section style={{ position: "relative", height: "620px", background: "#B1BFC0" }}>
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "32%", height: "100%", background: "#819293", zIndex: 0 }} />

      <div className="container hero-main-layout" style={{ position: "relative", height: "100%", zIndex: 2 }}>
        <div
          className="hero-vertical-scroll-column"
          style={{ animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.4s both" }}
        >
          <div className="scroll-down-text">SERVICES</div>
          <div className="scroll-arrow-box">↓</div>
          <div className="scroll-vertical-line"></div>
        </div>

        <div className="hero-left-content">
          <div
            className="hero-eyebrow-badge"
            style={{ animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.05s both" }}
          >
            <span className="badge-dot"></span>
            <span>{eyebrow}</span>
          </div>

          <h1
            className="hero-h1-clean"
            style={{ fontSize: "3.2rem", animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.12s both" }}
          >
            <span className="h1-line-primary">{h1}</span>
          </h1>

          <p
            className="hero-lede-text"
            style={{ animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.2s both" }}
          >
            {subhead}
          </p>

          <div style={{ animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.28s both" }}>
            <a href={primaryCta.href} className="btn-architectural-cta">
              <span className="btn-arch-label">{primaryCta.label}</span>
              <span className="btn-arch-arrow">→</span>
            </a>
          </div>
        </div>

        {/* Empty column — reserves the grid space the cutout card sits over */}
        <div className="hero-right-visual-wrapper" style={{ height: "100%" }} />
      </div>
    </section>
  );
}
