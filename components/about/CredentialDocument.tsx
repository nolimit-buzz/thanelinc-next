import Image from "next/image";
import type { CredentialEntry } from "@/lib/content/credentials";
import styles from "@/components/about/about.module.css";

export function CredentialDocument({ credential }: { credential: CredentialEntry }) {
  return (
    <article className={styles.credentialCard}>
      <div className={styles.credentialPreview}>
        <Image src={credential.preview} alt={credential.previewAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <div className={styles.credentialCopy}>
        <div className={styles.eyebrow}>{credential.eyebrow}</div>
        <h2>{credential.title}</h2>
        <p className={styles.issuer}>{credential.issuer}</p>
        <p>{credential.description}</p>
        <p>{credential.meaning}</p>
        <div className={styles.documentLinks}>
          <a href={credential.pdf} target="_blank" rel="noreferrer" className="mandate-link-check">
            <span>View full certificate (PDF)</span><span aria-hidden>↗</span>
          </a>
          <a href={credential.pdf} download className={styles.downloadLink}>
            Download PDF <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </article>
  );
}
