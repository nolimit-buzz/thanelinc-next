// Server-only. Never import this from a "use client" component — it would
// bundle these values into client JS. Only lib/mail/sendMail.ts and the
// app/api/** route handlers that use it should reference this file.

export interface MailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPassword: string;
  mailTo: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

/**
 * Reads SMTP config from the environment on every call rather than caching
 * a module-level singleton — so a missing/misconfigured env var fails
 * loudly at the moment mail is actually sent, not silently or at import
 * time (which could crash unrelated routes that happen to share a bundle).
 */
export function getMailConfig(): MailConfig {
  return {
    smtpHost: requireEnv("SMTP_HOST"),
    smtpPort: Number(requireEnv("SMTP_PORT")),
    smtpSecure: requireEnv("SMTP_SECURE") === "true",
    smtpUser: requireEnv("SMTP_USER"),
    smtpPassword: requireEnv("SMTP_PASSWORD"),
    mailTo: requireEnv("MAIL_TO"),
  };
}
