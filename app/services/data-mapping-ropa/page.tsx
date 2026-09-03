import { Suspense } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { ServiceRowIcon } from "@/components/services/ServiceRowIcon";
import { fetchServiceDetailSections } from "@/lib/cms/client";
import { mapServiceDetail } from "@/lib/cms/mapServiceDetail";

export const metadata = {
  title: "Data Mapping & ROPA",
  description: "Your complete Record of Processing Activities, delivered within 24 hours.",
};

async function Content() {
  const content = mapServiceDetail(await fetchServiceDetailSections("data-mapping-ropa"));
  if (!content) return <ContentUnavailable />;
  return (
    <ServicePageTemplate
      content={content}
      icon={
        <span style={{ color: "var(--color-teal-accent)", display: "inline-block" }}>
          <ServiceRowIcon name="map" size={40} />
        </span>
      }
    />
  );
}

export default function DataMappingRopaPage() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <Content />
      </Suspense>
      <SiteFooter />
    </>
  );
}
