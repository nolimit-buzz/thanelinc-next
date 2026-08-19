# BUILD_STATE.md — thanelinc-next

Delivery state for the **implementation repository**. Update at every handoff.

**Last updated:** 2026-08-19

> The content-phase state — framework artefacts, page copy, claims register,
> decisions — lives in the `ThanelInc-Handover/` workspace and is not duplicated
> here. This file covers the build only.

---

## Delivery state: `verified_local`

Homepage and one sector route built, ported pixel-exact from v5 (W-026), and
verified locally: `npm run lint` and `npm run build` pass, both routes render
200. **No git remote, no deployment, not yet reviewed.**

---

## Completed — Phase 2, homepage + first sector route (2026-08-19)

Full detail in `changelog.md`. Summary:

| Item | State |
|---|---|
| Homepage (`/`) — all 9 v5 sections as components under `components/v5/` | ✅ |
| `/sectors/tertiary-institutions` — v5's `display:none` toggle replaced with a real route | ✅ |
| v5 stylesheet ported verbatim to `app/v5.css` (3,324 lines); markup reproduced with v5's own class names, per W-026 | ✅ |
| Hydration crash fixed — 146 unconverted SVG presentation attributes (`font-family`, `font-weight`, etc.) were reaching React unconverted | ✅ |
| Dropped event handlers restored — sector-card `onmouseenter`, newsletter `onsubmit`, `switchPage()` → real routes | ✅ |
| Hero/nav visibility fixed — `initHeroMotion()` (the class that lifts `opacity: 0` via `.hero-entered`) was missing from the first port; all 8 opacity-gated classes in v5.css audited and confirmed activated | ✅ |
| Content architecture — homepage copy lives in `lib/content/home.ts` against `lib/content/types.ts`, reaches components as props | ✅ |

**Two accepted divergences from approved copy, recorded as launch gates (W-026) — not resolved, not blocking further route work:**
- Hero copy is v5's, not the approved copy, and drops the DPCO licence claim from the H1
- §5 ships with the "Proven Track Record" framing that W-024 required be changed

## Completed — Phase 1, scaffold

| Item | State |
|---|---|
| Next.js 16 App Router + TypeScript + Tailwind v4 | ✅ |
| `framer-motion`, `lucide-react` | ✅ |
| Structure: root `app/` `components/` `lib/` (no `src/`), per `cfbf-next` | ✅ |
| Design tokens from the approved v5 concept → `@theme` in `app/globals.css` | ✅ |
| `next/font` — Outfit + JetBrains Mono, self-hosted | ✅ |
| Global `:focus-visible` and `prefers-reduced-motion` | ✅ |
| Content type contract — `lib/content/types.ts` | ✅ |
| `AGENTS.md`, `CLAUDE.md`, `.agents/rules/thanelinc-build.md` | ✅ |
| `.env.local.example`, `changelog.md`, `plans/`, `docs/` | ✅ |
| Local git, first commit | ✅ |

### Two corrections carried in from the v5 code review

- **Focus states.** The concept had one `:focus` rule across 4,837 lines. A global `:focus-visible` is now in the base layer.
- **Fonts.** The concept made 3 Google Fonts CDN requests. Now self-hosted via `next/font` — deliberate, given the client's business.

---

## Operational note — don't run `npm run build` while `next dev` is live

Client reported `/sectors/regulated-businesses` rendering with the nav and
entire hero section missing, reproducing across two browsers (ruling out
browser cache). Root cause: `npm run build` was run repeatedly for
verification while a `next dev` server was already running against the same
`.next` directory — dev and production builds both write there, and running
them concurrently corrupts the cache, producing inconsistent partial renders
per request. Fixed by killing the dev server, `rm -rf .next`, and a clean
restart. **Going forward: use `npm run lint` plus direct requests to the
already-running dev server for verification; don't run `npm run build`
alongside a live `next dev` process.** Run `npm run build` only when no dev
server is running (e.g. right before a deploy check).

## Completed — global sub-page nav (2026-08-19)

**Real gap, caught by the client while previewing.** v5's nav lives inside `Hero.tsx`, welded to the homepage's hero block only ("NAV = EXACT 100VH" per v5's own comment) — v5 was a single-page design and never specified navigation for a second page. Both `/sectors/tertiary-institutions` (shipped 2026-08-18) and `/sectors/regulated-businesses` (shipped today) rendered with no way back to the site except the footer or the browser back button.

Added `components/SiteNav.tsx` — same v5 markup/classes, permanently in the "scrolled" (solid dark, fixed) state, since that variant doesn't depend on the hero's split light/dark backdrop. Used on every route except `/`; homepage's hero-coupled nav is untouched (W-026). Anchors point at `/#section` (those sections only exist on the homepage today) — update to real routes as `/services`, `/how-we-work`, `/about/credentials`, `/resources` are built. Also fixed the sector-accordion's card 2 CTA, which still pointed at `#check` instead of the now-real `/sectors/regulated-businesses`.

Verified: both sub-pages return 200 with the nav present and linking correctly; `npm run lint`/`build` clean (used `next/image` for the nav logo, not `<img>`, since this isn't ported v5 markup).

## Completed — `/sectors/regulated-businesses` (2026-08-19)

No v5 markup existed for this page (v5 only built the homepage and the tertiary drawer). Built from `Content/04-Page-Copy/sectors-regulated-businesses.md` verbatim, using v5's shared primitives (`container`, `micro-cred-badge`, `hero-h1-clean`, `btn-architectural-cta`) for visual consistency and Tailwind for everything v5 never defined — per the note in `globals.css` that Tailwind is available outside the ported design. Content lives in `lib/content/sectorsRegulatedBusinesses.ts`. Verified: 200 response, only Levitate (cleared) appears, penalty wording is "section 49" not 48, no "24/7" language. `npm run lint`/`build` pass.

## Not started

| Item | Blocked by |
|---|---|
| `/am-i-covered` self-check tool | — the only genuinely interactive build |
| Service pages, `/how-we-work`, `/about/credentials`, `/training`, `/resources` | — |
| `/privacy` | Draft has 11 `[CONFIRM]` fields + unverified rights — see launch gates |
| Review of the homepage + tertiary-route port | Recommended before continuing much further |
| GitHub remote | Awaiting review |
| Vercel | Follows GitHub |
| Strapi | **Out of agency scope** — client's team, on Strapi Cloud |

---

## 🚦 Launch gates — before `thanelinc.ng` points here

Held in full in the handover workspace. Summarised because they block *this* repo going live:

1. **`/privacy` published.** The self-check and newsletter both capture email. A DPCO collecting personal data with no privacy notice fails at what it sells.
2. **Data-subject rights verified** against NDPA 2023 and entered in the claims register.
3. **Named owner for the 6-month review cycle.** "Reviewed" dates ship on resource cards; a stale one is worse than none.
4. **Client naming consent.** Nine names go public and permanent. Per-name confirmation, and engagement letters checked for publicity clauses.
5. **Image provenance** confirmed, or images replaced with the abstract panels.
6. **Services section relabelled** — most named clients are training engagements, so the heading must not imply DPCO track record.
7. `npm run lint` + `npm run build` clean; Lighthouse accessibility ≥ 90.

---

## Verification

```bash
npm run lint     # ✅ passing
npm run build    # ✅ passing
```

## Next action

Continue Phase 3 per `PLAN-2026-08-19-status-sync-and-phase3-continuation.md` (handover workspace): `/sectors/regulated-businesses`, then `/am-i-covered`, then remaining content pages, then `/privacy`. Update this file after each route rather than at phase end.
