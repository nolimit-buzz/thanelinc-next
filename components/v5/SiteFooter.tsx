import Link from "next/link";
import { footerColumns, footerLegal, contactNavItem } from "@/lib/content/navigation";

// Ported verbatim from registration-marks-v5.html lines 4586–4696.
// Class names and copy are v5's. Do not restyle or reword (W-026).
//
// W-030: link targets (not markup, not visual design) now come from
// `lib/content/navigation.ts`, the same source the mega menu uses, so the
// two can't drift the way the old hardcoded lists could — and every "planned"
// item renders as muted plain text instead of a link to a 404 (D1).

function FooterLink({ label, href, status }: { label: string; href: string; status: "live" | "planned" }) {
  if (status === "planned") {
    return <span className="footer-link-clean" style={{ opacity: 0.5, cursor: "default" }}>{label}</span>;
  }
  return (
    <Link href={href} className="footer-link-clean">
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <>
        <footer className="site-footer-funneled">
          {/* Subtle Ambient Brand Letterform Watermark */}
          <div className="footer-watermark-t" aria-hidden="true">T</div>
      
          {/* BAND 1: Tagline + Primary & Secondary Actions */}
          <div className="footer-band-1">
            <div className="container">
              <div className="footer-band-1-grid reveal active">
                <h3 className="footer-tagline-display">
                  Turning a compliance deadline into a <span className="text-teal-accent">licensed</span> advantage.
                </h3>
                <div className="footer-band-1-actions" style={{"display": "flex", "alignItems": "center", "gap": "24px", "flexWrap": "wrap"}}>
                  <Link href="/am-i-covered" className="mandate-link-check" style={{"color": "#FFFFFF", "borderColor": "var(--color-teal-accent)", "textDecoration": "none"}}>
                    <span>Am I Required to Register? — 2-Minute Check</span>
                    <span>↗</span>
                  </Link>
                  <Link href={contactNavItem.href} className="btn-architectural-cta btn-architectural-cta-light">
                    <span className="btn-arch-label">Book a Call</span>
                    <span className="btn-arch-arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      
          <div className="container">
            <div className="footer-hairline"></div>
          </div>
      
          {/* BAND 2: Brand Block + 4 Link Columns */}
          <div className="footer-band-2">
            <div className="container">
              <div className="footer-band-2-grid reveal active">
                
                {/* Column 0: Brand & Credential Pill */}
                <div className="footer-brand-column">
                  <Link href="/" className="brand-logo-dark" aria-label="Thanelinc Home">
                    <img src="/thanelinc-brand-logo-white.svg" alt="Thanelinc" className="footer-brand-logo-img" />
                  </Link>
                  <p className="footer-brand-text">
                    Thanelinc Nigeria Limited is a licensed Data Protection Compliance Organization (DPCO) registered with the Nigeria Data Protection Commission (NDPC).
                  </p>
                  <Link href="/about#credentials" className="footer-status-pill">
                    <span className="footer-status-dot"></span>
                    <span>Licensed DPCO — Check the NDPC Register</span>
                  </Link>
                </div>

                {/* Column 1: Compliance Services (ALL 8 SERVICES) */}
                <div>
                  <div className="footer-col-title-clean">Compliance Services</div>
                  <ul className="footer-links-clean">
                    {footerColumns[0].items.map((item) => (
                      <li key={item.href}><FooterLink {...item} /></li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Priority Sectors */}
                <div>
                  <div className="footer-col-title-clean">Priority Sectors</div>
                  <ul className="footer-links-clean">
                    {footerColumns[1].items.map((item) => (
                      <li key={item.href}><FooterLink {...item} /></li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Resources */}
                <div>
                  <div className="footer-col-title-clean">Resources</div>
                  <ul className="footer-links-clean">
                    {footerColumns[2].items.map((item) => (
                      <li key={item.href}><FooterLink {...item} /></li>
                    ))}
                  </ul>
                </div>

                {/* Column 4: Company */}
                <div>
                  <div className="footer-col-title-clean">Company</div>
                  <ul className="footer-links-clean">
                    {footerColumns[3].items.map((item) => (
                      <li key={item.href}><FooterLink {...item} /></li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
      
          {/* BAND 3: Legal Row */}
          <div className="footer-band-3">
            <div className="container">
              <div className="footer-band-3-grid">
                <div>
                  © 2026 Thanelinc Nigeria Limited. All rights reserved. Licensed DPCO. |{" "}
                  <a href="https://nolimitbuzz.net" target="_blank" rel="noreferrer" className="footer-legal-link">Website</a>
                </div>
                <nav aria-label="Legal links">
                  {footerLegal.map((item, i) => (
                    <span key={item.href}>
                      {i > 0 ? " | " : ""}
                      {item.status === "live" ? (
                        <Link href={item.href} className="footer-legal-link">{item.label}</Link>
                      ) : (
                        <span className="footer-legal-link" style={{ opacity: 0.6, cursor: "default" }}>{item.label} (soon)</span>
                      )}
                    </span>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </footer>
      
        {/* ==========================================================================
             INTERACTIVE MOTION SYSTEM & CAROUSEL SCRIPT
             ========================================================================== */}
    </>
  );
}
