# Inner-page review evidence — 2026-08-21

**Plan:** `PLAN-2026-08-21-inner-page-design-system-redesign.md`
**Executed scope:** Phase 0 and Phase 1 only
**Delivery state:** `verified_local` — stopped at Gate 1; no deployment or broad template rollout

## Review URLs

Run `npm run dev`, then review:

- Index: `http://localhost:3000/design-review`
- Service exemplar: `http://localhost:3000/services/data-mapping-ropa`
- Contact: `http://localhost:3000/contact`
- Sector Option A — recommended: `http://localhost:3000/design-review/sectors/guided-journey`
- Sector Option B: `http://localhost:3000/design-review/sectors/editorial-grid`
- Existing regulated-businesses baseline: `http://localhost:3000/sectors/regulated-businesses`
- Existing tertiary-institutions baseline: `http://localhost:3000/sectors/tertiary-institutions`
- All Services directory: `http://localhost:3000/services`

The `/design-review` routes are absent from public navigation, carry
`noindex, nofollow`, return 200 in development, and return 404 from a
production build.

## What changed

- Data Mapping & ROPA now uses the approved editorial heading, summary,
  above-fold actions, dominant banner, continuous divider rail, one outcome
  band, visible narrative sections, and a responsive closing CTA.
- The feature rail supports 1–4 columns per row and wraps larger sets without
  inline grid overrides or outlined cards.
- The four feature sentences now trace only to `servicesIndex.ts`; the phrases
  “end to end, not just listed” and “don't wait on rework” were removed.
- Contact uses the confirmed email, general/breach number, and compliance
  number. It contains no address, map, pin, or 24/7 implication.
- Contact's form has visible labels and opens a prefilled email in the
  visitor's email client. It cannot display a false “sent” state.
- Sector shared-template defects were remediated: mobile section navigation,
  one-column reason cards, non-overlapping closing CTA, locally scrolling
  tables, and removal of cosmetic pointer-only table-row interaction.
- Two sector previews use the same approved Regulated Businesses content. No
  claim, client name, or six-stage content changes between options.
- Route metadata now lets the root layout add the Thanelinc suffix once.
- The shared navigation logo now preserves its 165:40 aspect ratio at both
  rendered sizes.

## Client revision pass — 2026-08-21

Following the first Gate 1 review, the approved revisions were applied:

- all pilot H1 treatments now cap at `4rem`; pilot H2 treatments cap at
  `42px` (`2.625rem`);
- the service banner image caps at `420px`;
- the “What you get” icon aligns with the top of its content, and Deliverable
  and Turnaround are now icon-led rows with teal bottom rules rather than
  outlined button-like boxes;
- the “Who this is for” panel stretches to the height of the narrative column
  on desktop and returns to natural height on stacked layouts;
- the shared inner-page CTA now accepts an approved cutout asset, positioning
  it above and in front of the banner at desktop widths without allowing page
  overflow; it collapses to the background-only treatment on small screens;
- Contact now has a required Reason for contacting selector, sourced from the
  approved service catalogue. The selected category is carried into both the
  email subject and body;
- Sector Option A now uses the approved cutout CTA treatment. Option A is the
  selected sector direction; Option B remains available only for comparison.

The revision was rechecked at 390, 768, and 1440px: all 21 route/viewport
combinations retained `0px` document overflow, exactly one H1, and zero failed
images. The contact fields remain at least 282px wide at 390px. The 24-case
feature-rail stress test also remains green. At 1440px, computed styles confirm
`64px` H1, `42px` maximum H2, and a `420px` service banner; the narrative and
“Who this is for” columns both measure `387px`. Contact exposes 10 selectable
lead categories.

## Selected-direction polish pass — 2026-08-21

- Sector Option A now reuses the Data Mapping & ROPA opening system directly:
  left eyebrow, right two-tone H1, summary and actions, followed by a full-width
  chamfered banner. Its approved body sections and content are unchanged.
- The Sector A and Contact intro banners both cap at `420px`, matching the
  service exemplar's desktop banner height. The sector portrait uses a scoped
  focal position so the subject remains visible in the wide crop.
- Contact's photo banner and floating white “Get in touch” panel were removed.
  The intro is now a purpose-built abstract street-map composition with the
  confirmed general-enquiries email. It deliberately has no location pin,
  address, or geographic claim because none is approved.
- Contact's useful subhead moved into the header itself, and the form heading
  changed from “Request a proposal” to “Get in touch”.
- Static service, Contact, and selected-sector components now use restrained
  scroll-triggered fade/translate entrances, with short staggered delays for
  repeated rows. Reduced-motion users receive the completed state with no
  transition.

Hydrated Chrome checks confirmed the reveal observer activates the above-fold
elements and progressively activates below-fold groups while scrolling. The
full 390/768/1440 audit remains green: 21/21 route/viewport combinations have
`0px` document overflow, one H1, and zero failed images; all 24 feature-rail
stress cases still have no document or rail overflow.

## Responsive evidence

Headless Chrome tested the seven URLs above at 390, 768, and 1440px:

| Check | Result |
|---|---|
| Document overflow | 0px on all 21 route/viewport combinations |
| H1 count | Exactly 1 on all 21 combinations |
| Image loading | 0 failed images |
| Contact minimum field width | 282px at 390; 306px at 768; 280px at 1440 |
| Sector mobile nav | First item fully visible; final item reachable on both live sector routes |
| Live shell links | 9/9 returned 200 |

The service rail was also DOM-stress-tested with 1, 2, 3, 4, 5, and 8 items
at 390, 768, 901, and 1440px. All 24 cases had document scroll width equal to
client width and rail scroll width equal to rail client width. A one-item rail
was full width; larger sets used 1, 2, or at most 4 columns per row.

Screenshots and machine-readable measurements were generated during execution
under `/private/tmp/thanelinc-review-evidence-20260821/`.

## Verification

- `npx tsc --noEmit` — exit 0
- `npm run lint` — exit 0; one pre-existing `IndustrySectors.tsx` plain-image warning remains
- `npm run build` — exit 0 (Next.js 16.3.1 Turbopack; production build used an isolated copy because another local dev process held the repository's `.next/dev/lock`; network access was required by the existing `next/font` configuration)
- Production status: `/design-review` and its sector preview returned 404;
  `/services/data-mapping-ropa` and `/contact` returned 200
- `git diff --check` — exit 0

## Gate 1 status after client review

1. Contact direction is approved; the email-client delivery remains explicit
   and the new enquiry category is included in the outbound draft.
2. Sector Option A — Guided Audience Journey — is selected for later rollout.
3. The revised service exemplar is ready for the owner's final visual check.
4. Phase 2 remains stopped until that final service-exemplar approval is
   recorded.

Existing repository imagery remains placeholder-only for review. Final service
and sector rollout still requires provenance-cleared launch imagery.

## Gate 2 rollout evidence — 2026-08-21

Gate 1 was approved (W-034), and the approved templates were rolled out to all
eight service routes plus both live sector routes. The refreshed review links
are:

- `http://localhost:3000/services/ndpc-registration`
- `http://localhost:3000/services/data-mapping-ropa`
- `http://localhost:3000/services/gap-assessment-dpia`
- `http://localhost:3000/services/policies-remediation`
- `http://localhost:3000/services/outsourced-dpo`
- `http://localhost:3000/services/compliance-audit-filing`
- `http://localhost:3000/services/ongoing-monitoring`
- `http://localhost:3000/services/breach-response`
- `http://localhost:3000/sectors/regulated-businesses`
- `http://localhost:3000/sectors/tertiary-institutions`

The Gate 2 browser audit also included `/services`: 33/33 route/viewport checks
at 390, 768, and 1440px had zero document overflow, one H1, and no failed
images. All fourteen shell destinations returned 200, and all 24 service-rail
stress cases remained green. Screenshots and machine-readable measurements are
under `/private/tmp/thanelinc-phase2-evidence-20260821/`.

The All Services index was first reviewed without edits. After separate owner
approval (W-035), its confirmed findings became the follow-on execution brief.

## All Services follow-on evidence — 2026-08-21

`/services` now uses the approved editorial opening and a compact Service
Journey Directory grouped as Foundation, Governance, and Audit & Ongoing. All
eight services remain directly accessible. Each card exposes its deliverable
and turnaround as icon-led teal bottom-rule facts, and the page closes on the
shared cutout CTA treatment.

The prior squeezed mobile rows, hover-only sector accordion, shortened “3
days” claim, hardcoded page copy, and legacy archive styling are resolved. The
sector bridge now contains real links whose full content remains visible
without hover.

Focused hydrated-browser checks at 390, 768, and 1440px confirm:

- zero document overflow;
- exactly one H1 and a maximum H2 of 42px;
- a responsive banner height of 260px, 300px, and 420px;
- eight unique service links and all eight service cards;
- two sector anchors with `tabIndex: 0`;
- no failed images; and
- equal 326px mobile service-card widths in the first group.

Final verification: `npx tsc --noEmit`, `npm run lint`, and isolated
`npm run build` all exit 0 with no warnings. Screenshots and measurements are
under `/private/tmp/thanelinc-services-directory-evidence-20260821/`.
