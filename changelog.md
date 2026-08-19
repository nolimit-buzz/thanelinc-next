# Changelog

Newest first. Record every substantive change — this is how the team tracks what shipped.

Format: `## YYYY-MM-DD · summary` then what changed and why.

---

## 2026-08-19 · Global nav added for sub-pages — v5 never designed one

Caught while previewing: `/sectors/tertiary-institutions` and the new
`/sectors/regulated-businesses` rendered with **no navigation at all**. v5's
`<header class="site-nav-clean">` is inside `Hero.tsx`, welded to the homepage's
100vh hero block (v5's own comment: "NAV = EXACT 100VH"). v5 was built as a
single page with anchor links — a second page's nav was never in scope for the
original concept, so this wasn't caught in review.

Added `components/SiteNav.tsx`: same v5 markup and classes, permanently in the
"scrolled" (solid dark, fixed) variant, since that's the one that doesn't
depend on the hero's split backdrop behind it. Homepage's own nav is untouched.
Non-homepage routes link back to `/#services`, `/#sectors`, etc. — real routes
don't exist yet for those sections. Also pointed the sector-accordion's card 2
CTA at `/sectors/regulated-businesses` instead of the placeholder `#check`.

Used `next/image` for the nav logo rather than `<img>` — this component isn't a
v5 port, so it doesn't inherit the `components/v5/**` ESLint carve-out.

Verified: both sub-pages 200, nav present and every link resolves; lint/build
clean.

---

## 2026-08-19 · `/sectors/regulated-businesses` built, docs/BUILD_STATE.md re-synced

Phase 3 continuation, per `PLAN-2026-08-19-status-sync-and-phase3-continuation.md`
(handover workspace).

**No v5 source for this page.** v5 only ever built the homepage and the
tertiary-institutions drawer — the sector-accordion's other three cards, and the
footer's `/sectors/regulated-businesses` and `/sectors/public-sector` links, were
always forward references to pages that didn't exist yet. Built this one from
`Content/04-Page-Copy/sectors-regulated-businesses.md` verbatim instead of a v5
port: hero, credential block (R10), turnaround table (6 steps), four reason
cards, category-or-volume explainer, outsourced-DPO section, filing section,
Levitate proof block (cleared), closing CTA.

**Styling approach differs from the homepage port on purpose.** Reused v5's
shared primitives (`container`, `micro-cred-badge`, `hero-h1-clean`,
`btn-architectural-cta`, `section-h2-title`, `mandate-link-check`) for brand
consistency, then Tailwind utilities plus the `:root` CSS custom properties from
`v5.css` for everything v5 never defined (table, reason-card grid, credential
panel). `v5.css` itself is untouched — this isn't a port, so the "copy
verbatim, don't reinterpret" rule (W-026) doesn't apply here; the copy source
does the equivalent job.

Content lives in `lib/content/sectorsRegulatedBusinesses.ts`, typed against the
existing `SectorPage` shape in `lib/content/types.ts`.

Several CTAs point at routes not yet built (`/contact`, `/services/*`,
`/about/credentials`) — expected at this stage of the build, consistent with
how the homepage already links forward to `/sectors/tertiary-institutions`
before it existed.

Verified: `/sectors/regulated-businesses` returns 200; only "Levitate" appears
among client/case-evidence names (cleared, per `client-permissions.md`); penalty
wording confirmed "section 49" not 48; no "24/7" language. `npm run lint` and
`npm run build` pass.

**Also updated `docs/BUILD_STATE.md`**, which had gone stale — three prior
commits (homepage port + two fix sessions) were never reflected there. Re-synced
against this changelog; see the audit and plan referenced above for why.

---

## 2026-08-19 · Hero and nav made visible — initHeroMotion was never ported

The hero and nav were in the server HTML the whole time but rendered invisible.
v5 sets `.hero-motion-item`, `.hero-nav-motion` and `.hero-visual-motion` to
`opacity: 0`, and only reveals them once the wrapper gains `.hero-entered`. That
class is added by `initHeroMotion()`, which the first pass did not port. Markup
without its activating script is markup you cannot see.

Ported faithfully, including the details the earlier simplified version got wrong:
the 80ms rAF-delayed entrance, the sticky-nav threshold of 40px (not 30), and
`.hero-exiting`, which fades the hero past 35% of its own height and reverses on
the way back up.

**Audited every opacity-gated class in v5.css rather than fixing only the reported
one.** Eight exist; all now have their activator confirmed: three hero motion
classes via `.hero-entered`, `.reveal` via ScrollReveals, `.carousel-slide-item`
via state, and the sector drawer, service drawer and service chips via CSS
`:hover` — those need no JS.

Also added `suppressHydrationWarning` to `<body>`. The reported mismatch was
`cz-shortcut-listen`, injected by the ColorZilla browser extension before React
loads — not an application bug. Scoped to `<body>` so genuine mismatches inside
the tree still surface.

---

## 2026-08-19 · Fixed the port: hydration crash, dropped handlers

Six issues, all traceable to two flaws in the HTML→JSX conversion.

**Hydration crash — hero and nav appeared not to render.** The converter's
attribute map missed SVG presentation attributes, so 146 instances of
`font-family`, `font-weight`, `font-size`, `letter-spacing`, `text-anchor` and
`font-style` reached React unconverted. Each threw "Invalid DOM property",
crashing client render and blanking sections that were present in the server HTML
all along. All 146 converted; `aria-*` correctly left hyphenated.

**Dropped event handlers.** The converter stripped every inline `on*` attribute,
and only some were re-wired. Recovered by auditing v5 for all of them:

- `onmouseenter` on the four sector cards — v5 activates on hover *and* click.
  This was the reported bug where the first Mandate card would not collapse when
  hovering another.
- `onsubmit` on the newsletter form.
- `switchPage()` calls, which were v5's display:none toggle — now real routes.

**Also:** inline SVG logo lockups set `font-family="'Outfit', sans-serif"` as a
presentation attribute, which no longer matches next/font's hashed family name. A
CSS rule in v5.css restores the intended face without editing ported markup.

Verified: zero hydration errors, both routes 200, all five nav items and the hero
rendering, lint and build clean.

---

## 2026-08-19 · Re-ported v5 exactly; previous port discarded

The first port was rejected on review — 7 of 9 sections wrong, 1 missing. It
applied pending copy-track improvements and invented sections that do not exist
in v5. Approved improvements to the copy track are not licence to alter an
artifact being ported (W-026).

**Approach changed to prevent recurrence.** v5's stylesheet is extracted verbatim
to `app/v5.css` (3,324 lines) rather than rewritten as Tailwind utilities, and the
markup is reproduced with v5's own class names. Fidelity is now checkable by class
name rather than by judgement. `globals.css` was emptied of competing tokens;
Tailwind stays installed but contributes nothing to the ported design.

**All 9 sections present**, verified by structural marker: split hero with scroll
track and 3-slide carousel, problem (3 cards), orbital self-check with diagnostic
preview, 4-card sector accordion, logos carousel, 3-card process matrix, services
deck with seal animations, resources plus newsletter box, floating prefooter, and
the funneled footer with watermark and status pill.

**Interactivity ported as client components:** hero carousel with 6s auto-advance
and hover pause, sector accordion, sticky-nav scroll state, and scroll reveals via
IntersectionObserver. v5's inline onclick handlers became React handlers on real
buttons.

**Tertiary sector view is now a route** (`/sectors/tertiary-institutions`) rather
than a display:none toggle.

**Three necessary port adaptations, all documented in place:** image paths made
absolute (v5's relative paths break on nested routes); font variables bridged to
next/font (v5 named the Google CDN families literally); and an ESLint override
scoped to `components/v5/**` so entity-escaping and next/image rules do not force
edits to ported source.

**Two accepted divergences from approved copy, now launch gates (W-026):** v5's
hero copy is not the approved copy and drops the DPCO licence from the H1; and §5
ships with the "Proven Track Record" framing W-024 required be changed.

`npm run lint` and `npm run build` pass. Both routes render 200; all six image
assets serve.

---

## 2026-08-18 · Homepage ported from the v5 concept

Phase 2. Nine homepage sections built as components, plus nav and footer.

**Content architecture:** all copy lives in `lib/content/home.ts`, typed against
`lib/content/types.ts`, and reaches components as props. No copy is hardcoded in
JSX — this is the seam Strapi plugs into later without touching components.

**Sections:** hero (architectural split, chamfered credential card), the problem
(elevated header card + four pains around a central panel), self-check band,
proof, sector doors, process table, services, resources, secondary lines.

**Services ships as four cards in a single row** — the layout the concept had as
a 2×2 grid. Per-card lines read "What you get", not "Turnaround": only NDPC
Registration and Breach Response have true turnaround figures. Audit & Filing
carries a deadline, Outsourced DPO a deliverable, because Q-017 is still open. The
"See all eight services" link is load-bearing for cross-linking rule R9, not
decorative.

**Resource cards read "Reviewed <date>"**, not a publish date — evergreen
regulatory explainers age badly with one.

**Imagery is CSS/SVG abstract panels**, not photography: a redaction field, a data
map, and category strata, each encoding its subject. The concept's portrait images
have unrecorded provenance and are not used.

**Only two client names appear** — Nigerian Bar Association and Levitate.
Verified: no uncleared name is present in the rendered output.

**lucide-react no longer exports brand icons**, so LinkedIn is an inline SVG.

`npm run lint` and `npm run build` both pass; homepage renders 200.

---

## 2026-08-18 · Repository scaffolded

Phase 1 of `PLAN-2026-08-18-nextjs-conversion.md` (approved, W-025).

**Created:** Next.js 16 App Router + TypeScript + Tailwind v4, ESLint, root-level `app/` `components/` `lib/` (no `src/`), matching the `cfbf-next` house pattern. Added `framer-motion` and `lucide-react` — the visual concept is animation- and icon-heavy.

**Scope of this repository:** frontend build only. Delivery documentation — briefs, decisions, claims register, questions, client permissions — stays in the `ThanelInc-Handover/` workspace and is never committed here (W-025). Git history is permanent, so the boundary is enforced from the first commit rather than cleaned up later.

**Strapi:** out of agency scope. The client's team connects it on Strapi Cloud, taking the project up from GitHub. Content therefore lives in typed modules under `lib/content/` and reaches components as props, so the CMS swap touches only the data-fetch layer.

**Not yet done:** design tokens from the approved v5 concept, component conversion, routes, GitHub remote, Vercel.
