import Link from "next/link";
import { EditorialBannerHero } from "@/components/inner/EditorialBannerHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { CredentialsSection } from "@/components/about/CredentialsPage";
import { TeamSection } from "@/components/about/TeamPage";
import { TrackRecord } from "@/components/v5/TrackRecord";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { defaultTrackRecord } from "@/lib/cms/defaultHomeContent";
import type { AboutSections, CredentialsSections, TeamSections } from "@/lib/cms/mapAbout";
import styles from "@/components/about/about.module.css";

export function AboutPage({
  content,
  credentialsContent,
  teamContent,
}: {
  content: AboutSections;
  credentialsContent: CredentialsSections;
  teamContent: TeamSections;
}) {
  return (
    <main className={styles.page}>
      <EditorialBannerHero
        eyebrow={content.hero.eyebrow}
        h1={content.hero.h1}
        h1Accent={content.hero.h1Accent}
        summary={content.hero.summary}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
        bannerImage={content.hero.bannerImage}
        bannerAlt={content.hero.bannerAlt}
      />

      <section className={styles.positioningSection}>
        <div className="container">
          <div className={`${styles.positioning} reveal`}>
            <div className={styles.positioningIntro}>
              <div className={styles.eyebrow}>{content.positioning.eyebrow}</div>
              <h2>{content.positioning.heading}</h2>
            </div>
            <p>{content.positioning.body}</p>
          </div>
        </div>
      </section>

      <TeamSection content={teamContent} />

      <CredentialsSection content={credentialsContent} />

      <section className={styles.nextStepsSection}>
        <div className="container">
          <div className={styles.nextStepsGrid}>
            <div className={`${styles.nextStepsCard} reveal`}>
              <article className={styles.nextStep}>
                <div className={styles.eyebrow}>{credentialsContent.proof.eyebrow}</div>
                <h2>{credentialsContent.proof.title}</h2>
                <p>{credentialsContent.proof.body}</p>
                <Link href={credentialsContent.proof.href} className={`mandate-link-check ${styles.nextStepLink}`}>
                  <span>{credentialsContent.proof.ctaLabel}</span><span aria-hidden>→</span>
                </Link>
              </article>
            </div>
            <TrackRecord className={styles.clientProof} content={defaultTrackRecord} />
          </div>
        </div>
      </section>

      <InnerPageCta heading={content.closingCta.heading} primary={content.closingCta.primary} secondary={content.closingCta.secondary} cutoutImage={content.closingCta.cutoutImage} />
      <ScrollReveals />
    </main>
  );
}
