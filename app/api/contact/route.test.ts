import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/mail/sendMail", () => ({ sendMail: vi.fn() }));

import { sendMail } from "@/lib/mail/sendMail";
import { POST } from "./route";

const mockedSendMail = vi.mocked(sendMail);
const now = new Date("2026-08-27T10:00:00Z");

function body(overrides: Record<string, unknown> = {}) {
  return {
    reason: "General enquiry",
    name: "Ada Example",
    organisation: "Example Limited",
    email: "ada@example.com",
    phone: "+234 800 000 0000",
    message: "Please contact me about compliance support.",
    website: "",
    submittedAt: now.getTime() - 4_000,
    ...overrides,
  };
}

function request(payload: Record<string, unknown> = body()) {
  return new Request("https://www.thanelinc.ng/api/contact", {
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

describe("POST /api/contact", () => {
  it.each([
    ["honeypot", { website: "bot" }],
    ["too fast", { submittedAt: now.getTime() - 2_999 }],
    ["missing submittedAt", { submittedAt: undefined }],
  ])("rejects %s before SMTP", async (_label, override) => {
    await expectRejected(body(override));
  });

  it("accepts an elapsed time at the minimum", async () => {
    const response = await POST(request(body({ submittedAt: now.getTime() - 3_000 })));
    expect(response.ok).toBe(true);
    expect(mockedSendMail).toHaveBeenCalledOnce();
  });

  it.each([
    ["reason", "x".repeat(121)],
    ["name", "x".repeat(121)],
    ["organisation", "x".repeat(161)],
    ["email", `${"x".repeat(250)}@example.com`],
    ["phone", "x".repeat(41)],
    ["message", "x".repeat(4_001)],
  ])("rejects an oversized %s", async (field, value) => {
    await expectRejected(body({ [field]: value }));
  });

  it("sends one expected email for a valid submission", async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(mockedSendMail).toHaveBeenCalledOnce();
    expect(mockedSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "Contact form — General enquiry",
        replyTo: "ada@example.com",
        text: expect.stringContaining("Organisation: Example Limited"),
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
