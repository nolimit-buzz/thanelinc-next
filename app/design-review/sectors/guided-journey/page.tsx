import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidedJourneyPreview } from "@/components/design-review/SectorDesignPreview";
import { regulatedBusinessesPageContent } from "@/components/sectors/RegulatedBusinesses";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";

export const metadata: Metadata = { title: "Sector Preview — Guided Audience Journey", robots: { index: false, follow: false } };

export default function GuidedJourneyPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <><SiteNav variant="light" /><GuidedJourneyPreview content={regulatedBusinessesPageContent} /><SiteFooter /></>;
}
