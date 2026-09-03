import { Suspense } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { SectorsDirectory } from "@/components/sectors/SectorsDirectory";
import { fetchSectorsSections } from "@/lib/cms/client";
import { mapSectorsPage } from "@/lib/cms/mapSectors";

export const metadata = {
  title: "Who We Serve",
  description:
    "Sector-specific NDPA compliance guidance for higher institutions, regulated private businesses, and public sector bodies in Nigeria.",
};

/**
 * Page copy is fetched from the Strapi CMS (`sectors` single type) with no
 * fallback content — same seam as /services.
 */
async function SectorsContent() {
  const content = mapSectorsPage(await fetchSectorsSections());
  console.log(`[cms] sectors page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <SectorsDirectory content={content} />;
}

export default function SectorsPage() {
  return (
    <>
      <SiteNav variant="light" splitHero />
      <Suspense fallback={<HomeLoading />}>
        <SectorsContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
