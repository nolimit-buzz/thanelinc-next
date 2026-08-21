import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { breachResponseContent } from "@/lib/content/services/breachResponse";

export const metadata = {
  title: "Breach Response",
  description: "Think you've had a data breach? Call now. Same-day response.",
};

/** Unlike registration's, this block restated nothing — the number and the
 *  out-of-hours sentence appear nowhere else — so it moves into the merged
 *  "What you get" card verbatim rather than being dropped. Colours flip for
 *  that card's dark ground; W-007 keeps the number the loudest element. */
function BreachCallBlock() {
  return (
    <div>
      <div className="breach-clock-box" style={{ display: "inline-flex", marginBottom: "20px" }}>
        <span className="breach-pulse-dot" />
        <span>SAME-DAY RESPONSE</span>
      </div>
      <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "8px" }}>
        0913 016 2558
      </div>
      <p style={{ fontSize: "0.9rem", color: "#CBD5E1", margin: 0 }}>
        Thanelinc&apos;s general company line. Outside business hours, leave a message — you&apos;ll be called back the same working day.
      </p>
    </div>
  );
}

export default function BreachResponsePage() {
  return (
    <>
      <SiteNav />
      <ServicePageTemplate content={breachResponseContent} icon={<BreachCallBlock />} />
      <SiteFooter />
    </>
  );
}
