import { Suspense } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { ServicesDirectory } from "@/components/services/ServicesDirectory";
import { fetchServicesSections } from "@/lib/cms/client";
import { mapServicesPage } from "@/lib/cms/mapServices";

export const metadata = {
  title: "Compliance Services",
  description: "Eight services, from registration to ongoing monitoring — each with a stated deliverable and turnaround.",
};

/**
 * Page copy is fetched from the Strapi CMS (`services` single type, with retry
 * on transient failure — see lib/cms/client.ts) with no fallback content.
 * Wrapped in Suspense so the fetch/retry window shows a loader, matching the
 * homepage.
 */
async function ServicesContent() {
  const content = mapServicesPage(await fetchServicesSections());
  console.log(`[cms] services page: ${content ? "live" : "missing"}`);

  if (!content) return <ContentUnavailable />;
  return <ServicesDirectory content={content} />;
}

export default function ServicesPage() {
  return (
    <>
      <SiteNav variant="light" splitHero />
      <Suspense fallback={<HomeLoading />}>
        <ServicesContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
