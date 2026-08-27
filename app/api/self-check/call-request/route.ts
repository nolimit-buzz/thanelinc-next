import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail/sendMail";
import { questions } from "@/lib/content/amICovered";
import {
  isSelfCheckAnswers,
  resolveSelfCheck,
  type SelfCheckAnswers,
} from "@/lib/self-check/resolve";
import { verifyProtectedSubmission } from "@/lib/security/submissionProtection";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ANSWER_KEYS = [
  "orgType",
  "volumeBand",
  "sensitiveData",
  "crossBorder",
  "thirdPartyProcessing",
  "establishmentDate",
] as const;
const BEST_TIMES = ["morning", "afternoon", "evening", "anytime"] as const;
const FIELD_LIMITS = { phone: 40, email: 254 } as const;

function rejected() {
  return NextResponse.json(
    { ok: false, error: "Unable to process request" },
    { status: 400 },
  );
}

function readText(
  body: Record<string, unknown>,
  key: keyof typeof FIELD_LIMITS,
): string | null {
  const value = body[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= FIELD_LIMITS[key] ? trimmed : null;
}

function describeAnswers(answers: SelfCheckAnswers): string[] {
  return questions
    .filter((question) => ANSWER_KEYS.includes(question.id as (typeof ANSWER_KEYS)[number]))
    .map((question) => {
      const rawValue = answers[question.id as keyof SelfCheckAnswers];
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

  if (!verifyProtectedSubmission({ body })) {
    return rejected();
  }

  const phone = readText(body, "phone");
  const email = readText(body, "email");
  const bestTime = typeof body.bestTime === "string" ? body.bestTime.trim() : "";
  const answers = body.answers;

  if (
    !phone ||
    !email ||
    !EMAIL_RE.test(email) ||
    !BEST_TIMES.includes(bestTime as (typeof BEST_TIMES)[number]) ||
    body.consent !== true ||
    !isSelfCheckAnswers(answers)
  ) {
    return rejected();
  }

  const { category, mandatoryFiling } = resolveSelfCheck(answers);
  const answerLines = describeAnswers(answers);

  const text = [
    "Self-check call request",
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Best time to call: ${bestTime}`,
    `Self-check category: ${category}`,
    `Mandatory CAR filing: ${mandatoryFiling ? "Yes" : "No"}`,
    answerLines.length ? "" : null,
    answerLines.length ? "Answers:" : null,
    ...answerLines.map((line) => `- ${line}`),
  ]
    .filter((line) => line !== null)
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

  return NextResponse.json({ ok: true, category, mandatoryFiling });
}
