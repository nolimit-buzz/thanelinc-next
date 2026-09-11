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

const meta = legalPageMetaBySlug("cookie-policy");

export const metadata: Metadata = {
  title: meta.title,
  description: "Operational draft cookie policy for the Thanelinc website.",
};

async function CookiePolicyContent() {
  const sections = await fetchLegalSections("cookie-policy");
  const cms = mapLegalPage(sections, "cookie-policy");
  console.log(`[cms] cookie-policy page: ${cms ? "live" : "missing"}`);

  if (!cms) return <ContentUnavailable />;
  return <LegalDocument document={{ slug: meta.slug, navLabel: meta.navLabel, title: meta.title, summary: meta.summary, ...cms }} />;
}

export default function CookiePolicyRoute() {
  return (
    <>
      <SiteNav variant="light" />
      <Suspense fallback={<HomeLoading />}>
        <CookiePolicyContent />
      </Suspense>
      <SiteFooter />
    </>
  );
}
