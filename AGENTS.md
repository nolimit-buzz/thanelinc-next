<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Thanelinc Website — Build Rules

Thanelinc Nigeria Limited. **This repository is the frontend build only.**

## What this repo is, and is not

**Is:** the Next.js frontend — components, routes, styling, and page content as typed modules.

**Is not:** the delivery workspace. Briefs, decision logs, the claims register, open questions, and client permissions live outside this repo, in `ThanelInc-Handover/`, and are **deliberately never committed here** (W-025). They contain commercially sensitive material. Git history is permanent — do not add them, even temporarily.

## Non-negotiable content rules

Thanelinc is an NDPC-licensed Data Protection Compliance Organization. Its own website making a wrong regulatory claim is a business-critical failure.

1. **Never invent a statutory figure, deadline, penalty, or capability.** Every such claim traces to an ID in the claims register held in the handover workspace. If content seems to be missing a number, leave it missing and flag it. Do not fill the gap.
2. **Never add a client name.** Publishable names are fixed. If a name is not already in the content modules, it is not cleared.
3. **No pricing anywhere** — not Thanelinc's, not statutory fees. Deliberate (D-006).
4. **Breach response is "same-day."** Never 24/7, round-the-clock, or always-on.
5. **The penalty claim is NDPA section 49**, never 48, and only in its approved wording — "up to", "can face". Do not paraphrase it.
6. **Every service states a deliverable and a turnaround** (W-005). These compensate for publishing no pricing. Do not drop them.

## Architecture — the CMS seam

Strapi will be connected later **by the client's own team** (W-025). The build must stay ready for that.

- All content lives in `lib/content/*.ts` as typed modules with exported types
- Components receive content **as props** and know nothing about its source
- Never hardcode copy into JSX

Swapping local modules for the Strapi API must touch only the data-fetch layer. **The exported types are a deliverable** — they are the content-model contract for whoever builds the Strapi schema.

## Conventions

- Next.js App Router, TypeScript, Tailwind v4 (CSS-first `@theme` in `app/globals.css`)
- Root-level `app/`, `components/`, `lib/` — no `src/`
- `framer-motion` for animation, `lucide-react` for icons
- Fonts via `next/font` — no external font CDN
- British/Nigerian English: *organisation*, *programme*, *recognised*
- Record every substantive change in `changelog.md`

## Verification

```bash
npm run lint
npm run build
```
Both must pass before any commit.

## Accessibility

The visual concept this is built from had one focus rule in 4,800 lines. Do better: visible focus states on every interactive element, real `<button>`/`<a>` elements rather than click handlers on divs, and `prefers-reduced-motion` honoured on every animation.
