"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { StageTable, type StageRow } from "@/components/sectors/StageTable";

export interface AccordionItem {
  number: string;
  heading: string;
  body?: string;
  /** Numbered steps. Markup lifted from ServicePageTemplate's body blocks. */
  steps?: string[];
  /** A scope table — same chrome as the sector page's turnaround table. */
  stages?: StageRow[];
  /** Link chips. Markup lifted from ServicePageTemplate's "Who this is for". */
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
}

/**
 * Numbered accordion, one row open at a time. No v5 source — v5 never built
 * a multi-page site, let alone an accordion of this kind, so this is new
 * markup built against existing tokens (divider value matches the turnaround
 * table above it on the same page; numbering style matches `.process-step-num`
 * in Process.tsx) rather than inventing new visual language.
 *
 * Also drives the service pages since 2026-08-20 (D1). `steps` and `links` are
 * additive and optional, so the sector page renders unchanged.
 */
export function QuestionAccordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const instanceId = useId();

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${instanceId}-button-${i}`;
        const panelId = `${instanceId}-panel-${i}`;
        return (
          <div key={item.heading} style={{ borderTop: i > 0 ? "1px solid rgba(10, 28, 30, 0.09)" : "none" }}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={buttonId}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                padding: "28px 4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                outlineColor: "var(--color-teal-accent)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "var(--color-text-muted)",
                  flexShrink: 0,
                  width: "28px",
                }}
              >
                {item.number}
              </span>
              <span
                className="section-h2-title"
                style={{ marginBottom: 0, flex: 1, color: "var(--color-forest-dark)" }}
              >
                {item.heading}
              </span>
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  color: "var(--color-teal-accent)",
                  fontSize: "1.1rem",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s var(--ease-out-cubic)",
                }}
              >
                ⌄
              </span>
            </button>

            {isOpen ? (
              <div id={panelId} role="region" aria-labelledby={buttonId} style={{ minWidth: 0 }}>
                <div style={{ padding: "0 4px 32px 52px", minWidth: 0 }}>
                  {item.body ? (
                    <p
                      className="process-step-desc"
                      style={{
                        marginBottom: item.cta || item.steps || item.links ? "12px" : 0,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.body}
                    </p>
                  ) : null}

                  {item.stages ? (
                    <div style={{ marginBottom: item.cta ? "20px" : 0 }}>
                      <StageTable rows={item.stages} />
                    </div>
                  ) : null}

                  {item.steps ? (
                    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                      {item.steps.map((step, si) => (
                        <li key={step} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                          <span
                            aria-hidden
                            style={{
                              flexShrink: 0,
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              background: "rgba(28, 176, 184, 0.12)",
                              color: "var(--color-teal-accent)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                            }}
                          >
                            {si + 1}
                          </span>
                          <span style={{ color: "var(--color-text-body)", lineHeight: 1.65, paddingTop: "2px" }}>{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}

                  {item.links ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="mandate-link-check"
                          style={{
                            border: "1px solid rgba(10, 28, 30, 0.12)",
                            borderRadius: "var(--radius-sm)",
                            padding: "10px 18px",
                          }}
                        >
                          <span>{link.label}</span>
                          <span>→</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}

                  {item.cta ? (
                    <Link href={item.cta.href} className="mandate-link-check">
                      <span>{item.cta.label}</span>
                      <span>→</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
