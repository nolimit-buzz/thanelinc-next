# Strapi Backend Handover — Thanelinc Website

**Audience:** the engineering team that will build and connect the Strapi CMS (client's own team, per W-025).
**Written:** 2026-08-23. **Status:** informational handover — no Strapi work has started. This document does not authorise starting it.

---

## 1. What you're connecting to

`thanelinc-next` is a Next.js 16 App Router frontend. All page copy currently lives as **typed TypeScript modules** under `lib/content/`, imported directly by route files and passed to presentation components as props. There is no database, no CMS, and no content API today — this document exists so that when Strapi is introduced, it replaces only the data-fetch layer and nothing else.

Read `AGENTS.md` at the repo root first. Two rules from it matter most here:

- Components take content **as props** and know nothing about where it comes from. Swapping local modules for a Strapi API call should touch only the module that currently does `export const xContent = {...}` — turn it into a `fetch`/`getStaticProps`-equivalent call that returns the same shape.
- **The exported TypeScript types are the deliverable.** They are the content-model contract for whoever builds the Strapi schema. Match your Strapi collection-type fields to them field-for-field, not the other way around.

## 2. Important: there are two type systems, and they've diverged

`lib/content/types.ts` was written as the canonical CMS schema (`Service`, `SectorPage`, `Explainer`, `CaseEvidence`, `Credential`, `PageSection`). **It is not what the shipped pages actually use.** Its own header comment says so directly: those types are "not currently consumed anywhere."

What's actually rendered is a second, page-template-specific set of interfaces, defined next to each template component, e.g.:

- `ServicePageContent` in `components/services/ServicePageTemplate.tsx` — used by all eight `lib/content/services/*.ts` modules (`breachResponse.ts`, `ndpcRegistration.ts`, etc.)
- `SectorPageContent` in `components/sectors/SectorPageTemplate.tsx` — used by `sectorsRegulatedBusinesses.ts`, `sectorsTertiaryInstitutions.ts`, `sectorsPublicSector.ts`
- Page-specific interfaces co-located with `about.ts`, `credentials.ts`, `team.ts`, `howWeWork.ts`, `legal.ts`, `resources.ts`

**Before modeling Strapi collection types, reconcile these two.** Either:
1. Retire `types.ts`'s unused `Service`/`Explainer`/`SectorPage`/`PageSection` shapes and model Strapi directly off the real per-template interfaces (recommended — it's what's actually proven in production), or
2. Migrate the real content modules onto the canonical `types.ts` shapes first, then model Strapi off that.

Don't build a Strapi schema from `types.ts` while the frontend keeps rendering the other shape — that reintroduces the exact drift this document is flagging.

## 3. Content inventory → what becomes a Strapi collection

| Local module(s) | Real content shape (source of truth) | Suggested Strapi collection type | Notes |
|---|---|---|---|
| `lib/content/services/*.ts` (8 files) | `ServicePageContent` (`components/services/ServicePageTemplate.tsx`) | `service` | `deliverable` and `turnaround` fields are **required in code** (W-005) — keep them required in Strapi, not optional. |
| `lib/content/sectorsRegulatedBusinesses.ts`, `sectorsTertiaryInstitutions.ts`, `sectorsPublicSector.ts` | `SectorPageContent` (`components/sectors/SectorPageTemplate.tsx`) | `sector-page` | `sectorsPublicSector.ts` carries hard content-safety constraints (§5) — do not let a generic CMS editor bypass them. |
| `lib/content/sectorsIndex.ts`, `servicesIndex.ts` | index/listing shape, co-located | `single-type` (index pages) or derive from the collections above | Prefer deriving the index from the collection queries rather than duplicating a separate content entry. |
| `lib/content/resources.ts` + the three explainer bodies | explainer/article shape, co-located | `resource-article` | Carries `lastReviewed`/`nextReviewDue` — keep these as real date fields, not free text, so a review-cadence workflow can query them. |
| `lib/content/credentials.ts` | credential shape, co-located | `credential` + a linked **media** field | The two certificate PDFs/PNGs under `public/credentials/` must move to the Strapi media library, not stay as static frontend assets, once Strapi owns this content. |
| `lib/content/team.ts` | `TeamMember` (`disclosureStatus: "cleared" \| "pending-clearance" \| "excluded"`) | `team-member` | **Do not drop the `disclosureStatus` gate.** The frontend filters on it; Strapi's query/publish workflow must preserve an equivalent gate so an editor cannot publish an uncleared or excluded person by mistake. |
| `lib/content/about.ts`, `howWeWork.ts` | page-specific shapes | `single-type` per page | Low-churn pages; low priority for CMS migration. |
| `lib/content/legal.ts` | draft/legal shape | `single-type` per legal page, or keep static | These are drafts pending CDPO/legal approval (Gate 1) — do not connect them to editorial workflow until that approval lands; premature editability risks an unreviewed legal change going live. |
| `lib/content/navigation.ts`, `searchIndex.ts` | nav/search config | Probably **stays in code**, not Strapi | These are structural/routing concerns, not editorial content. Making them CMS-editable risks an editor creating a link to a route that doesn't exist. |
| `lib/content/contact.ts`, `amICovered.ts`, `designReview.ts` | tool/form config | Stays in code | Not editorial content; these drive interactive logic, not prose. |

## 4. What must not change when Strapi lands

These are enforced by code today and must have an equivalent enforcement in the CMS layer, not just a documentation note:

- **`deliverable` and `turnaround` are required on every service** (W-005) — they compensate for publishing no pricing anywhere on the site. A Strapi content type that allows either field to be empty reopens a rule that was deliberately closed.
- **`disclosureStatus` blocks publication** (W-008) — a team member or case-evidence entry not explicitly `"cleared"` must never reach rendered output. Model this as a required, defaulted-to-blocked field with an editorial approval step, not an optional flag an editor can skip.
- **Every regulatory statement traces to a claims-register ID** (`RegulationReference` — `claimId` + `instrument`). If Strapi lets editors write free-text statutory claims without a linked, verified source, the site's core differentiator (a licensed DPCO not overstating its own regulatory claims) is the first thing that breaks. Consider a `regulation-reference` collection editors select from, not a free-text field.
- **NDPA penalty wording is fixed**: "section 49," never 48; "up to the greater of ₦10 million or 2% of annual gross revenue," never paraphrased.
- **Breach response is "same-day," never "24/7" or "round-the-clock."**
- **No pricing field anywhere** — don't add one "just in case."
- **DPCO licence vs. client DP/DC registration** must remain textually and structurally distinct; don't let a shared "credential" content type blur the two under one generic label.

## 5. Two content areas need extra care

- **`sectorsPublicSector.ts`** — must never surface Delta State proposal-stage work, the "16 MDAs" aggregate, or an implied government appointment. NBA Election 2026 may appear only as clearly labelled professional-body proof, never as MDA/ministry proof. If this becomes CMS-editable, add an explicit `engagementStatus` (`delivered` / `awarded` / `proposed`) gate, mirroring `CaseEvidence` in `types.ts` — a proposal must never render as delivered work.
- **`legal.ts`** — currently drafts. Do not wire these into a live-editing workflow before CDPO/legal sign-off (Gate 1 in `docs/LAUNCH_READINESS_REPORT-2026-08-23.md`); an editable legal page pre-approval is a bigger risk than a static one.

## 6. Suggested migration sequence (not authorised to start — sequencing guidance only)

1. Reconcile `types.ts` vs. the real per-template shapes (§2) before writing a single Strapi collection type.
2. Stand up Strapi against the two lowest-risk collections first: `service` (8 entries, stable, no clearance gating) and `resource-article` (3 entries, has review-date fields already).
3. Add the content-safety gates (§4) as Strapi-level validation/workflow, not just as a note for editors to remember.
4. Migrate `sector-page` and `credential` next — both need the extra care in §5 and §3's media-library note respectively.
5. Leave `team-member` and `legal` for last: both are blocked on external approvals (name/portrait clearance; CDPO/legal sign-off) independent of the technical migration.
6. Keep `navigation.ts` and `searchIndex.ts` in code. Revisit only if there's a real editorial need to add routes without a deploy — there isn't one today.
7. At each stage, confirm the swap changed only the data-fetch layer: same component props in, same rendered output, verified with `npx tsc --noEmit`, `npm run lint`, and `npm run build`.

## 7. Where the rest of the picture lives

- `docs/LAUNCH_READINESS_REPORT-2026-08-23.md` — full launch-gate list; Strapi migration is Gate 3 (AI discovery and content operations) priority P1, after Gate 1 (backend/legal) and Gate 2 (SEO/technical discovery).
- `docs/NEXT_LLM_HANDOVER.md` — general next-agent orientation.
- `docs/BUILD_STATE.md` — delivery-state history.
- Canonical claims and clearance records (outside this repo, never committed here per W-025): `../ThanelInc-Handover/Website Thanelinc/docs/CLAIMS_REGISTER.md` and `Content/_internal/client-permissions.md`.
