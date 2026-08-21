"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import type { MegaMenu as MegaMenuData, NavItem } from "@/lib/content/navigation";

const CHAMFER = "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)";

function SoonTag() {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
        background: "rgba(10, 28, 30, 0.06)",
        borderRadius: "3px",
        padding: "2px 6px",
        marginLeft: "8px",
        verticalAlign: "middle",
      }}
    >
      Soon
    </span>
  );
}

function MenuItemRow({ item, dense, tabIndex }: { item: NavItem; dense: boolean; tabIndex: number }) {
  const isLive = item.status === "live";
  const content = (
    <>
      {item.icon ? (
        <span
          aria-hidden
          style={{
            flexShrink: 0,
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: "rgba(10, 28, 30, 0.04)",
            color: isLive ? "var(--color-teal-accent)" : "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ServiceRowIcon name={item.icon as never} size={18} />
        </span>
      ) : null}
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontWeight: 500,
            fontSize: "14px",
            color: isLive ? "var(--color-forest-dark)" : "var(--color-text-muted)",
            lineHeight: 1.3,
          }}
        >
          {item.label}
          {!isLive ? <SoonTag /> : null}
        </span>
        {item.description && !dense ? (
          <span
            style={{
              display: "block",
              fontSize: "0.78rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.45,
              marginTop: "2px",
            }}
          >
            {item.description}
          </span>
        ) : null}
      </span>
    </>
  );

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: item.icon ? "flex-start" : "center",
    gap: "12px",
    padding: dense ? "6px 8px" : "8px 8px",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background 0.15s ease",
  };

  if (!isLive) {
    return (
      <div style={{ ...rowStyle, cursor: "default" }} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="mega-menu-item"
      tabIndex={tabIndex}
      style={rowStyle}
    >
      {content}
    </Link>
  );
}

export function MegaMenuPanel({
  data,
  open,
  panelId,
  onClose,
}: {
  data: MegaMenuData;
  open: boolean;
  panelId: string;
  /** The panel itself is always white (matches the reference), independent
   *  of the trigger's own light/dark styling — no `isLight` prop needed. */
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id={panelId}
      ref={panelRef}
      role="region"
      aria-label={`${data.label} menu`}
      className="mega-menu-panel"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        zIndex: 60,
        // Motion: a single composited transform+opacity pair (AC6), reduced
        // to an instant show under prefers-reduced-motion via the CSS rule
        // in v5.css rather than a second code path here.
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transform: open ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.22s var(--ease-out-cubic), transform 0.22s var(--ease-out-cubic), visibility 0.22s",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid rgba(10, 28, 30, 0.08)",
          boxShadow: "0 30px 60px -15px rgba(10, 28, 30, 0.25)",
        }}
      >
        <div
          className="container mega-menu-grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${data.columns.length}, minmax(200px, 1fr)) minmax(260px, 320px)`,
            gap: "0",
            padding: "40px 0 32px",
          }}
        >
          {data.columns.map((col, ci) => (
            <div
              key={col.eyebrow}
              style={{
                padding: "0 32px",
                borderLeft: ci === 0 ? "none" : "1px solid rgba(10, 28, 30, 0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  paddingBottom: "12px",
                  marginBottom: "14px",
                  borderBottom: "1px solid rgba(10, 28, 30, 0.08)",
                }}
              >
                {col.eyebrow}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: col.items.some((i) => i.icon) ? "6px" : "2px",
                  // staggered reveal — each column's items fade up slightly
                  // offset from the previous, matching the reference's
                  // populate-after-expand motion
                  animation: open ? `mega-menu-stagger 0.32s var(--ease-out-cubic) both` : undefined,
                  animationDelay: open ? `${0.05 + ci * 0.05}s` : undefined,
                }}
              >
                {col.items.map((item) => (
                  <MenuItemRow key={item.href + item.label} item={item} dense={!item.icon} tabIndex={open ? 0 : -1} />
                ))}
              </div>
            </div>
          ))}

          {/* Right rail — featured card */}
          <div
            style={{
              padding: "0 0 0 32px",
              borderLeft: "1px solid rgba(10, 28, 30, 0.08)",
              animation: open ? "mega-menu-stagger 0.32s var(--ease-out-cubic) both" : undefined,
              animationDelay: open ? `${0.05 + data.columns.length * 0.05}s` : undefined,
            }}
          >
            <div
              style={{
                background: "var(--color-forest-dark)",
                color: "#FFFFFF",
                clipPath: CHAMFER,
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-teal-accent)",
                  marginBottom: "10px",
                }}
              >
                {data.featured.eyebrow}
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "8px" }}>{data.featured.title}</div>
              <p style={{ fontSize: "0.82rem", color: "#CBD5E1", lineHeight: 1.5, marginBottom: "16px" }}>
                {data.featured.description}
              </p>
              {data.featured.status === "live" ? (
                <Link
                  href={data.featured.href}
                  tabIndex={open ? 0 : -1}
                  className="btn-architectural-cta btn-architectural-cta-light"
                  style={{ fontSize: "0.8rem", padding: "8px 16px" }}
                >
                  <span className="btn-arch-label">{data.featured.ctaLabel}</span>
                  <span className="btn-arch-arrow">→</span>
                </Link>
              ) : (
                <span style={{ fontSize: "0.8rem", color: "#94A3B8", display: "inline-flex", alignItems: "center" }}>
                  {data.featured.ctaLabel} <SoonTag />
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="container" style={{ paddingBottom: "24px" }}>
          {data.viewAll.status === "live" ? (
            <Link
              href={data.viewAll.href}
              tabIndex={open ? 0 : -1}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--color-forest-dark)",
                border: "1px solid rgba(10, 28, 30, 0.15)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 18px",
                textDecoration: "none",
              }}
            >
              {data.viewAll.label} <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function useMenuId(label: string) {
  const id = useId();
  return `mega-menu-${label.toLowerCase().replace(/\s+/g, "-")}-${id.replace(/:/g, "")}`;
}

/** Trigger button only — the panel renders once at the header level (see
 *  SiteNav) so it can be positioned full-width regardless of where in the
 *  flex nav its trigger sits. */
export function MegaMenuTrigger({
  label,
  panelId,
  isOpen,
  isLight,
  onOpen,
  onClose,
  onToggle,
  triggerRef,
}: {
  label: string;
  panelId: string;
  isOpen: boolean;
  isLight: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <li onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        ref={triggerRef}
        type="button"
        className="nav-item-clean"
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          // `font: "inherit"` here previously made the button inherit its
          // ancestor's browser-default font (16px/400) instead of picking up
          // `.nav-item-clean`'s own 14px/500 rule — inline styles beat class
          // rules regardless of specificity, so it silently won. Set the two
          // properties that actually matter explicitly instead.
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: 500,
          color: isLight ? "var(--color-forest-dark)" : undefined,
        }}
        onClick={onToggle}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            stroke: isLight ? "var(--color-forest-dark)" : undefined,
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </li>
  );
}

export function MegaMenuScrim({ visible, onClick }: { visible: boolean; onClick: () => void }) {
  return (
    <div
      aria-hidden
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8, 23, 25, 0.35)",
        zIndex: 55,
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        transition: "opacity 0.22s ease, visibility 0.22s",
        pointerEvents: visible ? "auto" : "none",
      }}
    />
  );
}
