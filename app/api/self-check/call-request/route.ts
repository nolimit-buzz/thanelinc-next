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

  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const bestTime = String(body.bestTime ?? "").trim();
  const category = String(body.category ?? "").trim();

  if (!phone || !email || !bestTime) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
  }

  const text = [
    "Self-check call request",
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Best time to call: ${bestTime}`,
    category ? `Self-check category: ${category}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendMail({
      subject: "Self-check — call request",
      text,
      replyTo: email,
    });
  } catch (error) {
    console.error("Failed to send call-request email", error);
    return NextResponse.json({ ok: false, error: "Failed to send request" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
