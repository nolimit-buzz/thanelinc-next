import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/mail/sendMail", () => ({ sendMail: vi.fn() }));

import { sendMail } from "@/lib/mail/sendMail";
import { POST } from "./route";

const mockedSendMail = vi.mocked(sendMail);
const now = new Date("2026-08-27T10:00:00Z");
const validAnswers = {
  orgType: "higher-institution",
  volumeBand: "under-200",
  sensitiveData: "no",
  crossBorder: "no",
  thirdPartyProcessing: "no",
  establishmentDate: "before-2023-06-12",
};

function body(overrides: Record<string, unknown> = {}) {
  return {
    phone: "+234 800 000 0000",
    email: "ada@example.com",
    bestTime: "morning",
    answers: validAnswers,
    consent: true,
    website: "",
    submittedAt: now.getTime() - 4_000,
    turnstileToken: "valid-token",
    ...overrides,
  };
}

function request(payload: Record<string, unknown> = body(), hostname = "www.thanelinc.ng") {
  return new Request(`https://${hostname}/api/self-check/call-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function siteverify(overrides: Record<string, unknown> = {}) {
  vi.mocked(fetch).mockResolvedValueOnce(
    new Response(
      JSON.stringify({
        success: true,
        hostname: "www.thanelinc.ng",
        action: "self_check_submit",
        ...overrides,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    ),
  );
}

async function expectRejected(payload: Record<string, unknown>, hostname?: string) {
  const response = await POST(request(payload, hostname));
  expect(response.ok).toBe(false);
  expect(mockedSendMail).not.toHaveBeenCalled();
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  vi.stubGlobal("fetch", vi.fn());
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key";
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = "www.thanelinc.ng";
  mockedSendMail.mockResolvedValue(undefined);
});

describe("POST /api/self-check/call-request", () => {
  it.each([
    ["honeypot", { website: "bot" }],
    ["too fast", { submittedAt: now.getTime() - 2_999 }],
    ["missing token", { turnstileToken: "" }],
    ["oversized token", { turnstileToken: "x".repeat(2_049) }],
  ])("rejects %s before SMTP", async (_label, override) => {
    await expectRejected(body(override));
    expect(fetch).not.toHaveBeenCalled();
  });

  it("accepts an elapsed time at the minimum", async () => {
    siteverify();
    const response = await POST(request(body({ submittedAt: now.getTime() - 3_000 })));
    expect(response.ok).toBe(true);
    expect(mockedSendMail).toHaveBeenCalledOnce();
  });

  it.each([
    "TURNSTILE_SECRET_KEY",
    "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    "TURNSTILE_ALLOWED_HOSTNAMES",
  ])("fails closed when %s is missing", async (key) => {
    delete process.env[key];
    await expectRejected(body());
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects an unlisted effective request hostname", async () => {
    await expectRejected(body(), "unapproved.vercel.app");
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    ["unsuccessful", { success: false }],
    ["timeout-or-duplicate", { success: false, "error-codes": ["timeout-or-duplicate"] }],
    ["wrong hostname", { hostname: "evil.example" }],
    ["wrong action", { action: "contact_submit" }],
  ])("rejects a %s siteverify response", async (_label, result) => {
    siteverify(result);
    await expectRejected(body());
  });

  it("fails closed on a siteverify network rejection", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new TypeError("network unavailable"));
    await expectRejected(body());
  });

  it("fails closed when siteverify times out", async () => {
    vi.mocked(fetch).mockImplementationOnce((_url, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
      }),
    );
    const pending = POST(request());
    await vi.advanceTimersByTimeAsync(5_000);
    const response = await pending;
    expect(response.ok).toBe(false);
    expect(mockedSendMail).not.toHaveBeenCalled();
  });

  it.each([
    ["orgType", "not-real"],
    ["volumeBand", "not-real"],
    ["sensitiveData", "maybe"],
    ["crossBorder", "maybe"],
    ["thirdPartyProcessing", "maybe"],
    ["establishmentDate", "not-real"],
  ])("rejects an invalid %s answer", async (field, value) => {
    siteverify();
    await expectRejected(body({ answers: { ...validAnswers, [field]: value } }));
  });

  it.each([undefined, false])("rejects consent value %s", async (consent) => {
    siteverify();
    await expectRejected(body({ consent }));
  });

  it.each([
    ["phone", "x".repeat(41)],
    ["email", `${"x".repeat(250)}@example.com`],
  ])("rejects an oversized %s", async (field, value) => {
    siteverify();
    await expectRejected(body({ [field]: value }));
  });

  it("ignores spoofed classification and sends the server-recomputed result", async () => {
    siteverify();
    const response = await POST(
      request(
        body({
          category: "not-of-major-importance",
          mandatoryFiling: false,
          source: "spoofed",
        }),
      ),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ category: "EHL", mandatoryFiling: true });
    expect(mockedSendMail).toHaveBeenCalledOnce();
    expect(mockedSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Self-check category: EHL"),
      }),
    );
  });

  it("returns 502 when SMTP rejects", async () => {
    siteverify();
    mockedSendMail.mockRejectedValueOnce(new Error("SMTP unavailable"));
    const response = await POST(request());
    expect(response.status).toBe(502);
    expect(mockedSendMail).toHaveBeenCalledOnce();
  });
});
