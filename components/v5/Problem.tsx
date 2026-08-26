// Ported verbatim from registration-marks-v5.html lines 3479–3550.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export interface ProblemContent {
  eyebrow: string;
  heading: string;
  statLinePrefix: string;
  statLineEmphasis: string;
  statLineSuffix: string;
  painPoints: Array<{ title: string; body: string }>;
}

const PAIN_ICONS = [
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
];

export function Problem({ content }: { content: ProblemContent }) {
  return (
    <>
          {/* SECTION 2: THE PROBLEM (EDITORIAL ELEVATED WHITE CARD MATCHING DESIGN CONCEPT) */}
          <section className="problem-section-editorial" id="problem">
            <div className="container">

              <div className="problem-white-container reveal">

                {/* Top Split: Title + Section 49 Stat Description */}
                <div className="problem-split-top">
                  <div>
                    <div className="micro-cred-badge">
                      <span className="micro-cred-dot"></span>
                      <span>{content.eyebrow}</span>
                    </div>
                    <h2 className="problem-editorial-h2">{content.heading}</h2>
                  </div>
                  <div>
                    <p className="problem-stat-description">
                      {content.statLinePrefix}<strong>{content.statLineEmphasis}</strong>{content.statLineSuffix}
                    </p>
                  </div>
                </div>

                {/* 3-Column Pain Point Grid matching Design Concept */}
                <div className="problem-3cards-grid">
                  {content.painPoints.map((pain, index) => (
                    <div className={`problem-3card-item reveal delay-${index + 1}`} key={pain.title}>
                      <div className="problem-card-icon-wrap">
                        {PAIN_ICONS[index]}
                      </div>
                      <h3 className="problem-card-item-title">{pain.title}</h3>
                      <p className="problem-card-item-desc">{pain.body}</p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </section>

    </>
  );
}
