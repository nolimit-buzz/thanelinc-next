"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  hero,
  questions,
  resultCopy,
  categoryDisplayName,
  penaltyFraming,
  callRequestDisclosure,
} from "@/lib/content/amICovered";
import {
  resolveSelfCheck,
  carDeadlineCopy,
  type SelfCheckAnswers,
} from "@/lib/self-check/resolve";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { trackEvent } from "@/lib/consent/track";

const CHAMFER = "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)";

type Step = "intro" | number | "result";

type PartialAnswers = Partial<SelfCheckAnswers>;

const BEST_TIME_OPTIONS = [
  { value: "morning", label: "Morning (9am–12pm)" },
  { value: "afternoon", label: "Afternoon (12–4pm)" },
  { value: "evening", label: "Evening (4–6pm)" },
  { value: "anytime", label: "Anytime" },
];

/**
 * Logo-only header for the question flow — the client asked for the full
 * nav and footer removed while answering, so the dark screens have no
 * distraction from the one action available (answering). The logo stays,
 * linking home, per the same request.
 */
function MinimalLogoHeader() {
  return (
    <div style={{ padding: "24px 0" }}>
      <div className="container">
        <Link href="/" aria-label="Thanelinc Home" style={{ display: "inline-flex" }}>
          <Image src="/thanelinc-brand-logo-white.svg" alt="Thanelinc" width={140} height={32} priority />
        </Link>
      </div>
    </div>
  );
}

export function AmICovered() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<PartialAnswers>({});
  const [callRequest, setCallRequest] = useState({ phone: "", email: "", bestTime: "morning" });
  const [callRequestSubmitted, setCallRequestSubmitted] = useState(false);
  const [callRequestSubmitting, setCallRequestSubmitting] = useState(false);
  const [callRequestError, setCallRequestError] = useState("");
  const [callRequestConsent, setCallRequestConsent] = useState(false);
  const [callRequestWebsite, setCallRequestWebsite] = useState("");
  const [callRequestStartedAt, setCallRequestStartedAt] = useState(() => Date.now());

  const currentQuestion = typeof step === "number" ? questions[step] : null;

  function answer(questionId: string, value: string, answeredAt: number) {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    if (typeof step === "number" && step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setCallRequestStartedAt(answeredAt);
      setStep("result");
      trackEvent("self_check_complete");
    }
  }

  function goBack() {
    if (typeof step === "number" && step > 0) setStep(step - 1);
    else if (typeof step === "number") setStep("intro");
    else if (step === "result") setStep(questions.length - 1);
  }

  async function handleCallRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCallRequestSubmitting(true);
    setCallRequestError("");
    try {
      const response = await fetch("/api/self-check/call-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...callRequest,
          answers,
          consent: callRequestConsent,
          website: callRequestWebsite,
          submittedAt: callRequestStartedAt,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Failed to send request");
      }
      setCallRequestSubmitted(true);
    } catch {
      setCallRequestError("Something went wrong sending your request. Please try again.");
      setCallRequestStartedAt(Date.now());
    } finally {
      setCallRequestSubmitting(false);
    }
  }

  if (step === "intro") {
    return (
      <div style={{ background: "var(--color-forest-dark)", minHeight: "100vh" }}>
        <MinimalLogoHeader />
        <section style={{ padding: "60px 0 100px" }}>
          <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
            <div className="micro-cred-badge-dark">
              <span className="micro-cred-dot"></span>
              <span>FREE · 2 MINUTES · NO COMMITMENT</span>
            </div>
            <h1 className="hero-h1-clean reveal active" style={{ marginTop: "12px" }}>
              <span className="h1-line-primary" style={{ color: "#FFFFFF" }}>{hero.h1}</span>
            </h1>
            <p className="hero-lede-text reveal active delay-1" style={{ maxWidth: "600px", margin: "20px auto 32px", color: "#94A3B8" }}>
              {hero.subhead}
            </p>
            <button
              type="button"
              onClick={() => {
                trackEvent("self_check_start");
                setStep(0);
              }}
              className="btn-architectural-cta btn-architectural-cta-light"
            >
              <span className="btn-arch-label">{hero.primaryCta}</span>
              <span className="btn-arch-arrow">→</span>
            </button>
            <p className="hero-lede-text" style={{ maxWidth: "600px", margin: "24px auto 0", fontSize: "0.9rem", color: "#94A3B8" }}>
              {hero.trustLine}{" "}
              <Link href={hero.trustLineCta.href} className="mandate-link-check" style={{ display: "inline-flex", color: "#FFFFFF", borderColor: "var(--color-teal-accent)" }}>
                <span>{hero.trustLineCta.label}</span>
                <span>→</span>
              </Link>
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (currentQuestion) {
    return (
      <div style={{ background: "var(--color-forest-dark)", minHeight: "100vh" }}>
        <MinimalLogoHeader />
        <section style={{ padding: "20px 0 80px" }}>
          <div className="container" style={{ maxWidth: "680px" }}>
            <ProgressIndicator current={currentQuestion.number} total={questions.length} />

            <h2 className="section-h2-title" style={{ fontSize: "1.6rem", marginTop: "24px", color: "#FFFFFF" }}>{currentQuestion.prompt}</h2>
            {currentQuestion.whyWeAsk ? (
              <p style={{ color: "#94A3B8", fontSize: "0.9rem", marginBottom: "28px" }}>
                {currentQuestion.whyWeAsk}
              </p>
            ) : (
              <div style={{ marginBottom: "12px" }} />
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => answer(currentQuestion.id, opt.value, Date.now())}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    textAlign: "left",
                    padding: "18px 22px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    borderRadius: "var(--radius-md)",
                    fontFamily: "var(--font-outfit)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    cursor: "pointer",
                    transition: "var(--transition-base)",
                    outlineColor: "var(--color-teal-accent)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-teal-accent)";
                    e.currentTarget.style.background = "rgba(28, 176, 184, 0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.14)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {typeof step === "number" && step > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="mandate-link-check"
                style={{ marginTop: "32px", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#94A3B8", borderColor: "var(--color-teal-accent)" }}
              >
                <span>← Back</span>
              </button>
            ) : null}
          </div>
        </section>
      </div>
    );
  }

  // step === "result" — full site chrome returns; the client confirmed this screen is fine as-is.
  const complete = answers as SelfCheckAnswers;
  const result = resolveSelfCheck(complete);
  const copy = resultCopy[result.category];
  const deadline = result.mandatoryFiling ? carDeadlineCopy(complete.establishmentDate) : null;

  return (
    <>
      <SiteNav />
      <div style={{ paddingTop: "64px" }}>
        <section className="section-light" style={{ padding: "80px 0 100px" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            <div className="micro-cred-badge">
              <span className="micro-cred-dot"></span>
              <span>{categoryDisplayName[result.category]}</span>
            </div>
            <h1 className="hero-h1-clean reveal active" style={{ marginTop: "12px", fontSize: "2.4rem" }}>
              <span className="h1-line-primary">{copy.headline}</span>
            </h1>
            <p className="hero-lede-text reveal active delay-1" style={{ maxWidth: "680px" }}>{copy.body}</p>

            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(10, 28, 30, 0.09)",
                boxShadow: "0 6px 24px rgba(10, 28, 30, 0.05)",
                clipPath: CHAMFER,
                padding: "32px 36px",
                marginTop: "32px",
              }}
            >
              <h3 className="process-step-title" style={{ fontSize: "1.1rem" }}>What this means for you</h3>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {copy.whatThisMeans.map((line) => (
                  <li key={line} className="process-step-desc" style={{ marginBottom: 0 }}>{line}</li>
                ))}
                {deadline ? (
                  <li className="process-step-desc" style={{ marginBottom: 0 }}>
                    Your CAR is due <strong style={{ color: "var(--color-forest-dark)" }}>{deadline}</strong>.
                  </li>
                ) : null}
              </ul>
            </div>

            {result.mandatoryFiling ? (
              <div
                style={{
                  background: "var(--color-forest-dark)",
                  color: "var(--color-text-white)",
                  boxShadow: "var(--shadow-feature)",
                  clipPath: CHAMFER,
                  padding: "28px 36px",
                  marginTop: "20px",
                }}
              >
                <p className="hero-lede-text" style={{ color: "var(--color-text-white)", maxWidth: "none", marginBottom: 0, fontSize: "0.9rem" }}>
                  {penaltyFraming}
                </p>
              </div>
            ) : null}

            {copy.sectorLink ? (
              <div style={{ marginTop: "24px" }}>
                <Link href={copy.sectorLink.href} className="mandate-link-check">
                  <span>{copy.sectorLink.label}</span>
                  <span>→</span>
                </Link>
              </div>
            ) : null}

            <div
              style={{
                background: "#F8FAFA",
                border: "1px solid rgba(10, 28, 30, 0.06)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                marginTop: "32px",
              }}
            >
              {!callRequestSubmitted ? (
                <form onSubmit={handleCallRequestSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <label style={{ fontWeight: 700, fontSize: "0.9rem" }}>{copy.secondaryCta}</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    <input
                      type="tel"
                      required
                      maxLength={40}
                      value={callRequest.phone}
                      onChange={(e) => setCallRequest({ ...callRequest, phone: e.target.value })}
                      placeholder="Phone number"
                      aria-label="Phone number"
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      required
                      maxLength={254}
                      value={callRequest.email}
                      onChange={(e) => setCallRequest({ ...callRequest, email: e.target.value })}
                      placeholder="you@organisation.com"
                      aria-label="Email"
                      style={inputStyle}
                    />
                    <select
                      value={callRequest.bestTime}
                      onChange={(e) => setCallRequest({ ...callRequest, bestTime: e.target.value })}
                      aria-label="Best time to call"
                      style={{ ...inputStyle, flex: "1 1 200px" }}
                    >
                      {BEST_TIME_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(10, 28, 30, 0.1)", paddingTop: "16px" }}>
                    <p style={{ margin: "0 0 6px", fontWeight: 700 }}>{callRequestDisclosure.heading}</p>
                    <p className="process-step-desc" style={{ margin: "0 0 10px" }}>
                      {callRequestDisclosure.notice}
                    </p>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={callRequestConsent}
                        onChange={(event) => setCallRequestConsent(event.target.checked)}
                        style={{ marginTop: "4px" }}
                      />
                      <span className="process-step-desc" style={{ margin: 0 }}>
                        {callRequestDisclosure.consentLabel}{" "}
                        <Link href={callRequestDisclosure.privacyLink.href}>
                          {callRequestDisclosure.privacyLink.label}
                        </Link>
                      </span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={callRequestWebsite}
                    onChange={(event) => setCallRequestWebsite(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px" }}
                  />
                  <button
                    type="submit"
                    className="btn-architectural-cta"
                    style={{ alignSelf: "flex-start" }}
                    disabled={callRequestSubmitting || !callRequestConsent}
                  >
                    <span className="btn-arch-label">{callRequestSubmitting ? "Sending…" : "Request a call"}</span>
                    <span className="btn-arch-arrow">→</span>
                  </button>
                  {callRequestError ? (
                    <p className="process-step-desc" style={{ marginBottom: 0, color: "#B3261E" }} aria-live="polite">
                      {callRequestError}
                    </p>
                  ) : null}
                </form>
              ) : (
                <p className="process-step-desc" style={{ marginBottom: 0 }}>
                  Noted — we&apos;ll call {callRequest.phone} ({BEST_TIME_OPTIONS.find((o) => o.value === callRequest.bestTime)?.label.toLowerCase()}).
                </p>
              )}
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => {
                  setStep("intro");
                  setAnswers({});
                  setCallRequestSubmitted(false);
                  setCallRequest({ phone: "", email: "", bestTime: "morning" });
                  setCallRequestConsent(false);
                  setCallRequestWebsite("");
                  setCallRequestStartedAt(Date.now());
                }}
                className="mandate-link-check"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <span>Start over</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}

const inputStyle: React.CSSProperties = {
  flex: "1 1 200px",
  padding: "12px 16px",
  border: "1px solid rgba(10, 28, 30, 0.15)",
  borderRadius: "var(--radius-sm)",
  fontFamily: "var(--font-outfit)",
  fontSize: "0.95rem",
  background: "#fff",
};

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.04em" }}>
        {current} OF {total}
      </span>
      <div style={{ flex: 1, height: "3px", background: "rgba(255,255,255,0.12)", borderRadius: "2px", overflow: "hidden" }}>
        <div
          style={{
            width: `${(current / total) * 100}%`,
            height: "100%",
            background: "var(--color-teal-accent)",
            transition: "width 0.3s var(--ease-out-cubic)",
          }}
        />
      </div>
    </div>
  );
}
