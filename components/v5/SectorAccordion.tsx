"use client";

import { useState } from "react";

// Ported verbatim from registration-marks-v5.html lines 3649–3799.
// Class names and copy are v5's. Do not restyle or reword (W-026).

export function SectorAccordion() {
  // v5: activateSectorCard(this) — one card expanded at a time, first active.
  const [active, setActive] = useState(0);
  return (
    <>
          {/* SECTION 4: THE MANDATE — 4 EXPANDING SECTOR CARDS ACCORDION */}
          <section className="sector-accordion-section" id="sectors">
            <div className="container">
              
              <div className="sector-accordion-layout">
                
                {/* Left Column: Editorial Mandate Copy */}
                <div className="sector-left-content reveal">
                  <div className="micro-cred-badge">
                    <span className="micro-cred-dot"></span>
                    <span>The Mandate</span>
                  </div>
                  <h2 className="mandate-title">Built strictly for Nigeria’s high-exposure sectors.</h2>
                  <p className="mandate-subtext">
                    Whether by statutory name or transaction volume, these are the UHL and EHL categories the NDPC explicitly targets.
                  </p>
                  <a href="#check" className="mandate-link-check">
                    <span>Check Your Category</span>
                    <span>↗</span>
                  </a>
                </div>
      
                {/* Right Column: 4 Expanding Cards Horizontal Accordion */}
                <div className="sector-accordion-track reveal delay-1" id="sectorAccordionTrack">
                  
                  {/* Card 1: Tertiary Institutions (Default Active) */}
                  <div className={`sector-accordion-card${active === 0 ? " active" : ""}`} onClick={() => setActive(0)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(0); } }} role="button" tabIndex={0}>
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" alt="Tertiary Institutions Compliance" className="sector-card-bg-img" />
                    <div className="sector-card-overlay"></div>
                    
                    {/* Collapsed Spine Title */}
                    <div className="sector-collapsed-title">Tertiary Institutions</div>
                    
                    {/* Expanded Drawer Content */}
                    <div className="sector-expanded-drawer">
                      <div className="sector-drawer-header">
                        <h3 className="sector-drawer-title">Tertiary Institutions</h3>
                        <span style={{"color": "var(--color-teal-accent)", "fontSize": "1.1rem"}}>↗</span>
                      </div>
                      <p className="sector-drawer-hook">
                        Classed as Enhanced High Level (EHL) outright by the NDPC—by name, not by student volume.
                      </p>
                      <div className="sector-sublinks-grid">
                        <a href="#check" className="sector-sublink-item">• Universities ↗</a>
                        <a href="#check" className="sector-sublink-item">• Polytechnics ↗</a>
                        <a href="#check" className="sector-sublink-item">• Colleges of Education ↗</a>
                      </div>
                      <a href="#tertiary" className="sector-drawer-cta">
                        <span>Explore for Universities</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
      
                  {/* Card 2: Private Sector & SME's */}
                  <div className={`sector-accordion-card${active === 1 ? " active" : ""}`} onClick={() => setActive(1)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(1); } }} role="button" tabIndex={0}>
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="Private Sector and SMEs Compliance" className="sector-card-bg-img" />
                    <div className="sector-card-overlay"></div>
                    
                    {/* Collapsed Spine Title */}
                    <div className="sector-collapsed-title">Private Sector & SME's</div>
                    
                    {/* Expanded Drawer Content */}
                    <div className="sector-expanded-drawer">
                      <div className="sector-drawer-header">
                        <h3 className="sector-drawer-title">Private Sector & SME's</h3>
                        <span style={{"color": "var(--color-teal-accent)", "fontSize": "1.1rem"}}>↗</span>
                      </div>
                      <p className="sector-drawer-hook">
                        Processing customer, employee, and payment data—triggering statutory compliance obligations under the NDPA.
                      </p>
                      <div className="sector-sublinks-grid">
                        <a href="#check" className="sector-sublink-item">• Commercial Banks & Fintech ↗</a>
                        <a href="#check" className="sector-sublink-item">• Retail & E-commerce ↗</a>
                        <a href="#check" className="sector-sublink-item">• Professional Services ↗</a>
                        <a href="#check" className="sector-sublink-item">• Logistics & Distribution ↗</a>
                      </div>
                      <a href="#check" className="sector-drawer-cta">
                        <span>Explore for Businesses</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
      
                  {/* Card 3: Hospitality Industry */}
                  <div className={`sector-accordion-card${active === 2 ? " active" : ""}`} onClick={() => setActive(2)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(2); } }} role="button" tabIndex={0}>
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80" alt="Hospitality Industry Compliance" className="sector-card-bg-img" />
                    <div className="sector-card-overlay"></div>
                    
                    {/* Collapsed Spine Title */}
                    <div className="sector-collapsed-title">Hospitality Industry</div>
                    
                    {/* Expanded Drawer Content */}
                    <div className="sector-expanded-drawer">
                      <div className="sector-drawer-header">
                        <h3 className="sector-drawer-title">Hospitality Industry</h3>
                        <span style={{"color": "var(--color-teal-accent)", "fontSize": "1.1rem"}}>↗</span>
                      </div>
                      <p className="sector-drawer-hook">
                        Hotels, resorts, and booking platforms holding guest records, passport copies, and payment credentials requiring strict data safeguards.
                      </p>
                      <div className="sector-sublinks-grid">
                        <a href="#check" className="sector-sublink-item">• Hotels & Resorts ↗</a>
                        <a href="#check" className="sector-sublink-item">• Booking Platforms ↗</a>
                        <a href="#check" className="sector-sublink-item">• Event Centres & Venues ↗</a>
                        <a href="#check" className="sector-sublink-item">• Restaurants & Chains ↗</a>
                      </div>
                      <a href="#check" className="sector-drawer-cta">
                        <span>Explore for Businesses</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
      
                  {/* Card 4: Healthcare & Public Sector */}
                  <div className={`sector-accordion-card${active === 3 ? " active" : ""}`} onClick={() => setActive(3)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(3); } }} role="button" tabIndex={0}>
                    <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80" alt="Healthcare & Public Sector Compliance" className="sector-card-bg-img" />
                    <div className="sector-card-overlay"></div>
                    
                    {/* Collapsed Spine Title */}
                    <div className="sector-collapsed-title">Healthcare & Public Sector</div>
                    
                    {/* Expanded Drawer Content */}
                    <div className="sector-expanded-drawer">
                      <div className="sector-drawer-header">
                        <h3 className="sector-drawer-title">Healthcare & Public Sector</h3>
                        <span style={{"color": "var(--color-teal-accent)", "fontSize": "1.1rem"}}>↗</span>
                      </div>
                      <p className="sector-drawer-hook">
                        Processing highly sensitive biometric, health, and civic data requiring strict EHL/UHL compliance audits.
                      </p>
                      <div className="sector-sublinks-grid">
                        <a href="#check" className="sector-sublink-item">• Federal & State MDAs ↗</a>
                        <a href="#check" className="sector-sublink-item">• Teaching Hospitals ↗</a>
                        <a href="#check" className="sector-sublink-item">• Private Clinics & Labs ↗</a>
                        <a href="#check" className="sector-sublink-item">• HMO Organizations ↗</a>
                      </div>
                      <a href="#check" className="sector-drawer-cta">
                        <span>Explore for Businesses</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
      
                </div>
      
              </div>
      
            </div>
          </section>
      
    </>
  );
}
