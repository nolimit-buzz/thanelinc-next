import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail/sendMail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const reason = String(body.reason ?? "").trim();
  const name = String(body.name ?? "").trim();
  const organisation = String(body.organisation ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!reason || !name || !organisation || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
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
      type: "contact",
      subject: `Contact form — ${reason}`,
      text,
      replyTo: email,
      payload: { reason, name, organisation, email, phone, message },
    });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
