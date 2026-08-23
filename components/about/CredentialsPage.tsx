import Link from "next/link";
import { EditorialBannerHero } from "@/components/inner/EditorialBannerHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { CredentialDocument } from "@/components/about/CredentialDocument";
import type { CredentialsPageContent } from "@/lib/content/credentials";
import styles from "@/components/about/about.module.css";

export function CredentialsPage({ content }: { content: CredentialsPageContent }) {
  const credentialSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Thanelinc Nigeria Limited",
    url: "https://thanelinc.ng",
    hasCredential: content.credentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.title,
      recognizedBy: { "@type": "Organization", name: credential.issuer },
      url: `https://thanelinc.ng${credential.pdf}`,
    })),
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialSchema) }} />
      <EditorialBannerHero
        eyebrow={content.hero.eyebrow}
        h1={content.hero.h1}
        h1Accent={content.hero.h1Accent}
        summary={content.hero.summary}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
        bannerImage="/services-banner-glass-architecture.jpg"
        bannerAlt=""
      />

      <section className={styles.credentialsSection}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <div className={styles.eyebrow}>Viewable documents</div>
            <h2>Two registrations. Two different purposes.</h2>
          </div>
          <div className={styles.credentialGrid}>
            {content.credentials.map((credential, index) => (
              <div className={`reveal delay-${index + 1}`} key={credential.id}><CredentialDocument credential={credential} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={`container ${styles.proofCard} reveal`}>
          <div>
            <div className={styles.eyebrow}>{content.proof.eyebrow}</div>
            <h2>{content.proof.title}</h2>
            <p>{content.proof.body}</p>
          </div>
          <Link href={content.proof.href} className="mandate-link-check" style={{ color: "#fff", borderColor: "var(--color-teal-accent)" }}>
            <span>{content.proof.ctaLabel}</span><span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <InnerPageCta heading={content.closingCta.heading} primary={content.closingCta.primary} secondary={content.closingCta.secondary} cutoutImage="/services-hero-cutout-bust.png" />
      <ScrollReveals />
    </main>
  );
}
