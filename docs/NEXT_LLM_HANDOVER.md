# Next LLM Handover — Thanelinc Website

**Updated:** 24 August 2026
**Current delivery state:** `production` for the committed frontend; one uncommitted CSS refinement remains `verified_local`. This is not evidence of `client_approved` status.

## Start here

1. Read `AGENTS.md` in full.
2. Read [LAUNCH_READINESS_REPORT-2026-08-23.md](./LAUNCH_READINESS_REPORT-2026-08-23.md).
3. Read `docs/BUILD_STATE.md` for delivery history and verification notes.
4. Read the canonical content rules outside this repo:
   - `../ThanelInc-Handover/Website Thanelinc/docs/BUILD_RULES.md`
   - `../ThanelInc-Handover/Website Thanelinc/docs/CLAIMS_REGISTER.md`
   - `../ThanelInc-Handover/Website Thanelinc/Content/_internal/client-permissions.md`

## Current source of truth

- **Frontend:** this repository.
- **Page content:** `lib/content/`; do not place approved copy directly in presentation components.
- **Content schema seam:** `lib/content/types.ts`.
- **Backend/CMS:** the separate Strapi team, now in build mode. It owns all backend integrations.
- **Claims and clearances:** canonical handover workspace above.
- **Build record:** `docs/BUILD_STATE.md`; update it at every handoff.
- **New launch report:** `docs/LAUNCH_READINESS_REPORT-2026-08-23.md`.

## What is already implemented and live

- Homepage, self-check, all eight service routes, all sector routes, how-we-work, About/Credentials/Team, Contact, resource library + three explainers, editorial legal drafts, navigation, footer, semantic search, and responsive component systems.
- Resources articles use a centred 1000px title/image frame; hero media is capped at 420px; sidebar is sticky on desktop.
- Contact captures an enquiry reason but currently opens the visitor’s email application. The Strapi-owned submission integration is not connected yet.
- Newsletter is a visible placeholder only. The Strapi-owned subscription integration is not connected yet.
- Legal pages are drafts and describe the intended backend, not a completed production implementation.

## First safe frontend integration task

Do not implement Contact/newsletter APIs, providers, credentials or storage in this repository. The Strapi team owns that work. Once it supplies an approved integration contract, wire the frontend to that contract, preserve the enquiry reason in the payload, retain honest pending/error/success states, update legal copy to the actual data flow, then add tests and production acceptance checks.

If working only on discoverability, implement `robots.ts`, `sitemap.ts`, canonical metadata, social metadata, source-safe JSON-LD, `llms.txt`, and a static resource feed. This work must exclude `/design-review/*` from indexing.

## Required checks before a commit

Run `npx tsc --noEmit`, `npm run lint`, `git diff --check`, and `npm run build`.

## Deployment state

- Vercel project: `thanelinc-next`.
- Existing deployment: `https://thanelinc-next.vercel.app`.
- `https://www.thanelinc.ng` and the Vercel deployment served identical homepage responses on 24 August 2026.
- `main` is synchronised with `origin/main` at `0d4cf2c`. Do not infer client acceptance from deployment evidence.
- `app/v5.css` has a separate uncommitted responsive problem-card refinement; preserve it until it is explicitly reviewed and committed.

## Do not regress

- Outfit is the only rendered font family.
- H1 maximum is 4rem and H2 maximum is 42px where the shared design system applies.
- Header/banner media is capped at 420px.
- Preserve chamfered top-right edge treatment where already applied.
- Preserve reduced-motion behaviour for entrance animations.
- Do not turn “Coming soon” categories into live content without approved entries.
- Do not publish client names, pricing, penalties, or regulatory statements outside the Claims Register/clearance rules.
