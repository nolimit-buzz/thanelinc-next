/**
 * Abstract content panels — CSS/SVG only.
 *
 * These replace stock photography. Thanelinc has no licensed imagery, and a
 * stock or AI-generated face on a data protection firm's site reads as staff or
 * a client. Each panel encodes something true about its subject instead, which
 * a stock photo could not do.
 */

type PanelKind = "redaction" | "map" | "strata";

export function AbstractPanel({
  kind,
  className = "",
}: {
  kind: PanelKind;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-forest-dark p-8 ${className}`}
      aria-hidden="true"
    >
      {kind === "redaction" && <Redaction />}
      {kind === "map" && <DataMap />}
      {kind === "strata" && <Strata />}
    </div>
  );
}

/** Records, partly protected. Redaction is uniquely data protection. */
function Redaction() {
  const rows: { w: string; tone: "on" | "mid" | "off" }[][] = [
    [{ w: "22%", tone: "mid" }, { w: "44%", tone: "off" }, { w: "18%", tone: "off" }],
    [{ w: "30%", tone: "off" }, { w: "38%", tone: "on" }, { w: "16%", tone: "off" }],
    [{ w: "52%", tone: "mid" }, { w: "24%", tone: "off" }],
    [{ w: "26%", tone: "on" }, { w: "34%", tone: "off" }, { w: "22%", tone: "off" }],
    [{ w: "40%", tone: "off" }, { w: "30%", tone: "mid" }],
    [{ w: "18%", tone: "off" }, { w: "46%", tone: "on" }, { w: "20%", tone: "off" }],
    [{ w: "36%", tone: "mid" }, { w: "28%", tone: "off" }, { w: "24%", tone: "off" }],
  ];
  const tones = {
    on: "bg-teal-accent shadow-[0_0_14px_rgba(28,176,184,0.35)]",
    mid: "bg-white/25",
    off: "bg-white/10",
  };
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2.5">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          {row.map((bar, j) => (
            <span
              key={j}
              className={`h-2 rounded-sm ${tones[bar.tone]}`}
              style={{ width: bar.w }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Records across disconnected systems, mapped nodes lit. This is a ROPA. */
function DataMap() {
  const edges = [
    [60, 70, 150, 120], [150, 120, 240, 85], [60, 70, 55, 180],
    [150, 120, 120, 230], [215, 200, 245, 300], [120, 230, 70, 300],
    [55, 180, 120, 230], [245, 300, 150, 330], [70, 300, 150, 330],
    [240, 85, 215, 200],
  ];
  const hotEdges = [[150, 120, 215, 200], [120, 230, 215, 200]];
  const cold = [[60, 70], [240, 85], [55, 180], [70, 300], [245, 300], [150, 330]];
  const hot = [[150, 120], [215, 200], [120, 230]];

  return (
    <svg viewBox="0 0 300 375" className="h-full w-full max-w-[260px]">
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      ))}
      {hotEdges.map(([x1, y1, x2, y2], i) => (
        <line key={`h${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(28,176,184,0.5)" strokeWidth="1" />
      ))}
      {cold.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="rgba(255,255,255,0.3)" />
      ))}
      {hot.map(([cx, cy], i) => (
        <circle key={`n${i}`} cx={cx} cy={cy} r={i === 2 ? 5.5 : 7} fill="#1CB0B8" />
      ))}
    </svg>
  );
}

/** The three statutory tiers as weighted bands. */
function Strata() {
  const bands = [
    { label: "OHL", note: "Ordinary High Level", h: "h-12", cls: "bg-white/[0.07] text-white/45" },
    { label: "EHL", note: "Enhanced High Level", h: "h-16", cls: "bg-white/[0.13] text-white/60" },
    {
      label: "UHL",
      note: "Upper High Level",
      h: "h-20",
      cls: "bg-gradient-to-br from-teal-accent to-[#128e95] font-bold text-[#02191b] shadow-[0_8px_28px_-6px_rgba(28,176,184,0.45)]",
    },
  ];
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2.5">
      {bands.map((b) => (
        <div
          key={b.label}
          className={`flex items-center justify-between rounded-md px-4 font-mono text-[0.7rem] tracking-[0.1em] ${b.h} ${b.cls}`}
        >
          <span>{b.label}</span>
          <span className="text-[0.6rem] opacity-75">{b.note}</span>
        </div>
      ))}
    </div>
  );
}
