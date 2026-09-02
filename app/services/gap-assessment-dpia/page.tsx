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
  title: "Gap Assessment & DPIA",
  description: "Know exactly where you fall short of NDPA requirements — gap report in 24 hours, DPIA in 72.",
};

async function Content() {
  const content = mapServiceDetail(await fetchServiceDetailSections("gap-assessment-dpia"));
  if (!content) return <ContentUnavailable />;
  return <ServicePageTemplate content={content} icon={<ServiceRowIcon name="search" size={40} />} />;
}

export default function GapAssessmentDpiaPage() {
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
