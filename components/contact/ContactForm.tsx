"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content/contact";
import styles from "@/components/contact/contact.module.css";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      currentForm.reset();
    } catch {
      setStatus("Something went wrong sending your message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <label className={styles.field}>
        <span className={styles.label}>{contact.form.reasonLabel}</span>
        <select className={`${styles.input} ${styles.select}`} required name="reason" defaultValue="">
          <option value="" disabled>Select the closest fit</option>
          {contact.form.reasons.map((reason) => (
            <option key={reason} value={reason}>{reason}</option>
          ))}
        </select>
      </label>
      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span className={styles.label}>Full name</span>
          <input className={styles.input} required name="name" autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Organisation</span>
          <input className={styles.input} required name="organisation" autoComplete="organization" />
        </label>
      </div>
      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input className={styles.input} required name="email" type="email" autoComplete="email" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Phone number (optional)</span>
          <input className={styles.input} name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>What do you need?</span>
        <textarea className={`${styles.input} ${styles.textarea}`} required name="message" />
      </label>
      <p className={styles.deliveryNote}>{contact.form.deliveryNote}</p>
      <button type="submit" className="btn-architectural-cta" disabled={submitting}>
        <span className="btn-arch-label">{contact.form.submitLabel}</span>
        <span className="btn-arch-arrow">→</span>
      </button>
      <p className={styles.formStatus} aria-live="polite">{status}</p>
    </form>
  );
}
