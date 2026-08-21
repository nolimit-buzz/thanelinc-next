import { SiteNav } from "@/components/SiteNav";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { policiesRemediationContent } from "@/lib/content/services/policiesRemediation";

export const metadata = {
  title: "Policies & Remediation",
  description: "Close every gap the assessment found — a full policy suite delivered within 96 hours.",
};

export default function PoliciesRemediationPage() {
  return (
    <>
      <SiteNav variant="light" />
      <ServicePageTemplate content={policiesRemediationContent} icon={<ServiceRowIcon name="document" size={40} />} />
      <SiteFooter />
    </>
  );
}
