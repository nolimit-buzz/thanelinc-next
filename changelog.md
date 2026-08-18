# Changelog

Newest first. Record every substantive change — this is how the team tracks what shipped.

Format: `## YYYY-MM-DD · summary` then what changed and why.

---

## 2026-08-18 · Repository scaffolded

Phase 1 of `PLAN-2026-08-18-nextjs-conversion.md` (approved, W-025).

**Created:** Next.js 16 App Router + TypeScript + Tailwind v4, ESLint, root-level `app/` `components/` `lib/` (no `src/`), matching the `cfbf-next` house pattern. Added `framer-motion` and `lucide-react` — the visual concept is animation- and icon-heavy.

**Scope of this repository:** frontend build only. Delivery documentation — briefs, decisions, claims register, questions, client permissions — stays in the `ThanelInc-Handover/` workspace and is never committed here (W-025). Git history is permanent, so the boundary is enforced from the first commit rather than cleaned up later.

**Strapi:** out of agency scope. The client's team connects it on Strapi Cloud, taking the project up from GitHub. Content therefore lives in typed modules under `lib/content/` and reaches components as props, so the CMS swap touches only the data-fetch layer.

**Not yet done:** design tokens from the approved v5 concept, component conversion, routes, GitHub remote, Vercel.
