import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import type { TeamSections } from "@/lib/cms/mapAbout";
import styles from "@/components/about/about.module.css";

export function TeamSection({ content }: { content: TeamSections }) {
  const imageLedMembers = content.members.filter(
    (member) => member.disclosureStatus === "cleared" && member.image,
  ).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="team" className={styles.teamSection}>
      <div className="container">
        <div className={`${styles.teamHeading} reveal`}>
          <div>
            <div className={styles.eyebrow}>{content.introduction.eyebrow}</div>
            <h2>{content.introduction.heading}</h2>
          </div>
          <p>{content.introduction.body}</p>
        </div>
        <div className={styles.memberGrid}>
          {imageLedMembers.map((member, index) => (
            <div className={`reveal delay-${Math.min(index + 1, 4)}`} key={member.name}>
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
