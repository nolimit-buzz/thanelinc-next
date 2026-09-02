export const MIN_SUBMISSION_TIME_MS = 3_000;

/**
 * Honeypot + minimum-elapsed-time check only. Cloudflare Turnstile
 * verification was deferred (2026-08-27) until real traffic creates a
 * spam/abuse pattern worth the added dependency — see
 * PLAN-2026-08-26-go-live-remediation.md task 1.2a. This check alone is
 * weak against a scripted bot that spoofs `submittedAt`; it stops only
 * unsophisticated scrapers. Re-add Turnstile (git history has a working
 * implementation) or the equivalent before traffic makes that gap costly.
 */
export function verifyProtectedSubmission({
  body,
}: {
  body: Record<string, unknown>;
}): boolean {
  if (typeof body.website !== "string" || body.website.trim()) return false;

  if (typeof body.submittedAt !== "number" || !Number.isFinite(body.submittedAt)) {
    return false;
  }
  const elapsed = Date.now() - body.submittedAt;
  if (elapsed < MIN_SUBMISSION_TIME_MS) return false;

  return true;
}
