import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import type { ServiceRow } from "@/lib/content/servicesIndex";

const CHAMFER = "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)";

/**
 * The accent box in each solution row — was duplicating the row's own
 * title/description/CTA inside a second card (`LandscapeServiceCard`,
 * reusing the homepage's full `.service-seamless-card`). Client feedback:
 * that's a repeat of the service card, not what was asked — just the
 * animated icon, on the service's own colour, no text at all.
 *
 * Keeps the 4 bespoke stage animations from the homepage (seal/folder/
 * shield/breach) for the 4 services that have one; the other 4 get the
 * plain `ServiceRowIcon` glyph — same reasoning as before, no new
 * animation or photography invented for services that never had one.
 */

const STAGE_BY_SLUG: Record<string, "seal" | "folder" | "shield" | "breach"> = {
  "ndpc-registration": "seal",
  "compliance-audit-filing": "folder",
  "outsourced-dpo": "shield",
  "breach-response": "breach",
};

export function IconAccentBox({ service }: { service: ServiceRow }) {
  const stage = STAGE_BY_SLUG[service.slug];

  return (
    <div
      style={{
        background: service.shade,
        clipPath: CHAMFER,
        minHeight: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {stage === "seal" ? (
        <div className="seal-stage">
          <div className="seal-circle-pulse"></div>
          <div className="seal-center-badge">
            <ServiceRowIcon name={service.icon} size={22} />
          </div>
        </div>
      ) : stage === "folder" ? (
        <div className="folder-stage">
          <div className="folder-back"></div>
          <div className="folder-sheet-2"></div>
          <div className="folder-sheet-1"></div>
          <div className="folder-front">
            <span className="folder-badge-verified">✓ FILED</span>
          </div>
        </div>
      ) : stage === "shield" ? (
        <div className="shield-stage">
          <div className="shield-radar-ring"></div>
          <div className="shield-radar-ring"></div>
          <div className="shield-icon-center">
            <ServiceRowIcon name={service.icon} size={20} />
          </div>
        </div>
      ) : stage === "breach" ? (
        <div className="breach-stage">
          <div className="breach-clock-box">
            <div className="breach-pulse-dot"></div>
            <span>SAME-DAY</span>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
          }}
        >
          <ServiceRowIcon name={service.icon} size={30} />
        </div>
      )}
    </div>
  );
}
