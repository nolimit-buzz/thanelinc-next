# All Services page review — 2026-08-21

**Route:** `/services`
**Review state:** implemented and verified after separate owner approval (W-035).

## Implementation outcome

The original findings below were approved as the follow-on execution brief and
are now resolved on the live route:

- the alternating desktop archive was replaced by a responsive three-group
  Service Journey Directory, with all eight services stacking at mobile;
- the hover-only sector accordion was replaced by always-readable, keyboard-
  focusable links to the two approved sector routes;
- the NDPC turnaround wording is restored to “3 working days” everywhere;
- page-level solution, service-group, sector, and CTA copy is sourced from
  `lib/content/servicesIndex.ts` rather than embedded in the component;
- the page now uses the approved 420px editorial banner, icon-led bottom-rule
  outcome facts, restrained section rhythm, and shared cutout closing CTA.

Final browser measurements at 390, 768, and 1440px show zero document
overflow, one H1, no failed images, all eight unique service links, two real
sector links with `tabIndex: 0`, a maximum H2 size of 42px, and a maximum
banner height of 420px.

## What is working

- The page immediately establishes the eight-service proposition and provides a
  direct self-check action.
- All eight service-detail links now return 200, and every row states a
  deliverable and turnaround/deadline.
- The page has one H1, a non-duplicated document title, no failed images, and no
  document-level horizontal overflow at 390, 768, or 1440px.
- The problem framing, service inventory, sector bridge, and closing self-check
  CTA create a complete conversion path rather than a bare directory.

## Confirmed issues

### 1. Service rows do not become a mobile layout

`ServicesArchive.tsx` keeps a two-column inline grid and a 40px gap at every
viewport. At 390px, the first 326px-wide service row resolves to columns of
156px and 59px. The text becomes a narrow vertical ribbon and the icon panel is
reduced to a sliver. This does not widen the document, so a basic overflow test
does not catch it, but it is a real mobile usability defect.

**Priority:** P0. Stack each service row at the tablet/mobile breakpoint and
keep the icon/media panel at a useful aspect ratio.

### 2. The sector accordion is hover-only on this page

The four sector cards are plain `div` elements with no role, no tab stop, and no
state handler. Their drawer content is revealed only by CSS `:hover`. Browser
measurement confirms `tabIndex: -1` and no role for all four cards. Keyboard
users cannot open them, and touch behaviour depends on emulated hover rather
than an explicit control.

**Priority:** P0. Use real buttons with `aria-expanded` and deterministic panel
relationships, or replace the accordion with always-readable sector cards on
small screens.

### 3. The hero shortens an approved turnaround claim

The NDPC Registration floating chip reads “Certificate in 3 days”. The approved
commitment is **3 working days** (C-025). Dropping “working” changes the promise.

**Priority:** P0. Restore “Certificate in 3 working days”.

### 4. User-facing index copy bypasses the content seam

The solution heading/body are hardcoded in `ServicesArchive.tsx`, while the
sector card titles, claims, links, and remote image URLs are hardcoded in
`IndustrySectors.tsx`. This conflicts with the repository rule that content
lives in typed modules and makes the future Strapi swap require component edits.

**Priority:** P1. Move the solution section and sector cards into typed content
modules, reusing approved sector content where possible.

### 5. The page has not adopted the newly approved inner-page vocabulary

Service outcomes still appear as pill-like boxes and the eight services are
presented as large alternating two-column cards. That treatment now conflicts
with the approved service pages' divider rails, bottom-rule outcome facts,
420px editorial banner, and more restrained section rhythm.

**Priority:** P1. Redesign the index as a compact Service Journey Directory:
use the approved editorial hero/banner, group services by the six-stage journey,
show each deliverable and turnaround as icon-led bottom-rule facts, and preserve
direct access to all eight routes.

## Recommended next design pass

1. Fix the three P0 defects before visual exploration: responsive rows,
   accessible sector interaction, and “3 working days”.
2. Create one `/services` redesign option using the approved inner-page system,
   with a compact six-stage service directory rather than eight long alternating
   rows.
3. Keep the existing problem section only if the new page still needs it after
   the directory is visible near the top; otherwise condense it to reduce the
   distance to the actual services.
4. Reuse the selected Sector A CTA/banner treatment at the close so the index
   and its destination pages feel like one system.

## Evidence

- Responsive screenshots and route metrics:
  `/private/tmp/thanelinc-phase2-evidence-20260821/`
- Focused 390px service-row screenshot:
  `services-first-row-390.png`
- Measured first-row columns: 156px / 59px at 390px; 330px / 270px at 768px;
  535px / 437px at 1440px.
- Replacement-page screenshots and machine-readable measurements:
  `/private/tmp/thanelinc-services-directory-evidence-20260821/`
