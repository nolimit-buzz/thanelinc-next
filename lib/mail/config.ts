export const mailConfig = {
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPassword: process.env.SMTP_PASSWORD ?? "",
  mailTo: process.env.MAIL_TO ?? "",
  mailCopyTo: process.env.MAIL_COPY_TO ?? "",
};
