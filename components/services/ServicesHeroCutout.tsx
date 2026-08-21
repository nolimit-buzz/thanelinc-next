/**
 * The hero's cutout image, redesigned against the client's reference more
 * closely: the person now sits inside a coloured chamfered card (with a
 * circular "halo" disc behind the head, echoing the reference's circular
 * portrait framing) instead of floating directly on the page background —
 * a bare transparent-PNG cutout with nothing behind it read as a broken
 * image rather than a deliberate graphic. Re-cropped to head/shoulders/
 * upper-torso (`services-hero-cutout-bust.png`) so the whole visible figure
 * sits inside the card, rather than a full-length cutout that would have to
 * either overflow the card or get cut off mid-body.
 *
 * The floating chips now carry a small photo or icon thumbnail each (not
 * just text, per feedback) and each idle-floats independently once its
 * entrance finishes — different waveform (float-a/float-b, app/globals.css)
 * and different duration/delay per chip, so none of them move in lockstep.
 *
 * Positioned absolutely by the page, spanning from the hero's top down past
 * its 620px bottom edge into "The Problem" section below it — the card
 * itself (not bare cutout pixels) is what's allowed to bleed across that
 * seam, so the overlap reads as an intentional floating panel.
 */

import type { ReactNode } from "react";

const CHAMFER = "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)";
const CHIP_SHADOW = "0 14px 34px -8px rgba(10, 28, 30, 0.3)";

function ChipThumb({ src, icon }: { src?: string; icon?: ReactNode }) {
  return (
    <div
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "7px",
        flexShrink: 0,
        overflow: "hidden",
        background: src ? undefined : "rgba(28,176,184,0.14)",
        display: src ? "block" : "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        icon
      )}
    </div>
  );
}

export function ServicesHeroCutout() {
  return (
    // Reference frame replicating `.container` exactly (max-width: 1320px,
    // centred, 32px padding — app/v5.css) so the card below inherits the
    // same right-hand column the homepage's `.hero-right-visual-wrapper`
    // occupies (max-width: 440px, margin-right: 28px, justify-self: end).
    // That column starts to the LEFT of the hero's 32% dark-zone boundary,
    // which is why the homepage's hero image overlaps into the light zone
    // rather than sitting only inside the dark one — matched here instead
    // of hugging the viewport's right edge, which kept it confined to the
    // dark side only.
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "min(1320px, 100%)",
        transform: "translateX(-50%)",
        padding: "0 32px",
        boxSizing: "border-box",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <div style={{ marginLeft: "auto", width: "min(360px, 100%)", marginRight: "28px", position: "relative", top: "84px" }}>
      {/* Card + circular halo + bust, contained together — no part of the
          cutout sits directly on the page background. */}
      <div
        style={{
          position: "relative",
          background: "var(--color-forest-dark)",
          clipPath: CHAMFER,
          boxShadow: "0 30px 70px -15px rgba(0,0,0,0.4)",
          paddingTop: "36px",
          overflow: "hidden",
          animation: "fade-in-up 0.7s var(--ease-out-cubic) 0.15s both",
        }}
      >
        <div
          aria-hidden
          style={{
            width: "210px",
            height: "210px",
            borderRadius: "50%",
            background: "linear-gradient(160deg, rgba(28,176,184,0.35), rgba(28,176,184,0.08))",
            margin: "0 auto",
            position: "relative",
            top: "10px",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/services-hero-cutout-bust.png"
          alt=""
          style={{
            display: "block",
            width: "88%",
            height: "auto",
            margin: "-172px auto 0",
            position: "relative",
          }}
        />
        <div style={{ height: "28px" }} />
      </div>

      {/* Chip 1 — top-left, photo card */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "-46px",
          background: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: CHIP_SHADOW,
          padding: "9px 12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "185px",
          animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.5s both, float-a 4.6s ease-in-out 1.1s infinite",
        }}
      >
        <ChipThumb src="/hero-portrait-sectors.jpg" />
        <div>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: "0.73rem", fontWeight: 700, color: "var(--color-forest-dark)" }}>
            NDPC Registration
          </div>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: "0.66rem", color: "var(--color-text-body)" }}>
            Certificate in 3 working days
          </div>
        </div>
      </div>

      {/* Chip 2 — top-right, photo card */}
      <div
        style={{
          position: "absolute",
          top: "128px",
          right: "-52px",
          background: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: CHIP_SHADOW,
          padding: "9px 12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "192px",
          animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.68s both, float-b 5.3s ease-in-out 1.3s infinite",
        }}
      >
        <ChipThumb src="/hero-hologram.jpg" />
        <div>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: "0.73rem", fontWeight: 700, color: "var(--color-forest-dark)" }}>
            Compliance Audit
          </div>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: "0.66rem", color: "var(--color-text-body)" }}>
            Filed ahead of 31 March
          </div>
        </div>
      </div>

      {/* Chip 3 — small pill, mid-right */}
      <div
        style={{
          position: "absolute",
          top: "300px",
          right: "-28px",
          background: "var(--color-teal-accent)",
          color: "#081719",
          borderRadius: "20px",
          boxShadow: CHIP_SHADOW,
          padding: "8px 16px",
          fontFamily: "var(--font-outfit)",
          fontSize: "0.72rem",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          animation: "fade-in-up 0.6s var(--ease-out-cubic) 0.84s both, float-a 3.8s ease-in-out 1.5s infinite",
        }}
      >
        Am I covered? →
      </div>

      {/* Chip 4 — bottom-left, "location" style card with icon + action tag */}
      <div
        style={{
          position: "absolute",
          top: "398px",
          left: "-50px",
          background: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: CHIP_SHADOW,
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "168px",
          animation: "fade-in-up 0.6s var(--ease-out-cubic) 1.0s both, float-b 4.2s ease-in-out 1.7s infinite",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ChipThumb
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            }
          />
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: "0.73rem", fontWeight: 700, color: "var(--color-forest-dark)" }}>
            Ongoing Monitoring
          </div>
        </div>
        <span
          style={{
            alignSelf: "flex-start",
            background: "rgba(28,176,184,0.12)",
            color: "var(--color-text-headline-teal)",
            fontFamily: "var(--font-outfit)",
            fontSize: "0.66rem",
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: "4px",
          }}
        >
          Every quarter
        </span>
      </div>
      </div>
    </div>
  );
}
