import styles from "@/components/sectors/sector-page.module.css";

export interface TurnaroundStep {
  step: string;
  deliverable: string;
  turnaround: string;
}

export function TurnaroundTracker({ steps }: { steps: TurnaroundStep[] }) {
  return (
    <div className={styles.tableRegion} role="region" aria-label="Service turnarounds" tabIndex={0}>
      <div className={styles.tableInner}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Deliverable</th>
              <th scope="col">Turnaround</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((row, i) => (
              <tr key={row.step}>
                <td style={{ color: "#334155", fontWeight: 600, whiteSpace: "nowrap" }}>
                  <span aria-hidden className={styles.tableNumber}>{i + 1}</span>
                  {row.step}
                </td>
                <td>{row.deliverable}</td>
                <td><span className="ui-tag-status ui-tag-teal">{row.turnaround}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
