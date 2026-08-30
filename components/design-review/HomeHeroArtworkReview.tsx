"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import styles from "@/components/design-review/home-hero-artwork-review.module.css";

export interface HomeHeroContent {
  eyebrow: string;
  headlinePrimary: string;
  headlineLead: string;
  headlineAccent: string;
  headlineSecondary: string;
  lede: string;
  primaryCta: { label: string; href: string };
  primaryCtaCaption: string;
  scrollLabel: string;
  slides: Array<{
    id: string;
    title: string;
    eyebrow: string;
    description: string;
    image: { src: string; width: number; height: number };
    cta: { label: string; href: string };
  }>;
}

/**
 * Homepage hero. Superseded the former v5 Hero (shared index-hero visual)
 * after approval; still mounted standalone at /design-review/home for
 * isolated review, which stays noindex and 404s in production.
 */
export function HomeHeroArtworkReview({ content }: { content: HomeHeroContent }) {
  const [slide, setSlide] = useState(0);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const slides = content.slides;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.setTimeout(() => setEntered(true), 80);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const position = window.pageYOffset || document.documentElement.scrollTop;
      const height = wrapRef.current?.offsetHeight || window.innerHeight;
      setExiting(position > height * 0.35);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const previousSlide = () => {
    setSlide((current) => (current + slides.length - 1) % slides.length);
  };

  const nextSlide = () => {
    setSlide((current) => (current + 1) % slides.length);
  };

  return (
    <div ref={wrapRef} className={`hero-split-wrapper${entered ? " hero-entered" : ""}${exiting ? " hero-exiting" : ""}`}>
      <div className="hero-right-dark-backdrop" />
      <SiteNav variant="light" heroMotion />

      <div className="container hero-main-layout">
        <a href="#problem" className="hero-vertical-scroll-column hero-motion-item delay-scroll" aria-label="Scroll down to next section">
          <div className="scroll-down-text">{content.scrollLabel}</div>
          <div className="scroll-arrow-box">↓</div>
          <div className="scroll-vertical-line" />
        </a>

        <div className="hero-left-content">
          <div className="hero-eyebrow-badge hero-motion-item delay-eyebrow">
            <span className="micro-cred-dot" />
            <span>{content.eyebrow}</span>
          </div>

          <h1 className="hero-h1-clean hero-motion-item delay-h1">
            <span className="h1-line-primary">{content.headlinePrimary}</span>
            <span className="h1-line-split"><span className="h1-primary-text">{content.headlineLead} </span><span className="h1-secondary-text">{content.headlineAccent}</span></span>
            <span className="h1-line-secondary">{content.headlineSecondary}</span>
          </h1>

          <p className="hero-lede-text hero-motion-item delay-lede">
            {content.lede}
          </p>

          <div className="hero-motion-item delay-cta">
            <a href={content.primaryCta.href} className="btn-architectural-cta">
              <span className="btn-arch-label">{content.primaryCta.label}</span>
              <span className="btn-arch-arrow">→</span>
            </a>
            <div className="cta-sub-caption">{content.primaryCtaCaption}</div>
          </div>
        </div>

        <div className="hero-right-visual-wrapper hero-visual-motion">
          <div
            className={`hero-chamfer-card ${styles.reviewCard}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              const nextTarget = event.relatedTarget as Node | null;
              if (!nextTarget || !event.currentTarget.contains(nextTarget)) setPaused(false);
            }}
          >
            {slides.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-slide-item${slide === index ? " active" : ""}`}
                aria-hidden={slide !== index}
              >
                <a
                  href={item.cta.href}
                  className={styles.slideLink}
                  tabIndex={slide === index ? 0 : -1}
                  aria-label={item.cta.label}
                >
                  <span className={styles.stage} aria-hidden />
                  <Image
                    src={item.image.src}
                    alt=""
                    width={item.image.width}
                    height={item.image.height}
                    className={styles.image}
                    priority={index === 0}
                  />
                  <span className={styles.caption}>
                    <span className={styles.eyebrow}>{item.eyebrow}</span>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.description}>{item.description}</span>
                    <span className={styles.cta}>{item.cta.label} →</span>
                  </span>
                </a>
              </div>
            ))}

            <div className="carousel-nav-dots">
              {slides.map((item, index) => (
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

            <button type="button" onClick={previousSlide} className="carousel-arrow-btn carousel-arrow-prev" aria-label="Previous slide">‹</button>
            <button type="button" onClick={nextSlide} className="carousel-arrow-btn carousel-arrow-next" aria-label="Next slide">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
