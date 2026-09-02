// Standalone SMTP diagnostic — run outside Next.js so a mail problem can be
// separated from an app problem:
//
//   npx tsx --env-file=.env.local scripts/mail-check.ts [recipient]
//
// --env-file is required: the SMTP settings come from the environment, and tsx
// (unlike Next) does not load .env.local on its own.
//
// It verifies the connection/auth, then sends one test message with the full
// SMTP conversation printed. Read the final `250` line: a server that says
// "250 Queued" is going to deliver; a bare "250 OK" from a host that then drops
// the message looks identical to the app, which is why we print the transcript.

import nodemailer from "nodemailer";
import { mailConfig } from "../lib/mail/config";

async function main() {
  const to = process.argv[2] || mailConfig.mailTo;

  const transporter = nodemailer.createTransport({
    host: mailConfig.smtpHost,
    port: mailConfig.smtpPort,
    secure: mailConfig.smtpSecure,
    auth: { user: mailConfig.smtpUser, pass: mailConfig.smtpPassword },
    logger: true,
    debug: true,
  });

  console.log(`\n--- verify ${mailConfig.smtpHost}:${mailConfig.smtpPort} ---`);
  await transporter.verify();
  console.log("verify OK — host reachable and credentials accepted\n");

  // Mirror the real send shape from sendMail.ts, copy recipient included, so the
  // transcript shows every RCPT TO the live path would issue.
  const copyTo = process.argv[2] ? "" : mailConfig.mailCopyTo;

  console.log(`--- send to ${to}${copyTo ? ` (bcc ${copyTo})` : ""} ---`);
  const info = await transporter.sendMail({
    from: `"Thanelinc Website" <${mailConfig.smtpUser}>`,
    to,
    bcc: copyTo || undefined,
    subject: `Thanelinc SMTP check ${new Date().toISOString()}`,
    text: "Diagnostic message from scripts/mail-check.ts. If you can read this, delivery works.",
  });

  console.log("\n--- result ---");
  console.log("messageId:", info.messageId);
  console.log("accepted: ", info.accepted);
  console.log("rejected: ", info.rejected);
  console.log("response: ", info.response);

  transporter.close();
}

main().catch((error) => {
  console.error("\nmail-check failed:", error);
  process.exit(1);
});
