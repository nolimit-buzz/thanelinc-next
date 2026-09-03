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
  title: "Outsourced DPO",
  description: "A qualified Data Protection Officer of record, without the full-time hire.",
};

async function Content() {
  const content = mapServiceDetail(await fetchServiceDetailSections("outsourced-dpo"));
  if (!content) return <ContentUnavailable />;
  return <ServicePageTemplate content={content} icon={<ServiceRowIcon name="shield" size={40} />} />;
}

export default function OutsourcedDpoPage() {
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
