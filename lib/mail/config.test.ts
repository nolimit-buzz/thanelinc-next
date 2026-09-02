import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const MAIL_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "MAIL_TO",
  "MAIL_COPY_TO",
] as const;

/**
 * `mailConfig` reads `process.env` once, when the module is first evaluated, so
 * each case has to re-import it against a fresh environment.
 *
 * Note what is deliberately NOT tested here: the module does not validate. It
 * falls back to empty strings and `sendMail.ts` checks for them at send time —
 * see the comment on `assertMailEnv`. Throwing at module load would fail
 * `next build` in any environment without a full env file.
 */
async function loadConfig() {
  vi.resetModules();
  return (await import("./config")).mailConfig;
}

const originalEnv: Partial<Record<(typeof MAIL_VARS)[number], string | undefined>> = {};

beforeEach(() => {
  for (const key of MAIL_VARS) {
    originalEnv[key] = process.env[key];
    delete process.env[key];
  }
});

afterEach(() => {
  for (const key of MAIL_VARS) {
    const value = originalEnv[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("mailConfig", () => {
  it("reads a complete config from the environment", async () => {
    // 587 + STARTTLS, not 465: the implicit-TLS port is blocked on this host and
    // fails as a 20s ETIMEDOUT.
    Object.assign(process.env, {
      SMTP_HOST: "mail.thanelinc.ng",
      SMTP_PORT: "587",
      SMTP_SECURE: "false",
      SMTP_USER: "noreply@thanelinc.ng",
      SMTP_PASSWORD: "test-password",
      MAIL_TO: "info@thanelinc.ng",
      MAIL_COPY_TO: "archive@thanelinc.ng",
    });

    await expect(loadConfig()).resolves.toEqual({
      smtpHost: "mail.thanelinc.ng",
      smtpPort: 587,
      smtpSecure: false,
      smtpUser: "noreply@thanelinc.ng",
      smtpPassword: "test-password",
      mailTo: "info@thanelinc.ng",
      mailCopyTo: "archive@thanelinc.ng",
    });
  });

  it("defaults the port to 587 when SMTP_PORT is unset", async () => {
    await expect(loadConfig()).resolves.toMatchObject({ smtpPort: 587 });
  });

  it("treats SMTP_SECURE as true only for the exact string 'true'", async () => {
    process.env.SMTP_SECURE = "TRUE";
    await expect(loadConfig()).resolves.toMatchObject({ smtpSecure: false });

    process.env.SMTP_SECURE = "true";
    await expect(loadConfig()).resolves.toMatchObject({ smtpSecure: true });
  });

  it("falls back to empty strings rather than throwing when nothing is set", async () => {
    await expect(loadConfig()).resolves.toEqual({
      smtpHost: "",
      smtpPort: 587,
      smtpSecure: false,
      smtpUser: "",
      smtpPassword: "",
      mailTo: "",
      mailCopyTo: "",
    });
  });
});
