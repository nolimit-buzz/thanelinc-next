// Server-only. Sends via SMTP with nodemailer, then records a copy of the email
// in Strapi (`email-logs` collection) so the client has a searchable archive of
// everything the site has sent. The log write is best-effort: a CMS that is down
// must never turn a delivered email into a 502 for the visitor.

import nodemailer from "nodemailer";
import { mailConfig } from "@/lib/mail/config";
import { STRAPI_API_URL } from "@/lib/config/site-config";

export type MailType = "contact" | "self-check";

let transporter: nodemailer.Transporter | null = null;

// Checked here rather than at module load: this file is imported while `next build`
// compiles the API routes, and throwing there would fail the build in any
// environment without a full env file. Naming the missing variables matters — an
// empty SMTP_PASSWORD otherwise surfaces as an opaque SMTP auth rejection.
function assertMailEnv() {
  const missing = (
    [
      ["SMTP_HOST", mailConfig.smtpHost],
      ["SMTP_USER", mailConfig.smtpUser],
      ["SMTP_PASSWORD", mailConfig.smtpPassword],
      ["MAIL_TO", mailConfig.mailTo],
    ] as const
  )
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`[mail] missing required environment variables: ${missing.join(", ")}`);
  }
}

function getTransporter() {
  assertMailEnv();

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: mailConfig.smtpHost,
      port: mailConfig.smtpPort,
      secure: mailConfig.smtpSecure,
      auth: {
        user: mailConfig.smtpUser,
        pass: mailConfig.smtpPassword,
      },
    });
  }
  return transporter;
}

async function logToStrapi(entry: {
  type: MailType;
  to: string;
  from: string;
  replyTo: string | null;
  subject: string;
  body: string;
  payload: Record<string, unknown> | null;
  status: "sent" | "failed";
  error: string | null;
  messageId?: string | null;
  smtpResponse?: string | null;
}) {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/email-logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ...entry, sentAt: new Date().toISOString() } }),
    });

    if (!response.ok) {
      console.error("[mail] failed to log email in Strapi", response.status, await response.text());
    }
  } catch (error) {
    console.error("[mail] failed to log email in Strapi", error);
  }
}

export async function sendMail({
  type,
  subject,
  text,
  replyTo,
  payload,
}: {
  type: MailType;
  subject: string;
  text: string;
  replyTo?: string;
  payload?: Record<string, unknown>;
}) {
  // Every recipient, for the archive's `to` field — the log should reflect what
  // was actually sent, not just the primary address.
  const recipients = [mailConfig.mailTo, mailConfig.mailCopyTo].filter(Boolean);

  const base = {
    type,
    to: recipients.join(", "),
    from: mailConfig.smtpUser,
    replyTo: replyTo || null,
    subject,
    body: text,
    payload: payload || null,
  };

  let info: Awaited<ReturnType<nodemailer.Transporter["sendMail"]>>;

  try {
    info = await getTransporter().sendMail({
      // Display name as well as the address: a bare noreply@ with no name is a
      // common spam heuristic, and this is a same-domain send.
      from: `"Thanelinc Website" <${mailConfig.smtpUser}>`,
      to: mailConfig.mailTo,
      // BCC rather than CC: `replyTo` is the visitor's address, so a "Reply All"
      // from info@ on a CC'd message would also fire a reply at the unattended
      // noreply@ inbox. BCC delivers the same copy with no reply-path effect.
      bcc: mailConfig.mailCopyTo || undefined,
      replyTo: replyTo || undefined,
      subject,
      text,
    });
  } catch (error) {
    await logToStrapi({
      ...base,
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
      messageId: null,
      smtpResponse: null,
    });
    throw error;
  }

  // nodemailer resolves as long as the server accepted the DATA command — it does
  // NOT mean every recipient was accepted. A per-recipient rejection lands in
  // `info.rejected` and would otherwise be reported to the visitor as success.
  const accepted = info.accepted ?? [];
  const rejected = info.rejected ?? [];

  console.info("[mail] sent", {
    messageId: info.messageId,
    accepted,
    rejected,
    response: info.response,
  });

  if (rejected.length > 0 || accepted.length === 0) {
    const error = `SMTP accepted no recipients (accepted=${JSON.stringify(
      accepted,
    )}, rejected=${JSON.stringify(rejected)}, response=${info.response})`;
    await logToStrapi({
      ...base,
      status: "failed",
      error,
      messageId: info.messageId ?? null,
      smtpResponse: info.response ?? null,
    });
    throw new Error(error);
  }

  await logToStrapi({
    ...base,
    status: "sent",
    error: null,
    messageId: info.messageId ?? null,
    smtpResponse: info.response ?? null,
  });
}
