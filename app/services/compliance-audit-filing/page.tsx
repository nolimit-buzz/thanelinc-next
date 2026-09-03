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
  title: "Compliance Audit & Filing",
  description: "Your annual Compliance Audit Returns, filed through Thanelinc's licensed DPCO ahead of the applicable deadline.",
};

async function Content() {
  const content = mapServiceDetail(await fetchServiceDetailSections("compliance-audit-filing"));
  if (!content) return <ContentUnavailable />;
  return <ServicePageTemplate content={content} icon={<ServiceRowIcon name="folder" size={40} />} />;
}

export default function ComplianceAuditFilingPage() {
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
