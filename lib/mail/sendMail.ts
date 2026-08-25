import nodemailer from "nodemailer";
import { mailConfig } from "@/lib/mail/config";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: mailConfig.smtpHost,
    port: mailConfig.smtpPort,
    secure: mailConfig.smtpSecure,
    auth: { user: mailConfig.smtpUser, pass: mailConfig.smtpPassword },
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
  await getTransporter().sendMail({
    from: mailConfig.smtpUser,
    to: mailConfig.mailTo,
    replyTo: replyTo ? stripHeaderInjection(replyTo) : undefined,
    subject: stripHeaderInjection(subject),
    text,
  });
}
