import Link from "next/link";
import type { JourneyStageRow } from "@/lib/content/howWeWork";
import styles from "@/components/how-we-work/how-we-work.module.css";

export function JourneyStageGroup({
  number,
  label,
  title,
  introduction,
  rows,
}: {
  number: string;
  label: string;
  title: string;
  introduction: string;
  rows: JourneyStageRow[];
}) {
  return (
    <article className={`${styles.stage} reveal`}>
      <header className={styles.stageHeader}>
        <div className={styles.stageNumber}>{number}</div>
        <div>
          <div className={styles.stageLabel}>{label}</div>
          <h3>{title}</h3>
          <p>{introduction}</p>
        </div>
      </header>
      <div className={styles.tableRegion} role="region" aria-label={`${title} deliverables`} tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Deliverable</th>
              <th scope="col">Turnaround</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.step}>
                <td>
                  <span className={styles.rowStep}>{row.step}</span>
                  {row.href ? <Link href={row.href}>{row.label}</Link> : row.label}
                </td>
                <td>{row.deliverable}</td>
                <td><span className="ui-tag-status ui-tag-teal">{row.turnaround}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
