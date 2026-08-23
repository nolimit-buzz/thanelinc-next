# Index palette and homepage mandate-carousel evidence — 2026-08-23

**Decision:** W-037, amended by W-038
**Plan:** `PLAN-2026-08-23-home-carousel-shared-index-visual.md`
**Delivery state:** `verified_local`

## Review URLs

- Homepage carousel: `http://localhost:3000/`
- All Services: `http://localhost:3000/services`
- All Sectors: `http://localhost:3000/sectors`

## Confirmed changes

- The W-036 Services/Sectors hero composition is unchanged; its split is now
  pale mineral (`#e7ece9`) and slate (`#aebdbc`), with the visual panel using
  the existing navigation-bar slate (`#819293`).
- Service and sector directory H3 titles explicitly use weight 800.
- The homepage's existing three-slide carousel keeps its 6-second advance,
  hover pause, arrows, dots, and footprint, while every slide now renders the
  exact shared `IndexHeroVisual` component used by All Services and All Sectors.
- The homepage light field uses the shared 72px technical grid and radial wash.
- Slide links resolve to the two live sector-detail routes. No Public Sector
  route or unsupported claim was added.
- A duplicate React key in the mobile Sectors drawer, exposed by the browser
  console during verification, now uses `href + label` like the desktop menu.

## Browser evidence

Hydrated Chrome checked `/`, `/services`, and `/sectors` at 390px and 1440px:

- document `scrollWidth` equals `innerWidth` on all six runs;
- exactly one H1 on every route;
- zero incomplete or zero-width images;
- desktop screenshots confirm the shared homepage/index visual and revised
  Services palette; and
- all three routes respond successfully through the local review server.

## Repository checks

- `npx tsc --noEmit` — exit 0
- `npm run lint` — exit 0, no warnings
- `git diff --check` — exit 0
- production build — not rerun while the live development server owns `.next`,
  per the repository's documented cache-corruption warning

The W-038 amendment was rechecked with `npx tsc --noEmit`, `npm run lint`,
`git diff --check`, a successful local homepage request, and a hydrated 1440px
desktop screenshot.

No commit, push, or deployment was performed.
