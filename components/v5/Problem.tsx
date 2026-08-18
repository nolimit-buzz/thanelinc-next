// Ported verbatim from registration-marks-v5.html lines 3479–3550.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function Problem() {
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
                      <span>The Problem</span>
                    </div>
                    <h2 className="problem-editorial-h2">Most organisations don't know they're already exposed.</h2>
                  </div>
                  <div>
                    <p className="problem-stat-description">
                      Under section 49 of the Nigeria Data Protection Act, an organisation of major importance that breaches the Act can face a penalty of up to the greater of <strong>₦10 million or 2% of its annual gross revenue</strong> for the preceding year — and most organisations don't find out they're exposed until it's already too late to fix quietly.
                    </p>
                  </div>
                </div>
      
                {/* 3-Column Pain Point Grid matching Design Concept */}
                <div className="problem-3cards-grid">
                  
                  {/* Pain 1: Named publicly */}
                  <div className="problem-3card-item reveal delay-1">
                    <div className="problem-card-icon-wrap">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                    </div>
                    <h3 className="problem-card-item-title">Named publicly</h3>
                    <p className="problem-card-item-desc">
                      In a regulatory sweep, unprepared, in front of a governing council, the market, or international stakeholders.
                    </p>
                  </div>
      
                  {/* Pain 2: No data map */}
                  <div className="problem-3card-item reveal delay-2">
                    <div className="problem-card-icon-wrap">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                    <h3 className="problem-card-item-title">No data map</h3>
                    <p className="problem-card-item-desc">
                      Not knowing where student, staff, or customer records actually live, who has access, or who holds copies.
                    </p>
                  </div>
      
                  {/* Pain 3: Contracts questioned */}
                  <div className="problem-3card-item reveal delay-3">
                    <div className="problem-card-icon-wrap">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <h3 className="problem-card-item-title">Contracts questioned</h3>
                    <p className="problem-card-item-desc">
                      A governing council, investor, or enterprise customer pushes back on what was signed with open-ended exposure.
                    </p>
                  </div>
      
                </div>
      
              </div>
      
            </div>
          </section>
      
    </>
  );
}
