# thanelinc-next

Frontend for **Thanelinc Nigeria Limited** — an NDPC-licensed Data Protection
Compliance Organization. Next.js App Router + TypeScript + Tailwind v4.

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## Scope

This repository is the **frontend build only**.

Delivery documentation — briefs, decision logs, the claims register, open
questions, and client permissions — lives outside this repo in the
`ThanelInc-Handover/` workspace and is **never committed here**. It contains
commercially sensitive material, and git history is permanent.

**Strapi** is connected later by the client's own team. Content currently lives
in typed modules under `lib/content/`, reaching components as props, so the CMS
swap touches only the data-fetch layer. See `lib/content/types.ts` — those types
are the schema contract.

## Before you write any content

Read `AGENTS.md`. Thanelinc's own site making a wrong regulatory claim is a
business-critical failure, so the content rules are non-negotiable: never invent
a statutory figure or deadline, never add a client name, no pricing anywhere,
breach response is "same-day" and never 24/7.

## Verification

```bash
npm run lint
npm run build
```

Both must pass before any commit.
