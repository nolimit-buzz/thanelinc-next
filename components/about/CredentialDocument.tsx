import type { CredentialEntry } from "@/lib/content/credentials";
import styles from "@/components/about/about.module.css";

export function CredentialSummary({ credential }: { credential: CredentialEntry }) {
  return (
    <article className={`${styles.credentialCard} ${credential.id === "dpdc" ? styles.credentialCardAccent : ""}`}>
      <div className={styles.credentialCopy}>
        <div className={styles.eyebrow}>{credential.eyebrow}</div>
        <h2>{credential.title}</h2>
        <p className={styles.issuer}>{credential.issuer}</p>
        <p>{credential.description}</p>
      </div>
    </article>
  );
}
