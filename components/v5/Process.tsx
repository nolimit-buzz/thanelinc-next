// Ported verbatim from registration-marks-v5.html lines 4060–4172.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export interface ProcessContent {
  badge: string;
  heading: string;
  body: string;
  steps: Array<{
    stepNumber: string;
    pillLabel: string;
    title: string;
    body: string;
    checklistRows: Array<{ label: string; statusLabel: string; statusVariant: string }>;
  }>;
  bottomLinkLabel: string;
  bottomLinkHref: string;
}

export function Process({ content }: { content: ProcessContent }) {
  return (
    <>
          {/* SECTION 6: HOW WE WORK (3-STEP PORTRAIT MATRIX) */}
          <section className="process-light-section" id="process">
            <div className="container">

              <div className="process-header-center reveal">
                <div className="micro-cred-badge">
                  <span className="micro-cred-dot"></span>
                  <span>{content.badge}</span>
                </div>
                <h2 className="section-h2-title" style={{"marginTop": "10px"}}>{content.heading}</h2>
                <p className="section-h2-sub" style={{"margin": "12px auto 0"}}>
                  {content.body}
                </p>
              </div>

              <div className="process-3card-grid">
                {content.steps.map((step, index) => (
                  <div className={`process-portrait-card reveal delay-${index + 1}`} key={step.stepNumber}>
                    <div>
                      <div className="process-card-topbar">
                        <span className="process-step-num">{step.stepNumber}</span>
                        <span className="process-turnaround-pill">{step.pillLabel}</span>
                      </div>
                      <h3 className="process-step-title">{step.title}</h3>
                      <p className="process-step-desc">
                        {step.body}
                      </p>
                    </div>
                    <div className="process-card-ui-box">
                      {step.checklistRows.map((row) => (
                        <div className="ui-check-row" key={row.label}>
                          <span>{row.label}</span>
                          <span className={`ui-tag-status ui-tag-${row.statusVariant}`}>{row.statusLabel}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Link to /how-we-work */}
              <div className="process-bottom-action reveal delay-3">
                <a href={content.bottomLinkHref} className="mandate-link-check" style={{"color": "var(--color-forest-dark)", "borderColor": "var(--color-teal-accent)", "textDecoration": "none"}}>
                  <span>{content.bottomLinkLabel}</span>
                  <span>↗</span>
                </a>
              </div>

            </div>
          </section>
    </>
  );
}
