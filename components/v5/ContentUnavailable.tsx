/**
 * Shown when a page's CMS fetch fails after its retries. There is deliberately
 * no fallback copy anywhere on the site — stale compliance content is worse
 * than none — so every CMS-backed page renders this instead.
 */
export function ContentUnavailable() {
  return (
    <div role="alert" style={{ padding: "80px 24px", textAlign: "center" }}>
      We&apos;re having trouble loading this page right now. Please refresh.
    </div>
  );
}
