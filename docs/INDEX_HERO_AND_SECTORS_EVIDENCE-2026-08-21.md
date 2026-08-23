# Index hero and All Sectors evidence — 2026-08-21

**Decision:** W-036
**Plan:** `PLAN-2026-08-21-index-heroes-and-sectors-directory.md`
**Delivery state:** `implemented_local` — focused verification passed;
production build unverified for this revision

## Review URLs

- All Services: `http://localhost:3000/services`
- All Sectors: `http://localhost:3000/sectors`
- Regulated Businesses sticky nav:
  `http://localhost:3000/sectors/regulated-businesses`
- Tertiary Institutions sticky nav:
  `http://localhost:3000/sectors/tertiary-institutions`

## Confirmed implementation

- `/services` and `/sectors` use the shared index-only two-tone hero, with a
  transparent pre-scroll nav, left proposition/actions/metrics, and a
  portrait-led dark visual field with compact information panels.
- Internal service and sector detail pages retain their 420px editorial banner
  opening; the new hero is limited to index pages.
- `/sectors` contains two sourced, live audience routes and is now the Sectors
  mega-menu's “View all sectors” destination.
- Public Sector remains blocked and has not been inferred from MDA proposals.
- Both sector detail pages now use a measured fixed-state section bar because
  the document's root overflow rule prevents dependable native sticky
  behaviour. The layout slot prevents a jump and the bar releases before the
  end of `main`.
- Six live service pages that search still described as planned are now marked
  live; `/sectors` is included in the search corpus.

## Browser measurements

Hydrated Chrome checked `/services` and `/sectors` at 390, 768, and 1440px:

- zero document overflow on all six combinations;
- exactly one H1 and no failed images;
- H1 at 50.7/48/64px and H2 at no more than 32/32/42px;
- two working hero actions on each page;
- eight service-detail links on `/services` and two sector-detail links on
  `/sectors`;
- horizontal two-tone split at desktop and vertical two-tone split on mobile;
- transparent index nav before scroll, with corrected dark mobile controls.

Sticky-nav checks on both sector pages at 390 and 1440px confirm:

- fixed position after the hero;
- top edge at 64px, clearing the global nav;
- bottom edge at 121px;
- `#questions` resolves to 132px (138/155px in two mobile runs), clearing the
  fixed section bar; and
- mobile section items remain horizontally scrollable (531px and 454px tracks
  inside a 390px viewport).

Screenshots and raw measurements are under
`/private/tmp/thanelinc-index-hero-evidence-20260821/`.

## Repository verification

- `npx tsc --noEmit` — exit 0
- `npm run lint` — exit 0, no warnings
- `git diff --check` — exit 0
- local route checks — `/services` 200; `/sectors` 200
- isolated `npm run build` — **unverified for this revision**. The escalation
  required by the existing `next/font` network dependency was denied because
  the tool service hit its usage limit. This is not a compiler result and is
  not represented as a passed or failed build.

No commit, push, or deployment was performed.
