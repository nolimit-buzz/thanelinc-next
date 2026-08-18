// Ported verbatim from registration-marks-v5.html lines 4177–4363.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function Services() {
  return (
    <>
          <section className="services-dark-section" id="services">
            <div className="container">
              
              <div className="services-header-centered reveal">
                <div className="micro-cred-badge micro-cred-badge-dark">
                  <span className="micro-cred-dot"></span>
                  <span>Compliance Services</span>
                </div>
                <h2 className="services-h2-title">Four statutory safeguards.<br />One licensed DPCO partner.</h2>
                <p className="services-h2-sub">
                  From statutory registration through annual filing to same-day breach containment.
                </p>
              </div>
      
              {/* Seamless Monolithic 4-Card Deck (Zero Space Between Cards & Fixed Height) */}
              <div className="services-seamless-deck reveal">
                
                {/* Service Card 1: NDPC Registration */}
                <div className="service-seamless-card">
                  <img src="/hero-portrait-audit.jpg" alt="NDPC Registration Background" className="service-card-bg-img" />
                  <div className="service-card-overlay"></div>
                  <div className="service-card-inner">
                    <div>
                      <div className="service-visual-stage">
                        <div className="seal-stage">
                          <div className="seal-circle-pulse"></div>
                          <div className="seal-center-badge">
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              <path d="M9 12l2 2 4-4" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <h3 className="service-card-title">NDPC Registration</h3>
                      <p className="service-card-desc">
                        <span className="service-desc-short">Mandatory statutory classification and registration for Data Controllers...</span>
                        <span className="service-desc-full">Mandatory statutory classification and registration for Data Controllers and Processors of Major Importance. Official NDPC Certificate issued in 3 working days.</span>
                      </p>
                      {/* Expandable Staggered Drawer on Hover */}
                      <div className="service-drawer-expandable">
                        <div className="service-deliverables-chips">
                          <span className="service-chip-pill">Statutory Tier Classification</span>
                          <span className="service-chip-pill">Certificate in 3 Working Days</span>
                          <span className="service-chip-pill">Major Importance Filing</span>
                        </div>
                      </div>
                    </div>
                    <div className="service-card-footer">
                      <a href="#contact" className="service-card-cta">
                        <span>Start Registration</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
      
                {/* Service Card 2: Compliance Audit & Filing (OPEN BY DEFAULT) */}
                <div className="service-seamless-card is-default-open">
                  <img src="/hero-hologram.jpg" alt="Compliance Audit Background" className="service-card-bg-img" />
                  <div className="service-card-overlay"></div>
                  <div className="service-card-inner">
                    <div>
                      <div className="service-visual-stage">
                        <div className="folder-stage">
                          <div className="folder-back"></div>
                          <div className="folder-sheet-2"></div>
                          <div className="folder-sheet-1"></div>
                          <div className="folder-front">
                            <span className="folder-badge-verified">✓ 100% FILED</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="service-card-title">Compliance Audit & Filing</h3>
                      <p className="service-card-desc">
                        <span className="service-desc-short">Annual Compliance Audit Returns under GAID standards. Comprehensive audit...</span>
                        <span className="service-desc-full">Annual Compliance Audit Returns under GAID standards. Fast scoping, comprehensive audit, and filing ahead of the 31 March statutory deadline.</span>
                      </p>
                      {/* Expandable Staggered Drawer on Hover */}
                      <div className="service-drawer-expandable">
                        <div className="service-deliverables-chips">
                          <span className="service-chip-pill">31 March Statutory CAR Filing</span>
                          <span className="service-chip-pill">DPCO Licensed Verification</span>
                          <span className="service-chip-pill">GAID Compliance Scoping</span>
                        </div>
                      </div>
                    </div>
                    <div className="service-card-footer">
                      <a href="#contact" className="service-card-cta">
                        <span>Schedule Audit</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
      
                {/* Service Card 3: Outsourced DPO */}
                <div className="service-seamless-card">
                  <img src="/executive-portrait.jpg" alt="Outsourced DPO Background" className="service-card-bg-img" />
                  <div className="service-card-overlay"></div>
                  <div className="service-card-inner">
                    <div>
                      <div className="service-visual-stage">
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
                      </div>
                      <h3 className="service-card-title">Outsourced DPO</h3>
                      <p className="service-card-desc">
                        <span className="service-desc-short">Retained legal and technical Data Protection Officer service. Regulatory liaison...</span>
                        <span className="service-desc-full">Retained legal and technical Data Protection Officer service. Continuous regulatory liaison, data subject rights handling, and structured quarterly monitoring.</span>
                      </p>
                      {/* Expandable Staggered Drawer on Hover */}
                      <div className="service-drawer-expandable">
                        <div className="service-deliverables-chips">
                          <span className="service-chip-pill">Thanelinc as DPO of Record</span>
                          <span className="service-chip-pill">Quarterly Monitoring</span>
                          <span className="service-chip-pill">Statutory Representation</span>
                        </div>
                      </div>
                    </div>
                    <div className="service-card-footer">
                      <a href="#contact" className="service-card-cta">
                        <span>Retain a DPO</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
      
                {/* Service Card 4: Breach Response */}
                <div className="service-seamless-card">
                  <img src="/hero-portrait-sectors.jpg" alt="Breach Response Background" className="service-card-bg-img" />
                  <div className="service-card-overlay"></div>
                  <div className="service-card-inner">
                    <div>
                      <div className="service-visual-stage">
                        <div className="breach-stage">
                          <div className="breach-clock-box">
                            <div className="breach-pulse-dot"></div>
                            <span>SAME-DAY RESPONSE</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="service-card-title">Breach Response</h3>
                      <p className="service-card-desc">
                        <span className="service-desc-short">Rapid incident triage, forensic scoping, and emergency engagement...</span>
                        <span className="service-desc-full">Rapid incident triage, forensic scoping, and emergency engagement. Same-day emergency response to contain regulatory exposure.</span>
                      </p>
                      {/* Expandable Staggered Drawer on Hover */}
                      <div className="service-drawer-expandable">
                        <div className="service-deliverables-chips">
                          <span className="service-chip-pill">Same-Day Response Protocol</span>
                          <span className="service-chip-pill">Direct Emergency Line</span>
                          <span className="service-chip-pill">Post-Breach Remediation</span>
                        </div>
                      </div>
                    </div>
                    <div className="service-card-footer">
                      <a href="#contact" className="service-card-cta">
                        <span>Report Incident</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
      
              </div>
      
              {/* Section Link to /services (Rule R9: No Orphan Pages) */}
              <div style={{"textAlign": "center", "marginTop": "54px"}} className="reveal delay-4">
                <a href="/services" className="mandate-link-check" style={{"color": "#FFFFFF", "borderColor": "var(--color-teal-accent)"}}>
                  <span>See all services</span>
                  <span>↗</span>
                </a>
              </div>
      
            </div>
          </section>
      
    </>
  );
}
