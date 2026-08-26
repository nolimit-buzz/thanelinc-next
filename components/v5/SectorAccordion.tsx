"use client";

import { useState } from "react";

// Ported verbatim from registration-marks-v5.html lines 3649–3799.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export interface SectorAccordionContent {
  badge: string;
  heading: string;
  subtext: string;
  checkLinkLabel: string;
  checkLinkHref: string;
  cards: Array<{
    sectorId: string;
    imageSrc: string;
    imageAlt: string;
    collapsedTitle: string;
    drawerTitle: string;
    drawerHook: string;
    sublinks: Array<{ label: string; href: string }>;
    ctaLabel: string;
    ctaHref: string;
  }>;
}

export function SectorAccordion({ content }: { content: SectorAccordionContent }) {
  // v5: activateSectorCard(this) — one card expanded at a time, first active.
  const [active, setActive] = useState(0);
  return (
    <>
          {/* SECTION 4: THE MANDATE — 4 EXPANDING SECTOR CARDS ACCORDION */}
          <section className="sector-accordion-section" id="sectors">
            <div className="container">

              <div className="sector-accordion-layout">

                {/* Left Column: Editorial Mandate Copy */}
                <div className="sector-left-content reveal">
                  <div className="micro-cred-badge">
                    <span className="micro-cred-dot"></span>
                    <span>{content.badge}</span>
                  </div>
                  <h2 className="mandate-title">{content.heading}</h2>
                  <p className="mandate-subtext">
                    {content.subtext}
                  </p>
                  <a href={content.checkLinkHref} className="mandate-link-check">
                    <span>{content.checkLinkLabel}</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* Right Column: 4 Expanding Cards Horizontal Accordion */}
                <div className="sector-accordion-track reveal delay-1" id="sectorAccordionTrack">
                  {content.cards.map((card, index) => (
                    <div
                      key={card.sectorId}
                      className={`sector-accordion-card${active === index ? " active" : ""}`}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => setActive(index)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(index); } }}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={card.imageSrc} alt={card.imageAlt} className="sector-card-bg-img" />
                      <div className="sector-card-overlay"></div>

                      {/* Collapsed Spine Title */}
                      <div className="sector-collapsed-title">{card.collapsedTitle}</div>

                      {/* Expanded Drawer Content */}
                      <div className="sector-expanded-drawer">
                        <div className="sector-drawer-header">
                          <h3 className="sector-drawer-title">{card.drawerTitle}</h3>
                          <span style={{"color": "var(--color-teal-accent)", "fontSize": "1.1rem"}}>↗</span>
                        </div>
                        <p className="sector-drawer-hook">
                          {card.drawerHook}
                        </p>
                        <div className="sector-sublinks-grid">
                          {card.sublinks.map((link) => (
                            <a href={link.href} className="sector-sublink-item" key={link.label}>• {link.label} ↗</a>
                          ))}
                        </div>
                        <a href={card.ctaHref} className="sector-drawer-cta">
                          <span>{card.ctaLabel}</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </section>

    </>
  );
}
