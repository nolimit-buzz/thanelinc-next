import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getMailConfig } from "./config";

const REQUIRED_VARS = ["SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD", "MAIL_TO"] as const;
const VALID_ENV: Record<(typeof REQUIRED_VARS)[number], string> = {
  SMTP_HOST: "mail.thanelinc.ng",
  SMTP_PORT: "465",
  SMTP_SECURE: "true",
  SMTP_USER: "noreply@thanelinc.ng",
  SMTP_PASSWORD: "test-password",
  MAIL_TO: "info@thanelinc.ng",
};

beforeEach(() => {
  for (const key of REQUIRED_VARS) process.env[key] = VALID_ENV[key];
});

afterEach(() => {
  for (const key of REQUIRED_VARS) delete process.env[key];
});

describe("getMailConfig", () => {
  it("reads a complete, valid config from the environment", () => {
    expect(getMailConfig()).toEqual({
      smtpHost: "mail.thanelinc.ng",
      smtpPort: 465,
      smtpSecure: true,
      smtpUser: "noreply@thanelinc.ng",
      smtpPassword: "test-password",
      mailTo: "info@thanelinc.ng",
    });
  });

  it.each(REQUIRED_VARS)("throws a clear error when %s is missing", (missingKey) => {
    delete process.env[missingKey];
    expect(() => getMailConfig()).toThrow(`Missing required environment variable: ${missingKey}`);
  });

  it.each(REQUIRED_VARS)("throws when %s is an empty string", (blankKey) => {
    process.env[blankKey] = "";
    expect(() => getMailConfig()).toThrow(`Missing required environment variable: ${blankKey}`);
  });
});
