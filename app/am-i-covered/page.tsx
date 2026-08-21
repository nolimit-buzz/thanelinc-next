import { AmICovered } from "@/components/tools/AmICovered";

export const metadata = {
  title: "Am I Covered? — NDPC Compliance Category Self-Check",
  description:
    "Answer six questions to find out your NDPC compliance category, whether you must file through a licensed DPCO, and your deadline.",
};

export default function AmICoveredPage() {
  // AmICovered manages its own chrome per step: the question flow shows only
  // the logo (no nav/footer distraction, per client direction); the result
  // screen shows the full SiteNav/SiteFooter.
  return <AmICovered />;
}
