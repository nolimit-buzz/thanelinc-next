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
    ...overrides,
  };
}

function request(payload: Record<string, unknown> = body()) {
  return new Request("https://www.thanelinc.ng/api/self-check/call-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function expectRejected(payload: Record<string, unknown>) {
  const response = await POST(request(payload));
  expect(response.ok).toBe(false);
  expect(mockedSendMail).not.toHaveBeenCalled();
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(now);
  mockedSendMail.mockResolvedValue(undefined);
});

describe("POST /api/self-check/call-request", () => {
  it.each([
    ["honeypot", { website: "bot" }],
    ["too fast", { submittedAt: now.getTime() - 2_999 }],
  ])("rejects %s before SMTP", async (_label, override) => {
    await expectRejected(body(override));
  });

  it("accepts an elapsed time at the minimum", async () => {
    const response = await POST(request(body({ submittedAt: now.getTime() - 3_000 })));
    expect(response.ok).toBe(true);
    expect(mockedSendMail).toHaveBeenCalledOnce();
  });

  it.each([
    ["orgType", "not-real"],
    ["volumeBand", "not-real"],
    ["sensitiveData", "maybe"],
    ["crossBorder", "maybe"],
    ["thirdPartyProcessing", "maybe"],
    ["establishmentDate", "not-real"],
  ])("rejects an invalid %s answer", async (field, value) => {
    await expectRejected(body({ answers: { ...validAnswers, [field]: value } }));
  });

  it.each([undefined, false])("rejects consent value %s", async (consent) => {
    await expectRejected(body({ consent }));
  });

  it.each([
    ["phone", "x".repeat(41)],
    ["email", `${"x".repeat(250)}@example.com`],
  ])("rejects an oversized %s", async (field, value) => {
    await expectRejected(body({ [field]: value }));
  });

  it("ignores spoofed classification and sends the server-recomputed result", async () => {
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
    mockedSendMail.mockRejectedValueOnce(new Error("SMTP unavailable"));
    const response = await POST(request());
    expect(response.status).toBe(502);
    expect(mockedSendMail).toHaveBeenCalledOnce();
  });
});
