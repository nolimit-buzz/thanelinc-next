"use client";

// Ported verbatim from registration-marks-v5.html lines 3354–3478.
// Class names and copy are v5's. Do not restyle or reword (W-026).
// Client component: the hero carousel and sticky-nav state need state.

import { useEffect, useState } from "react";

export function Hero() {
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // v5: auto-advance every 6s, paused on hover over the chamfer card.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % 3), 6000);
    return () => clearInterval(t);
  }, [paused]);

  // v5: nav gains .scrolled past 30px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
          {/* SECTION 1: ARCHITECTURAL SPLIT HERO (HERO + NAV = EXACT 100VH) */}
          <div className="hero-split-wrapper">
            
            {/* Right Side Dark Forest Slate Block Backdrop (Flows All The Way From Top Of Nav) */}
            <div className="hero-right-dark-backdrop"></div>
      
            {/* Clean Sticky Site Navigation with Subtle Blur */}
            <header className={`site-nav-clean hero-nav-motion${scrolled ? " scrolled" : ""}`} id="stickyNav">
              <div className="container nav-inner-split">
                
                <a href="#" className="brand-logo-dark" aria-label="Thanelinc Home">
                  <img src="/thanelinc-brand-logo.svg" alt="Thanelinc" className="brand-img-logo logo-default" />
                  <img src="/thanelinc-brand-logo-white.svg" alt="Thanelinc" className="brand-img-logo logo-scrolled" />
                </a>
      
                {/* Menu Items Kept Within Light Theme */}
                <ul className="nav-links-clean">
                  <li><a href="#services" className="nav-item-clean">Services <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></a></li>
                  <li><a href="#sectors" className="nav-item-clean">Sectors <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></a></li>
                  <li><a href="#process" className="nav-item-clean">How We Work</a></li>
                  <li><a href="#resources" className="nav-item-clean">Resources <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></a></li>
                  <li><a href="#credentials" className="nav-item-clean">About & Credentials</a></li>
                </ul>
      
                {/* Right Utility Elements Transcending Into Dark Forest Block (Clean White & Teal) */}
                <div className="nav-right-utility">
                  <a href="#contact" className="nav-contact-btn">Contact Us →</a>
                  <button className="nav-search-btn" aria-label="Search">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                  </button>
                </div>
      
              </div>
            </header>
      
            {/* Main Split Content Grid (3-Column Layout: Left Scroll Track | Center Copy | Right Image) */}
            <div className="container hero-main-layout">
              
              {/* Left Vertical Scroll Indicator Track (Starts Flush Under Logo) */}
              <a href="#problem" className="hero-vertical-scroll-column hero-motion-item delay-scroll" aria-label="Scroll down to next section">
                <div className="scroll-down-text">SCROLL DOWN</div>
                <div className="scroll-arrow-box">↓</div>
                <div className="scroll-vertical-line"></div>
              </a>
      
              {/* Center-Left Typography & Copy Column */}
              <div className="hero-left-content">
                
                {/* Eyebrow Badge */}
                <div className="hero-eyebrow-badge hero-motion-item delay-eyebrow">
                  <span className="micro-cred-dot"></span>
                  <span>NDPC-Licensed · Data Protection Compliance Organization</span>
                </div>
      
                {/* 4rem Headline Structured Cleanly Across 3 Lines */}
                <h1 className="hero-h1-clean hero-motion-item delay-h1">
                  <span className="h1-line-primary">Eliminate Regulatory</span>
                  <span className="h1-line-split"><span className="h1-primary-text">Risk. </span><span className="h1-secondary-text">Gain the</span></span>
                  <span className="h1-line-secondary">Compliance Edge.</span>
                </h1>
      
                {/* Description Paragraph Text Limited to <= 18px */}
                <p className="hero-lede-text hero-motion-item delay-lede">
                  We help high-impact organisations, from financial institutions and telecoms to universities and MDAs stay fully compliant. As a licensed DPCO, Thanelinc handles your end-to-end NDPC regulatory filings with zero friction.
                </p>
      
                <div className="hero-motion-item delay-cta">
                  <a href="#check" className="btn-architectural-cta">
                    <span className="btn-arch-label">AM I COVERED?</span>
                    <span className="btn-arch-arrow">→</span>
                  </a>
                  <div className="cta-sub-caption">2 minute check</div>
                </div>
      
              </div>
      
              {/* Right Multi-Slide Cinematic Portrait Carousel Card */}
              <div className="hero-right-visual-wrapper hero-visual-motion">
                <div className="hero-chamfer-card" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                  
                  {/* Slide 1: Holographic Compliance Interface */}
                  <div className={`carousel-slide-item${slide === 0 ? " active" : ""}`} id="heroSlide1">
                    <img src="/hero-hologram.jpg" alt="Thanelinc NDPC Regulatory Compliance Oversight" className="hero-chamfer-img" />
                    <a href="#credentials" className="hero-floating-glass-badge">
                      <span className="glass-badge-title">Our DPCO Licence</span>
                      <span className="glass-badge-icon">▶</span>
                    </a>
                  </div>
      
                  {/* Slide 2: Regulatory Audit Execution & Timeline */}
                  <div className={`carousel-slide-item${slide === 1 ? " active" : ""}`} id="heroSlide2">
                    <img src="/hero-portrait-audit.jpg" alt="NDPC Compliance Audit Filing Management" className="hero-chamfer-img" />
                    <a href="#process" className="hero-floating-glass-badge">
                      <span className="glass-badge-title">6-Step Process Timeline</span>
                      <span className="glass-badge-icon">⏱</span>
                    </a>
                  </div>
      
                  {/* Slide 3: High-Risk Sector Compliance */}
                  <div className={`carousel-slide-item${slide === 2 ? " active" : ""}`} id="heroSlide3">
                    <img src="/hero-portrait-sectors.jpg" alt="Higher Institutions & Regulated Enterprise Sectors" className="hero-chamfer-img" />
                    <a href="#sectors" className="hero-floating-glass-badge">
                      <span className="glass-badge-title">Explore Sector Doors</span>
                      <span className="glass-badge-icon">🏛</span>
                    </a>
                  </div>
      
                  {/* Carousel Navigation Dots */}
                  <div className="carousel-nav-dots">
                    <button type="button" className={`carousel-dot${slide === 0 ? " active" : ""}`} onClick={() => setSlide(0)} aria-label={"Go to slide 1"} />
                    <button type="button" className={`carousel-dot${slide === 1 ? " active" : ""}`} onClick={() => setSlide(1)} aria-label={"Go to slide 2"} />
                    <button type="button" className={`carousel-dot${slide === 2 ? " active" : ""}`} onClick={() => setSlide(2)} aria-label={"Go to slide 3"} />
                  </div>
      
                  {/* Carousel Arrow Controls */}
                  <button type="button" onClick={() => setSlide((s) => (s + 2) % 3)} className="carousel-arrow-btn carousel-arrow-prev" aria-label="Previous Slide">‹</button>
                  <button type="button" onClick={() => setSlide((s) => (s + 1) % 3)} className="carousel-arrow-btn carousel-arrow-next" aria-label="Next Slide">›</button>
      
                </div>
              </div>
      
            </div>
      
          </div>
      
    </>
  );
}
