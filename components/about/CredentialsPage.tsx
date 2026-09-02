import { CredentialSummary } from "@/components/about/CredentialDocument";
import type { CredentialsSections } from "@/lib/cms/mapAbout";
import styles from "@/components/about/about.module.css";

export function CredentialsSection({ content }: { content: CredentialsSections }) {
  const credentialSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thanelinc Nigeria Limited",
    url: "https://thanelinc.ng",
    hasCredential: content.credentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.title,
      recognizedBy: { "@type": "Organization", name: credential.issuer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialSchema) }} />

      <section id="credentials" className={styles.credentialsSection}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <div className={styles.eyebrow}>Credential overview</div>
            <h2>Two registrations. Two different purposes.</h2>
          </div>
          <div className={styles.credentialGrid}>
            {content.credentials.map((credential, index) => (
              <div className={`reveal delay-${index + 1}`} key={credential.id}><CredentialSummary credential={credential} /></div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
