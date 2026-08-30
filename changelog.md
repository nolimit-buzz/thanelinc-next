# Changelog

Newest first. Record every substantive change — this is how the team tracks what shipped.

Format: `## YYYY-MM-DD · summary` then what changed and why.

---

## 2026-08-27 · Homepage resource cards now come from Strapi

The three Resources cards on the homepage rendered hardcoded `images.unsplash.com`
URLs even though Strapi held the correct Cloudinary ones. Two gaps: the home
populate query asked only for the resources section's `categories`, so `items`
never came back, and `mapResourcesHeader` hardcoded `items: []`; and
`Resources.tsx` ignored its own `content` prop for the cards, importing
`resourceArticles` straight from `lib/content/resources.ts` — the AGENTS.md CMS
seam violation that made the section un-CMS-able.

`fetchHomeSections` now populates `items` (with a `[populate]=*` wildcard rather
than naming fields — Strapi 400s on an unknown populate key, and a 400 is
non-retryable, so naming a field the deployed CMS lacks would blank the whole
page). `mapResourcesHeader` is renamed `mapResources` and maps the item list,
running each image through `withCloudinaryTransform(url, 1200)` like the other
image-bearing mappers. `Resources.tsx` passes `content.items` through.

`ResourceCards` now takes a narrower `ResourceCardItem` prop rather than the full
`ResourceArticle`, so the homepage can pass CMS items that carry no article body;
`ResourceArticle` still satisfies it structurally, so the `/resources` callers are
unchanged. The audience tag row renders only when tags are present.

`cms/src/components/home/resource-item.json` gains a repeatable `audience` field
(reusing `resources.audience-tag-item`). **Until that schema change is deployed and
the three entries have their tags filled in via the admin, the homepage cards
render without the tag row.** Source the labels from the `audience` arrays in
`lib/content/resources.ts` — do not invent new ones.

Still outstanding: `/resources` and `/resources/[slug]` continue to serve the
Unsplash URLs from `lib/content/resources.ts`. Strapi already has a `resources`
single type with a `library-section` holding `cards[].image`, so wiring that up is
a self-contained follow-up.

## 2026-08-27 · Homepage blank below the hero after the loader cleared

`ScrollReveals` scanned for `.reveal` elements once on mount and observed only
what existed at that moment. Since it was mounted as a sibling of the
homepage's `Suspense` boundary, that scan ran while the `HomeLoading` fallback
was still on screen — every section below the hero mounted afterwards, was
never observed, never gained `.active`, and stayed at `opacity: 0`. The hero
was unaffected because it drives its own `hero-entered` class.

`ScrollReveals` now re-scans via a `MutationObserver` on `document.body`
(rAF-coalesced) so late-mounting `.reveal` content is always picked up — this
also covers the mega menu, the self-check tool and the sector/services
directories — and honours `prefers-reduced-motion` by revealing everything
immediately. `<ScrollReveals />` also moved inside `HomeContent` so the common
path does not depend on the mutation fallback.

## 2026-08-25 · Self-check call-request email now includes the full stepper answers

`app/api/self-check/call-request` previously only emailed phone/email/best-time
and the resolved category. It now also receives the full `SelfCheckAnswers`
object and `mandatoryFiling`/`source` from `AmICovered.tsx`, and formats each
of the six question answers into a readable line (using the question labels
from `lib/content/amICovered.ts`) so the recipient can see how the visitor
answered, not just the final bucket.

## 2026-08-25 · Mobile homepage hero visibility fix

At stacked hero breakpoints, the homepage now lets the hero wrapper grow with
its copy and artwork instead of clipping the visual below a fixed 100vh box.
The mobile layout reserves space below the fixed navigation and uses a
responsive artwork height so the hero image follows the copy in the scroll
flow.

The adjacent Problem section now stacks its title and statutory description on
mobile, reduces the card inset, and scales the heading to the viewport so the
headline does not clip or leave an oversized empty panel.

At narrow phone widths, the hero headline and lede now use a smaller responsive
display scale so the copy does not dominate the first viewport before the
hero artwork.

On mobile, the hero now flows as pre-header, main heading, slider, description,
and CTA. Slider dots and arrow controls sit below the artwork instead of over it.

## 2026-08-25 · Service-page copy corrections from owner review

Updated the NDPC Registration, Policies & Remediation, Outsourced DPO,
Compliance Audit & Filing, Ongoing Monitoring and Breach Response service
content to match the latest owner-reviewed Google Doc. This includes the
revised registration steps, EHL/UHL/OHL language, 12 June 2023 deadline
wording, due-diligence framing, six-month reporting, same-day escalation,
and corrected service audience descriptions. The Service directory summaries
now stay consistent with the revised registration and audit copy.

The Breach Response outcome lead now places the SAME-DAY RESPONSE call block
above its What you get copy in the shared editorial outcome band.

## 2026-08-24 · Development-only people-led homepage artwork review

---

## 2026-08-24 · Contact form and self-check call request now send real email

Added `lib/mail/sendMail.ts` (nodemailer over SMTP) and two API routes,
`app/api/contact` and `app/api/self-check/call-request`, both validating
input server-side and setting `replyTo` to the submitter's address. Wired
`ContactForm` and `AmICovered`'s call-request form to POST to these routes
instead of stubbing/opening a `mailto:` link. Requires `SMTP_*` and
`MAIL_TO` env vars (see `.env.local.example`) — not committed.

---

## 2026-08-23 · Strapi backend handover documentation

Added `docs/STRAPI_BACKEND_HANDOVER.md` for the team that will build the
Strapi CMS (W-025). Documents that `lib/content/types.ts`'s canonical schema
has drifted from the per-template shapes actually rendered (`ServicePageContent`,
`SectorPageContent`, etc.), gives a content-inventory-to-collection-type
mapping, and lists the enforcement rules (required deliverable/turnaround,
`disclosureStatus` gating, claims-register traceability) that must survive
the move to a CMS. No Strapi work started; this is planning documentation
only.

---

## 2026-08-23 · Decision record for legal/resources/contact refinement; build re-verification blocked

Recorded W-040 in `DECISIONS.md` (canonical workspace), covering the legal-page
drafts, image-led resources overhaul, and contact/footer brand-system
refinement shipped locally earlier the same day and previously held
uncommitted without a matching decision entry.

Re-ran `npx tsc --noEmit`, `npm run lint`, and `git diff --check` — all pass
clean. `npm run build` could not be independently re-verified: a `next-build`
process (PID 67762, started 16:59) already held `.next/lock` at the time of
this pass and had not exited. It was left running rather than terminated
without authorisation. The prior isolated production build result recorded in
the "Resources and Contact brand-system refinement" and "Image-led Resources
library" entries below stands as the last confirmed build evidence; a fresh
build result is still owed once the lock clears.

---

## 2026-08-23 · Launch-readiness reporting and next-agent handoff

Added a repository-grounded launch-readiness report covering delivered scope, explicit launch gates, audience-first assessment, SEO/AI readiness, production limitations, and a prioritised implementation backlog. Added a concise next LLM handoff with source-of-truth paths, constraints, verification commands, and the first safe follow-on task. `BUILD_STATE.md` and `README.md` now point to that handoff.

---

## 2026-08-23 · Resources and Contact brand-system refinement

Made Outfit the sole rendered typeface across the site, including the small
tracked labels that previously used an alternate token. The landing-page
Resources & Explainers title block, category rail, action, and photography
cards now use the same chamfered corner language as the service and sector
templates; resource and article titles have a deliberate bold hierarchy.

The explainer reading frame is now centred and capped at 1000px: its title is
centred across the full frame, the chamfered hero image sits beneath at the
same width and no more than 420px tall, and its summary/review metadata follows
the image. Article and legal-document reading copy is justified. The desktop
sidebar remains sticky and independently scrollable. The contact banner map
has been redrawn as a more detailed neutral map composition, and both its
outer visual and enquiry callout use the branded top-right cut.

Verification: `npx tsc --noEmit`, `npm run lint`, and `git diff --check` pass.
All three remote article-photo URLs returned HTTP 200.

---

## 2026-08-23 · Image-led Resources library and explainer reading template

Replaced the homepage's three abstract resource panels with image-led editorial
cards. Published explainers now show their content type, review date and
audience tags; the landing-page category rail establishes Explainers, Blog,
News and Training without inventing unapproved future entries.

Added the `/resources` library and pre-rendered pages for the three approved
explainers. The shared single-article layout has a full hero image, structured
article body, responsive sticky table of contents, newsletter sidebar, related
reading and appropriate next action. Newsletter delivery is deliberately not
claimed as live until the approved backend is connected.

Verification: TypeScript, lint, diff checks, local 200/single-H1 checks and an
isolated production build pass. The build generates 33 routes, including the
three explainer SSG pages.

---

## 2026-08-23 · Editorial legal-page drafts and footer legal row

Added operational drafts for Privacy Policy, Cookie Policy, and Website Terms.
Each uses an editorial reading layout with a sticky section rail, responsive
mobile contents list, and clear draft status. The copy describes the intended
production flow: contact and follow-up requests will submit to an approved
backend, while self-check answers stay in-browser unless a collection purpose
is explicitly shown. No optional analytics or advertising cookie is configured
in the public codebase.

The footer now reads `© 2026 Thanelinc Nigeria Limited. All rights reserved.
Licensed DPCO. | Website`, with Website linked to `nolimitbuzz.net`; Privacy
Policy, Cookie Policy, and Terms sit in the far-right legal navigation.

Verification: `npx tsc --noEmit`, `npm run lint`, `git diff --check`, local
HTTP 200 and single-H1 checks, and isolated production build (29 static routes)
pass. The legal drafts require CDPO/legal approval before production publication.

---

## 2026-08-23 · Remaining core-page family implemented locally

Added the `/how-we-work` six-stage journey, a credential-led About hub, the
Credentials and clearance-safe Team pages, and `/sectors/public-sector` with a
single `#ministries-agencies` destination. The new pages reuse the approved
editorial hero and Guided Sector templates, retain the 420px header-media cap,
and are powered by typed content modules for the Strapi handoff seam.

The credentials page now previews and links to the two owner-supplied public
certificate PDFs. The only named team record is Ahmed Goni, CDPO. NBA Election
2026 is presented only as a professional-body engagement; no Delta State MDA
proposal or uncleared team material is shown. Navigation, mobile navigation,
footer, and search now expose the finished routes.

Verification: `npx tsc --noEmit`, `npm run lint`, `git diff --check`,
route/asset HTTP 200 checks, rendered single-H1 checks, and an isolated
production Webpack build covering all 26 static routes pass. Committed locally
as `53efa49` and deployed manually to Vercel production at
`https://thanelinc-next.vercel.app`. GitHub push remains pending because no
remote is configured for this repository.

---

## 2026-08-21 · Two-tone index heroes, All Sectors directory, and sticky sector nav

Replaced only `/services`'s opening with a new index-level split hero inspired
by the supplied portrait/product-panel references. The homepage's light/dark
field language now frames a left proposition, two actions and three compact
metrics against a portrait-led visual stage with small information panels.
Service-detail and sector-detail pages keep their existing 420px banner system,
so index and inner pages no longer feel like the same template.

Added the sitemap-approved `/sectors` index using the same hero family and a
two-card directory for the two approved live audiences: Tertiary Institutions
and Regulated Businesses. Its content is typed in `lib/content/sectorsIndex.ts`;
the Sectors mega-menu now sends “View all sectors” to the real route. Public
Sector remains blocked and no proposal-stage MDA material was promoted.

Rebuilt the sector internal section bar as a measured fixed state after browser
testing proved native `position: sticky` was defeated by the existing root
overflow treatment. The bar keeps a layout slot, fixes 64px below the global
nav, releases before `main` ends, and uses 132px anchor offsets. Regulated
Businesses' link order now matches its rendered section order. Also corrected
search state for six already-live service pages and added `/sectors` to search.

Verification: hydrated 390/768/1440 checks show zero overflow, one H1, no
failed images, correct action/link counts and no heading above 64/42px. Both
sector bars pin at 64px at 390 and 1440px and their question anchors clear the
bar. TypeScript, lint and diff checks pass without warnings. Production build
is unverified for this revision because the network escalation required by the
existing `next/font` setup was denied when the tool service reached its usage
limit. No commit, push, or deployment was performed.

---

## 2026-08-21 · All Services rebuilt as a compact Service Journey Directory

Replaced `/services`'s alternating archive rows with the approved inner-page
visual system: a 420px editorial banner, condensed problem framing, and a
three-group directory covering all eight services. Every service retains a
direct destination and now presents its deliverable and turnaround as
icon-led teal bottom-rule facts instead of button-like boxes.

Resolved all confirmed review defects: mobile cards now stack at full usable
width; the hover-only sector accordion is gone in favour of always-readable
real links; NDPC Registration says “3 working days”; and page-level copy and
grouping live in `lib/content/servicesIndex.ts`. The close reuses the approved
cutout CTA, and existing reveal motion retains its reduced-motion override.

Verification: TypeScript, lint, and isolated production build all exit 0 with
no warnings. Hydrated checks at 390/768/1440 show zero overflow, one H1, no
failed images, all eight unique service links, two keyboard-focusable sector
links, H2 at or below 42px, and the banner at or below 420px. No push or
deployment was performed. The complete approved local website state was
committed as `d7e3c3b`.

---

## 2026-08-21 · Gate 1 passed; service and sector templates rolled out

Applied the approved Data Mapping & ROPA service shell to NDPC Registration and
Breach Response and built the five remaining approved service routes. All eight
now share the 420px editorial banner, responsive numbered rail, outcome band,
visible narrative, audience panel, and cutout CTA. NDPC Registration retains its
self-check path; Breach Response retains its phone-first same-day action and
contains no 24/7 wording.

Applied Sector Option A — Guided Audience Journey — to Regulated Businesses and
Tertiary Institutions. Both now use the approved service-style opening and the
guided reason/credential/question/CTA sequence. The cleared Levitate proof is
retained on Regulated Businesses; Tertiary Institutions still publishes no
uncleared proof. Its secondary action now reads “Get in touch”. Public Sector
remains unbuilt.

All service navigation states were changed to live only after all eight routes
returned 200. Verification: TypeScript exit 0; lint exit 0 with the existing
`IndustrySectors.tsx` image warning; isolated production build exit 0; 33/33
route/viewport combinations at 390/768/1440 have zero document overflow, one H1,
and zero failed images; all fourteen shell links return 200; 24 feature-rail
stress cases remain green. Phase 3 destinations referenced by approved body copy
remain planned and are recorded as unverified, not represented as live.

The separate All Services review is in
`docs/ALL_SERVICES_REVIEW-2026-08-21.md`; no redesign of that index was included
in this rollout.

## 2026-08-21 · Sector A opening, Contact map, and polished section motion

Sector Option A now uses the same opening composition as the Data Mapping &
ROPA exemplar: eyebrow/headline grid, two-tone H1, summary/actions, and a
full-width chamfered 420px banner. Only the opening changed; the selected
option's audience reasons, credential block, timeline, questions, and cutout
CTA remain structurally and textually unchanged.

Contact's photo and floating white intro panel were replaced by a custom
abstract street-map banner. It keeps the confirmed email callout but avoids an
unapproved office pin, address, or location claim. The banner caps at 420px,
the existing subhead now sits under the H1, and the form heading reads “Get in
touch”.

Added restrained scroll-triggered entrances to the static service, Contact,
and selected-sector sections. Repeated rows stagger by 100ms; animation is
opacity/translate only, runs once, and resolves immediately under
`prefers-reduced-motion: reduce`. The reveal observer is mounted after the
static content so streamed markup is present before its one-time scan.

Verification: hydrated browser screenshots at desktop/mobile; 21/21
route/viewport combinations at 390/768/1440 have zero document overflow,
exactly one H1, and zero failed images; all 24 feature-rail stress cases remain
green. TypeScript, lint, and the isolated production build pass; lint retains
the unrelated pre-existing `IndustrySectors.tsx` image warning.

---

## 2026-08-21 · Gate 1 visual revisions and Sector Option A selection

Applied the owner's first review of the inner-page pilot. The service H1 now
caps at 4rem, its banner at 420px, and the “What you get” area uses top-aligned
icons plus teal bottom-rule fact rows rather than outlined boxes. The audience
panel now matches the narrative column height on desktop. The shared closing
CTA gained an optional cutout layer, used by Data Mapping & ROPA and the
selected Sector Option A preview; the portrait breaks above the dark card at
desktop sizes and is removed from the constrained mobile composition.

Contact gained a required Reason for contacting selector using the approved
service lines, following the IME Scents enquiry-topic pattern. The category is
included in the generated email subject and body, preserving the existing
honest “continue in email” behaviour. Pilot H2 sizes now cap at 42px.

Client decision: Contact direction approved and Sector Option A (Guided
Audience Journey) selected. Phase 2 remains stopped pending final visual
acceptance of the revised service exemplar.

Verification: `npx tsc --noEmit` and isolated production build exit 0; lint
exits 0 with the pre-existing `IndustrySectors.tsx` image warning. Seven routes
at 390/768/1440 retain zero document overflow, one H1, and zero failed images;
the 24-case feature-rail stress test remains green.

---

## 2026-08-21 · Inner-page redesign pilot completed to Gate 1

Executed Phase 0 and Phase 1 of
`PLAN-2026-08-21-inner-page-design-system-redesign.md`; stopped before the
service/sector rollout. `/services/data-mapping-ropa` is now the complete
service-template exemplar, `/contact` is rebuilt around confirmed channels and
honest email-client delivery, and two development-only sector directions are
available under `/design-review` for selection.

Required remediation also landed: source-safe Data Mapping features; a
1–8-item-safe divider rail; single-brand metadata titles; corrected shared-logo
aspect ratio; mobile sector navigation/reason-grid/CTA/table behaviour; proper
accordion relationships; and removal of pointer-only cosmetic table-row state.

Verification: TypeScript and production build exit 0; lint exits 0 with the
pre-existing `IndustrySectors.tsx` plain-image warning. Seven routes pass
390/768/1440 overflow, H1, image, and title checks; the feature rail passes 24
item-count/viewport combinations; all nine live nav/footer links return 200;
design-review routes return 404 in production. Full evidence and exact review
links: `docs/INNER_PAGE_REVIEW_EVIDENCE-2026-08-21.md`.

Delivery state: `verified_local`, Gate 1. No commit, push, deployment, or Phase
2 rollout performed.

---

## 2026-08-21 · Service page banner template — pilot on Data Mapping & ROPA

Client shared a reference screenshot (an investment-firm site's page layout)
and asked for a new, consistent top-of-page structure for service pages:
left eyebrow / right two-tone headline row, full-width banner image, a
4-column numbered feature row, then the existing accordion + closing CTA.
Planned via `/agency-plan` (`PLAN-2026-08-21-service-page-banner-template.md`),
approved with D1 Extend, D2 Source new, D3 Review after, D4 Eventually
migrate — built as a pilot on `/services/data-mapping-ropa` only, leaving the
two already-live service pages untouched pending client review.

**New components**, built from existing tokens rather than a new visual
system: `ServiceBannerHero` (eyebrow/headline row + chamfered banner image —
the client's one deliberate deviation from the reference: chamfered corner,
not square, for site consistency) and `ServiceFeatureGrid` (numbered,
icon-less feature tiles, column count driven by `items.length` rather than
hardcoded to 4).

**`ServicePageTemplate` gained two optional fields**, `bannerHero` and
`features` — additive only, same discipline as the accordion's `steps`/
`links` extension from the prior plan. `ndpcRegistration.ts` and
`breachResponse.ts` are untouched and supply neither field, so both live
pages render byte-identical to before (verified by screenshot).

**Sourced a new placeholder banner photo** per D2 (the client wanted a new
image sourced now, not a reused mismatched asset — none of the existing
`public/` images work as a plain bright banner; all are dark/portrait,
built for the CTA's dark-overlay treatment). Found via web search:
"Glass building looking up towards the sky" by Clay LeConey, Unsplash
License (free for commercial use, no attribution required), downloaded and
verified as a real JPEG at `public/services-banner-glass-architecture.jpg`.
Still a placeholder pending the same provenance-clearing pass as the cutout
portraits before launch — this doesn't close that gate, it just avoids
reusing a stylistically wrong asset in the meantime.

**The 4 feature tiles** are a decomposition of `servicesIndex.ts`'s existing
3 data-mapping bullets plus the deliverable/turnaround pair already shown in
the "What you get" card — worded as 4 distinct stages (Structured Intake,
Data Flow Tracing, ROPA Compilation, Ready to Move), not a rephrase of the
"Record of Processing Activities" / "24 hours" tags already displayed just
below. This guards against the exact duplication bug (F7) the prior plan
fixed for `ndpc-registration`'s certificate/turnaround text.

**Fixed during build:** the feature grid's initial fixed `repeat(items.length,
1fr)` had no responsive collapse and caused 67px of real horizontal overflow
at 390px (`scrollWidth` 457 vs. 390). Added a `.service-feature-grid` CSS
rule (2 columns ≤900px, 1 column ≤560px) that overrides the inline
`grid-template-columns` with `!important` — the same technique already used
for the mega-menu panel's mobile-overflow fix.

- `components/services/ServiceBannerHero.tsx`, `ServiceFeatureGrid.tsx` — new.
- `components/services/ServicePageTemplate.tsx` — two new optional content
  fields, conditionally rendered.
- `lib/content/services/dataMappingRopa.ts`, `app/services/data-mapping-ropa/page.tsx` — new.
- `lib/content/navigation.ts` — `data-mapping-ropa` added to `LIVE_SERVICE_SLUGS`.
- `app/globals.css` — `.service-feature-grid` responsive override.
- `DECISIONS.md` — W-031 recorded (D4: banner/feature template is the
  future direction for all 8 service pages; migrating the two live pages is
  a deliberate, deferred follow-up, not a silent permanent fork).
- Verified: `npx tsc --noEmit`/`npm run lint` clean; all 9 checked routes
  200; `/services/ndpc-registration` and `/services/breach-response`
  screenshotted to confirm zero visual change; 1440px + 390px screenshots of
  the new page; rendered-HTML check confirms the nav/footer/mega-menu entry
  is a real link, not the disabled "Soon" state.

---

## 2026-08-21 · Sectors and Resources mega menu content enriched

Client feedback: the Services mega menu (grouped by 6-stage journey, icons,
descriptions) felt considerably more built-out than Sectors and Resources,
which read as a flat list of links by comparison.

**Sectors** — added a second column, "Who's Covered", breaking the three
top-level sector links down into the actual named categories each one covers.
No new claim: every label is the existing category wording already
published on that sector's own page —
`sectorsRegulatedBusinessesContent`'s `categorySection.body` ("Banks,
mortgage banks, telecoms, fintech and payments companies, insurers, and oil
& gas companies") and `tertiaryInstitutionsPage.hero.subhead` ("university,
polytechnic, or college") — just surfaced as individual clickable rows
pointing back to the same two live sector pages (plus the planned public-
sector page). Also gave each of the three top-level items its own icon
(`graduation-cap`, `building`, `landmark`) instead of rendering as plain
text.

**Resources** — added an icon to every row across all three columns
(`layers`, `map`, `search`, `compass`, `seal`, `graduation-cap`, `lock`), and
backfilled short descriptions for Credentials and Training from copy that
already exists elsewhere on the site (the footer's "Licensed DPCO" framing;
`secondary.body`'s training line) rather than the previous icon-less,
description-less rows.

- **`components/services/ServiceRowIcon.tsx`** — added six icons
  (`graduation-cap`, `building`, `landmark`, `layers`, `compass`, `lock`) to
  the shared icon set used by both service rows and now sector/resource rows.
- **`lib/content/navigation.ts`** — `sectorsMenu` gained the "Who's Covered"
  column and icons on its first column; `resourcesMenu` items all gained an
  `icon` (via an updated `resourceItem(id, icon)` signature) and two gained a
  `description`. `footerColumns`'s "Priority Sectors" is unaffected — it still
  maps `sectorsMenu.columns[0].items` only, so the footer's shape didn't
  change.
- Verified via Playwright screenshots of both menus at 1440px; `tsc` and
  `lint` clean (pre-existing `IndustrySectors.tsx` img warning only).

---

## 2026-08-21 · Nav layout regression fixed properly; real semantic search added

Two rounds of client feedback on the mega menu, same day.

**Layout regression — the "restore search" fix, done right.** Removing the
non-functional search icon (D5, previous entry) had a side effect: with
`.nav-inner-split`'s `justify-content: space-between` and 3 flex children
(logo, links, utility), shrinking the utility group widened both gaps
symmetrically — a flexbox identity, not a bug in either group individually —
pushing the links group into the 32% dark zone on the right. First attempt
fixed this by grouping logo+links into their own flex container, decoupling
their position from the utility zone's width entirely. **Client caught that
this moved the links off-centre from the original design.** Reverted that
restructuring; the actual fix is restoring the icon itself (below), which
returns `nav-right-utility` to its original width and the space-between math
to its original, correct proportions — exactly matching the reference
screenshot, with no structural change needed.

**A real, working semantic search**, not the dropped placeholder icon.
Client explicitly asked for "proper semantic search" — given this repo has no
backend (D-012), the only way to deliver genuine semantic matching (not
keyword/substring only) is client-side. Chose `@huggingface/transformers`
(the maintained successor to the deprecated `@xenova/transformers`, which
pulled in a critical protobuf RCE advisory via an old `onnxruntime-web`; the
maintained package's remaining `npm audit` findings — `onnxruntime-node`'s zip
parsing, `sharp`'s image decode — are both Node-only optional backends never
imported by this browser-only, text-only usage, so unreachable at runtime).
Runs `Xenova/all-MiniLM-L6-v2` (quantized, ~25MB) fully in-browser via
WASM/ONNX — no API key, no per-query cost, no server.

- **`lib/content/searchIndex.ts`** — searchable corpus built from existing
  published copy: each service's full `summary` (not the terse nav label),
  sector hero subheads and "why you're here" reasons, resource explainer
  lines. Nothing new written; richer text was necessary for the embeddings to
  have real semantic content to match against, not a style choice.
- **`lib/search/embeddings.ts`** — dynamically imported only inside a
  client-event handler, never part of the SSR or initial bundle.
- **`SiteSearch.tsx`** — instant substring results appear immediately
  (zero latency) while the semantic pass runs in the background and upgrades
  the list when ready; ArrowUp/Down + Enter + Escape; `status: "planned"`
  items show muted with "Soon", same D1 treatment as the mega menu.
- **Cmd/Ctrl+K** opens search from anywhere.

**Two real bugs caught only by testing with actual queries, not by reading
the diff:**
1. `embedBatch` looped over the ~30-item corpus one entry at a time —
   first-ever search took **~21 seconds** just to embed the corpus. Fixed by
   passing the whole array to the pipeline in one batched call.
2. The similarity threshold (0.25) was cutting off a *correct* result:
   "hacked" → Breach Response scored 0.231 — a genuine match, since MiniLM's
   cosine scale for a short query against paragraph-length text runs lower
   than intuition suggests. Recalibrated to 0.15 against this measured score,
   not guessed.

**Also found via testing:** a first-ever visit with a cold model cache can
take ~30–40s for the full model+corpus download — during which a
zero-substring-match query (like "hacked") would have shown a bare "No
matches", reading as a false negative. Added a distinct "Finding results…"
state for exactly that window, shown only while the semantic pass is still
pending and nothing has been found yet.

**Lint caught 3 genuine `react-hooks/set-state-in-effect` errors** (calling
`setState` synchronously inside an effect body) in the first draft of
`SiteSearch`. Fixed by mounting the component only while open
(`{searchOpen && <SiteSearch/>}` in `SiteNav`, not an internal `if(!open)
return null`) so state starts fresh via normal `useState` initializers
instead of needing an effect to reset it, and by moving the query-driven
search logic into the input's `onChange` handler instead of a `useEffect`
keyed on `[query]`.

**Mega-menu item font size** reduced to 14px / weight 500 (was up to
0.92rem / 600), matching the top-level nav links' own size exactly; applied
to the mobile drawer's link rows too for consistency.

**Follow-up, same day: the top-level nav links weren't actually 14px/500.**
Client reported them still off after the above. `.nav-item-clean` (v5.css)
already specifies 14px/500, and the plain `<Link>` items ("How We Work",
"About & Credentials") picked it up correctly — but the three mega-menu
*trigger* `<button>`s (Services/Sectors/Resources) were rendering at the
browser's default button font, 16px/400. Cause: `MegaMenuTrigger`'s inline
style included `font: "inherit"`, added to normalize the button element's
default appearance — inline styles beat class rules regardless of
specificity, so it silently overrode `.nav-item-clean`'s font-size/weight,
making the button inherit its ancestor's default font instead. Replaced with
explicit `fontSize: "14px"`/`fontWeight: 500` (keeping `fontFamily: "inherit"`
for the typeface itself). Verified via computed style on both `/services`
and the homepage — all 5 top-level items now read 14px/500 identically.

Verified: `npx tsc --noEmit`/`npm run lint` clean. Scripted measurement
confirmed the nav-links group ends 89px before the dark zone begins (was
overlapping). Semantic search tested end-to-end with real non-literal queries
— "hacked" → Breach Response, "data leak incident" → Breach Response +
penalty content, "how do I register with NDPC" → NDPC Registration — all
correct. Escape-closes-search re-verified through 4 distinct interaction
paths (immediate, after typing, via backdrop click, after Cmd+K reopen) after
a client report it wasn't working; all passed against current code, most
likely tested against a version mid-fix.

---

## 2026-08-21 · Mega menu, consolidated nav, and 13 dead links fixed (W-030)

Per `PLAN-2026-08-20-mega-menu-and-link-integrity.md` (approved: D1
status-flagged, D2 one consolidated nav, D3–D5 plan defaults). Reference:
Parcel Tracker's mega menu, supplied as a video — decoded via headless Chrome
since Playwright's bundled ffmpeg has no h264 support.

**The real problem, found before any menu work started:** the nav pointed at
13 routes returning 404 and 3 homepage anchors that didn't exist, including
`/contact` — the nav's own primary CTA, dead on every page, with 8 other
places in the build linking to it. Fixing the menu without fixing this first
would have shipped a more discoverable path to more 404s.

**`lib/content/navigation.ts`** — single source for nav and footer, every item
carrying `status: "live" | "planned"`. Planned items render in the same visual
slot, non-interactive, with a muted "Soon" tag — never a link, never a 404.
Services pull from `servicesIndex.ts`, resources from `home.ts`; nothing here
is new copy. **Real bug caught during verification, not before:** the first
pass marked all 8 services "live" because all 8 have approved *copy* in
`servicesIndex.ts` — conflating "has copy" with "has a page." Only
`ndpc-registration` and `breach-response` actually exist; the other 6 now
correctly show "Soon." The plain "How We Work"/"About & Credentials" nav links
had the same bug (bypassing status entirely) — fixed identically.

**`MegaMenu.tsx`** — full-width panel, eyebrow column headers with hairline
rules, two item densities in one panel (icon+description for services, plain
label for links), a divider-separated featured-card right rail, bottom pill
CTA. Services are grouped by the 6-stage journey (W-029) rather than listed
flat, so the menu teaches the model instead of just linking to it.

**Motion and accessibility:** panel transform/opacity transition plus a
per-column staggered reveal (`@keyframes mega-menu-stagger`, `globals.css`),
collapsed to instant under `prefers-reduced-motion` — same pattern already
used for `fade-in-up`/`float-a`/`float-b`. Hover-intent open/close with a
150ms close delay (crossing the trigger→panel gap doesn't flicker-close),
click-to-toggle, `Escape` closes and refocuses the trigger, real
`<button>`/`<a>` elements throughout, visible `:focus-visible`.

**`SiteNav.tsx` rewritten** to consume the module. `variant` now has real
starting-state logic: `"dark"` (permanently solid, unchanged), and `"light"`
which splits further via a new `heroMotion` flag — see the correction below.

**Homepage nav unification, and a same-day correction.** `components/v5/Hero.tsx`'s
separate, hardcoded `<header id="stickyNav">` (a v5 port, W-026) is replaced
with the shared `SiteNav`, via a new W-030 decision recorded in
`DECISIONS.md` *before* the change, following the exact pattern W-028 set for
the tertiary sector page. Only the nav bar is superseded — hero content,
`.hero-entered`/`.hero-exiting` state, and the scroll-driven `.hero-nav-motion`
class are untouched; `SiteNav` takes a `heroMotion` prop that adds that same
class so the existing CSS entrance rule (`.hero-entered .hero-nav-motion`)
applies to it unmodified, since it now renders inside `Hero.tsx`'s own
`.hero-entered` wrapper.

**The first pass got the homepage's unscrolled colour treatment wrong** —
it reused `SiteNav`'s solid `#B1BFC0`/`#819293` painted-bar treatment (the one
`/services` uses) on the reasoning that both reproduce the same 32%-from-right
split as the hero. Client review caught this immediately: v5's actual
unscrolled homepage nav is **transparent**, letting the hero's own split
background show through directly, with `.nav-item-clean`/`.nav-contact-btn`'s
*default* CSS colours doing the work — no inline overrides at all. Corrected:
`heroMotion` now also skips the painted-bar branch entirely for the homepage,
restoring v5's exact original look. Verified by computed-style capture, not
by eye — unscrolled header background `rgba(0,0,0,0)`, nav-item text
`rgb(46,88,94)` (`#2E585E`), contact pill `rgba(255,255,255,0.08)`, all v5's
literal values. `/services` and `/services/ndpc-registration` (which have no
matching split hero) keep the painted bar. Both converge to the identical
solid-dark scrolled state already shared everywhere. Full rationale for both
the original decision and the correction is in `DECISIONS.md` W-030.

**Also fixed by the same pass, not a separate change:**
`/services/ndpc-registration` has a light hero but was calling `<SiteNav />`
with no variant, defaulting to the dark/solid treatment — a mismatch predating
this plan. Now passes `variant="light"`, matching its own hero.

**`MobileNavDrawer.tsx`** — full-screen drawer below 900px (same cutoff as
other v5.css layout collapses), reusing `QuestionAccordion`'s exact
interaction grammar (numbered row, rotating chevron, grid-row collapse) for
each menu section rather than inventing a new pattern. Body scroll locked
while open, `Escape` closes.

**Real bug caught in verification:** the closed (opacity:0) mega-menu panel
was still `display: block`, so its full multi-column grid occupied layout
space and widened the page past the viewport at mobile widths — genuine
horizontal overflow, not a visual artifact (`clientWidth`/`scrollWidth` were
lying to each other). Fixed with `display: none` on the panel under the same
900px breakpoint; confirmed the drawer itself now adds zero overflow
(`document.body.scrollWidth` identical open vs closed).

**`/contact` built** — no approved copy doc exists for it yet, so the page
carries only what's already approved elsewhere: the phone number and "general
company line" description reused verbatim from `services/breachResponse.ts`
(deliberately *without* repeating that number's same-day guarantee, which
W-014 scopes to breach response specifically), plus a request form. The form
is UI-only with a client-side confirmation, same caveat as the self-check
tool's email capture and `/am-i-covered`'s call-request form — no backend
exists in this repo to deliver a submission (D-012).

**`SiteFooter.tsx`** — link targets (not markup, not visual design) now come
from the same `navigation.ts` module; every "planned" item renders as muted
plain text instead of a link to a 404. One deliberate behaviour change,
flagged rather than silent: "Public Sector & MDAs" previously linked to the
real `/#sectors` anchor; it's now `status: "planned"` for consistency with how
the mega menu treats the identical item, trading a working-but-approximate
anchor link for one consistent signal across the whole nav experience.

**Discovered, not fixed (out of scope for this plan):** a ~20px horizontal
overflow at 390px on `/services`, traced to `ServicesArchive.tsx`'s
"Compliance Audit & Filing" row — pre-existing, not touched this session.

**Verification.** `npx tsc --noEmit`/`npm run lint` clean. Scripted headless
checks: every nav/footer `href` across every route crawled and asserted 200
(zero 404s, down from 13); every homepage anchor the nav references confirmed
to exist; hover-open/hover-panel-stays-open/leave-closes/click-toggle/Escape-
closes-and-refocuses all verified interactively, not by screenshot;
`prefers-reduced-motion` confirmed collapsing the panel transition to ~0;
mobile drawer opens, locks body scroll, and closes on Escape (verified by
actual off-screen position, not `isVisible()`, which doesn't account for
`transform`); homepage `.hero-entered` state and full opacity confirmed
unchanged after the nav extraction. Screenshots captured for both nav
variants with panels open, the homepage with its corrected transparent nav,
and the mobile drawer.

---

## 2026-08-20 · Client journey renarrated as 6 stages (W-029)

The engagement's client-facing framing moves from a flat numbered step list
(inconsistently "9 steps" in build content vs "the 10-step journey" in planning
docs) to six client-supplied stages: START NOW, FOUNDATION, GOVERNANCE, TRAIN &
EMBED, AUDIT & DEMONSTRATE, ONGOING COMPLIANCE. Decision and full rationale in
the handover workspace's `docs/DECISIONS.md` W-029.

**Nothing was dropped.** Each stage groups 1–3 of the original granular steps;
the deliverable/turnaround commitments those steps carry (C-024–C-029, C-034 —
flagged in `CLAIMS_REGISTER.md` as commitments, not descriptions) are unchanged
and still individually traceable, both on the master `/how-we-work` source doc
(nested under the six stages now, rather than one flat table) and on each
service's own page.

**New `components/sectors/StageTable.tsx`.** `/sectors/tertiary-institutions`'s
"Where would we even start?" accordion row previously rendered a plain numbered
list of 9 items; it's now a scope table. Built as a sibling to
`TurnaroundTracker` rather than a prop change to it — same chrome (chamfered
white card, hover/pin rows, numbered badge) reused verbatim, but the column
shape is genuinely different (a short category label + a full descriptive
sentence, not a step name + a turnaround pill), and forcing a sentence into a
pill built for "48 hours" would have misrepresented both. `QuestionAccordion`
gained an optional `stages` field alongside the existing `steps`/`links`.

**Two things deliberately left alone, flagged rather than silently fixed:**
- `components/v5/Process.tsx` — the homepage's live 3-card process section. It's
  a pixel-exact v5 port (W-026) whose three cards thematically echo the old
  model without literally stating a step count. Reconciling it with the new
  6-stage model would need the same explicit W-026 supersession W-028 required
  for the tertiary route — not assumed here without that.
- `lib/content/home.ts`'s `process` export — a 9-step list with a "10-step" CTA
  that turned out, on inspection, to be **imported nowhere in the codebase**;
  the homepage renders `Process.tsx`'s hardcoded copy instead. Genuinely
  orphaned content, left as a discovered finding rather than silently deleted
  or wired up (out of scope for this change).

`lib/content/types.ts`'s unused `ComplianceStage` type (also never consumed —
`Service`/`Explainer` in the same file are dead scaffolding) updated from 9
values to the new 6, for documentation accuracy only.

Verified: `npx tsc --noEmit`/`npm run lint` clean. Scripted headless check on
the rebuilt accordion row — 6 stage rows render, all six category labels and
titles present, CTA text updated, no leftover "10-step" text, row-pin
interaction works, zero console errors.

**Follow-up same session: table layout was squeezed.** Client feedback — the
stage number and category badge were wrapping onto two lines, and the Focus
column's text was touching "What this covers" with no gap. Two real fixes,
not just a width bump:

1. The Stage cell's number badge and category pill are now a `flex` row with
   `flexWrap: "nowrap"` instead of two bare inline `<span>`s, so they can no
   longer wrap independently.
2. `SectorPageContent` gained an optional `accordionMaxWidth` (default
   unchanged at 780px, so `/sectors/regulated-businesses` is untouched —
   confirmed by rendered-DOM diff, only a Turbopack chunk hash and the
   per-request router id differ). Tertiary sets it to 980px, since a 3-column
   table needs more room than prose does.

**A second, more interesting bug surfaced on mobile during verification:**
widening the table pushed the *entire accordion row* past the viewport instead
of scrolling locally inside its own card — a classic CSS grid trap. The
accordion's collapse wrapper is `display: grid`, and grid items default to
`min-width: auto`, refusing to shrink below their content's intrinsic width.
A wide `nowrap` table's intrinsic width forced the grid track wider than the
viewport. Fixed by setting `minWidth: 0` on the grid item and the two divs
between it and the table (`QuestionAccordion.tsx`). Verified on mobile
(390×844): the card now clips to its own 268px box and scrolls internally
(`scrollWidth` 633 vs `clientWidth` 268), matching `TurnaroundTracker`'s
already-shipped mobile behaviour on the regulated-businesses page, rather than
widening `document.body` (confirmed via direct measurement, not a screenshot —
`body.scrollWidth` 400px against a 390px viewport, the same negligible margin
`TurnaroundTracker` itself has).

---

## 2026-08-20 · Service and sector pages unified on one template

Per `PLAN-2026-08-20-service-sector-template-unification.md` (approved, D1–D4
answered). Continues the reuse-don't-invent direction set earlier the same day.

**Service body content is now the sector page's accordion.** `QuestionAccordion`
gained two optional fields — `steps` and `links` — and the numbered `<ol>` and
link-chip markup were *lifted out of* `ServicePageTemplate` rather than written
again, so both page types share one implementation. "What's involved", "Where
this fits" and "Who this is for" are rows `01…n`, row 1 open by default. The
steps stay in the server-rendered DOM when a row is closed (the accordion
animates `grid-template-rows`, it never unmounts), so nothing is hidden from
search.

**The accent card and "What you get" merged into one card.** This was the
reported bug: `/services/ndpc-registration` printed "Certificate of Registration"
and "3 working days" twice, once in the accent card and once in the tags below.
The two are now structurally incapable of repeating or drifting — the deliverable
and turnaround exist only in `content.whatYouGet`, and pages pass an `icon`
instead of a composed card. Fixed for all eight service pages, not just this one.

**Breach Response's accent card was not duplicated content**, so it was not
dropped. Its number and the out-of-hours sentence appear nowhere else; the block
moved into the merged card with colours flipped for the dark ground. W-007 keeps
the number the loudest element on the page.

**Service closing CTAs rebuilt on the sector page's treatment** — the credential
block's photo-plus-`115deg`-dark-overlay under the sector CTA's concentric rings
and bottom-pinned cut-out that overflows the card's top edge. Both recipes reused
verbatim. `closingCta` gained `backgroundImage` and `cutoutImage` so pages differ.

> **Asset constraint worth recording:** `services-hero-cutout.png` and
> `services-hero-cutout-bust.png` are the *same woman* in two crops. Only two
> distinct faces exist in the repository, so "a different cut-out per page"
> cannot be satisfied for eight service pages from what is here. Registration
> and Breach Response now use different people (the best available), and no new
> portrait was introduced — image provenance is an open launch gate and D2 defers
> the commissioned set until it is cleared.

**`/sectors/tertiary-institutions` rebuilt on a shared sector template (W-028).**
The layout moved out of `RegulatedBusinesses.tsx` into `SectorPageTemplate.tsx`;
that file is now a content binding. Turnarounds, reason cards and the proof block
are *optional* in the template because the approved tertiary copy has none of the
three — inventing a turnaround table or a proof item to fill a slot would breach
the content rules. The proof block is absent under the documented R5 exception
(Madonna University is not cleared, Q-011) and drops in later without a rewrite.
`SectionNav` takes its sections as a prop; tertiary has three, not five.

Three parenthetical notes in the approved copy doc — the R5 exception, the
claims-register citation and the reserved-proof-block note — are deliberately not
published. Internal-sounding copy leaking onto a client-facing page has happened
on the sector track once already.

`components/v5/TertiaryView.tsx` is left in place, so the port stays recoverable.

**Verification.** `npx tsc --noEmit` and `npm run lint` clean (0 errors; the one
warning is pre-existing in `IndustrySectors.tsx`). Scripted headless click-through
on all three rebuilt pages covering default open state, one-row-at-a-time
toggling, re-click-to-close, real `<button>` elements and `:focus-visible`
(confirmed live, not merely present in CSS). `/sectors/regulated-businesses`
proved **byte-identical** across both refactors by rendered-DOM diff — the only
delta is Next.js's 21-character per-request router id. Tertiary copy asserted
against the approved doc string by string, with negative assertions that no
internal note, uncleared client name or "section 48" reached the page. All routes
200 with zero console errors.

**One regression caught and fixed during verification:** the rebuilt tertiary page
initially had no top offset, so `main` began at y=0 and slid under the fixed
`SiteNav`. Measured against the regulated page (64px) and corrected. Also added
80px of top padding to the service CTA section — without it the cut-out's head
collided with the accordion row above.

`npm run build` was deliberately not run: a `next dev` server is live, and the two
writing to `.next` concurrently corrupts the cache.

---

## 2026-08-20 · `/sectors/tertiary-institutions` gets its own "why you're here" cards

Follow-up client feedback the same session, in two rounds.

**Round 1:** the tertiary page shipped above without a reasons-cards section
(`SectorPageTemplate`'s `reasons` prop is optional, and the approved tertiary
copy doc has no equivalent to Regulated Businesses' own four-card section — that
was a genuine content-doc difference, not a build gap). Client wanted one added
anyway: "Why Universities land on this page." Built the first pass by reusing
sentences already approved and present on the same page (the penalty paragraph
and regulatory-sweep sentence from the accordion's Section 2, plus the
procurement/council line from Section 5) — accepted duplication rather than
invented copy, per the content rules.

**Round 2, immediately after:** client feedback — don't just re-skin the
business page's cards, target the industry directly. Two of the four cards were
rewritten, sourced from the internal Dennis Osadebay University proposal deck
(`Proposals/Dennis Osadebe University/Presentation/DOU_VC_Slides.html`) rather
than reused text:

- **"Your data footprint is wider than it looks"** — adapted from that deck's
  "Relevance" slide (admissions/biodata, academic/exam records, staff/payroll,
  alumni records, health/biometric data). A factual description of the sector,
  not a regulatory citation.
- **"Trust with students, parents and accreditors"** — adapted from its
  "Reframe" slide, replacing the business cards' investor/enterprise-customer
  framing with the stakeholders a university actually answers to.

**Two things from that deck were deliberately left out of the adaptation:**
its "21-day response window" claim (not in `CLAIMS_REGISTER.md`, unverified —
cannot publish) and its "NDPA s.48" penalty citation (the wrong section;
`AGENTS.md` requires s.49, which card 1 already uses correctly). **DOU itself is
not named anywhere on the page or site** — verified by a full-site fetch sweep —
because it is a proposal-stage engagement, not an awarded one (Q-011), and is
not cleared for publication (only Madonna University is, per the R5 exception).

Final four cards: Penalty exposure, A regulatory sweep already under way, Your
data footprint is wider than it looks, Trust with students, parents and
accreditors. The generic breach/near-miss redirect card used on Regulated
Businesses was dropped rather than reused, as the least audience-specific option.

`#why-it-matters` added to `SectionNav`. Verified: `npx tsc --noEmit`/`npm run
lint` clean, scripted checks confirming all four card texts render, s.49 present
and s.48 absent, and — across every route on the site, not just this one — that
"DOU" and "Osadeb*" never appear in the rendered HTML.

---

## 2026-08-20 · `/services` hero — image overlaps into the light zone (matches homepage), nav goes dark on scroll

Client compared directly against the homepage hero's actual behaviour, two gaps found:

**The cutout card was confined entirely to the dark zone** — hugging the viewport's right edge (`right: clamp(...)`) rather than sitting where the homepage's own hero image actually sits (`.hero-right-visual-wrapper`: max-width 440px, margin-right 28px, right-aligned inside the 1320px container) — which is *left* of the 32% dark-zone boundary, so the homepage's hero image overlaps into the light zone. Fixed by wrapping the card in a reference frame that replicates `.container` exactly (max-width 1320px, centred, 32px padding) and positioning the card inside it the same way the real column does, instead of an independent viewport-edge offset. Now overlaps into the light zone the same way.

**Nav didn't go dark on scroll.** The light variant was permanently two-toned; the homepage's own hero nav switches to solid dark with a white logo/text past a 40px scroll threshold (`Hero.tsx`'s `scrolled` state). `SiteNav.tsx`'s light variant now does the same — a `scrolled` state (identical 40px threshold) that, once true, makes the component render exactly like the dark variant (same `.site-nav-clean.scrolled` CSS class, white logo swap, dropdown/link colours), regardless of the `variant` prop it was given. The dark variant itself is untouched — it was already permanently in that state and doesn't get the scroll listener attached.

Verified: `npx tsc --noEmit` and `npm run lint` clean. Headless pass — zero console errors, screenshots at scroll position 0 (card overlapping light zone) and scroll position 300 (nav confirmed dark/white). All other routes confirmed 200 and unchanged.

---

## 2026-08-20 · `/services` hero — two-tone alignment fix, 620px, framed cutout, richer chips

Five items from client review of the previous pass:

**Nav/hero two-tone boundary didn't line up.** Previous version anchored the nav's dark zone to the Contact button's position and the hero's dark zone to the grid's image-column edge — two different x-positions, so the colour band visibly jumped between nav and hero. Fixed by switching both to the exact technique the homepage already uses for this (`.hero-right-dark-backdrop` in `app/v5.css`): a flat `position:absolute; top:0; right:0; width:32%; height:100%` rect, same 32% figure, on both `SiteNav.tsx`'s light variant and `ServicesHero.tsx`. Since both elements span the full viewport width independently, using the same flat rule makes them align automatically — confirmed by pixel sampling both rows land the boundary at the same x.

**Gap between the dark zone and the hero's bottom edge.** Was caused by the old bleed rect living inside a grid cell that didn't necessarily stretch to the section's full height. The new rect is `height:100%` of the section itself, so it's flush — confirmed by pixel sampling right up to the boundary with the section below.

**Hero height 480px → 620px.**

**Cutout given a container.** A bare transparent-PNG cutout floating directly on the page read as a broken image, not a deliberate graphic. Re-cropped the portrait to head/shoulders/upper-torso (`services-hero-cutout-bust.png`, same rembg-processed photo) so the whole figure fits inside a new chamfered card (`var(--color-forest-dark)`) with a circular teal-tinted halo behind the head, echoing the client's reference's circular portrait framing — instead of a full-length cutout with nothing behind it.

**Chips redesigned — photos, not just text; independent floating motion.** Two of the four chips now carry a real photo thumbnail (reusing existing site images, no new stock), matching the reference's photo-card style. Added two new keyframes (`float-a`, `float-b`, `app/globals.css`) with different waveforms; each chip gets its own duration/delay on top of that, so none of the four move in sync.

**Bug found during this pass:** the first chip was clipped by the fixed nav bar — the cutout wrapper's top offset put it right at the nav's bottom edge. Fixed by moving the wrapper down.

Verified: `npx tsc --noEmit` and `npm run lint` clean. Headless pass — zero console errors, pixel-sampled the nav/hero boundary alignment and flush-bottom directly rather than eyeballing it. All other routes confirmed 200 and unchanged.

---

## 2026-08-20 · `/services` — 480px hero, real two-tone nav+hero, cutout image with floating service chips

Client feedback on the previous pass, three items:

**Hero height + two-tone colour.** Hero fixed to `height: 480px` (was auto-sized ~640px). Nav and hero background both use the client's exact hex values (`#B1BFC0` left, `#819293` right) — nav's darker zone starts at the "Contact Us" button and bleeds to the page edge (`SiteNav.tsx`, `isLight` branch, anchored to `.nav-right-utility`'s own left edge so it's exact regardless of nav content width); hero's darker zone starts at the image column's left edge and bleeds to the page edge (`ServicesHero.tsx`, anchored to `.hero-right-visual-wrapper`, the same column the homepage's hero already reserves for its image — reused rather than a guessed viewport percentage). Both use the `right: 0; width: 100vw` bleed technique, safe because `body { overflow-x: hidden }` already exists globally in `app/v5.css`.

**Cutout image, not a background photo.** Previous hero used a plain rectangular photo. Rebuilt as a background-removed cutout (`rembg`, run locally on the same portrait already used elsewhere on this site — no new stock image) with small floating "service" UI chips around it (`ServicesHeroCutout.tsx`), matching the client's reference (a person cutout with floating app-style cards, not a bounded photo). Chips reference real, already-approved service facts (NDPC Registration/3-day certificate, Compliance Audit/31 March deadline, Am I Covered self-check) — no invented numbers or client names.

**Image overlaps into "The Problem" below.** Once the hero shrank to 480px, the taller cutout would otherwise be clipped at the hero's bottom edge. `ServicesHero` and the Problem section are now wrapped in one shared `position: relative` container; `ServicesHeroCutout` is a sibling of both (not nested inside the hero section, which would clip it), absolutely positioned so it paints across the seam and bleeds down into the dark section, per client direction.

**Bug found and fixed during this pass:** the cutout `<img>` initially had an explicit `z-index: 1`, which — per CSS stacking rules — painted it above the `z-index: auto` chips regardless of DOM order, hiding the chip text wherever it overlapped the (opaque) photo. Fixed by removing the image's z-index and rendering it first in the DOM, so every chip after it (all `z-index: auto`) naturally paints on top.

Verified: `npx tsc --noEmit` and `npm run lint` clean. Headless pass — zero console errors, screenshots confirm all three chips fully legible, two-tone bands visible on both nav and hero, image bleeding correctly into the section below. All other routes confirmed 200 and unchanged (dark `SiteNav` variant untouched — only the `isLight` branch changed).

---

## 2026-08-20 · `/services` — hero rebuilt against the reference directly; row cards simplified

Client feedback on the previous pass: the two-tone hero still didn't match the HGL reference (it was never actually two-toned, and the reference itself turned out to be a single light background, not split light/dark — the earlier "two-tone" reading was wrong), hero content wasn't constrained to page width, and the solution-row accent box duplicated the row's own title/description/CTA instead of just showing the icon.

**Hero (`ServicesHero.tsx`, replaces `TwoToneSplitHero.tsx`).** Rebuilt directly against the reference: left vertical rail, eyebrow, heading, subhead, CTA button, single chamfered image with one floating badge — no stacked photo cascade (client said exclude it), no dark panel (the reference doesn't have one). Reuses the homepage's own hero classNames from `app/v5.css` (`.hero-main-layout`, `.hero-vertical-scroll-column`, `.hero-eyebrow-badge`, `.hero-h1-clean`, `.hero-lede-text`, `.btn-architectural-cta`, `.hero-chamfer-card`, `.hero-floating-glass-badge`) instead of inventing new markup — those classes are already this exact layout, just normally gated behind the homepage's `.hero-entered` motion JS; this component uses them for box-model/colour only and drives entrance with the same `fade-in-up` used everywhere else. Whole layout sits inside `.container` (1320px), so nothing touches the viewport edge. Typeface stays Outfit and the image keeps Thanelinc's chamfer rather than the reference's specific shape — both deliberate, not oversights.

**Solution rows.** Row card background changed from white to `var(--color-mineral-canvas)`, section background changed to white so the grey cards read clearly against it, padding/gaps reduced (card padding 48px→32px, row gap 56px→28px) — noticeably shorter. Category badge, bullet arrows, and the "View details" link now use the row's own `service.shade` instead of a fixed teal, tying the text column to its accent box. `LandscapeServiceCard.tsx` (the `.service-seamless-card` reuse with a full duplicate title/description/CTA inside the row) removed — replaced by `IconAccentBox.tsx`, which is just the shade-coloured chamfered box with the animated icon/stage inside it, no text. `.service-seamless-card--landscape` CSS modifier removed from `app/v5.css` along with it.

Verified: `npx tsc --noEmit` and `npm run lint` clean. Headless pass on `/services` — zero console errors, screenshots taken at hero and row level. All other routes confirmed 200 and unchanged.

---

## 2026-08-20 · `/services` — stop reinventing, reuse the homepage's exact card/hero systems

A review of the previous `/services` rebuild found it had drifted into inventing three new visual systems instead of reusing ones that already exist and are approved on the homepage. Client direction: keep the page's content and section order as-is, fix the design to reuse, and build the two-tone hero that was actually requested but never landed.

**Sector cards (`IndustrySectors.tsx`).** Previously invented its own card design and, worse, invented sector copy ("Hospitality & Consumer," a "Public Sector & MDAs" description) that was never approved. Replaced with the homepage's real 4 sector cards (`components/v5/SectorAccordion.tsx`) verbatim — same copy, images, classNames (W-026: not reworded). Only change from the homepage: no default-active card — all four sit at equal width via the existing `.sector-accordion-card:hover` CSS alone (no React state), so they're genuinely side by side at rest and still grow/reveal on hover exactly like the homepage. Cards 3–4's CTAs pointed at `#check` (a homepage-only anchor); repointed to `/am-i-covered`. `servicesIndexIndustry.sectors` (the invented content array) removed from `lib/content/servicesIndex.ts` — only the section heading survives.

**Solution rows (`LandscapeServiceCard.tsx`, new).** The 8 alternating rows previously used a newly-designed floating shade+icon+ring card. Replaced with the homepage's actual `.service-seamless-card` design (`components/v5/Services.tsx`) — same photo/overlay treatment, `.service-visual-stage` icon area, chip-pill hover reveal, CTA — reflowed to landscape via one new scoped modifier, `.service-seamless-card--landscape` (`app/v5.css`), that only touches layout geometry, not any `:hover` rule, so every interaction (image zoom, overlay lighten, card lift, staggered chip reveal) carries over unchanged. 4 of 8 services reuse the homepage's exact stage-animation + photo pairing (seal/NDPC Registration, folder/Compliance Audit & Filing, shield/Outsourced DPO, breach-clock/Breach Response — matches the only 4 photos that exist in `public/`); the other 4 have no bespoke animation or spare photography on the homepage either, so they use the existing `ServiceRowIcon` glyph on the service's brand shade instead — no new stock imagery or animation invented.

**Hero (`TwoToneSplitHero.tsx`, new).** `TwoTonedHero variant="light"` was a single flat colour — never actually two-toned, which is why the client reported not seeing the two-tone hero they'd asked for. Built a real two-tone split: light panel (copy) + a narrower dark panel with a 3-photo vertical cascade, matching the HGL reference's proportions rather than the homepage's 50/50 `.hero-right-dark-backdrop` treatment. Static (no carousel/scroll-exit state — that behaviour is welded to the homepage's 100vh hero, W-026), but not inert: `fade-in-up` staggered entrance and a hover-scale on each photo strip. `SiteNav variant="light"` needed no change — it was already correct.

**Scope:** `/services` only. `Hero.tsx`, `Services.tsx`, `SectorAccordion.tsx`, `TwoTonedHero.tsx` (still used by the two individual service pages), and both live service pages are untouched — confirmed via diff-equivalent route checks (all return 200, unchanged).

Verified: `npx tsc --noEmit` and `npm run lint` clean (0 errors). Headless-browser pass on `/services` — zero console errors, screenshots taken at hero/problem/sectors/solution-row breakpoints, hover states confirmed working (sector card drawer reveal, service card chip reveal). All 6 other routes (`/`, both service pages, both sector pages, `/am-i-covered`) confirmed still 200.

---

## 2026-08-20 · Services Archive Redesign (AgentLab reference structure) + Single Service Page Hero Layout + Industry Sector Showcase

Implemented `PLAN-2026-08-20-services-archive-agentlab-redesign.md` in full, plus the "Industry / Solutions Across Every Sector" showcase and default footer integration.

**1. `/services` Archive Rebuild (`ServicesArchive.tsx`):**
- Replaced the initial icon-row layout with the structural rhythm inspired by `agentlab.framer.ai`, translated into Thanelinc's design language (Outfit, mineral canvas, forest dark, teal accents, and 24px top-right chamfer cuts).
- **Hero**: Enlarged light variant of `TwoTonedHero` with grand type scale (~3.85rem H1) and `160px` top padding.
- **Nav (`SiteNav.tsx`)**: Added `variant: "light" | "dark"` prop (default `"dark"` leaves existing pages unchanged). Light variant uses mineral canvas backdrop (`rgba(231,236,233,0.94)`), dark logo (`/thanelinc-brand-logo.svg`), and dark nav links.
- **"The Problem"**: Full-bleed dark 3-column section reusing the 3 approved pain points from `Problem.tsx` (*Named publicly*, *No data map*, *Contracts questioned*) with clean token markup and `fade-in-up` animation.
- **"The Solution" (8 Alternating Service Rows)**: Alternating layout displaying each service's category eyebrow, title, approved summary, 3-item arrow-bullet list of deliverables, turnaround badges, and a floating chamfered card in assigned palette shades (`PANEL_SHADES`) with centered `ServiceRowIcon` glyphs.
- **"Industry — Solutions Across Every Sector" (`IndustrySectors.tsx`)**: Added 4-card sector grid linking to Tertiary Institutions (`/sectors/tertiary-institutions`), Regulated Businesses (`/sectors/regulated-businesses`), Public Sector & MDAs, and Hospitality.
- **Default Site Footer**: Standard `SiteFooter` integrated with active visibility, verified dark styling, and proper Next.js `<Link>` routing.

**2. Single Service Page Hero Layout (`ServicePageTemplate.tsx` + `TwoTonedHero.tsx`):**
- Added `layout: "split" | "full-width"` and `size` props to `TwoTonedHero`.
- Updated `ServicePageTemplate` to use centered full-width hero text, moving the accent card (phone number for `breach-response`, certificate & turnaround for `ndpc-registration`) into a dedicated full-width chamfered feature band directly beneath the hero.
- Both `/services/breach-response` and `/services/ndpc-registration` updated seamlessly.

**Verification:**
- `npx tsc --noEmit` and `npm run lint` clean (0 errors, 0 warnings).
- Production build `npm run build` passed with all static routes generated.
- Automated headless browser inspection verified status 200 and zero console errors across all routes (`/services`, `/services/breach-response`, `/services/ndpc-registration`, `/sectors/regulated-businesses`, `/sectors/tertiary-institutions`, `/am-i-covered`, `/`).

---

## 2026-08-20 · First service pages, services archive, nav dropdowns

Per `PLAN-2026-08-20-sector-service-templates.md`, execution order changed by
the client before Stage A started: validate the service-page design with two
real pages before committing to one shape for all eleven remaining pages.

**Nav.** `SiteNav.tsx` — Services and Sectors are now real dropdown
submenus (client component, hover + click), not decorative chevrons.
Link lists copied verbatim from `SiteFooter.tsx`'s existing columns so the
two don't drift. Explicitly a stepping stone — client wants a full mega
menu eventually.

**`TwoTonedHero.tsx`** — new shared pattern, not in the original plan: a
split hero (dominant colour one side, opposite-tone floating chamfered card
as an accent) with a `variant: "light" | "dark"` prop, built specifically so
two real pages could be compared before choosing a direction. Structurally
similar in spirit to the homepage's `.hero-split-wrapper` (light ground +
dark accent stripe) but not reusing it directly — that block is welded to
the homepage's 100vh/carousel behaviour (W-026).

**`ServicePageTemplate.tsx`** + two live pages:
- **`/services/breach-response`** — dark hero, phone number as the
  dominant visual element on a white floating card (W-007: nothing competes
  with the phone number). Reused `.breach-clock-box`/`.breach-pulse-dot`
  from the homepage's `Services.tsx` for the same-day-response badge.
- **`/services/ndpc-registration`** — light hero, stat card (certificate +
  turnaround) as the accent.

Both: dark "what you get" panel, numbered steps or prose body blocks,
"who this is for" sector links, dark closing CTA. Content lives in
`lib/content/services/*.ts`, sourced verbatim from the approved copy docs.
`accentCard` is passed as a prop from the page component rather than stored
in content data — JSX doesn't belong in a Strapi-shaped content file.

**`/services` archive** (`ServicesArchive.tsx`) — dark hero, 8 alternating
icon/content rows (client reference), closing CTA. No photography for the
row icons — reused simple line-icon glyphs, avoiding a fifth round of
provenance risk on top of the four stock photos already in use elsewhere.
Same green-shade family as the sector page's reason cards, so the two pages
read as one system. Subhead rewritten client-facing (same fix as the sector
page's turnaround intro) and `services-index.md` updated to match.

Verified: `npx tsc --noEmit`/`npm run lint` clean; all 3 new routes + the
existing 3 routes checked for zero console/page errors; nav dropdown
confirmed showing/linking on hover via scripted check, not just visual
screenshot.

---

## 2026-08-20 · `/sectors/regulated-businesses` — section nav back to horizontal, centered

Client reported the fixed-position vertical sidebar (previous entry)
interfering with the closing CTA banner further down the page — its fixed
`left`/`top: 50%` positioning meant it could overlap that section
regardless of scroll position. Reverted to the original sticky horizontal
bar (below `SiteNav`, `top: 64px`), this time with the links centered
(`justifyContent: "center"`) rather than left-aligned. Same scroll-spy
logic, unchanged. Confirmed via screenshot: sits cleanly below the main
nav, no overlap with page content at any scroll position since it's
`position: sticky` within the page flow rather than `fixed` to the
viewport.

---

## 2026-08-20 · `/sectors/regulated-businesses` — nav goes vertical, contrast fixes

**Section nav switched horizontal → vertical**, matching the client
reference more literally this time (their site uses a vertical sidebar; my
first pass adapted it horizontal per an earlier reading of "horizontal
sticky page nav" that turned out not to be what they wanted). Now
`position: fixed` in the left margin, vertically centered, left-border
accent on the active section — same scroll-spy logic as before. Hidden
below the `xl` breakpoint (fixed-position sidebar, not part of the content
grid, so it's cut rather than reflowed on narrower viewports).

**Two contrast fixes, both teal-on-sage:**
- Credential block's photo overlay darkened (`rgba(8,23,25,.97/.94/.86)`,
  up from `.94/.88/.7`) — client reported the background photo fighting the
  credential text.
- Closing CTA: the "REGULATED BUSINESSES" eyebrow and the second half of
  the two-tone heading ("for a company like yours?") were both teal-accent
  on the `#7C918F` sage banner — too low-contrast to read. Both switched to
  white, which reads cleanly against sage without needing a new colour
  token.

Verified via full-page screenshot; vertical nav confirmed showing the
correct active state on load.

---

## 2026-08-20 · `/sectors/regulated-businesses` — copy fix, interactive table, section nav, polish pass

**Client flagged internal-sounding copy on a client-facing page.** The
turnaround-table intro read "No pricing is published on this site... the
certainty a commercially-minded buyer needs to make a decision without a
number attached" — internal positioning reasoning, not something a visitor
should read. This exact sentence traced back to the approved copy doc
(`Content/04-Page-Copy/sectors-regulated-businesses.md`), so fixed both the
live component *and* that source file, to keep them in sync: now "Every
stage below comes with a stated deliverable and a confirmed turnaround, so
you know exactly what to expect and when." Added as a proper content export
(`turnaroundsIntro`) rather than inline JSX, matching how the rest of this
page's copy is sourced.

**Turnaround table**: went timeline → client preferred the original table →
rebuilt as `TurnaroundTracker.tsx`, a real table made interactive without
inventing new per-row copy: hover highlights the row and scales its
turnaround pill, click pins a row with a teal left-accent bar and a
numbered badge.

**Credential block**: added a background photo (`hero-hologram.jpg`) behind
a dark gradient overlay, enlarged (72px/56px padding, min-height 260px).

**Four reason cards**: staggered on-mount entrance (new `fade-in-up`
keyframe in `globals.css`, 0.12s stagger per card, `prefers-reduced-motion`
neutralised) — deliberately not `.reveal`/`ScrollReveals`, which has twice
left elements on this page stuck invisible. Hover micro-interactions: lift
+ deeper shadow, index number brightens, CTA arrow gap widens.

**New, inspired by a client-supplied reference**
(cleanenergyfund.netlify.app/portfolio/02) — client explicitly asked to
skip that reference's dark hero and adapt its *vertical* sticky sidebar nav
into a *horizontal* one:
- `SectionNav.tsx` — horizontal sticky in-page nav (`Overview / Timeline /
  Why It Matters / Common Questions / Get Started`), sticks at `top: 64px`
  (just below `SiteNav`), active-section highlighting via
  `IntersectionObserver`. Added `id`s to the five corresponding sections.
- Two-tone section headings (dark + teal accent) on "Why companies land
  **on this page**" and the closing CTA heading — same wording as before,
  just split and coloured in two parts.

Closing CTA banner background changed to `#7C918F` (client-specified).

Verified: `npx tsc --noEmit`/`npm run lint` clean; full-page screenshot;
scripted checks confirm table-row pin styling and scroll-spy nav
highlighting both work, not just render statically.

---

## 2026-08-20 · `/sectors/regulated-businesses` — cutout overflow bug (next/image `fill`), cards get chamfer + gap

**Real `next/image` `fill` bug, not a caching issue.** Client reported the
cutout portrait wasn't overflowing the card edge despite the height clearly
being set correctly. Investigated with computed-geometry checks (Puppeteer
`getBoundingClientRect`) before assuming it was a CSS mistake: the numbers
were exactly right — container top sat 145px above the card top, bottom
flush with the card bottom, precisely as coded. But the *painted pixels*
didn't match: her head rendered well inside the card, not above it. Root
cause isolated to `next/image`'s `fill` mode itself mispainting content
within an otherwise-correctly-sized box when the box's own top sits close to
the viewport edge (confirmed via an isolated `elementHandle.screenshot()`
capturing unrelated fixed-nav content bleeding into the element's paint
region). Fixed by dropping `next/image` for this one decorative element in
favour of a plain `<img>` with equivalent `object-fit`/`object-position`
styling (scoped ESLint disable, matching the existing `components/v5/**`
precedent for justified `<img>` usage) — reproduces the intended box exactly.

**Four cards:** added back the house chamfer cut (top-right, 24px,
`.process-portrait-card`'s clip-path value) and a 16px gap between cards in
both directions, per client follow-up — the flat-colour version from the
previous entry had neither.

Verified: computed-geometry check re-run (unchanged, confirms the fix
targeted the right layer), full scrolled-and-activated screenshot shows the
portrait now genuinely overflowing top and cut cleanly at bottom, chamfer +
gap confirmed on the four cards. `npx tsc --noEmit`/`npm run lint` clean.

---

## 2026-08-19 · `/sectors/regulated-businesses` — final pass on the 4 cards + cutout sizing

Two more rounds after the previous entry, both now landed with reference
images the client resent at a workable size:

**Four cards, final form.** Flat colour blocks — no photography at all,
edge-to-edge grid (`gap: 0`), square corners (no chamfer), large faded index
number (01–04) top-left, matching the client's reference precisely. Four
shades light-to-dark from the green family: `#7C918F`, `#1D4B50`, `#153C40`,
`#0E2325`. This is the third and final version of these cards after
photo+icon+drawer (buggy) and photo+tint (rejected — client's reference
turned out to be colour swatches only, no photography).

**Cutout, resized and re-cropped.** Cropped `regulated-businesses-cutout.png`
tighter and shorter — her leg now ends in a clean cut (removed the lower
shin/feet entirely) rather than showing full feet. Repositioned from
`top`-anchored to `bottom: 0`-anchored against the card, so the cut edge
sits exactly on the card's bottom boundary instead of floating mid-card;
enlarged (300×490, up from 220×310) so her head clears the top edge by more.

Verified via tsc/lint + full-page screenshot.

---

## 2026-08-19 · `/sectors/regulated-businesses` — rapid design iteration with client (4 cards, closing CTA)

Several rounds of direct client feedback in one session, landing here:

**Four "reason" cards** went through two false starts before landing:
1. First attempt: photo + abstract SVG icon + frosted drawer, each card wrapped in its own `.reveal` div — this left the cards almost invisible, because `ScrollReveals`'s `IntersectionObserver` runs once and the wrapper divs never reliably picked up `.active` (same class of bug as the self-check tool earlier, different trigger).
2. Second attempt (client: "revert to previous, different shades of green"): solid colour cards, no photo.
3. **Landed:** photo + coloured tint overlay (`ReasonCard.tsx`), house chamfer cut edge, `reveal` removed entirely from these cards (render immediately, no fade-dependency) after two rounds of "almost invisible" reports — reliability over a scroll-fade micro-interaction. Four shades from the brand's green family (`#0E2325`, `#143033`, `#2D585E`, `#1F4E4A`) as the tint colour, cycling the four existing local photo assets (`hero-hologram.jpg`, `hero-portrait-audit.jpg`, `executive-portrait.jpg`, `hero-portrait-sectors.jpg`) — no new images sourced.

**Accordion headings** (`QuestionAccordion.tsx`) were sized down to `1.25rem` in the initial build; reverted to `.section-h2-title`'s default (`2.25rem`) per client feedback that they'd become too small.

**Closing CTA** went through two layouts:
1. First: two-column split (text left, photo in an SVG-clipped rounded-diamond shape with decorative rings, right) — matching a client reference.
2. **Landed** (client: "center this, cutout without background, popping out of the box like pasted"): centered text/CTA block, with the subject cut out from `hero-portrait-sectors.jpg` using local background removal (`rembg` + `onnxruntime`, run on-machine, no image uploaded anywhere) and positioned as a transparent-background PNG absolutely outside the card's clip-path, overlapping the top edge with a drop-shadow for a "pasted sticker" look. New asset: `public/regulated-businesses-cutout.png`.

Verified: `npx tsc --noEmit`/`npm run lint` clean throughout; final state confirmed via full-page headless screenshot.

---

## 2026-08-19 · `/sectors/regulated-businesses` — numbered accordion, pre-footer-style closing CTA

Executed `PLAN-2026-08-19-regulated-businesses-accordion.md` (approved same
session, client-directed).

**Accordion.** The three previously-stacked sections (UHL category/volume,
outsourced DPO, filing) are now `components/sectors/QuestionAccordion.tsx` —
numbered 01/02/03, one row open at a time, first row open by default. Client
supplied a reference screenshot (serif/gold legal-services site) for the
*interaction pattern* only; rebuilt against this site's actual tokens instead
of copying that skin — divider value matches the turnaround table already on
this page, index-number styling matches `Process.tsx`'s step numbers, chevron
uses the teal accent. No v5 source exists for this pattern (v5 never had a
multi-item accordion), so this is new markup, same as the rest of this page.
Copy is unchanged, pulled verbatim from the existing content module.

**Closing CTA.** Replaced the plain centered-text closing section with the
same floating dark card used on the homepage's pre-footer (`PreFooter.tsx`),
reusing its `v5.css` classes directly rather than reinventing them:
`.prefooter-floating-card`, `.prefooter-card-bg-img/-overlay/-title`,
`.btn-architectural-cta-filled`. Background photo is `hero-portrait-audit.jpg`
— already captioned "6-Step Process Timeline" on the homepage carousel, the
closest thematic fit among the four existing photo assets; no new image
sourced. Both CTAs preserved (self-check primary button, consultation
secondary link) — the plan's acceptance criteria required no link loss.

Verified: `npx tsc --noEmit`/`npm run lint` clean. Full-page headless
screenshot confirms the visual match. Scripted click-through (not just
static markup) confirms real accordion behaviour: opening row 2 closes row
1, re-clicking an open row closes it, zero console/page errors.

---

## 2026-08-19 · `/am-i-covered` — dark question flow, call-request CTA (client feedback)

Two changes on top of the initial build, from direct client review:

**Question flow is now full dark theme** (`var(--color-forest-dark)`, the
same colour as the site's nav/footer/credential panels), replacing the light
theme it shipped with. Reused existing dark-mode primitives already in
`v5.css` rather than inventing new ones: `.micro-cred-badge-dark`,
`.btn-architectural-cta-light` (the white-on-dark button variant), and the
`#94A3B8`/`#FFFFFF` text colours already used on `PreFooter`. Result screen
is unchanged — client confirmed it's fine as-is.

**Nav and footer removed from the question flow, logo only.** Client wanted
no distraction from the one action available while answering. `AmICovered`
now manages its own chrome per step instead of the page shell doing it:
intro/question steps render a minimal logo-only header
(`MinimalLogoHeader`, new, logo links home) with no footer; the result step
renders the full `SiteNav`/`SiteFooter` as before. `app/am-i-covered/page.tsx`
simplified accordingly — it no longer renders any chrome itself.

**Result-screen CTA replaced.** The email-capture form is gone, replaced
with a "Request a call back" form (phone, email, best time to call — a
`<select>` of four bands). Per-category `secondaryCta` copy in
`lib/content/amICovered.ts` updated to match. Same caveat as before: no
backend exists in this repo to receive it, so submitting shows a client-side
confirmation with a fallback link to book a consultation rather than a dead
end. The sector cross-link ("See how we work with regulated businesses" /
"...tertiary institutions") is unchanged and still the primary next step
shown above the call-request form.

Verified: `npx tsc --noEmit` and `npm run lint` clean; re-ran the 4-flow
end-to-end click-through (all 4 result categories) — resolution unaffected;
confirmed via headless screenshot that the dark intro/question screens show
only the logo, and that the footer (initially appearing blank in a
Puppeteer `fullPage` capture) renders correctly once actually scrolled into
view — same scroll-reveal behaviour as every other page, not a regression.

---

## 2026-08-19 · `/am-i-covered` self-check tool built — the only interactive page

No v5 markup exists for this. Built from `Content/05-Self-Check-Tool-Spec.md`
(logic) and `Content/04-Page-Copy/am-i-covered.md` (copy).

**Resolution logic isolated in `lib/self-check/resolve.ts`**, deliberately
separate from UI, because the spec calls this "the part most likely to be
implemented wrongly." Implements the exact order: named-category match wins
outright regardless of volume → volume bands (5000+/1000-4999/200-999/under
200) → four-factor test (sensitive data / cross-border / third-party
processing) can still escalate a sub-200 organisation → C-017 default.
Verified with 16 hand-written cases covering every category source and all 4
edge cases called out in the spec (a 400-student university still resolving
EHL despite trivial volume; the four-factor test correctly escalating each of
its three triggers independently; "other private company" not silently
defaulting). All 16 pass. Then re-verified end-to-end through a scripted
headless-Chrome session that actually clicks through the UI for 4 full flows
(one per result category) rather than trusting static markup — results
matched the unit tests exactly.

**Necessary deviation from the literal copy doc, flagged:** the spec's Q1
option list bundles "Bank, mortgage bank, or microfinance bank" as one
choice, but C-009 (commercial banks → UHL) and C-016 (microfinance/mortgage
banks → EHL) put them in different tiers — a bundled option can't resolve
correctly, so it's split into two.

**Assumption flagged for regulatory review (Q-009, unassigned):** the spec
doesn't say which tier a four-factor-escalated sub-200 org lands in. Defaults
to OHL here — documented inline, don't extend without checking GAID 2025.

**Real bug caught before shipping:** the result-screen cards used `.reveal`
without hardcoding `.active`, same pattern as the hero elsewhere on the site.
Difference here: `ScrollReveals`'s `IntersectionObserver` only scans for
`.reveal` elements once, at the page's initial mount — these cards only enter
the DOM after the user finishes the question flow, so the observer never saw
them and they sat permanently at `opacity: 0`. Caught via headless screenshot
before reporting this done, not after. Removed `.reveal` from every
dynamically-rendered element in this component; scroll-entrance animation
doesn't make sense for content that appears on click regardless.

**Email capture is UI-only.** No backend exists in this repo to actually send
anything (Resend/D-012 and Strapi are both out of scope here). Submitting
shows a client-side confirmation with a fallback link to book a consultation
— no dead end, but nothing is delivered. Needs a real API route before
launch.

Also fixed the homepage's "Start the Check" CTA in `SelfCheck.tsx`, which
still pointed at the leftover v5 placeholder `#contact` — now links to
`/am-i-covered`.

Verified: `npx tsc --noEmit` and `npm run lint` clean.

---

## 2026-08-19 · `/sectors/regulated-businesses` restyled to match the house card system

Client flagged the credential box and reason cards as inconsistent with the
homepage — no spacing, generic rounded corners. Root cause: the first pass
used ad hoc Tailwind (`rounded-[...]`, `p-6`/`p-8`) instead of the site's
actual card recipe. v5's real card style — white background, `1px
rgba(10,28,30,.09)` border, `0 6px 24px rgba(10,28,30,.05)` shadow, `36px
30px 30px` padding, and a signature 24px chamfered corner (`clip-path:
polygon(...)`) — lives in `.process-portrait-card` in `v5.css` and is used
throughout the homepage (process steps, etc.).

Rebuilt every panel on this page against that recipe: credential block and
proof block use the chamfer/shadow/border directly; the turnaround table now
sits inside a matching card instead of floating bare; the four reason cards
reuse `.process-portrait-card` + `.process-step-title`/`.process-step-desc`
verbatim (via `.process-3card-grid` forced to 2 columns) instead of custom
markup. Table rows use a manual dashed border matching `.ui-check-row`'s
recipe rather than applying that class directly to a `<tr>` (which would have
broken table layout, since the source class sets `display: flex`).

Verified visually via a full-page headless screenshot at 1440px — chamfered
corners and consistent spacing confirmed. `npm run lint` clean.

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
# 2026-08-23 — pale index palette and mandate-linked homepage carousel

- Kept the All Services/All Sectors index-hero design intact while replacing
  the dark forest background split with the approved pale mineral/slate pair.
- Made every service and sector directory title explicitly bold.
- Reworked the homepage carousel artwork into three layered cutout/editorial
  collages sourced from the existing “The Mandate” content, with live CTAs for
  Tertiary Institutions and Regulated Businesses.
- Preserved the carousel's existing timing, pause, navigation controls, hero
  copy, and surrounding homepage sections.
- Fixed a duplicate React key in the mobile Sectors drawer found during the
  focused browser pass.
- Verified TypeScript, lint, local routes, and hydrated 390/1440px browser
  states with zero overflow, one H1, and no failed images.

# 2026-08-23 — homepage carousel aligned to shared index hero

- Replaced the rejected custom collage slides with the exact shared
  `IndexHeroVisual` used on All Services and All Sectors.
- Kept three sector-specific carousel messages and live destinations, while
  moving their visual construction into the common component.
- Added the same subtle grid/radial field to the homepage's light hero side.
