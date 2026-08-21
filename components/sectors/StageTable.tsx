import styles from "@/components/sectors/sector-page.module.css";

export interface StageRow {
  step: string;
  category: string;
  title: string;
  description: string;
}

export function StageTable({ rows }: { rows: StageRow[] }) {
  return (
    <div className={styles.tableRegion} role="region" aria-label="Engagement stages" tabIndex={0}>
      <div className={styles.tableInner}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th scope="col">Stage</th>
              <th scope="col">Focus</th>
              <th scope="col">What this covers</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.step}>
                <td style={{ whiteSpace: "nowrap" }}>
                  <span aria-hidden className={styles.tableNumber}>{i + 1}</span>
                  <span className="ui-tag-status ui-tag-teal">{row.category}</span>
                </td>
                <td style={{ color: "#334155", fontWeight: 600, whiteSpace: "nowrap" }}>{row.title}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
