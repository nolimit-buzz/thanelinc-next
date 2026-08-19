import Link from "next/link";
import Image from "next/image";

/**
 * Persistent nav for every page EXCEPT the homepage.
 *
 * v5 never designed a multi-page nav — its `<header class="site-nav-clean">`
 * lives inside Hero.tsx, welded to the homepage's 100vh hero block ("NAV =
 * EXACT 100VH" per v5's own comment) and coupled to hero scroll/entrance state.
 * That block is untouched here (W-026 — don't alter a ported artifact).
 *
 * This is the same nav markup and v5 classes, permanently in the "scrolled"
 * (solid dark, fixed) state, because that variant is self-contained — it
 * doesn't depend on the hero's light/dark split backdrop behind it. Used on
 * every route that isn't `/`.
 *
 * Anchor links point at `/#section` rather than `#section`: those sections
 * only exist on the homepage. Update to real routes (`/services`,
 * `/how-we-work`, `/about/credentials`, `/resources`) as each is built.
 */
export function SiteNav() {
  return (
    <header className="site-nav-clean scrolled" style={{ position: "fixed" }}>
      <div className="container nav-inner-split">
        <Link href="/" className="brand-logo-dark" aria-label="Thanelinc Home">
          <Image src="/thanelinc-brand-logo-white.svg" alt="Thanelinc" width={140} height={32} className="brand-img-logo" priority />
        </Link>

        <ul className="nav-links-clean">
          <li>
            <Link href="/#services" className="nav-item-clean">
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </Link>
          </li>
          <li>
            <Link href="/#sectors" className="nav-item-clean">
              Sectors
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </Link>
          </li>
          <li><Link href="/#process" className="nav-item-clean">How We Work</Link></li>
          <li>
            <Link href="/#resources" className="nav-item-clean">
              Resources
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </Link>
          </li>
          <li><Link href="/#credentials" className="nav-item-clean">About & Credentials</Link></li>
        </ul>

        <div className="nav-right-utility">
          <Link href="/#contact" className="nav-contact-btn">Contact Us →</Link>
        </div>
      </div>
    </header>
  );
}
