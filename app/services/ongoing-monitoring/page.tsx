import { SiteNav } from "@/components/SiteNav";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ongoingMonitoringContent } from "@/lib/content/services/ongoingMonitoring";

export const metadata = {
  title: "Ongoing Monitoring",
  description: "Quarterly review keeps your organisation current as data practices, vendors, and regulatory guidance change.",
};

export default function OngoingMonitoringPage() {
  return (
    <>
      <SiteNav variant="light" />
      <ServicePageTemplate content={ongoingMonitoringContent} icon={<ServiceRowIcon name="refresh" size={40} />} />
      <SiteFooter />
    </>
  );
}
