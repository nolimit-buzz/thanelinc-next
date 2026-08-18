# BUILD_STATE.md — thanelinc-next

Delivery state for the **implementation repository**. Update at every handoff.

**Last updated:** 2026-08-18

> The content-phase state — framework artefacts, page copy, claims register,
> decisions — lives in the `ThanelInc-Handover/` workspace and is not duplicated
> here. This file covers the build only.

---

## Delivery state: `implemented_local`

Scaffold complete and verified locally. **No git remote, no deployment yet.**

---

## Completed — Phase 1, scaffold

| Item | State |
|---|---|
| Next.js 16 App Router + TypeScript + Tailwind v4 | ✅ |
| `framer-motion`, `lucide-react` | ✅ |
| Structure: root `app/` `components/` `lib/` (no `src/`), per `cfbf-next` | ✅ |
| Design tokens from the approved v5 concept → `@theme` in `app/globals.css` | ✅ |
| `next/font` — Outfit + JetBrains Mono, self-hosted | ✅ |
| Global `:focus-visible` and `prefers-reduced-motion` | ✅ |
| Content type contract — `lib/content/types.ts` | ✅ |
| `AGENTS.md`, `CLAUDE.md`, `.agents/rules/thanelinc-build.md` | ✅ |
| `.env.local.example`, `changelog.md`, `plans/`, `docs/` | ✅ |
| Local git, first commit | ✅ |

### Two corrections carried in from the v5 code review

- **Focus states.** The concept had one `:focus` rule across 4,837 lines. A global `:focus-visible` is now in the base layer.
- **Fonts.** The concept made 3 Google Fonts CDN requests. Now self-hosted via `next/font` — deliberate, given the client's business.

---

## Not started

| Item | Blocked by |
|---|---|
| Component conversion from v5 | — next phase |
| Routes: `/`, sectors, services, `/how-we-work`, `/about/credentials`, `/training`, `/resources` | — |
| `/am-i-covered` self-check tool | — the only genuinely interactive build |
| `/privacy` | Draft has 11 `[CONFIRM]` fields + unverified rights — see launch gates |
| GitHub remote | Awaiting review of this scaffold |
| Vercel | Follows GitHub |
| Strapi | **Out of agency scope** — client's team, on Strapi Cloud |

---

## 🚦 Launch gates — before `thanelinc.ng` points here

Held in full in the handover workspace. Summarised because they block *this* repo going live:

1. **`/privacy` published.** The self-check and newsletter both capture email. A DPCO collecting personal data with no privacy notice fails at what it sells.
2. **Data-subject rights verified** against NDPA 2023 and entered in the claims register.
3. **Named owner for the 6-month review cycle.** "Reviewed" dates ship on resource cards; a stale one is worse than none.
4. **Client naming consent.** Nine names go public and permanent. Per-name confirmation, and engagement letters checked for publicity clauses.
5. **Image provenance** confirmed, or images replaced with the abstract panels.
6. **Services section relabelled** — most named clients are training engagements, so the heading must not imply DPCO track record.
7. `npm run lint` + `npm run build` clean; Lighthouse accessibility ≥ 90.

---

## Verification

```bash
npm run lint     # ✅ passing
npm run build    # ✅ passing
```

## Next action

Review the scaffold, then Phase 2 — port the v5 components and routes.
