// Ported verbatim from registration-marks-v5.html lines 4528–4553.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function PreFooter() {
  return (
    <>
          {/* SECTION 9: SECONDARY LINES (TRAINING & L&D) — FLOATING DARK CARD */}
          <section className="prefooter-floating-section">
            <div className="container">
              <div className="prefooter-floating-card reveal">
                <img src="/executive-portrait.jpg" alt="Training & Leadership Development" className="prefooter-card-bg-img" />
                <div className="prefooter-card-overlay"></div>
                <div className="prefooter-card-inner">
                  <div className="micro-cred-badge micro-cred-badge-dark">
                    <span className="micro-cred-dot"></span>
                    <span>Others Services · Capabilities</span>
                  </div>
                  <h2 className="prefooter-card-title">Learning & Development</h2>
                  <p className="prefooter-card-sub">
                    Build in-house capability alongside outsourced support — DPO certification, Privacy Champion, staff awareness, and leadership development.
                  </p>
                  <div style={{"display": "flex", "justifyContent": "center"}}>
                    <a href="#training" className="btn-architectural-cta btn-architectural-cta-filled">
                      <span className="btn-arch-label">Learn About Training</span>
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
