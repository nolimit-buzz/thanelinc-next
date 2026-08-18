# Thanelinc build rules

Operational rules for agents working in this repository. `AGENTS.md` carries the
content and architecture rules; this file covers process.

## Before starting

1. Read `AGENTS.md` in full.
2. Read `changelog.md` — it is the change history, newest first.
3. Check `plans/` for an approved plan covering the work. Substantial changes
   should have one.

## While working

- Content goes in `lib/content/*.ts` as typed modules, never hardcoded in JSX.
- Colours come from the `@theme` block in `app/globals.css`. The palette is
  deliberately closed — do not add one.
- Real `<button>` / `<a>` elements, never click handlers on divs.
- Every animation honours `prefers-reduced-motion` (handled globally in
  `globals.css`; do not override it).

## Before finishing

1. `npm run lint` and `npm run build` both pass.
2. Add an entry to `changelog.md` — what changed and why.
3. If a regulatory claim, client name, or figure was touched, say so explicitly
   in your summary. Those changes need human review against the claims register,
   which is not in this repo.

## Never

- Commit `.env.local`, or any real secret.
- Add a delivery document (claims register, decisions, questions, client
  permissions) to this repository.
- Invent a statutory figure, deadline, or client name to fill a gap. Leave the
  gap and flag it.
