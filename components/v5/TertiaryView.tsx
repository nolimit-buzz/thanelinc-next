import Link from "next/link";

// Ported verbatim from registration-marks-v5.html lines 4560–4580.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function TertiaryView() {
  return (
    <>
          <section className="section-light" style={{"padding": "100px 0"}}>
            <div className="container" style={{"maxWidth": "900px", "textAlign": "center"}}>
              <div className="micro-cred-badge">
                <span className="micro-cred-dot"></span>
                <span>GAID 2025 SCH.3 ¶3(c)(iii) — EHL BY CATEGORY</span>
              </div>
              <h1 className="hero-h1-clean reveal active" style={{"marginTop": "12px"}}>
                <span className="h1-line-primary">Your institution is an EHL organisation.</span>
                <span className="h1-line-secondary">Not by size — by name.</span>
              </h1>
              <p className="hero-lede-text reveal active delay-1" style={{"maxWidth": "760px", "margin": "20px auto 40px"}}>
                Under the NDPC's own schedule, every higher institution — university, polytechnic, or college — is classed Enhanced High Level, regardless of student numbers. That means an annual filing obligation, and a legal requirement to file through a licensed Data Protection Compliance Organization.
              </p>
              <div style={{"display": "flex", "justifyContent": "center"}}>
                <Link href="/" className="btn-architectural-cta">
                  <span className="btn-arch-label">Check Exact Filing Deadline</span>
                  <span className="btn-arch-arrow">→</span>
                </Link>
              </div>
            </div>
          </section>
    </>
  );
}
