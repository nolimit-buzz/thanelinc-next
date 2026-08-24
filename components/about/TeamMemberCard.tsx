"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { TeamMember } from "@/lib/content/team";
import styles from "@/components/about/about.module.css";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const image = member.image;
  const nameParts = member.name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const surname = nameParts.at(-1);

  useEffect(() => {
    if (!isProfileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const openButton = openButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsProfileOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [isProfileOpen]);

  function closeProfile() {
    setIsProfileOpen(false);
  }

  function keepFocusInDialog(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (member.disclosureStatus !== "cleared" || !image) return null;

  return (
    <article className={styles.memberCard}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
        className={styles.memberImage}
      />
      <div className={styles.memberOverlay} aria-hidden="true" />
      <div className={styles.memberContent}>
        <h3>
          <span className={styles.memberFirstNames}>{firstName}</span>
          <span className={styles.memberSurname}>{surname}</span>
        </h3>
        <p className={styles.memberRole}>{member.role}</p>
        <button ref={openButtonRef} type="button" className={styles.memberProfileButton} onClick={() => setIsProfileOpen(true)}>
          Read profile
        </button>
      </div>
      {member.linkedInUrl ? (
        <a className={styles.memberLinkedin} href={member.linkedInUrl} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M5.3 3.5a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM3.3 9h4v12h-4V9Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2.1 3.8-2.1 4.1 0 4.8 2.6 4.8 6.1V21h-4v-5.7c0-1.4 0-3.2-2.1-3.2s-2.4 1.5-2.4 3.1V21h-4V9Z" />
          </svg>
        </a>
      ) : null}
      {isProfileOpen ? createPortal(
        <div className={styles.memberModalBackdrop} onMouseDown={closeProfile}>
          <section
            ref={dialogRef}
            className={styles.memberModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={keepFocusInDialog}
          >
            <div className={styles.memberModalVisual}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 92vw, 44vw" className={styles.memberModalImage} />
            </div>
            <div className={styles.memberModalBody}>
              <button ref={closeButtonRef} type="button" className={styles.memberModalClose} onClick={closeProfile} aria-label={`Close ${member.name}'s profile`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
              <p className={styles.memberModalEyebrow}>Our Team</p>
              <h2 id={titleId}>{firstName} <span>{surname}</span></h2>
              <p className={styles.memberModalRole}>{member.role}</p>
              <div className={styles.memberModalBiography}>
                {member.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>
        </div>,
        document.body,
      ) : null}
    </article>
  );
}
