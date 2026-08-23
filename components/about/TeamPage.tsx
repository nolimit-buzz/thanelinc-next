import Link from "next/link";
import { EditorialBannerHero } from "@/components/inner/EditorialBannerHero";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import type { TeamPageContent } from "@/lib/content/team";
import styles from "@/components/about/about.module.css";

export function TeamPage({ content }: { content: TeamPageContent }) {
  return (
    <main className={styles.page}>
      <EditorialBannerHero
        eyebrow={content.hero.eyebrow}
        h1={content.hero.h1}
        h1Accent={content.hero.h1Accent}
        summary={content.hero.summary}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
        bannerImage="/hero-portrait-sectors.jpg"
        bannerAlt=""
        bannerPosition="50% 25%"
      />

      <section className={styles.teamSection}>
        <div className="container">
          <div className={`${styles.sectionHeader} reveal`}>
            <div className={styles.eyebrow}>{content.introduction.eyebrow}</div>
            <h2>{content.introduction.heading}</h2>
            <p>{content.introduction.body}</p>
          </div>
          <div className={styles.memberGrid}>
            {content.members.map((member, index) => <div className={`reveal delay-${index + 1}`} key={member.name}><TeamMemberCard member={member} /></div>)}
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={`container ${styles.processCard} reveal`}>
          <div>
            <div className={styles.eyebrow}>Firm-level verification</div>
            <h2>{content.bridge.heading}</h2>
            <p>{content.bridge.body}</p>
          </div>
          <Link href={content.bridge.href} className="btn-architectural-cta">
            <span className="btn-arch-label">{content.bridge.ctaLabel}</span><span className="btn-arch-arrow">→</span>
          </Link>
        </div>
      </section>

      <InnerPageCta heading={content.closingCta.heading} primary={content.closingCta.primary} secondary={content.closingCta.secondary} cutoutImage="/services-hero-cutout-bust.png" />
      <ScrollReveals />
    </main>
  );
}
