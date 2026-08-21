/**
 * Reuses the homepage's 4 sector cards verbatim (same classNames as
 * `components/v5/SectorAccordion.tsx`, same copy, same images — W-026: this
 * is already-approved v5 content, not reworded here) instead of the earlier
 * invented card design + invented sector copy on this page.
 *
 * Only difference from the homepage: no default-active card. All four sit
 * at equal width and rely purely on the existing `.sector-accordion-card:hover`
 * CSS (v5.css) to grow/reveal the drawer — no React state needed, since hover
 * alone already drives it on the homepage too.
 *
 * Cards 3 and 4's CTAs pointed at `#check`, the homepage's in-page self-check
 * anchor, which doesn't exist on this route — routed to `/am-i-covered`
 * instead, same real destination the other two cards use.
 */

import { servicesIndexIndustry } from "@/lib/content/servicesIndex";

const CARDS = [
  {
    title: "Tertiary Institutions",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    alt: "Tertiary Institutions Compliance",
    hook: "Classed as Enhanced High Level (EHL) outright by the NDPC—by name, not by student volume.",
    sublinks: ["Universities", "Polytechnics", "Colleges of Education"],
    cta: { label: "Explore for Universities", href: "/sectors/tertiary-institutions" },
  },
  {
    title: "Private Sector & SME's",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Private Sector and SMEs Compliance",
    hook: "Processing customer, employee, and payment data—triggering statutory compliance obligations under the NDPA.",
    sublinks: ["Commercial Banks & Fintech", "Retail & E-commerce", "Professional Services", "Logistics & Distribution"],
    cta: { label: "Explore for Businesses", href: "/sectors/regulated-businesses" },
  },
  {
    title: "Hospitality Industry",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    alt: "Hospitality Industry Compliance",
    hook: "Hotels, resorts, and booking platforms holding guest records, passport copies, and payment credentials requiring strict data safeguards.",
    sublinks: ["Hotels & Resorts", "Booking Platforms", "Event Centres & Venues", "Restaurants & Chains"],
    cta: { label: "Explore for Businesses", href: "/am-i-covered" },
  },
  {
    title: "Healthcare & Public Sector",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    alt: "Healthcare & Public Sector Compliance",
    hook: "Processing highly sensitive biometric, health, and civic data requiring strict EHL/UHL compliance audits.",
    sublinks: ["Federal & State MDAs", "Teaching Hospitals", "Private Clinics & Labs", "HMO Organizations"],
    cta: { label: "Explore for Businesses", href: "/am-i-covered" },
  },
];

export function IndustrySectors() {
  return (
    <section className="sector-accordion-section" id="sectors-overview">
      <div className="container">
        <div style={{ maxWidth: "760px", marginBottom: "48px" }}>
          <div className="micro-cred-badge">
            <span className="micro-cred-dot"></span>
            <span>{servicesIndexIndustry.eyebrow}</span>
          </div>
          <h2 className="mandate-title">{servicesIndexIndustry.h2}</h2>
          <p className="mandate-subtext">{servicesIndexIndustry.subhead}</p>
        </div>

        <div className="sector-accordion-track" id="sectorAccordionTrackServices">
          {CARDS.map((card) => (
            <div key={card.title} className="sector-accordion-card">
              {/* eslint-disable-next-line @next/next/no-img-element -- Retained legacy comparison component; the live directory uses optimized CSS-backed cards. */}
              <img src={card.img} alt={card.alt} className="sector-card-bg-img" />
              <div className="sector-card-overlay"></div>

              <div className="sector-collapsed-title">{card.title}</div>

              <div className="sector-expanded-drawer">
                <div className="sector-drawer-header">
                  <h3 className="sector-drawer-title">{card.title}</h3>
                  <span style={{ color: "var(--color-teal-accent)", fontSize: "1.1rem" }}>↗</span>
                </div>
                <p className="sector-drawer-hook">{card.hook}</p>
                <div className="sector-sublinks-grid">
                  {card.sublinks.map((item) => (
                    <a key={item} href="/am-i-covered" className="sector-sublink-item">
                      • {item} ↗
                    </a>
                  ))}
                </div>
                <a href={card.cta.href} className="sector-drawer-cta">
                  <span>{card.cta.label}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
