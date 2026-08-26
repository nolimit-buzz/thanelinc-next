// Ported verbatim from registration-marks-v5.html lines 3800–4059.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export interface TrackRecordContent {
  badge: string;
  heading: string;
  body: string;
  logos: Array<{ name: string; logoMarkup: string }>;
}

export function TrackRecord({ className, content }: { className?: string; content: TrackRecordContent }) {
  // v5 duplicates the logo set once for a seamless 100% infinite marquee loop.
  const trackLogos = [...content.logos, ...content.logos];
  return (
    <>
          {/* SECTION 5: PROVEN TRACK RECORD / CLIENT LOGOS CAROUSEL */}
          <section className={`section-light${className ? ` ${className}` : ""}`} id="proof" style={{"padding": "90px 0 100px"}}>
            <div className="container">

              <div style={{"textAlign": "center", "maxWidth": "760px", "margin": "0 auto 10px"}} className="reveal">
                <div className="micro-cred-badge">
                  <span className="micro-cred-dot"></span>
                  <span>{content.badge}</span>
                </div>
                <h2 className="section-h2-title" style={{"marginTop": "10px"}}>{content.heading}</h2>
                <p className="section-h2-sub" style={{"margin": "12px auto 0", "maxWidth": "620px"}}>
                  {content.body}
                </p>
              </div>

              {/* Continuous Auto-Scroll Logo Strip (Hardware-Accelerated Infinite Marquee) */}
              <div className="logos-carousel-container reveal delay-1">
                <div className="logos-mask-left"></div>
                <div className="logos-mask-right"></div>

                <div className="logos-carousel-track">
                  {trackLogos.map((logo, index) => (
                    <div className="logo-item" title={logo.name} key={`${logo.name}-${index}`} dangerouslySetInnerHTML={{ __html: logo.logoMarkup }} />
                  ))}
                </div>
              </div>

            </div>
          </section>

    </>
  );
}
