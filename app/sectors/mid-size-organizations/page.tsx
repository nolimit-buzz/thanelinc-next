import { Suspense } from "react";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { GuidedSectorPageTemplate } from "@/components/sectors/GuidedSectorPageTemplate";
import { fetchSectorDetailSections } from "@/lib/cms/client";
import { mapSectorDetail } from "@/lib/cms/mapSectorDetail";
import { sectorsMidSizeOrganizationsContent } from "@/lib/content/sectorsMidSizeOrganizations";

// See the note on /sectors/tertiary-institutions: metadata stays local.
export const metadata = {
  title: sectorsMidSizeOrganizationsContent.title,
  description: sectorsMidSizeOrganizationsContent.summary,
};

/**
 * `/sectors/mid-size-organizations` — the fourth sector route. Same shape as
 * the other three: `mapSectorDetail` reads the component namespace off the
 * payload, so no mapper or template change is needed for a new sector.
 */
async function MidSizeOrganizationsContent() {
  const content = mapSectorDetail(await fetchSectorDetailSections("mid-size-organizations"));
  console.log(`[cms] mid-size-organizations page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <GuidedSectorPageTemplate content={content} />;
}

export default function MidSizeOrganizationsPage() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <MidSizeOrganizationsContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
