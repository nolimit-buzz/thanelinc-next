"use client";

// Ported from registration-marks-v5.html lines 3354–3478. W-030 replaces the
// duplicated nav with SiteNav. W-037 narrowly supersedes W-026 for the visual
// treatment and destinations inside the carousel only; the hero architecture,
// copy, motion states, and timing remain unchanged.
// Client component: the hero carousel and sticky-nav state need state.

import { useEffect, useRef, useState } from "react";
import { IndexHeroVisual } from "@/components/inner/IndexSplitHero";
import { SiteNav } from "@/components/SiteNav";
import { homeMandateSlides } from "@/lib/content/home";

export function Hero() {
  const [slide, setSlide] = useState(0);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // v5: auto-advance every 6s, paused on hover over the chamfer card.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % homeMandateSlides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  // v5 initHeroMotion(): everything inside the hero is opacity:0 until the
  // wrapper gains .hero-entered. Without this the hero and nav render but stay
  // invisible.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const t = setTimeout(() => setEntered(true), 80);
      return () => clearTimeout(t);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // v5: hero gains .hero-exiting past 35% of its own height, and loses it
  // again on the way back up. Nav scroll state (.scrolled) is now owned by
  // SiteNav itself (W-030) — same 40px threshold, just no longer computed
  // here.
  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      const h = wrapRef.current?.offsetHeight || window.innerHeight;
      setExiting(y > h * 0.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
          {/* SECTION 1: ARCHITECTURAL SPLIT HERO (HERO + NAV = EXACT 100VH) */}
          <div ref={wrapRef} className={`hero-split-wrapper${entered ? " hero-entered" : ""}${exiting ? " hero-exiting" : ""}`}>
            
            {/* Right Side Dark Forest Slate Block Backdrop (Flows All The Way From Top Of Nav) */}
            <div className="hero-right-dark-backdrop"></div>
      
            {/* Consolidated nav (W-030) — see the file header comment. */}
            <SiteNav variant="light" heroMotion />
      
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
                  
                  {homeMandateSlides.map((item, index) => (
                    <div
                      key={item.id}
                      className={`carousel-slide-item hero-index-slide${slide === index ? " active" : ""}`}
                      id={`heroSlide${index + 1}`}
                      aria-hidden={slide !== index}
                    >
                      <a
                        href={item.cta.href}
                        className="hero-index-slide-link"
                        tabIndex={slide === index ? 0 : -1}
                        aria-label={item.cta.label}
                      >
                        <IndexHeroVisual eyebrow={item.eyebrow} {...item.visual} carousel />
                      </a>
                    </div>
                  ))}
      
                  {/* Carousel Navigation Dots */}
                  <div className="carousel-nav-dots">
                    {homeMandateSlides.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`carousel-dot${slide === index ? " active" : ""}`}
                        onClick={() => setSlide(index)}
                        aria-label={`Show ${item.title}`}
                        aria-current={slide === index ? "true" : undefined}
                      />
                    ))}
                  </div>
      
                  {/* Carousel Arrow Controls */}
                  <button type="button" onClick={() => setSlide((s) => (s + homeMandateSlides.length - 1) % homeMandateSlides.length)} className="carousel-arrow-btn carousel-arrow-prev" aria-label="Previous Slide">‹</button>
                  <button type="button" onClick={() => setSlide((s) => (s + 1) % homeMandateSlides.length)} className="carousel-arrow-btn carousel-arrow-next" aria-label="Next Slide">›</button>
      
                </div>
              </div>
      
            </div>
      
          </div>
      
    </>
  );
}
