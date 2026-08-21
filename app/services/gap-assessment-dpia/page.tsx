import { SiteNav } from "@/components/SiteNav";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { gapAssessmentDpiaContent } from "@/lib/content/services/gapAssessmentDpia";

export const metadata = {
  title: "Gap Assessment & DPIA",
  description: "Know exactly where you fall short of NDPA requirements — gap report in 24 hours, DPIA in 72.",
};

export default function GapAssessmentDpiaPage() {
  return (
    <>
      <SiteNav variant="light" />
      <ServicePageTemplate content={gapAssessmentDpiaContent} icon={<ServiceRowIcon name="search" size={40} />} />
      <SiteFooter />
    </>
  );
}
