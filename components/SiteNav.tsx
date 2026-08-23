"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MegaMenuPanel, MegaMenuScrim, MegaMenuTrigger, useMenuId } from "@/components/MegaMenu";
import { MobileNavDrawer } from "@/components/MobileNavDrawer";
import { SiteSearch } from "@/components/search/SiteSearch";
import { aboutMenu, servicesMenu, sectorsMenu, resourcesMenu, howWeWorkNavItem, contactNavItem, type NavItem } from "@/lib/content/navigation";

/**
 * Consolidated nav (W-030) — the single implementation for every route,
 * including the homepage, replacing the two divergent navs that existed
 * before: this file (used on every route except `/`) and a separate
 * v5-ported header inside `Hero.tsx`.
 *
 * `variant` controls the STARTING appearance, before scroll:
 * `"light"` — dark text, for a page whose hero is light. Two different
 * unscrolled treatments live under this one flag, chosen by `heroMotion`:
 *   - the homepage (`heroMotion`) gets v5's ORIGINAL transparent nav —
 *     `.nav-item-clean`/`.nav-contact-btn`'s own default CSS colours, no
 *     inline overrides, no painted background. This is deliberate: the
 *     homepage's hero is itself split light/dark (`.hero-right-dark-backdrop`
 *     at 32% from the right), so the unscrolled nav needs dark text over its
 *     light left portion AND a legible control over its dark right portion —
 *     exactly what v5's own CSS already produces natively. Restored here
 *     after an earlier pass wrongly flattened it to the painted-bar
 *     treatment below; see W-030's amendment in DECISIONS.md.
 *   - other light-hero pages without their own split backdrop
 *     gets a solid two-tone `#B1BFC0`/`#819293` painted bar instead, since
 *     those pages don't have a matching split hero for a transparent nav to
 *     sit over.
 * `"dark"` — white text, solid dark bar, for a page whose hero is dark or
 * has none worth showing through.
 * All three converge to the identical scrolled state (solid dark, white
 * text, from `.site-nav-clean.scrolled` — no inline override needed) at the
 * same 40px threshold used everywhere else on the site.
 */

const CLOSE_DELAY_MS = 150;

/** A plain nav link (not a mega-menu trigger) that still respects D1's
 *  status flag — `MegaMenuTrigger`'s dropdown items already do this via
 *  `MenuItemRow`; "How We Work" and "About & Credentials" are simple links
 *  sitting next to those triggers and need the identical treatment. */
function SimpleNavLink({ item, paintedBar }: { item: NavItem; paintedBar: boolean }) {
  if (item.status !== "live") {
    return (
      <li>
        <span
          className="nav-item-clean"
          aria-disabled="true"
          style={{
            cursor: "default",
            opacity: 0.55,
            ...(paintedBar ? { color: "var(--color-forest-dark)" } : undefined),
          }}
        >
          {item.label}
        </span>
      </li>
    );
  }
  return (
    <li>
      <Link href={item.href} className="nav-item-clean" style={paintedBar ? { color: "var(--color-forest-dark)" } : undefined}>
        {item.label}
      </Link>
    </li>
  );
}

export function SiteNav({
  variant = "dark",
  heroMotion = false,
  splitHero = false,
}: {
  variant?: "light" | "dark";
  /** W-030: true only on the homepage. Adds v5's own `hero-nav-motion` class
   *  so the nav fades in with the rest of the hero via the existing
   *  `.hero-entered .hero-nav-motion` rule in v5.css — reusing that CSS
   *  exactly rather than reimplementing its timing, which requires this
   *  component to render inside `Hero.tsx`'s `.hero-entered` wrapper (it
   *  does; see `Hero.tsx`). Every other page ignores this prop. */
  heroMotion?: boolean;
  /** Index pages whose hero paints the same light/dark split as the homepage.
   *  The nav stays transparent until scroll so the split remains continuous. */
  splitHero?: boolean;
}) {
  const isLight = variant === "light";
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!isLight) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLight]);

  // Cmd/Ctrl+K opens search from anywhere on the page, command-palette style.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isLightNow = isLight && !scrolled;
  // Only non-homepage light pages get the painted bar; the homepage stays
  // transparent, using v5's own CSS colours (see file header comment).
  const paintedBar = isLightNow && !heroMotion && !splitHero;

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = useCallback(
    (key: string) => {
      cancelClose();
      setOpenMenu(key);
    },
    [cancelClose],
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  }, [cancelClose]);

  const closeAndRefocus = useCallback((key: string) => {
    setOpenMenu((cur) => (cur === key ? null : cur));
    triggerRefs.current[key]?.focus();
  }, []);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const servicesId = useMenuId("services");
  const sectorsId = useMenuId("sectors");
  const resourcesId = useMenuId("resources");
  const aboutId = useMenuId("about");

  const menus = [
    { key: "services", data: servicesMenu, id: servicesId },
    { key: "sectors", data: sectorsMenu, id: sectorsId },
    { key: "resources", data: resourcesMenu, id: resourcesId },
    { key: "about", data: aboutMenu, id: aboutId },
  ];

  return (
    <>
      <header
        className={`site-nav-clean${heroMotion ? " hero-nav-motion" : ""}${splitHero ? " split-hero-index-nav" : ""} ${isLightNow ? "" : "scrolled"}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          ...(paintedBar
            ? {
                padding: "14px 0",
                background: "#B1BFC0",
                boxShadow: "0 10px 30px rgba(10, 28, 30, 0.06)",
              }
            : {}),
        }}
      >
        {paintedBar ? (
          <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "32%", height: "100%", background: "#819293", zIndex: 0 }} />
        ) : null}
        <div className="container nav-inner-split" style={paintedBar ? { position: "relative", zIndex: 1 } : undefined}>
          <Link href="/" className="brand-logo-dark" aria-label="Thanelinc Home">
            <Image
              src={isLightNow ? "/thanelinc-brand-logo.svg" : "/thanelinc-brand-logo-white.svg"}
              alt="Thanelinc"
              width={165}
              height={40}
              className="brand-img-logo"
              priority
            />
          </Link>

          <ul className="nav-links-clean" style={{ display: "flex" }}>
            {menus.map(({ key, id, data }) => (
              <MegaMenuTrigger
                key={key}
                label={data.label}
                panelId={id}
                isOpen={openMenu === key}
                isLight={paintedBar}
                onOpen={() => openNow(key)}
                onClose={scheduleClose}
                onToggle={() => (openMenu === key ? setOpenMenu(null) : openNow(key))}
                triggerRef={(el) => {
                  triggerRefs.current[key] = el;
                }}
              />
            ))}
            <SimpleNavLink item={howWeWorkNavItem} paintedBar={paintedBar} />
          </ul>

          <div className="nav-right-utility">
            <Link
              href={contactNavItem.href}
              className={paintedBar ? undefined : "nav-contact-btn"}
              style={
                paintedBar
                  ? {
                      textDecoration: "none",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "14px",
                      padding: "8px 18px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--color-forest-dark)",
                      border: "1px solid var(--color-forest-dark)",
                      display: "inline-flex",
                      alignItems: "center",
                      transition: "var(--transition-base)",
                    }
                  : undefined
              }
            >
              Contact Us →
            </Link>
            <button
              type="button"
              className="nav-search-btn"
              aria-label="Search (Ctrl+K)"
              onClick={() => setSearchOpen(true)}
              style={paintedBar ? { color: "var(--color-forest-dark)" } : undefined}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button
              type="button"
              className="nav-mobile-toggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                color: paintedBar ? "var(--color-forest-dark)" : "#FFFFFF",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        {menus.map(({ key, data, id }) => (
          <div key={key} onMouseEnter={() => openNow(key)} onMouseLeave={scheduleClose}>
            <MegaMenuPanel data={data} open={openMenu === key} panelId={id} onClose={() => closeAndRefocus(key)} />
          </div>
        ))}
      </header>

      <MegaMenuScrim visible={openMenu !== null} onClick={() => setOpenMenu(null)} />

      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        menus={[
          { key: "services", data: servicesMenu },
          { key: "sectors", data: sectorsMenu },
          { key: "resources", data: resourcesMenu },
          { key: "about", data: aboutMenu },
        ]}
        simpleLinks={[howWeWorkNavItem]}
        contact={contactNavItem}
      />

      {searchOpen ? <SiteSearch onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}
