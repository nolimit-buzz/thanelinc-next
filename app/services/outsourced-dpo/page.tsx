import { SiteNav } from "@/components/SiteNav";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { outsourcedDpoContent } from "@/lib/content/services/outsourcedDpo";

export const metadata = {
  title: "Outsourced DPO",
  description: "A qualified Data Protection Officer of record, without the full-time hire.",
};

export default function OutsourcedDpoPage() {
  return (
    <>
      <SiteNav variant="light" />
      <ServicePageTemplate content={outsourcedDpoContent} icon={<ServiceRowIcon name="shield" size={40} />} />
      <SiteFooter />
    </>
  );
}
