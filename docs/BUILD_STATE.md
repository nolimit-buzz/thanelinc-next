# BUILD_STATE.md — thanelinc-next

Delivery state for the **implementation repository**. Update at every handoff.

**Last updated:** 2026-08-21

> The content-phase state — framework artefacts, page copy, claims register,
> decisions — lives in the `ThanelInc-Handover/` workspace and is not duplicated
> here. This file covers the build only.

---

## Remaining core pages (2026-08-23)

**Delivery state:** `verified_local`.
**Scope:** W-039 / `PLAN-2026-08-23-remaining-core-pages.md`.

| Item | State |
|---|---|
| `/how-we-work` six-stage journey | ✅ `implemented_local` |
| About, Credentials and Team routes | ✅ `implemented_local` |
| Certificate preview and PDF download assets | ✅ local asset responses verified |
| Public Sector page + Ministries & Agencies anchor | ✅ `implemented_local` |
| About navigation, mobile navigation, footer and search | ✅ `implemented_local` |
| Existing service/sector hero compatibility | ✅ local route + single-H1 checks passed |

`npx tsc --noEmit`, `npm run lint`, `git diff --check`, route/asset HTTP 200
checks, rendered single-H1 checks, and an isolated production Webpack build
(26 static routes) pass. The owner-authorised NBA proof is labelled as
professional-body proof only; no proposal-stage MDA work or uncleared team
material is published. No push or deployment occurred.

---

## Index split heroes + All Sectors directory (2026-08-21)

**Delivery state:** `implemented_local`
**Scope:** W-036 / `PLAN-2026-08-21-index-heroes-and-sectors-directory.md`.

| Item | State |
|---|---|
| Distinct two-tone index hero on `/services` | ✅ focused browser verification passed |
| Sitemap-approved `/sectors` index with two sourced live routes | ✅ focused browser verification passed |
| Sectors mega-menu “View all” points to `/sectors` | ✅ local route returns 200 |
| Robust fixed-state internal nav on both sector detail pages | ✅ 64px measured top at mobile/desktop |
| Anchor offsets clear global + section nav | ✅ measured on `#questions` |
| Public Sector page | ⛔ still blocked; no approved copy inferred |
| Stale planned states for six live services in search | ✅ corrected |

Hydrated Chrome at 390/768/1440 confirms zero overflow, one H1, no failed
images, the intended two-tone background, and correct live link counts on both
indexes. H1 caps at 64px and H2 at 42px. TypeScript, lint, and `git diff
--check` exit 0; lint has no warnings. The final isolated production build is
unverified because the required network escalation was denied when the tool
service reached its usage limit. Full evidence:
`docs/INDEX_HERO_AND_SECTORS_EVIDENCE-2026-08-21.md`.

No commit, push, or deployment was performed.

---

## All Services — Service Journey Directory (2026-08-21)

**Delivery state:** `committed`
**Scope:** approved follow-on to Gate 2 (W-035), limited to `/services` and its
supporting content/component seam.

Implementation commit: `d7e3c3b` (`feat: complete inner-page rollout and services directory`).

| Item | State |
|---|---|
| 420px editorial service-index opening | ✅ `verified_local` |
| Three-group directory with all eight direct service links | ✅ `verified_local` |
| Mobile service cards replace squeezed two-column rows | ✅ `verified_local` |
| Always-readable, keyboard-focusable sector links | ✅ `verified_local` |
| “3 working days” claim restored | ✅ `verified_local` |
| Page content moved behind `lib/content/servicesIndex.ts` | ✅ `verified_local` |
| Approved shared cutout CTA and restrained reveal motion | ✅ `verified_local` |

Verification: `npx tsc --noEmit`, `npm run lint`, and the isolated production
`npm run build` all exit 0 with no warnings. At 390, 768, and 1440px the page
has zero horizontal overflow, one H1, no failed images, eight unique service
links, and two keyboard-focusable sector links. The maximum H2 is 42px and the
banner resolves to 260/300/420px respectively. Evidence is under
`/private/tmp/thanelinc-services-directory-evidence-20260821/`.

No push or deployment is included. Phase 3 and Public Sector remain outside
this execution.

---

## Gate 2 — service and sector rollout (2026-08-21)

**Delivery state:** `verified_local`
**Scope:** Phase 2 of
`PLAN-2026-08-21-inner-page-design-system-redesign.md` (W-034).

| Item | State |
|---|---|
| All eight approved service routes on the editorial service shell | ✅ `verified_local` |
| NDPC Registration self-check conversion behaviour | ✅ preserved |
| Breach Response phone-first, same-day-only behaviour | ✅ preserved |
| Regulated Businesses on Sector Option A | ✅ `verified_local`; cleared Levitate proof retained |
| Tertiary Institutions on Sector Option A | ✅ `verified_local`; no uncleared proof |
| All eight service navigation states | ✅ live after route-level 200 checks |
| `/sectors/public-sector` | ⛔ blocked; no approved copy |
| Phase 3 inner pages | ⏳ not authorised in this execution |

Verification: `npx tsc --noEmit` exit 0; `npm run lint` exit 0 with one
pre-existing `IndustrySectors.tsx` `<img>` warning; isolated `npm run build`
exit 0. Eleven reviewed routes at 390, 768, and 1440 produced 33/33 zero-
overflow layouts, exactly one H1, and no failed images. All fourteen public
shell destinations return 200; the service feature rail remains green across
24 item-count/viewport stress cases. Screenshots and measurements are under
`/private/tmp/thanelinc-phase2-evidence-20260821/` for this local run.

Known unverified destinations are the approved Phase 3 cross-links
(`/how-we-work`, `/about/credentials`, and two resource articles). They remain
planned and are not exposed as live nav/footer items.

The next-page assessment begins with `/services`; findings are recorded in
`docs/ALL_SERVICES_REVIEW-2026-08-21.md`. That page was reviewed, not redesigned,
under this scope.

## Gate 1 — inner-page redesign pilot (2026-08-21)

**Delivery state:** `verified_local`
**Scope:** Phase 0 and Phase 1 of
`PLAN-2026-08-21-inner-page-design-system-redesign.md` only.

| Item | State |
|---|---|
| Data Mapping & ROPA service exemplar — revised typography, 420px banner, outcome facts, equal-height audience panel, cutout CTA | ✅ `verified_local`; awaiting final client visual acceptance |
| Responsive 1–8-item divider rail; source-safe four-feature copy | ✅ `verified_local` |
| Contact redesign using confirmed email/general/compliance channels; abstract map banner; categorised enquiry selector; no fabricated address/pin/false sent state | ✅ `verified_local`; direction approved by client |
| Sector Option A — Guided Audience Journey; Data Mapping-style opening and 420px banner | ✅ selected by client; development-only preview |
| Sector Option B — Editorial Evidence Grid | ✅ development-only preview |
| `/design-review` comparison index | ✅ development-only; `noindex`; 404 production |
| Shared sector mobile nav/grid/CTA/table fixes | ✅ `verified_local` |
| Single-suffix metadata and shared-logo aspect ratio | ✅ `verified_local` |
| Broad service/sector migration | ⛔ not authorised before Gate 1 approval |

Evidence and exact URLs:
`docs/INNER_PAGE_REVIEW_EVIDENCE-2026-08-21.md`.

Verification after the client revision pass: `npx tsc --noEmit` exit 0;
`npm run lint` exit 0 with one pre-existing `IndustrySectors.tsx` image
warning; isolated `npm run build` exit 0;
all seven reviewed routes have zero overflow and one H1 at 390/768/1440;
all nine live nav/footer links return 200.

The selected-direction polish pass also added staggered scroll entrances to
the static service/Contact/Sector A sections, with a reduced-motion override.
Hydrated browser verification confirmed both initial and below-fold activation.

---

## Completed — service page banner template pilot (2026-08-21)

Per `PLAN-2026-08-21-service-page-banner-template.md` (approved, D1–D4 answered).

| Item | State |
|---|---|
| `ServiceBannerHero` — left eyebrow / right two-tone headline row + chamfered full-width banner image (new component, no existing one covered this composition) | ✅ `verified_local` |
| `ServiceFeatureGrid` — n-column numbered feature row, no icons/card chrome, responsive collapse (2-col ≤900px, 1-col ≤560px via `!important` override, same technique as the mega-menu panel's mobile fix) | ✅ `verified_local` |
| `ServicePageTemplate` gained two optional fields, `bannerHero` and `features` — additive only; `ndpc-registration` and `breach-response` supply neither and render byte-identical to before | ✅ `verified_local` |
| `/services/data-mapping-ropa` built as the pilot — new content module, new route, `LIVE_SERVICE_SLUGS` flipped so its nav/mega-menu/footer entry goes live (no more "Soon" tag) | ✅ `verified_local` |
| New sourced placeholder banner image (`public/services-banner-glass-architecture.jpg`, Unsplash-licensed, free for commercial use, Clay LeConey) — D2: client asked to source new rather than reuse an existing mismatched asset | ✅ downloaded and verified as a real JPEG |
| 4-feature-tile copy decomposed from `servicesIndex.ts`'s existing 3 bullets + deliverable/turnaround, worded to avoid repeating the "What you get" card's tag text verbatim (guards against the F7-style duplication bug fixed in the prior plan) | ✅ `verified_local` |
| Fixed: initial feature-grid used a fixed `repeat(items.length, 1fr)` with no responsive collapse, causing 67px horizontal overflow at 390px | ✅ `verified_local` |

**W-031 recorded:** the banner/feature template is the intended future
direction for all 8 service pages; migrating `ndpc-registration` and
`breach-response` onto it is deliberately out of scope for this pilot and is
its own follow-up plan (D4: "eventually migrate").

Verified: `npx tsc --noEmit` and `npm run lint` clean; all 9 routes checked
return 200; screenshots at 1440px (full page) and 390px (no overflow,
`scrollWidth` 390 = viewport width); rendered-HTML check confirms Data
Mapping & ROPA now serves as a real `Link`, not the disabled "Soon" span, in
both the mega menu and the footer; `ndpc-registration` screenshotted
side-by-side with its pre-pilot state to confirm zero visual change.

---

## Delivery state: `verified_local`

Mega menu + consolidated single nav shipped (W-030) — Services, Sectors and
Resources are full mega menus; every nav/footer link crawled and confirmed
200 (down from 13 confirmed 404s, including the nav's own "Contact Us" CTA,
now fixed via a new `/contact` page). Status-flagged: unbuilt pages show
"Soon" instead of linking to a 404. Homepage nav unified with every other
page's `SiteNav`, restoring v5's original transparent/split-colour unscrolled
look after a same-day correction (full story in `changelog.md`). Mobile
drawer below 900px reuses `QuestionAccordion`'s interaction grammar. A
follow-up round the same day added real client-side semantic search
(`@huggingface/transformers`, runs fully in-browser, no backend) and fixed a
nav-layout regression the icon's removal had caused. `npx tsc --noEmit`/
`npm run lint` clean. Detail in `changelog.md`.

**New dependency:** `@huggingface/transformers` (client-only, dynamically
imported inside a search event handler — never in the SSR/initial bundle).
`npm audit` flags its Node-only optional backends (`onnxruntime-node`'s zip
parser, `sharp`'s image decode); both are unreachable from this repo's usage,
which is browser-only, text-only, and never imports either. Rationale and the
rejected `@xenova/transformers` alternative (critical protobuf RCE via an
older `onnxruntime-web`) are in `changelog.md`.

---

## Completed — nav layout fix + semantic search (2026-08-21, same day)

| Item | State |
|---|---|
| Layout regression fixed — restored search icon, reverted an unnecessary flex restructuring per client catch | ✅ `verified_local` |
| `lib/content/searchIndex.ts` — corpus built from existing rich copy (service summaries, sector heroes/reasons) | ✅ `verified_local` |
| `lib/search/embeddings.ts` + `SiteSearch.tsx` — real in-browser semantic search, Cmd/Ctrl+K, instant substring + async semantic upgrade | ✅ `verified_local` |
| Fixed: `embedBatch` was looping (~21s for the corpus); now one batched call | ✅ `verified_local` |
| Fixed: similarity threshold (0.25) was cutting off correct matches; recalibrated to 0.15 against a measured score | ✅ `verified_local` |
| Fixed: 3 `react-hooks/set-state-in-effect` lint errors — mount-only-when-open pattern instead of a reset effect | ✅ `verified_local` |
| Mega-menu item + mobile drawer link font size: 14px / weight 500, matching the top nav | ✅ `verified_local` |

**Known limitation, not a bug:** first-ever search on a fresh browser profile
downloads the ~25MB model and can take ~30–40s before semantic results
appear (subsequent searches, any page, same visit: ~1–3s). Instant substring
results and a "Finding results…" state cover this window so the UI never
looks broken while it happens.

---

## Completed — mega menu + link integrity (2026-08-21)

| Item | State |
|---|---|
| `lib/content/navigation.ts` — single source, `status: "live"\|"planned"` | ✅ `verified_local` |
| `MegaMenu.tsx` — panel, eyebrows, dual densities, right rail, pill CTA | ✅ `verified_local` |
| Motion (stagger + reduced-motion collapse) and a11y (hover-intent, keyboard, focus-visible, Escape+refocus) | ✅ `verified_local` |
| `SiteNav.tsx` rewritten; homepage nav unified via `heroMotion` prop | ✅ `verified_local` |
| `/contact` built (UI-only form, same no-backend caveat as `/am-i-covered`) | ✅ `verified_local` |
| `SiteFooter.tsx` re-pointed at the shared nav module | ✅ `verified_local` |
| `MobileNavDrawer.tsx` — accordion drawer below 900px | ✅ `verified_local` |
| Fixed: all 8 services wrongly marked "live" in nav data (only 2 pages exist) | ✅ `verified_local` |
| Fixed: closed mega-menu panel causing real horizontal overflow at mobile widths | ✅ `verified_local` |
| Fixed: homepage nav wrongly using the painted-bar treatment instead of v5's transparent original | ✅ `verified_local` |

**Discovered, not fixed:** ~20px horizontal overflow at 390px on `/services`,
traced to `ServicesArchive.tsx`'s "Compliance Audit & Filing" row — predates
this session, out of scope for this plan.

Client journey reframed as 6 stages, not 9/10 steps (W-029) — new
`StageTable` component on the tertiary page's "Where would we even start?"
row; source docs and claims traceability detailed in `changelog.md`.
`components/v5/Process.tsx` (homepage) and `lib/content/home.ts`'s orphaned
`process` export deliberately left untouched — see changelog for why.

Service pages and sector pages now share one design system. Service body content
and "Who this is for" render through the sector page's `QuestionAccordion`; the
duplicated deliverable/turnaround block on `/services/ndpc-registration` is gone,
merged structurally so it cannot recur on the six unbuilt service pages; service
closing CTAs use the sector page's photo-overlay-rings-cutout card;
`/sectors/tertiary-institutions` is rebuilt on a shared `SectorPageTemplate`
(W-028, superseding W-026 for that route only). `npx tsc --noEmit` and
`npm run lint` pass (0 errors). Verified by scripted headless click-through plus
a rendered-DOM diff proving `/sectors/regulated-businesses` is byte-identical
across the refactor. Detail in `changelog.md`.

---

## Completed — service/sector template unification (2026-08-20)

Per `PLAN-2026-08-20-service-sector-template-unification.md` (approved).

| Item | State |
|---|---|
| `QuestionAccordion` extended with optional `steps` / `links`, markup lifted from `ServicePageTemplate` (D1) | ✅ `verified_local` |
| Service body blocks + "Who this is for" render as accordion rows, row 1 open | ✅ `verified_local` |
| Accent card merged into "What you get" — deliverable/turnaround now single-sourced | ✅ `verified_local` |
| Breach Response's unique out-of-hours copy preserved through the merge (W-007) | ✅ `verified_local` |
| Service closing CTA rebuilt on the sector treatment, per-page background + cutout | ✅ `verified_local` |
| `SectorPageTemplate` extracted; `/sectors/tertiary-institutions` rebuilt on it (W-028) | ✅ `verified_local` |
| `/sectors/regulated-businesses` proved byte-identical across both refactors | ✅ `verified_local` |
| Fixed: tertiary `main` sliding under the fixed nav; service CTA head collision | ✅ `verified_local` |
| Tertiary "Why Universities land on this page" — 4 cards, 2 adapted from the DOU proposal deck (industry-specific, DOU itself never named) | ✅ `verified_local` |

**Open constraint — cut-out assets (D2).** `services-hero-cutout.png` and
`services-hero-cutout-bust.png` are the same woman in two crops. Only **two**
distinct faces exist in `public/`. A distinct cut-out per service page therefore
**cannot** be delivered from current assets — it needs the commissioned,
provenance-cleared set, which is launch gate 5. No new portrait was added.

**Note for the remaining six service pages:** they inherit all of the above from
`ServicePageTemplate` with no extra work — each needs only its content module and
a `cutoutImage`/`backgroundImage` pair.

---

## Completed — `/services` reuse pass, real two-tone hero (2026-08-20)

Review of the AgentLab-structure rebuild below found it had invented three new visual systems (sector-card design + copy, solution-row card design, hero) instead of reusing what already exists and is approved on the homepage. Client direction: keep content/section order, fix the design to reuse.

`/services` hero: two-tone `#B1BFC0`/`#819293` on nav+hero, aligned via the homepage's own flat 32%-from-right rule, flush to the hero's bottom edge. Cutout card now positioned via a `.container`-replica frame so it overlaps into the light zone exactly like the homepage's hero image does, instead of sitting only in the dark zone. `SiteNav`'s light variant now goes dark-on-scroll (40px threshold, same as the homepage's hero nav) rather than staying permanently two-toned. Hero photo is a background-removed bust cutout inside a chamfered card with a circular halo, 4 floating chips (2 with real photo thumbnails) animating independently. Solution-row accent box is just the animated icon on the service's shade. Row cards grey against a white section background. `npx tsc --noEmit` and `npm run lint` pass (0 errors). Verified via automated headless browser + pixel sampling and route checks on all other pages.

| Item | State |
|---|---|
| Sector cards reuse `SectorAccordion.tsx` verbatim, side by side, hover-driven (`IndustrySectors.tsx` rewritten) | ✅ `verified_local` |
| Invented sector copy ("Hospitality & Consumer" description, "Public Sector & MDAs" description) removed from `servicesIndex.ts` | ✅ `verified_local` |
| Solution rows reuse `.service-seamless-card` landscape via new `LandscapeServiceCard.tsx` + `.service-seamless-card--landscape` modifier (`app/v5.css`) | ✅ `verified_local` |
| Real two-tone split hero (`TwoToneSplitHero.tsx`), matches HGL reference proportions | ✅ `verified_local` |
| Confirmed unchanged: `/`, `/services/breach-response`, `/services/ndpc-registration`, both sector pages, `/am-i-covered` | ✅ `verified_local` |

---

## Completed — Services Archive & Templates (2026-08-20)

| Item | State |
|---|---|
| `/services` archive rebuild on AgentLab reference structure (`ServicesArchive.tsx`) | ✅ `verified_local` |
| Light navigation variant (`SiteNav.tsx` with `variant: "light" \| "dark"`) | ✅ `verified_local` |
| Full-bleed 3-column "The Problem" section with approved Section 49 statutory copy | ✅ `verified_local` |
| 8 Alternating solution rows with approved summaries, 3-bullet steps, and chamfered icon cards | ✅ `verified_local` |
| "Industry — Solutions Across Every Sector" 4-card showcase (`IndustrySectors.tsx`) | ✅ `verified_local` |
| Full-width hero layout + separate feature accent band in `ServicePageTemplate.tsx` | ✅ `verified_local` |
| `/services/breach-response` & `/services/ndpc-registration` hero update | ✅ `verified_local` |
| Default `SiteFooter.tsx` active visibility and root-relative Next.js navigation | ✅ `verified_local` |

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

## Completed — first service pages, services archive, nav dropdowns (2026-08-20)

Per `PLAN-2026-08-20-sector-service-templates.md`, reordered by the client to validate design before the full sector/service template rollout: nav now has real Services/Sectors dropdowns; new `TwoTonedHero` component (light/dark split hero) backs two live service pages — `/services/breach-response` (dark, phone-first per W-007) and `/services/ndpc-registration` (light) — plus the `/services` archive (8 alternating icon/content rows). Client picks a hero direction (or both, alternating) before the remaining 6 service pages are built. Full detail in `changelog.md`. Verified via tsc/lint + zero-console-error checks across all routes + scripted nav-dropdown check.

**Plan status:** `PLAN-2026-08-20-sector-service-templates.md` Stage A (sector template extraction) not yet started — this work happened ahead of it per client redirect. That plan's type design should be reconciled against the real `ServicePageTemplate.tsx`/`TwoTonedHero.tsx` before Stage A proceeds.

## Completed — `/sectors/regulated-businesses` polish pass (2026-08-20)

Fixed internal-sounding copy that had leaked onto the client-facing page (was pulled verbatim from the approved copy doc, which was also corrected — see changelog for the exact before/after). Turnaround table rebuilt as an interactive `TurnaroundTracker` (hover/pin, no new content). Credential block got a photo background. Four reason cards got a staggered entrance animation (new CSS keyframe, not `.reveal`) and hover micro-interactions. New: horizontal sticky in-page section nav (`SectionNav.tsx`, scroll-spy) and two-tone section headings, both inspired by a client-supplied reference site — dark hero from that reference explicitly excluded per client direction. This page is intended as the template for future sector pages, so these patterns (section nav, two-tone headings, interactive table) are the current house style going into that. Full detail in `changelog.md`. Verified via tsc/lint + scripted interaction checks (not just static screenshots).

## Completed — `/sectors/regulated-businesses` rapid client iteration (2026-08-19, same session as the accordion)

Four cards: landed on photo + coloured tint overlay (green family, one shade per card), chamfer cut edge, after two rejected attempts (abstract-icon+drawer had a real invisibility bug from a `.reveal` wrapper never activating; solid-colour-only was a deliberate but temporary rollback). `reveal` removed from these cards entirely for reliability. Accordion headings reverted to default `.section-h2-title` size (`2.25rem`) after being sized down too far in the first pass. Closing CTA rebuilt again: centered text, with a real background-removed cutout of the person (via local `rembg`, new asset `public/regulated-businesses-cutout.png`) positioned outside the card's clip-path so it overlaps the top edge, "pasted sticker" look. Full detail in `changelog.md`. Verified via tsc/lint + full-page screenshot.

## Completed — `/sectors/regulated-businesses` accordion + closing-CTA restyle (2026-08-19)

Per `PLAN-2026-08-19-regulated-businesses-accordion.md` (handover workspace), approved same session. Two changes, both client-directed:

1. **Three stacked explainer sections → numbered accordion.** New `components/sectors/QuestionAccordion.tsx` (client component, one row open at a time, row 1 open by default). No v5 source for this pattern — built against existing tokens (divider value from the turnaround table on the same page, numbering style from `Process.tsx`'s step numbers) rather than the client's literal reference screenshot's serif/gold styling, which is a different brand system supplied only for the interaction pattern. All copy/CTAs carried over verbatim from `lib/content/sectorsRegulatedBusinesses.ts` — zero content drift.
2. **Closing CTA restyled** to match the homepage's pre-footer floating dark card (`PreFooter.tsx`), reusing its classes verbatim (`.prefooter-floating-card`, `.prefooter-card-bg-img`, `.prefooter-card-overlay`, `.prefooter-card-title`, `.btn-architectural-cta-filled`). Background image `hero-portrait-audit.jpg` (existing asset, thematically closest of the four available). Both existing CTAs (self-check primary, consultation secondary) preserved — no orphaned link.

Verified: `npx tsc --noEmit`/`npm run lint` clean; full-page screenshot confirms visual match; scripted click-through confirms accordion toggles correctly (row 2 open closes row 1, re-clicking an open row closes it), zero console/page errors.

## Completed — `/am-i-covered` client revisions (2026-08-19)

Direct client feedback after first review: (1) question flow restyled full dark theme (`--color-forest-dark`, reusing existing `.micro-cred-badge-dark`/`.btn-architectural-cta-light` primitives — no new tokens invented), result screen left as-is; (2) nav + footer removed from the question flow entirely (logo only, links home) so there's no distraction from answering — `AmICovered` now owns its own chrome per step rather than the page shell; (3) result-screen CTA changed from an email-capture form to a "Request a call back" form (phone/email/best-time-to-call), sector cross-link unchanged as the primary next step. Same no-backend caveat as before. Verified via tsc/lint, full 4-category E2E re-run, and screenshots.

## Completed — `/am-i-covered` self-check tool (2026-08-19)

**The only genuinely interactive build**, per the audit and prior plans. No v5 markup exists for it. Built against `Content/05-Self-Check-Tool-Spec.md` (question logic) and `Content/04-Page-Copy/am-i-covered.md` (on-page copy).

- **`lib/self-check/resolve.ts`** — pure resolution function implementing the spec's exact resolution order (named-category match wins outright → volume bands → four-factor test can escalate a sub-200 org → C-017 default). Verified against **16 test cases** covering every category source and all 4 documented edge cases (university-under-200-still-EHL, four-factor escalation on sensitive/cross-border/third-party, ambiguous "other private company" not auto-defaulting). All 16 pass.
- **Flagged deviation, necessary for correctness:** the spec's abridged Q1 option list bundles "Bank, mortgage bank, or microfinance bank" as one choice, but the Claims Register classifies them into different tiers (C-009: commercial banks = UHL; C-016: microfinance/mortgage banks = EHL). Split into two distinct options — a single bundled choice cannot resolve correctly.
- **Flagged assumption, needs regulatory confirmation (owner: Q-009, unassigned):** the spec doesn't state which tier a four-factor-triggered sub-200 organisation lands in, only that it "can be pulled into scope." This implementation defaults to OHL (the lowest major-importance tier). Documented in code; do not extend without checking GAID 2025 directly.
- **`components/tools/AmICovered.tsx`** — client-side question stepper (progress indicator, back navigation, real `<button>` elements) plus result screen (category, obligations, CAR deadline via C-014/C-018, C-012 penalty framing verbatim for UHL/EHL only, sector cross-link, email-capture UI).
- **Email capture is UI-only** — no backend exists in this repo to send it (Resend/D-012 not wired; Strapi is out of agency scope). Submitting shows a client-side confirmation and a fallback link to book a consultation, so there's no dead end, but nothing is actually delivered yet. Wire to a real API route before launch.
- **Real bug found and fixed during build:** the result-screen cards initially used `.reveal` (v5's scroll-entrance class) without hardcoding `.active`. `ScrollReveals`' `IntersectionObserver` only scans `.reveal` elements present at the page's initial mount — since these cards only enter the DOM after the user completes the flow, the observer never saw them and they stayed stuck at `opacity: 0`. Removed `.reveal` from all dynamically-rendered elements in this component (scroll-triggered entrance doesn't apply to click-revealed content regardless).
- Fixed forward-reference: the homepage's "Start the Check" CTA in `SelfCheck.tsx` pointed at `#contact` (a leftover from the port); now points at `/am-i-covered`.

Verified: `npx tsc --noEmit` and `npm run lint` clean. End-to-end click-through verified via a scripted headless-Chrome session (not just static markup) for 4 flows spanning all 4 result categories — university→EHL, commercial bank→UHL, sole trader→not-of-major-importance, sole trader with sensitive data→OHL (four-factor escalation). All matched the unit tests.

## Completed — `/sectors/regulated-businesses` restyled (2026-08-19)

Client flagged inconsistent card styling (generic rounded corners, cramped padding) vs. the homepage. Rebuilt every panel to reuse v5's actual card recipe verbatim — `.process-portrait-card` (white/chamfer/border/shadow, 36/30/30 padding) — instead of ad hoc Tailwind. Verified via full-page headless screenshot at 1440px.

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
| `/sectors/public-sector` | **No approved copy exists** — no `Content/04-Page-Copy/sectors-public-sector.md`. Nav/footer keep it non-interactive and marked planned |
| All Services index redesign | Client decision on `docs/ALL_SERVICES_REVIEW-2026-08-21.md`; current page remains live |
| `/how-we-work`, `/about/credentials`, `/training`, `/resources` | — all now show "Soon" in the nav/footer instead of 404ing (W-030) |
| Self-check email delivery | No backend/Resend wired in this repo yet (D-012) |
| `/privacy` | Draft has 11 `[CONFIRM]` fields + unverified rights — see launch gates |
| Review of the homepage port | Recommended before continuing much further. The tertiary route is no longer a port — rebuilt on the sector template per W-028 |
| Commissioned cut-out portraits | Only 2 distinct faces in `public/`; per-page variety needs provenance-cleared assets (launch gate 5, D2) |
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
npx tsc --noEmit   # ✅ clean
npm run lint       # ✅ 0 errors (1 pre-existing warning, IndustrySectors.tsx)
npm run build      # ⚠️ run ONLY with no `next dev` server live — see the
                   #    operational note above; both write to .next
```

## Next action

The Phase 2 rollout is complete locally. Highest-value next steps, in order:

1. Review the confirmed `/services` findings in
   `docs/ALL_SERVICES_REVIEW-2026-08-21.md` and approve or revise the proposed
   compact Service Journey Directory direction.
2. Commit the accumulated `verified_local` work only when explicitly requested;
   no remote, push, or deployment is configured or authorised.
3. Start Phase 3 (`/how-we-work`, `/about/credentials`, `/training`, and approved
   resources) only after a separate approval.
4. Build `/sectors/public-sector` only after approved copy exists.
5. Publish `/privacy` before any production launch that captures email.

Update this file after each route rather than at phase end.

## Verified locally — index palette and homepage mandate carousel (2026-08-23)

W-037 is implemented locally. `/services` and `/sectors` retain their shared
W-036 hero design but now use the approved pale mineral/slate split; directory
card titles are explicitly bold. The homepage carousel alone is visually
superseded from W-026: three existing Mandate audiences now use layered
cutout/editorial collages and route to the matching live sector pages. No
Public Sector page or new regulatory claim was introduced.

Hydrated Chrome checks at 390px and 1440px passed on `/`, `/services`, and
`/sectors`: zero overflow, one H1, and no failed images. TypeScript and lint are
clean. The production build was not run alongside the live development server,
following the operational warning above. Evidence:
`docs/INDEX_PALETTE_AND_HOME_MANDATE_EVIDENCE-2026-08-23.md`.

## Revision — homepage carousel uses the shared index visual (2026-08-23)

W-038 replaces the rejected custom collages. `IndexHeroVisual` is now shared
verbatim by All Services, All Sectors, and all three homepage slides, so the
portrait panel, frame, orbit, and information-card construction cannot diverge.
The slide panel copy and live sector destination remain specific to each mandate
entry. The light half of the homepage hero now also carries the same fine grid
used by the index heroes.
