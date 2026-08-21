"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content/contact";
import styles from "@/components/contact/contact.module.css";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function continueInEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const reason = String(form.get("reason") ?? "");
    const body = [
      `Reason for contacting: ${reason}`,
      `Name: ${form.get("name") ?? ""}`,
      `Organisation: ${form.get("organisation") ?? ""}`,
      `Email: ${form.get("email") ?? ""}`,
      `Phone: ${form.get("phone") ?? ""}`,
      "",
      String(form.get("message") ?? ""),
    ].join("\n");
    const email = contact.channels[0];
    window.open(
      `${email.href}?subject=${encodeURIComponent(`${contact.form.subject} — ${reason}`)}&body=${encodeURIComponent(body)}`,
      "_self",
    );
    setStatus("Your email app should open with this request. Review it before sending.");
  }

  return (
    <form className={styles.form} onSubmit={continueInEmail}>
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
      <button type="submit" className="btn-architectural-cta">
        <span className="btn-arch-label">{contact.form.submitLabel}</span>
        <span className="btn-arch-arrow">→</span>
      </button>
      <p className={styles.formStatus} aria-live="polite">{status}</p>
    </form>
  );
}
