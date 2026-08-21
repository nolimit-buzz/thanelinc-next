import { SiteNav } from "@/components/SiteNav";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { complianceAuditFilingContent } from "@/lib/content/services/complianceAuditFiling";

export const metadata = {
  title: "Compliance Audit & Filing",
  description: "Your annual Compliance Audit Returns, filed through Thanelinc's licensed DPCO ahead of the applicable deadline.",
};

export default function ComplianceAuditFilingPage() {
  return (
    <>
      <SiteNav variant="light" />
      <ServicePageTemplate content={complianceAuditFilingContent} icon={<ServiceRowIcon name="folder" size={40} />} />
      <SiteFooter />
    </>
  );
}
