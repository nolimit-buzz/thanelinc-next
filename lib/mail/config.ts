// Server-only. Never import this from a "use client" component — it would
// bundle these credentials into client JS. Only lib/mail/sendMail.ts and the
// app/api/** route handlers that use it should reference this file.
//
// Hardcoded here (rather than read from env) because the deploy target can't
// have env vars configured yet. Move these back to SMTP_* / MAIL_TO env vars
// once that's possible, and rotate this password since it has been shared
// in plaintext.

export const mailConfig = {
  smtpHost: "mail.thanelinc.ng",
  smtpPort: 465,
  smtpSecure: true,
  smtpUser: "noreply@thanelinc.ng",
  smtpPassword: "y9[D~Kb88DQUe^,F",
  mailTo: "info@thanelinc.ng",
};
