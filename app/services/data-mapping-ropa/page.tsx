import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { dataMappingRopaContent } from "@/lib/content/services/dataMappingRopa";

export const metadata = {
  title: "Data Mapping & ROPA",
  description: "Your complete Record of Processing Activities, delivered within 24 hours.",
};

export default function DataMappingRopaPage() {
  return (
    <>
      <SiteNav variant="light" />
      <ServicePageTemplate
        content={dataMappingRopaContent}
        icon={
          <span style={{ color: "var(--color-teal-accent)", display: "inline-block" }}>
            <ServiceRowIcon name="map" size={40} />
          </span>
        }
      />
      <SiteFooter />
    </>
  );
}
