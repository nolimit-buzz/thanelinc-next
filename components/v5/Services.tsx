// Ported verbatim from registration-marks-v5.html lines 4177–4363.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export interface ServicesContent {
  badge: string;
  headingPrimary: string;
  headingSecondary: string;
  body: string;
  cards: Array<{
    serviceId: string;
    imageSrc: string;
    imageAlt: string;
    title: string;
    descriptionShort: string;
    descriptionFull: string;
    chips: Array<{ label: string }>;
    ctaLabel: string;
    ctaHref: string;
    isDefaultOpen: boolean;
  }>;
  allServicesLabel: string;
  allServicesHref: string;
}

// The per-card visual stage (seal / folder / shield / breach-clock) is fixed v5
// artwork keyed to which service the card represents, not CMS-editable content.
function ServiceVisualStage({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    case "ndpc-registration":
      return (
        <div className="seal-stage">
          <div className="seal-circle-pulse"></div>
          <div className="seal-center-badge">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>
      );
    case "compliance-audit-filing":
      return (
        <div className="folder-stage">
          <div className="folder-back"></div>
          <div className="folder-sheet-2"></div>
          <div className="folder-sheet-1"></div>
          <div className="folder-front">
            <span className="folder-badge-verified">✓ 100% FILED</span>
          </div>
        </div>
      );
    case "outsourced-dpo":
      return (
        <div className="shield-stage">
          <div className="shield-radar-ring"></div>
          <div className="shield-radar-ring"></div>
          <div className="shield-icon-center">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a8.38 8.38 0 0113 0" />
            </svg>
          </div>
        </div>
      );
    case "breach-response":
      return (
        <div className="breach-stage">
          <div className="breach-clock-box">
            <div className="breach-pulse-dot"></div>
            <span>SAME-DAY RESPONSE</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function Services({ content }: { content: ServicesContent }) {
  return (
    <>
          <section className="services-dark-section" id="services">
            <div className="container">

              <div className="services-header-centered reveal">
                <div className="micro-cred-badge micro-cred-badge-dark">
                  <span className="micro-cred-dot"></span>
                  <span>{content.badge}</span>
                </div>
                <h2 className="services-h2-title">{content.headingPrimary}<br />{content.headingSecondary}</h2>
                <p className="services-h2-sub">
                  {content.body}
                </p>
              </div>

              {/* Seamless Monolithic 4-Card Deck (Zero Space Between Cards & Fixed Height) */}
              <div className="services-seamless-deck reveal">
                {content.cards.map((card) => (
                  <div className={`service-seamless-card${card.isDefaultOpen ? " is-default-open" : ""}`} key={card.serviceId}>
                    <img src={card.imageSrc} alt={card.imageAlt} className="service-card-bg-img" />
                    <div className="service-card-overlay"></div>
                    <div className="service-card-inner">
                      <div>
                        <div className="service-visual-stage">
                          <ServiceVisualStage serviceId={card.serviceId} />
                        </div>
                        <h3 className="service-card-title">{card.title}</h3>
                        <p className="service-card-desc">
                          <span className="service-desc-short">{card.descriptionShort}</span>
                          <span className="service-desc-full">{card.descriptionFull}</span>
                        </p>
                        {/* Expandable Staggered Drawer on Hover */}
                        <div className="service-drawer-expandable">
                          <div className="service-deliverables-chips">
                            {card.chips.map((chip) => (
                              <span className="service-chip-pill" key={chip.label}>{chip.label}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="service-card-footer">
                        <a href={card.ctaHref} className="service-card-cta">
                          <span>{card.ctaLabel}</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Link to /services (Rule R9: No Orphan Pages) */}
              <div style={{"textAlign": "center", "marginTop": "54px"}} className="reveal delay-4">
                <a href={content.allServicesHref} className="mandate-link-check" style={{"color": "#FFFFFF", "borderColor": "var(--color-teal-accent)"}}>
                  <span>{content.allServicesLabel}</span>
                  <span>↗</span>
                </a>
              </div>

            </div>
          </section>

    </>
  );
}
