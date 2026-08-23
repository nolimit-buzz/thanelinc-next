import type { TeamMember } from "@/lib/content/team";
import styles from "@/components/about/about.module.css";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  if (member.disclosureStatus !== "cleared") return null;

  return (
    <article className={styles.memberCard}>
      <div className={styles.memberMonogram} aria-hidden>{member.name.split(" ").map((part) => part[0]).join("")}</div>
      <div>
        <h2>{member.name}</h2>
        {member.role ? <p className={styles.memberRole}>{member.role}</p> : null}
        <div className={styles.credentialList}>{member.credentials.map((credential) => <span key={credential}>{credential}</span>)}</div>
        {member.biography ? <p>{member.biography}</p> : null}
      </div>
    </article>
  );
}
