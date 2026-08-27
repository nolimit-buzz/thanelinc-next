import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail/sendMail";
import { verifyProtectedSubmission } from "@/lib/security/submissionProtection";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_LIMITS = {
  reason: 120,
  name: 120,
  organisation: 160,
  email: 254,
  phone: 40,
  message: 4_000,
} as const;

function readText(
  body: Record<string, unknown>,
  key: keyof typeof FIELD_LIMITS,
  required = true,
): string | null {
  const value = body[key];
  if (typeof value !== "string") return required ? null : "";
  const trimmed = value.trim();
  if ((required && !trimmed) || trimmed.length > FIELD_LIMITS[key]) return null;
  return trimmed;
}

function rejected() {
  return NextResponse.json(
    { ok: false, error: "Unable to process request" },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!verifyProtectedSubmission({ body })) {
    return rejected();
  }

  const reason = readText(body, "reason");
  const name = readText(body, "name");
  const organisation = readText(body, "organisation");
  const email = readText(body, "email");
  const phone = readText(body, "phone", false);
  const message = readText(body, "message");

  if (!reason || !name || !organisation || !email || phone === null || !message) return rejected();
  if (!EMAIL_RE.test(email)) {
    return rejected();
  }
  if (body.consent !== true) {
    return rejected();
  }

  const text = [
    `Reason for contacting: ${reason}`,
    `Name: ${name}`,
    `Organisation: ${organisation}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    "",
    message,
  ].join("\n");

  try {
    await sendMail({
      subject: `Contact form — ${reason}`,
      text,
      replyTo: email,
    });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
