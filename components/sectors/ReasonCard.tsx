"use client";

import { useState } from "react";

/**
 * Flat colour block, matching the client's reference exactly: large faded
 * index number, bold white heading, body copy, edge-to-edge grid (no gap,
 * no chamfer — square corners, per that reference). No photography — the
 * two earlier attempts (photo+icon+drawer, then photo+tint) are both gone;
 * this is deliberately the simplest version after three rounds of feedback.
 *
 * Micro-interactions on hover (lift, index number brightens, CTA arrow
 * shifts) plus an on-mount staggered entrance via `delayIndex` — using the
 * `fade-in-up` keyframe in globals.css, not `.reveal`/ScrollReveals, which
 * has twice left elements on this page stuck invisible.
 */
export function ReasonCard({
  title,
  body,
  cta,
  shade,
  index,
  delayIndex,
}: {
  title: string;
  body: string;
  cta?: { label: string; href: string };
  shade: string;
  index: string;
  delayIndex: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: shade,
        clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
        padding: "40px 36px",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(10, 28, 30, 0.28)" : "0 6px 24px rgba(10, 28, 30, 0.12)",
        transition: "transform 0.35s var(--ease-out-cubic), box-shadow 0.35s var(--ease-out-cubic)",
        animation: `fade-in-up 0.6s var(--ease-out-cubic) both`,
        animationDelay: `${delayIndex * 0.12}s`,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "24px",
          left: "32px",
          fontSize: "4.5rem",
          fontWeight: 800,
          fontFamily: "var(--font-outfit)",
          color: hovered ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.12)",
          lineHeight: 1,
          transition: "color 0.35s ease",
        }}
      >
        {index}
      </span>
      <div style={{ position: "relative" }}>
        <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 12px 0", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.65, marginBottom: cta ? "16px" : 0 }}>
          {body}
        </p>
        {cta ? (
          <a
            href={cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: hovered ? "12px" : "8px",
              fontFamily: "var(--font-outfit)",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#FFFFFF",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.5)",
              paddingBottom: "2px",
              transition: "gap 0.25s var(--ease-out-cubic)",
            }}
          >
            <span>{cta.label}</span>
            <span>→</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
