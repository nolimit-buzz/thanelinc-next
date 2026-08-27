const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const MIN_SUBMISSION_TIME_MS = 3_000;
export const MAX_TURNSTILE_TOKEN_LENGTH = 2_048;

export type TurnstileAction = "contact_submit" | "self_check_submit";

interface SiteverifyResponse {
  success?: boolean;
  hostname?: string;
  action?: string;
}

function allowedHostnames(): string[] | null {
  const raw = process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  if (!raw) return null;

  const hostnames = raw
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (
    hostnames.length === 0 ||
    hostnames.some(
      (hostname) =>
        hostname.includes("*") ||
        hostname.includes("://") ||
        hostname.includes("/") ||
        hostname.includes(":"),
    )
  ) {
    return null;
  }

  return [...new Set(hostnames)];
}

export async function verifyProtectedSubmission({
  request,
  body,
  action,
}: {
  request: Request;
  body: Record<string, unknown>;
  action: TurnstileAction;
}): Promise<boolean> {
  if (typeof body.website !== "string" || body.website.trim()) return false;

  if (typeof body.submittedAt !== "number" || !Number.isFinite(body.submittedAt)) {
    return false;
  }
  const elapsed = Date.now() - body.submittedAt;
  if (elapsed < MIN_SUBMISSION_TIME_MS) return false;

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const hostnames = allowedHostnames();
  if (!secret || !siteKey || !hostnames) return false;

  const token = typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";
  if (!token || token.length > MAX_TURNSTILE_TOKEN_LENGTH) return false;

  let requestHostname: string;
  try {
    requestHostname = new URL(request.url).hostname.toLowerCase();
  } catch {
    return false;
  }
  if (!hostnames.includes(requestHostname)) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);

  try {
    const payload = new URLSearchParams({ secret, response: token });
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload,
      signal: controller.signal,
    });
    if (!response.ok) return false;

    const result = (await response.json()) as SiteverifyResponse;
    return (
      result.success === true &&
      typeof result.hostname === "string" &&
      hostnames.includes(result.hostname.toLowerCase()) &&
      result.action === action
    );
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
