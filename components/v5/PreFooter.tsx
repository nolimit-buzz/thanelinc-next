// Ported verbatim from registration-marks-v5.html lines 4528–4553.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export interface PreFooterContent {
  badge: string;
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

export function PreFooter({ content }: { content: PreFooterContent }) {
  return (
    <>
          {/* SECTION 9: SECONDARY LINES (TRAINING & L&D) — FLOATING DARK CARD */}
          <section className="prefooter-floating-section">
            <div className="container">
              <div className="prefooter-floating-card reveal">
                <img src={content.imageSrc} alt={content.imageAlt} className="prefooter-card-bg-img" />
                <div className="prefooter-card-overlay"></div>
                <div className="prefooter-card-inner">
                  <div className="micro-cred-badge micro-cred-badge-dark">
                    <span className="micro-cred-dot"></span>
                    <span>{content.badge}</span>
                  </div>
                  <h2 className="prefooter-card-title">{content.heading}</h2>
                  <p className="prefooter-card-sub">
                    {content.body}
                  </p>
                  <div style={{"display": "flex", "justifyContent": "center"}}>
                    <a href={content.ctaHref} className="btn-architectural-cta btn-architectural-cta-filled">
                      <span className="btn-arch-label">{content.ctaLabel}</span>
                      <span className="btn-arch-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

    </>
  );
}
