"use client";

import Link from "next/link";
import { consentBanner } from "@/lib/content/consent";
import { useConsent } from "@/lib/consent/store";

export function ConsentBanner() {
  const { consent, accept, necessaryOnly } = useConsent();

  if (consent.decided) return null;

  return (
    <div
      role="region"
      aria-label={consentBanner.heading}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        background: "var(--color-forest-dark)",
        color: "#FFFFFF",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        padding: "20px 0",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ flex: "1 1 420px", minWidth: 0 }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700 }}>{consentBanner.heading}</p>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5, opacity: 0.9 }}>
            {consentBanner.body}{" "}
            <Link href={consentBanner.cookiePolicyLink.href} style={{ color: "#FFFFFF", textDecoration: "underline" }}>
              {consentBanner.cookiePolicyLink.label}
            </Link>
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={necessaryOnly}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "#FFFFFF",
              borderRadius: "4px",
              padding: "10px 16px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {consentBanner.necessaryOnlyLabel}
          </button>
          <button type="button" onClick={accept} className="btn-architectural-cta">
            <span className="btn-arch-label">{consentBanner.acceptLabel}</span>
            <span className="btn-arch-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
