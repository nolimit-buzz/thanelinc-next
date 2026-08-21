"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { MegaMenu, NavItem } from "@/lib/content/navigation";

function SoonTag() {
  return (
    <span
      style={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.55)",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "3px",
        padding: "2px 6px",
        marginLeft: "8px",
      }}
    >
      Soon
    </span>
  );
}

function DrawerLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (item.status !== "live") {
    return (
      <div style={{ display: "flex", alignItems: "center", padding: "12px 4px", color: "rgba(255,255,255,0.45)", fontSize: "14px", fontWeight: 500 }}>
        {item.label}
        <SoonTag />
      </div>
    );
  }
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      style={{ display: "block", padding: "12px 4px", color: "#E7ECE9", textDecoration: "none", fontWeight: 500, fontSize: "14px" }}
    >
      {item.label}
    </Link>
  );
}

/** One expandable section per mega menu, grammar lifted from
 *  `QuestionAccordion` (numbered row, rotating chevron, grid-row collapse) —
 *  reused rather than reinvented for the same reason it was reused there. */
function DrawerSection({
  number,
  label,
  data,
  onNavigate,
}: {
  number: string;
  label: string;
  data: MegaMenu;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const allItems = data.columns.flatMap((c) => c.items);

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "18px 4px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", width: "24px" }}>{number}</span>
        <span style={{ flex: 1, fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF" }}>{label}</span>
        <span
          aria-hidden
          style={{
            color: "var(--color-teal-accent)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s var(--ease-out-cubic)",
          }}
        >
          ⌄
        </span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.35s var(--ease-out-cubic)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 4px 18px 40px" }}>
            {allItems.map((item) => (
              <DrawerLink key={item.href + item.label} item={item} onNavigate={onNavigate} />
            ))}
            {data.viewAll.status === "live" ? (
              <Link
                href={data.viewAll.href}
                onClick={onNavigate}
                style={{ display: "inline-flex", gap: "6px", marginTop: "8px", color: "var(--color-teal-accent)", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}
              >
                {data.viewAll.label} <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileNavDrawer({
  open,
  onClose,
  menus,
  simpleLinks,
  contact,
}: {
  open: boolean;
  onClose: () => void;
  menus: { key: string; data: MegaMenu }[];
  simpleLinks: NavItem[];
  contact: NavItem;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "var(--color-forest-dark)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s var(--ease-out-cubic)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "18px 20px" }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", padding: "6px" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav style={{ padding: "0 20px 40px", flex: 1 }}>
        {menus.map((m, i) => (
          <DrawerSection
            key={m.key}
            number={`0${i + 1}`}
            label={m.data.label}
            data={m.data}
            onNavigate={onClose}
          />
        ))}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {simpleLinks.map((item) => (
            <div key={item.href} style={{ padding: "18px 4px" }}>
              <DrawerLink item={item} onNavigate={onClose} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: "28px" }}>
          <Link
            href={contact.href}
            onClick={onClose}
            className="btn-architectural-cta btn-architectural-cta-light"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <span className="btn-arch-label">{contact.label}</span>
            <span className="btn-arch-arrow">→</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
