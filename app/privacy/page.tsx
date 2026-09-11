import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ContentUnavailable } from "@/components/v5/ContentUnavailable";
import { HomeLoading } from "@/components/v5/HomeLoading";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { fetchLegalSections } from "@/lib/cms/client";
import { mapLegalPage } from "@/lib/cms/mapLegal";
import { legalPageMetaBySlug } from "@/lib/content/legal";

const meta = legalPageMetaBySlug("privacy");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
};

async function PrivacyContent() {
  const sections = await fetchLegalSections("privacy");
  const cms = mapLegalPage(sections, "privacy");
  console.log(`[cms] privacy page: ${cms ? "live" : "missing"}`);

  if (!cms) return <ContentUnavailable />;
  return <LegalDocument document={{ slug: meta.slug, navLabel: meta.navLabel, title: meta.title, summary: meta.summary, ...cms }} />;
}

export default function PrivacyRoute() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <PrivacyContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
