import Link from "next/link";
import {
  hero,
  credentialBlock,
  turnarounds,
  reasons,
  categorySection,
  dpoSection,
  filingSection,
  proof,
  closingCta,
} from "@/lib/content/sectorsRegulatedBusinesses";

/**
 * `/sectors/regulated-businesses` — no v5 markup exists for this page (v5 only
 * built the homepage and the tertiary drawer). Structure follows the approved
 * copy in Content/04-Page-Copy/sectors-regulated-businesses.md verbatim; visual
 * language reuses v5's shared primitives (container, micro-cred-badge,
 * hero-h1-clean, btn-architectural-cta) with Tailwind for everything v5 never
 * defined, per globals.css's note that Tailwind is available outside the
 * ported design.
 */
export function RegulatedBusinesses() {
  return (
    <main id="view-regulated-businesses">
      {/* Hero */}
      <section className="section-light" style={{ padding: "100px 0 60px" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <div className="micro-cred-badge">
            <span className="micro-cred-dot"></span>
            <span>UHL BY CATEGORY OR VOLUME — GAID 2025 SCH.3</span>
          </div>
          <h1 className="hero-h1-clean reveal active" style={{ marginTop: "12px" }}>
            <span className="h1-line-primary">{hero.h1}</span>
          </h1>
          <p className="hero-lede-text reveal active delay-1" style={{ maxWidth: "760px", margin: "20px auto 40px" }}>
            {hero.subhead}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={hero.primaryCta.href} className="btn-architectural-cta">
              <span className="btn-arch-label">{hero.primaryCta.label}</span>
              <span className="btn-arch-arrow">→</span>
            </Link>
            <Link href={hero.secondaryCta.href} className="mandate-link-check">
              <span>{hero.secondaryCta.label}</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Credential block — R10, independent of homepage */}
      <section className="section-light" style={{ padding: "0 0 60px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div
            className="rounded-[var(--radius-xl)] p-8"
            style={{
              background: "var(--color-forest-dark)",
              color: "var(--color-text-white)",
              boxShadow: "var(--shadow-feature)",
            }}
          >
            <p className="text-base leading-relaxed">
              {credentialBlock.body}{" "}
              <Link href={credentialBlock.cta.href} className="underline decoration-[var(--color-teal-accent)] underline-offset-4">
                {credentialBlock.cta.label} →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Turnarounds */}
      <section className="section-light" style={{ padding: "40px 0 80px" }}>
        <div className="container" style={{ maxWidth: "980px" }}>
          <p className="text-center max-w-2xl mx-auto mb-8" style={{ color: "var(--color-text-body)" }}>
            No pricing is published on this site. What is published is exactly how long this takes and what you get, because that is the certainty a commercially-minded buyer needs to make a decision without a number attached.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-teal-glow)" }}>
                  <th className="py-3 pr-4 font-semibold" style={{ color: "var(--color-text-headline-dark)" }}>Step</th>
                  <th className="py-3 pr-4 font-semibold" style={{ color: "var(--color-text-headline-dark)" }}>Deliverable</th>
                  <th className="py-3 font-semibold" style={{ color: "var(--color-text-headline-dark)" }}>Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {turnarounds.map((row) => (
                  <tr key={row.step} style={{ borderBottom: "1px solid rgba(14,35,37,0.08)" }}>
                    <td className="py-3 pr-4">{row.step}</td>
                    <td className="py-3 pr-4" style={{ color: "var(--color-text-body)" }}>{row.deliverable}</td>
                    <td className="py-3">
                      <span className="ui-tag-status ui-tag-teal">{row.turnaround}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Four reasons */}
      <section className="section-light" style={{ padding: "0 0 90px" }}>
        <div className="container" style={{ maxWidth: "1080px" }}>
          <div className="process-header-center reveal" style={{ marginBottom: "40px" }}>
            <h2 className="section-h2-title">Why companies land on this page</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-[var(--radius-lg)] p-6"
                style={{ background: "#fff", boxShadow: "var(--shadow-card)" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "var(--color-text-headline-dark)" }}>{reason.title}</h3>
                <p style={{ color: "var(--color-text-body)" }}>{reason.body}</p>
                {reason.cta ? (
                  <Link href={reason.cta.href} className="mandate-link-check" style={{ marginTop: "12px", display: "inline-flex" }}>
                    <span>{reason.cta.label}</span>
                    <span>→</span>
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "32px" }}>
            <Link href="/am-i-covered" className="mandate-link-check">
              <span>Confirm which of these applies to you</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category-or-volume explainer */}
      <section className="section-light" style={{ padding: "0 0 90px" }}>
        <div className="container" style={{ maxWidth: "820px", textAlign: "center" }}>
          <h2 className="section-h2-title">{categorySection.heading}</h2>
          <div className="section-h2-sub" style={{ margin: "16px auto 0", whiteSpace: "pre-line", textAlign: "left" }}>
            {categorySection.body}
          </div>
          <Link href={categorySection.cta.href} className="mandate-link-check" style={{ marginTop: "24px", display: "inline-flex" }}>
            <span>{categorySection.cta.label}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* DPO section */}
      <section className="section-light" style={{ padding: "0 0 90px" }}>
        <div className="container" style={{ maxWidth: "820px", textAlign: "center" }}>
          <h2 className="section-h2-title">{dpoSection.heading}</h2>
          <p className="section-h2-sub" style={{ margin: "16px auto 0" }}>{dpoSection.body}</p>
          <Link href={dpoSection.cta.href} className="mandate-link-check" style={{ marginTop: "24px", display: "inline-flex" }}>
            <span>{dpoSection.cta.label}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Filing section */}
      <section className="section-light" style={{ padding: "0 0 90px" }}>
        <div className="container" style={{ maxWidth: "820px", textAlign: "center" }}>
          <h2 className="section-h2-title">{filingSection.heading}</h2>
          <p className="section-h2-sub" style={{ margin: "16px auto 0" }}>{filingSection.body}</p>
        </div>
      </section>

      {/* Proof */}
      <section className="section-light" style={{ padding: "0 0 90px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div
            className="rounded-[var(--radius-lg)] p-8"
            style={{ background: "var(--color-mineral-canvas)", border: "1px solid rgba(14,35,37,0.08)" }}
          >
            <p style={{ color: "var(--color-text-body)" }}>
              <strong style={{ color: "var(--color-text-headline-dark)" }}>{proof.clientName}</strong> — {proof.body}{" "}
              <Link href={proof.cta.href} className="mandate-link-check" style={{ display: "inline-flex" }}>
                <span>{proof.cta.label}</span>
                <span>→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-light" style={{ padding: "0 0 100px", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 className="section-h2-title" style={{ marginBottom: "32px" }}>{closingCta.h2}</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={closingCta.primary.href} className="btn-architectural-cta">
              <span className="btn-arch-label">{closingCta.primary.label}</span>
              <span className="btn-arch-arrow">→</span>
            </Link>
            <Link href={closingCta.secondary.href} className="mandate-link-check">
              <span>{closingCta.secondary.label}</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
