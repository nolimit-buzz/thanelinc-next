import { Suspense } from "react";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { GuidedSectorPageTemplate } from "@/components/sectors/GuidedSectorPageTemplate";
import { fetchSectorDetailSections } from "@/lib/cms/client";
import { mapSectorDetail } from "@/lib/cms/mapSectorDetail";

export const metadata = {
  title: "NDPA Compliance for Regulated Businesses",
  description:
    "Fintech, telecoms, insurance, retail, health, and logistics companies — find out your NDPC category, your exposure, and how fast this can be done.",
};

/**
 * `/sectors/regulated-businesses` — the content binding that used to live in
 * `components/sectors/RegulatedBusinesses.tsx` is now the CMS mapper. The
 * closing heading no longer needs a string split: `headingLead` and
 * `headingAccent` are separate fields in Strapi.
 */
async function RegulatedBusinessesContent() {
  const content = mapSectorDetail(await fetchSectorDetailSections("regulated-businesses"));
  console.log(`[cms] regulated-businesses page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <GuidedSectorPageTemplate content={content} />;
}

export default function RegulatedBusinessesPage() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <RegulatedBusinessesContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
