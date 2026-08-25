// Copy to config.ts (gitignored) and fill in real values.
// Once env vars can be set on the deploy target, prefer reading these from
// process.env instead of committing/keeping real credentials in a source file.

export const mailConfig = {
  smtpHost: "mail.thanelinc.ng",
  smtpPort: 465,
  smtpSecure: true,
  smtpUser: "",
  smtpPassword: "",
  mailTo: "info@thanelinc.ng",
};
