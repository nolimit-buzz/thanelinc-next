import nodemailer from "nodemailer";
import { getMailConfig, type MailConfig } from "@/lib/mail/config";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter(config: MailConfig) {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: { user: config.smtpUser, pass: config.smtpPassword },
  });
  return transporter;
}

/** Strips CR/LF so user-supplied values can't inject extra mail headers. */
function stripHeaderInjection(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendMail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const config = getMailConfig();
  await getTransporter(config).sendMail({
    from: config.smtpUser,
    to: config.mailTo,
    replyTo: replyTo ? stripHeaderInjection(replyTo) : undefined,
    subject: stripHeaderInjection(subject),
    text,
  });
}
