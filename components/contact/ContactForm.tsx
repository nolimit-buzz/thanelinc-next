"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { ContactPageContent } from "@/lib/content/contact";
import styles from "@/components/contact/contact.module.css";
import { trackEvent } from "@/lib/consent/track";

export function ContactForm({ content }: { content: ContactPageContent["form"] }) {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submittedAt, setSubmittedAt] = useState(() => Date.now());

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentForm = event.currentTarget;
    const form = new FormData(currentForm);
    const payload = {
      reason: String(form.get("reason") ?? ""),
      name: String(form.get("name") ?? ""),
      organisation: String(form.get("organisation") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
      consent: privacyConsent,
      submittedAt,
    };

    setSubmitting(true);
    setStatus("Sending…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Failed to send message");
      }
      setStatus("Thanks — your message has been sent. We'll be in touch.");
      trackEvent("contact_submit", { reason: payload.reason });
      currentForm.reset();
      setSubmittedAt(Date.now());
    } catch {
      setStatus("Something went wrong sending your message. Please try again or email us directly.");
      setSubmittedAt(Date.now());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <label className={styles.field}>
        <span className={styles.label}>{content.reasonLabel}</span>
        <select className={`${styles.input} ${styles.select}`} required name="reason" defaultValue="">
          <option value="" disabled>{content.reasonPlaceholder}</option>
          {content.reasons.map((reason) => (
            <option key={reason} value={reason}>{reason}</option>
          ))}
        </select>
      </label>
      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span className={styles.label}>{content.nameLabel}</span>
          <input className={styles.input} required maxLength={120} name="name" autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{content.organisationLabel}</span>
          <input className={styles.input} required maxLength={160} name="organisation" autoComplete="organization" />
        </label>
      </div>
      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span className={styles.label}>{content.emailLabel}</span>
          <input className={styles.input} required maxLength={254} name="email" type="email" autoComplete="email" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{content.phoneLabel}</span>
          <input className={styles.input} maxLength={40} name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>What do you need?</span>
        <textarea className={`${styles.input} ${styles.textarea}`} required maxLength={4000} name="message" />
      </label>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px" }}
      />
      <p className={styles.deliveryNote}>{content.deliveryNote}</p>
      <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
        <input
          type="checkbox"
          required
          checked={privacyConsent}
          onChange={(event) => setPrivacyConsent(event.target.checked)}
          style={{ marginTop: "4px" }}
        />
        <span className={styles.deliveryNote} style={{ margin: 0 }}>
          {content.consentLabel}{" "}
          <Link href={content.privacyLink.href}>{content.privacyLink.label}</Link>.
        </span>
      </label>
      <button type="submit" className="btn-architectural-cta" disabled={submitting || !privacyConsent}>
        <span className="btn-arch-label">{content.submitLabel}</span>
        <span className="btn-arch-arrow">→</span>
      </button>
      <p className={styles.formStatus} aria-live="polite">{status}</p>
    </form>
  );
}
