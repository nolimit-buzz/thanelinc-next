# Thanelinc Website — Launch Readiness Report

**Assessment date:** 23 August 2026  
**Delivery state:** `implemented_local / verified_local`  
**Scope:** the current `thanelinc-next` worktree, not the legacy public site or a production crawl.

## Executive outcome

Thanelinc now has a coherent, audience-led DPCO website locally: eight service pages, sector pathways, a self-check, proof and credentials, Contact, a resource library, three explainers, and editorial legal-page drafts. The visual system is consistent across the new page families, and content is held in typed modules that can be replaced by a CMS data layer later.

The site is **not yet ready for a public production launch**. The remaining work is concentrated and operational rather than another broad design phase: production lead delivery, CDPO/legal approval, technical discovery, measurement, final claim review, and deployment of this uncommitted worktree.

The current Vercel URL, `https://thanelinc-next.vercel.app`, reflects the earlier deployed commit. It **does not include** the local legal, resources, or latest polish work described here. Do not use it as final launch QA until a new deployment has been made.

## Readiness scorecard

These are internal readiness scores based on the repository, not Google, Lighthouse, or AI-search rankings. They are intended to focus the launch work.

| Dimension | Score | What is working | What keeps it from launch-ready |
|---|---:|---|---|
| Audience-first experience | **82 / 100** | Homepage, self-check, eight service pages, sector routes, how-we-work path, credentials, and Contact give compliance owners a relevant next step. | Contact/newsletter data do not reach an approved backend; there is no production conversion measurement; final proof clearances still govern future content. |
| SEO readiness | **48 / 100** | Typed titles/descriptions cover public pages except the homepage, which inherits the site default; resource articles have generated metadata; URLs are stable and readable. | No `robots.ts`, `sitemap.ts`, canonical URLs, Open Graph/Twitter images, organisation/service/article/breadcrumb schema, Search Console setup, or production-domain verification. |
| AI architecture readiness | **52 / 100** | Typed content is separated from components, articles have stable slugs/section IDs, credentials emit limited JSON-LD, and in-browser semantic search exists. | No `llms.txt`, machine-readable resource feed, organisation/service/article JSON-LD, CMS/webhook publishing model, retrieval API, or evaluation loop. |
| Production launch readiness | **54 / 100** | Local type checking, linting, route structure, responsive templates, and source-safe content architecture are in place. | Public lead submission, legal sign-off, deployment, domain/DNS, discovery files, analytics, production acceptance test, and final operations checklist remain. |

## Audience-first assessment

### Strongest delivered behaviours

1. **Clear positioning:** the site leads with Thanelinc as a licensed DPCO, rather than the weaker DP/DC registration language.
2. **Audience doors:** Tertiary Institutions, Regulated Businesses, and Public Sector/Ministries & Agencies have sector routes; the self-check is the problem-first route for unsure visitors.
3. **Decision support:** service pages state a practical next step and `/how-we-work` turns the offer into a legible delivery sequence.
4. **Trust:** credentials, cleared proof, source-governed regulatory copy, and explainers give procurement-minded visitors material to assess.
5. **Conversion taxonomy:** Contact captures a reason for enquiry, the correct lead-routing field once the backend is installed.

### Audience-first launch gaps

- Replace the Contact form’s present `mailto:` hand-off with the approved backend submission path; preserve the reason/category field in the payload.
- Connect the resource newsletter to an approved, consent-aware subscription provider. Its current state intentionally says delivery is not live.
- Add first-party, consent-aware events for self-check starts/completions, Contact submits, newsletter submits, and key CTA clicks. Do not add analytics before the legal notices are approved.
- Confirm which client names, testimonials, outcomes, and team biographies are cleared before expanding proof or case-study content.

## Completed implementation

| Area | Local status | Main routes / implementation seam |
|---|---|---|
| Core positioning and homepage | Implemented | `/`, `lib/content/home.ts` |
| Self-check | Implemented, browser-only | `/am-i-covered`, `lib/self-check/resolve.ts` |
| Service catalogue | Eight local routes | `/services/*`, `lib/content/services/` |
| Sector catalogue | Implemented | `/sectors`, tertiary, regulated-businesses, public-sector |
| About and trust | Implemented | `/about`, `/about/credentials`, `/about/team` |
| How work is delivered | Implemented | `/how-we-work` |
| Contact | Implemented UI and enquiry categorisation | `/contact`, `components/contact/ContactForm.tsx` |
| Resources | Implemented | `/resources` and three static `/resources/[slug]` explainers |
| Legal pages | Drafts implemented | `/privacy`, `/cookie-policy`, `/terms` |
| Design system | Implemented | Outfit-only typography, chamfers, 420px media cap, reduced-motion support |
| Semantic site search | Implemented, client-only | `components/search/SiteSearch.tsx`, `lib/search/embeddings.ts` |

## Launch gates — in required order

### Gate 1 — production data handling and legal approval

1. Implement `POST` endpoints or an approved external form provider for Contact and newsletter submissions. Validate server-side, rate-limit, and protect with suitable bot control.
2. Send Contact data and the selected reason to the approved backend/CRM or inbox workflow. Return honest success/error states; do not claim delivery before the backend confirms it.
3. Obtain CDPO/legal approval for `/privacy`, `/cookie-policy`, and `/terms`. Resolve retention, controller contact, processor/subprocessor list, privacy-request workflow, cookies/analytics, and cross-border transfer wording against the final production stack.
4. Reconcile legal copy with the actual form implementation: today the UI opens an email client while the drafts describe the intended backend.

### Gate 2 — technical discovery and measurement

1. Add `app/robots.ts` and `app/sitemap.ts`, excluding `/design-review/*`.
2. Set `NEXT_PUBLIC_SITE_URL=https://thanelinc.ng` (or the approved canonical domain) in Vercel and add canonical URLs to public pages.
3. Add a site-wide Open Graph/Twitter baseline and page-specific social images.
4. Add reviewed JSON-LD: `Organization`/`ProfessionalService`, `WebSite`, `Service` where claims permit, `Article`, `BreadcrumbList`, and only genuine `FAQPage` entries.
5. Verify the production property in Google Search Console; submit the sitemap; add consent-aware analytics and conversion events after Gate 1.

### Gate 3 — AI discovery and content operations

1. Publish a fact-checked `/llms.txt` summarising the firm, services, sector routes, resource routes, source policy, and Contact route.
2. Publish a static resource JSON feed such as `/resources/feed.json` with title, canonical URL, type, review date, summary, audience, and section headings. Do not expose submission data or unapproved claims.
3. Expand the typed content contract into the agreed CMS model and webhook/revalidation path before routine editorial publishing.
4. Create a content-review workflow: owner, claims-register ID/source, reviewed date, expiry/review date, schema category, and publication state.

### Gate 4 — production release and acceptance

1. Commit the present worktree. This repository still has no configured GitHub remote.
2. Attach and verify the final domain, redirects, HTTPS, `www` policy, and Vercel environment variables.
3. Run production checks: routes, forms, newsletter, self-check, legal links, navigation, sitemap, robots, canonical tags, schema, mobile layout, keyboard navigation, and slow-network image behaviour.
4. Confirm every public regulatory/capability statement against `ThanelInc-Handover/Website Thanelinc/docs/CLAIMS_REGISTER.md`; obtain clearance for any named proof.

## SEO implementation backlog

| Priority | Work | Acceptance condition |
|---|---|---|
| P0 | Robots and sitemap | `/robots.txt` and `/sitemap.xml` return 200 in production; draft design-preview routes are excluded. |
| P0 | Canonical production URL | Every public route outputs the approved `https://thanelinc.ng/...` canonical. |
| P0 | Metadata completion | Homepage receives an explicit title/description and every route has a reviewed unique title/description. |
| P0 | Search Console | Verified production property, sitemap submitted, no indexing exclusions beyond intentional preview routes. |
| P1 | Structured data | Valid, source-safe Organization/WebSite/Service/Article/Breadcrumb JSON-LD. |
| P1 | Social sharing | Branded `og:image`/Twitter cards with claim-safe titles. |
| P1 | Image operations | Replace remote placeholder editorial images with approved owned/licensed assets or document their final licence/attribution decision. |
| P2 | Editorial cadence | Publish approved Blog, News, and Training entries rather than empty category promises. |

## AI architecture implementation backlog

| Priority | Work | Acceptance condition |
|---|---|---|
| P0 | `llms.txt` | Fact-checked canonical-domain document lists important pages and source-safe positioning. |
| P0 | Structured data | Machines can identify organisation, services, articles, breadcrumbs, and review dates without guessing from presentation markup. |
| P1 | Resource feed | Stable JSON feed carries approved resource metadata only, with canonical links. |
| P1 | CMS publication contract | Content types, fields, review state, webhook/revalidation, and rollback are agreed before the first CMS publish. |
| P2 | Search evaluation | Representative audience queries are tested against existing semantic search before calling it an AI search feature. |
| P2 | Retrieval/API | Add only if a real use case is approved; no visitor data goes to an AI provider by default. |

## Non-negotiable content and claim rules

- Do not invent regulatory figures, deadlines, capability claims, client names, addresses, testimonials, certifications, or awards.
- Every regulatory statement must be allowed by the Claims Register at `verified-primary` or `client-attested` status and retain its qualifiers.
- Breach response is **same-day**, never “24/7”, unless a new authorised claim changes this.
- Do not publish pricing.
- DPCO licence and a client’s DP/DC registration are different credentials.
- Contact/newsletter copy must match the actual backend state; no false “sent” or “subscribed” messages.

## Verification evidence at handoff

- `npx tsc --noEmit` — pass.
- `npm run lint` — pass.
- `git diff --check` — pass.
- Prior isolated production builds passed with resource routes statically generated.
- The three current external resource photographs returned HTTP 200 on 23 August 2026. Their availability and licensing remain an operational asset decision until they are replaced or explicitly approved.

## Next LLM starting point

Read [NEXT_LLM_HANDOVER.md](./NEXT_LLM_HANDOVER.md) first, then follow the gates above. Begin with Gate 1, not another visual redesign.
