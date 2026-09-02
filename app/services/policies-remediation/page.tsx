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
  title: "Policies & Remediation",
  description: "Close every gap the assessment found — a full policy suite delivered within 96 hours.",
};

async function Content() {
  const content = mapServiceDetail(await fetchServiceDetailSections("policies-remediation"));
  if (!content) return <ContentUnavailable />;
  return <ServicePageTemplate content={content} icon={<ServiceRowIcon name="document" size={40} />} />;
}

export default function PoliciesRemediationPage() {
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
