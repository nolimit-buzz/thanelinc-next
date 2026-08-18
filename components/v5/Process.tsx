// Ported verbatim from registration-marks-v5.html lines 4060–4172.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function Process() {
  return (
    <>
          {/* SECTION 6: HOW WE WORK (3-STEP PORTRAIT MATRIX) */}
          <section className="process-light-section" id="process">
            <div className="container">
              
              <div className="process-header-center reveal">
                <div className="micro-cred-badge">
                  <span className="micro-cred-dot"></span>
                  <span>How We Work</span>
                </div>
                <h2 className="section-h2-title" style={{"marginTop": "10px"}}>Your Journey to Compliance</h2>
                <p className="section-h2-sub" style={{"margin": "12px auto 0"}}>
                  A defined compliance sequence with stated deliverables and confirmed turnaround times at every step.
                </p>
              </div>
      
              <div className="process-3card-grid">
                
                {/* STEP 01 */}
                <div className="process-portrait-card reveal delay-1">
                  <div>
                    <div className="process-card-topbar">
                      <span className="process-step-num">01</span>
                      <span className="process-turnaround-pill">Onboard &amp; Discover</span>
                    </div>
                    <h3 className="process-step-title">Engage, Register &amp; Discover</h3>
                    <p className="process-step-desc">
                      Confirm the engagement, validate statutory classification, and support NDPC registration. Map data processing operations, build the ROPA, assess gaps, and complete the Data Protection Impact Assessment (DPIA).
                    </p>
                  </div>
                  <div className="process-card-ui-box">
                    <div className="ui-check-row">
                      <span>Classification &amp; Registration</span>
                      <span className="ui-tag-status ui-tag-teal">Validated</span>
                    </div>
                    <div className="ui-check-row">
                      <span>Data Processing Records</span>
                      <span className="ui-tag-status ui-tag-teal">ROPA Built</span>
                    </div>
                    <div className="ui-check-row">
                      <span>Gap Assessment &amp; DPIA</span>
                      <span className="ui-tag-status ui-tag-success">Completed</span>
                    </div>
                  </div>
                </div>
      
                {/* STEP 02 */}
                <div className="process-portrait-card reveal delay-2">
                  <div>
                    <div className="process-card-topbar">
                      <span className="process-step-num">02</span>
                      <span className="process-turnaround-pill">Build &amp; Activate</span>
                    </div>
                    <h3 className="process-step-title">Build, Remediate &amp; Activate</h3>
                    <p className="process-step-desc">
                      Deliver the complete NDPA governance suite, execute vendor Data Processing Agreements (DPAs), and implement an owned remediation plan. Equip leadership, the DPO, privacy champions, and the wider workforce.
                    </p>
                  </div>
                  <div className="process-card-ui-box">
                    <div className="ui-check-row">
                      <span>NDPA Governance Suite</span>
                      <span className="ui-tag-status ui-tag-success">Delivered</span>
                    </div>
                    <div className="ui-check-row">
                      <span>Vendor Controls &amp; DPAs</span>
                      <span className="ui-tag-status ui-tag-teal">Remediated</span>
                    </div>
                    <div className="ui-check-row">
                      <span>Workforce &amp; Champions</span>
                      <span className="ui-tag-status ui-tag-success">Activated</span>
                    </div>
                  </div>
                </div>
      
                {/* STEP 03 */}
                <div className="process-portrait-card reveal delay-3">
                  <div>
                    <div className="process-card-topbar">
                      <span className="process-step-num">03</span>
                      <span className="process-turnaround-pill">Evidence &amp; Sustain</span>
                    </div>
                    <h3 className="process-step-title">Evidence, File &amp; Sustain</h3>
                    <p className="process-step-desc">
                      Review implementation, close evidence gaps, and prepare and file the statutory annual Compliance Audit Return (CAR). Operate the outsourced DPO service, active monitoring, and ongoing annual readiness rhythm.
                    </p>
                  </div>
                  <div className="process-card-ui-box">
                    <div className="ui-check-row">
                      <span>Evidence Gaps</span>
                      <span className="ui-tag-status ui-tag-success">Closed</span>
                    </div>
                    <div className="ui-check-row">
                      <span>Annual Statutory CAR</span>
                      <span className="ui-tag-status ui-tag-teal">Filed 31 Mar</span>
                    </div>
                    <div className="ui-check-row">
                      <span>Outsourced DPO Service</span>
                      <span className="ui-tag-status ui-tag-success">Sustained</span>
                    </div>
                  </div>
                </div>
      
              </div>
      
              {/* Section Link to /how-we-work */}
              <div className="process-bottom-action reveal delay-3">
                <a href="/how-we-work" className="mandate-link-check" style={{"color": "var(--color-forest-dark)", "borderColor": "var(--color-teal-accent)", "textDecoration": "none"}}>
                  <span>Explore the full compliance journey</span>
                  <span>↗</span>
                </a>
              </div>
      
            </div>
          </section>
    </>
  );
}
