// Ported verbatim from registration-marks-v5.html lines 4586–4696.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function SiteFooter() {
  return (
    <>
        <footer className="site-footer-funneled">
          {/* Subtle Ambient Brand Letterform Watermark */}
          <div className="footer-watermark-t" aria-hidden="true">T</div>
      
          {/* BAND 1: Tagline + Primary & Secondary Actions */}
          <div className="footer-band-1">
            <div className="container">
              <div className="footer-band-1-grid reveal">
                <h3 className="footer-tagline-display">
                  Turning a compliance deadline into a <span className="text-teal-accent">licensed</span> advantage.
                </h3>
                <div className="footer-band-1-actions" style={{"display": "flex", "alignItems": "center", "gap": "24px", "flexWrap": "wrap"}}>
                  <a href="#check" className="mandate-link-check" style={{"color": "#FFFFFF", "borderColor": "var(--color-teal-accent)", "textDecoration": "none"}}>
                    <span>Am I Covered? — 2-Minute Check</span>
                    <span>↗</span>
                  </a>
                  <a href="#contact" className="btn-architectural-cta btn-architectural-cta-light">
                    <span className="btn-arch-label">Book a Call</span>
                    <span className="btn-arch-arrow">→</span>
                  </a>
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
              <div className="footer-band-2-grid reveal delay-1">
                
                {/* Column 0: Brand & Credential Pill */}
                <div className="footer-brand-column">
                  <a href="#" className="brand-logo-dark" aria-label="Thanelinc Home">
                    <img src="/thanelinc-brand-logo-white.svg" alt="Thanelinc" className="footer-brand-logo-img" />
                  </a>
                  <p className="footer-brand-text">
                    Thanelinc Nigeria Limited is a licensed Data Protection Compliance Organization (DPCO) registered with the Nigeria Data Protection Commission (NDPC).
                  </p>
                  <a href="#credentials" className="footer-status-pill">
                    <span className="footer-status-dot"></span>
                    <span>Licensed DPCO — View Certificate ↗</span>
                  </a>
                </div>
      
                {/* Column 1: Compliance Services (ALL 8 SERVICES) */}
                <div>
                  <div className="footer-col-title-clean">Compliance Services</div>
                  <ul className="footer-links-clean">
                    <li><a href="/services/ndpc-registration" className="footer-link-clean">NDPC Registration</a></li>
                    <li><a href="/services/data-mapping-ropa" className="footer-link-clean">Data Mapping & ROPA</a></li>
                    <li><a href="/services/gap-assessment-dpia" className="footer-link-clean">Gap Assessment & DPIA</a></li>
                    <li><a href="/services/policies-remediation" className="footer-link-clean">Policies & Remediation</a></li>
                    <li><a href="/services/compliance-audit-filing" className="footer-link-clean">Compliance Audit & Filing</a></li>
                    <li><a href="/services/outsourced-dpo" className="footer-link-clean">Outsourced DPO</a></li>
                    <li><a href="/services/breach-response" className="footer-link-clean">Breach Response</a></li>
                    <li><a href="/services/ongoing-monitoring" className="footer-link-clean">Ongoing Monitoring</a></li>
                  </ul>
                </div>
      
                {/* Column 2: Priority Sectors (3 Approved IA Pages) */}
                <div>
                  <div className="footer-col-title-clean">Priority Sectors</div>
                  <ul className="footer-links-clean">
                    <li><a href="/sectors/tertiary-institutions" className="footer-link-clean">Higher Institutions (EHL)</a></li>
                    <li><a href="/sectors/regulated-businesses" className="footer-link-clean">Regulated Businesses (UHL)</a></li>
                    <li><a href="/sectors/public-sector" className="footer-link-clean">Public Sector & MDAs</a></li>
                  </ul>
                </div>
      
                {/* Column 3: Resources */}
                <div>
                  <div className="footer-col-title-clean">Resources</div>
                  <ul className="footer-links-clean">
                    <li><a href="/resources/category-guide" className="footer-link-clean">NDPC Category Guide</a></li>
                    <li><a href="/resources/ropa-dpia-explainer" className="footer-link-clean">ROPA & DPIA Explainer</a></li>
                    <li><a href="/resources/vendor-due-diligence" className="footer-link-clean">Vendor Due Diligence</a></li>
                  </ul>
                </div>
      
                {/* Column 4: Company */}
                <div>
                  <div className="footer-col-title-clean">Company</div>
                  <ul className="footer-links-clean">
                    <li><a href="#credentials" className="footer-link-clean">Credentials</a></li>
                    <li><a href="#training" className="footer-link-clean">Training</a></li>
                    <li><a href="#contact" className="footer-link-clean">Contact</a></li>
                  </ul>
                </div>
      
              </div>
            </div>
          </div>
      
          {/* BAND 3: Legal Row */}
          <div className="footer-band-3">
            <div className="container">
              <div className="footer-band-3-grid">
                <div>© 2026 Thanelinc Nigeria Limited. All rights reserved. Licensed DPCO. · <a href="/privacy" className="footer-legal-link">Privacy Policy</a> | <a href="/terms" className="footer-legal-link">Terms</a></div>
                <div>Designed & Built by NoLimitBuzz</div>
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
