import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail/sendMail";
import { questions } from "@/lib/content/amICovered";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ANSWER_KEYS = [
  "orgType",
  "volumeBand",
  "sensitiveData",
  "crossBorder",
  "thirdPartyProcessing",
  "establishmentDate",
] as const;

function describeAnswers(answers: Record<string, unknown>): string[] {
  return questions
    .filter((question) => ANSWER_KEYS.includes(question.id as (typeof ANSWER_KEYS)[number]))
    .map((question) => {
      const rawValue = String(answers[question.id] ?? "").trim();
      const option = question.options.find((opt) => opt.value === rawValue);
      const label = option ? option.label : rawValue || "—";
      return `${question.prompt} ${label}`;
    });
}

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
  const mandatoryFiling = Boolean(body.mandatoryFiling);
  const answers = (body.answers && typeof body.answers === "object" ? body.answers : {}) as Record<
    string,
    unknown
  >;

  if (!phone || !email || !bestTime) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
  }

  const answerLines = describeAnswers(answers);

  const text = [
    "Self-check call request",
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Best time to call: ${bestTime}`,
    category ? `Self-check category: ${category}` : null,
    category ? `Mandatory CAR filing: ${mandatoryFiling ? "Yes" : "No"}` : null,
    answerLines.length ? "" : null,
    answerLines.length ? "Answers:" : null,
    ...answerLines.map((line) => `- ${line}`),
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    await sendMail({
      type: "self-check",
      subject: "Self-check — call request",
      text,
      replyTo: email,
      payload: { phone, email, bestTime, category, mandatoryFiling, answers },
    });
  } catch (error) {
    console.error("Failed to send call-request email", error);
    return NextResponse.json({ ok: false, error: "Failed to send request" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
