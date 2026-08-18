# Changelog

Newest first. Record every substantive change — this is how the team tracks what shipped.

Format: `## YYYY-MM-DD · summary` then what changed and why.

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
