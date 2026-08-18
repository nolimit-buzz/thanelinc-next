"use client";

// Ported verbatim from registration-marks-v5.html lines 4364–4527.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function Resources() {
  return (
    <>
          {/* SECTION 8: RESOURCES (RECENT UPDATES & NEWSLETTER BOX) */}
          <section className="section-resources" id="resources">
            <div className="container">
              
              {/* Header: Left-Aligned Display */}
              <div className="resources-header-block reveal">
                <div className="micro-cred-badge">
                  <span className="micro-cred-dot"></span>
                  <span>Resources &amp; Explainers</span>
                </div>
                <h2 className="resources-display-title">Recent Updates</h2>
              </div>
      
              {/* 3 Cards in 1 Row */}
              <div className="resources-3card-grid">
                
                {/* Card 1: UHL, EHL, OHL (Category Strata) */}
                <article className="resource-card-modern reveal delay-1">
                  <div className="resource-panel-landscape">
                    <div className="panel-strata-art">
                      <div className="strata-band strata-uhl">
                        <span className="strata-tag">UHL · ULTRA HIGH LEVEL</span>
                      </div>
                      <div className="strata-band strata-ehl">
                        <span className="strata-tag">EHL · ENHANCED HIGH</span>
                      </div>
                      <div className="strata-band strata-ohl">
                        <span className="strata-tag">OHL · STANDARD TIER</span>
                      </div>
                    </div>
                  </div>
                  <div className="resource-card-body">
                    <div className="resource-date-line">REVIEWED 15 AUG 2026</div>
                    <h3 className="resource-card-title">
                      <a href="/resources/ndpc-compliance-categories-explained" className="resource-title-link">
                        <span>UHL, EHL, OHL — Nigeria's NDPC Compliance Categories Explained</span>
                        <span className="resource-title-arrow">↗</span>
                      </a>
                    </h3>
                    <p className="resource-card-desc">
                      The NDPC sorts organisations into three compliance tiers. Here's what decides which one you're in, and what each one actually requires.
                    </p>
                  </div>
                </article>
      
                {/* Card 2: ROPA, DPIA, and LIA (Data Map) */}
                <article className="resource-card-modern reveal delay-2">
                  <div className="resource-panel-landscape">
                    <div className="panel-datamap-art">
                      <svg className="datamap-svg" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Connectors */}
                        <path d="M 60 140 L 130 70 L 220 120 L 310 60 L 340 150 L 220 120 L 140 160 L 60 140" stroke="rgba(28, 176, 184, 0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
                        <path d="M 130 70 L 260 50 L 310 60" stroke="rgba(28, 176, 184, 0.35)" strokeWidth="1.5" />
                        {/* Muted Nodes */}
                        <circle cx="60" cy="140" r="4" fill="rgba(148, 163, 184, 0.4)" />
                        <circle cx="260" cy="50" r="4" fill="rgba(148, 163, 184, 0.4)" />
                        <circle cx="340" cy="150" r="4" fill="rgba(148, 163, 184, 0.4)" />
                        <circle cx="140" cy="160" r="4" fill="rgba(148, 163, 184, 0.4)" />
                        {/* Teal Active Nodes with Pulse */}
                        <circle cx="130" cy="70" r="14" className="datamap-pulse-ring datamap-ring-1" />
                        <circle cx="130" cy="70" r="6" fill="#1CB0B8" />
                        <text x="130" y="52" fill="#1CB0B8" fontSize="9" fontFamily="monospace" fontWeight="700" textAnchor="middle">ROPA</text>
      
                        <circle cx="220" cy="120" r="14" className="datamap-pulse-ring datamap-ring-2" />
                        <circle cx="220" cy="120" r="6" fill="#1CB0B8" />
                        <text x="220" y="142" fill="#1CB0B8" fontSize="9" fontFamily="monospace" fontWeight="700" textAnchor="middle">DPIA</text>
      
                        <circle cx="310" cy="60" r="6" fill="#1CB0B8" />
                        <text x="310" y="44" fill="#1CB0B8" fontSize="9" fontFamily="monospace" fontWeight="700" textAnchor="middle">LIA</text>
                      </svg>
                    </div>
                  </div>
                  <div className="resource-card-body">
                    <div className="resource-date-line">REVIEWED 15 AUG 2026</div>
                    <h3 className="resource-card-title">
                      <a href="/resources/ropa-dpia-lia-explained" className="resource-title-link">
                        <span>ROPA, DPIA, and LIA — What They Are and When You Need One</span>
                        <span className="resource-title-arrow">↗</span>
                      </a>
                    </h3>
                    <p className="resource-card-desc">
                      Three acronyms every accidental DPO runs into fast. Here's what each one does and which of your projects actually needs it.
                    </p>
                  </div>
                </article>
      
                {/* Card 3: Vendor Due Diligence (Redaction Field) */}
                <article className="resource-card-modern reveal delay-3">
                  <div className="resource-panel-landscape">
                    <div className="panel-redaction-art">
                      <div className="redaction-row">
                        <div className="redaction-bar w-25"></div>
                        <div className="redaction-bar w-50"></div>
                        <div className="redaction-bar w-20 redaction-teal"><span className="redaction-text">SOC2</span></div>
                      </div>
                      <div className="redaction-row">
                        <div className="redaction-bar w-40"></div>
                        <div className="redaction-bar w-35 redaction-teal"><span className="redaction-text">DPA_SIGN</span></div>
                        <div className="redaction-bar w-20"></div>
                      </div>
                      <div className="redaction-row">
                        <div className="redaction-bar w-60 redaction-teal"><span className="redaction-text">THIRD_PARTY_AUDIT</span></div>
                        <div className="redaction-bar w-30"></div>
                      </div>
                      <div className="redaction-row">
                        <div className="redaction-bar w-30"></div>
                        <div className="redaction-bar w-45"></div>
                        <div className="redaction-bar w-20"></div>
                      </div>
                    </div>
                  </div>
                  <div className="resource-card-body">
                    <div className="resource-date-line">REVIEWED 15 AUG 2026</div>
                    <h3 className="resource-card-title">
                      <a href="/resources/vendor-due-diligence" className="resource-title-link">
                        <span>Vendor Due Diligence: What "Compliant Enough" Actually Means</span>
                        <span className="resource-title-arrow">↗</span>
                      </a>
                    </h3>
                    <p className="resource-card-desc">
                      Your compliance doesn't stop at your own systems. A practical checklist for vetting the vendors and cloud providers who process data on your behalf.
                    </p>
                  </div>
                </article>
      
              </div>
      
              {/* See all resources ↗ Link */}
              <div className="resources-bottom-action reveal delay-3">
                <a href="/resources" className="mandate-link-check" style={{"color": "var(--color-forest-dark)", "borderColor": "var(--color-teal-accent)", "textDecoration": "none"}}>
                  <span>See all resources</span>
                  <span>↗</span>
                </a>
              </div>
      
              {/* NEWSLETTER BOX (CONTAINER WIDTH, GROUND: #081719) */}
              <div className="resources-newsletter-box reveal">
                <div className="resources-newsletter-grid">
                  <div className="newsletter-left-col">
                    <h3 className="newsletter-headline">Compliance notes when rules change</h3>
                    <p className="newsletter-subline">
                      For DPOs and compliance owners: NDPC guidance updates, deadline reminders, and practical explainers. No sales email.
                    </p>
                  </div>
                  <div className="newsletter-right-col">
                    <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Thanelinc compliance notes."); }}>
                      <div className="newsletter-input-group">
                        <input type="email" placeholder="Enter your email" required className="newsletter-email-input" aria-label="Email for compliance updates" />
                        <button type="submit" className="btn-architectural-cta btn-architectural-cta-light" style={{"border": "none", "background": "transparent", "cursor": "pointer", "padding": "0"}}>
                          <span className="btn-arch-label" style={{"padding": "13px 22px"}}>Subscribe</span>
                          <span className="btn-arch-arrow">→</span>
                        </button>
                      </div>
                      <div className="newsletter-consent-text">
                        We process your email under our <a href="/privacy" className="newsletter-privacy-link">privacy notice</a>. Unsubscribe any time.
                      </div>
                    </form>
                  </div>
                </div>
              </div>
      
            </div>
          </section>
      
    </>
  );
}
