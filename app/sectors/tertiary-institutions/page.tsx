import { Suspense } from "react";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { GuidedSectorPageTemplate } from "@/components/sectors/GuidedSectorPageTemplate";
import { fetchSectorDetailSections } from "@/lib/cms/client";
import { mapSectorDetail } from "@/lib/cms/mapSectorDetail";
import { sectorsTertiaryInstitutionsContent } from "@/lib/content/sectorsTertiaryInstitutions";

// Metadata stays on the content module: it is read outside the request that
// awaits the CMS fetch, so sourcing it from Strapi would mean a second call.
// Same compromise as the service detail pages.
export const metadata = {
  title: sectorsTertiaryInstitutionsContent.title,
  description: sectorsTertiaryInstitutionsContent.summary,
};

async function TertiaryInstitutionsContent() {
  const content = mapSectorDetail(await fetchSectorDetailSections("tertiary-institutions"));
  console.log(`[cms] tertiary-institutions page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <GuidedSectorPageTemplate content={content} />;
}

/**
 * Rebuilt on the shared sector template 2026-08-20 (W-028), superseding the
 * ported v5 tertiary drawer for this route only. `components/v5/TertiaryView.tsx`
 * is deliberately left in the repository so the port stays recoverable.
 */
export default function TertiaryInstitutions() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <TertiaryInstitutionsContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
