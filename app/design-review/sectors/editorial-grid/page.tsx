import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialGridPreview } from "@/components/design-review/SectorDesignPreview";
import { regulatedBusinessesPageContent } from "@/components/sectors/RegulatedBusinesses";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";

export const metadata: Metadata = { title: "Sector Preview — Editorial Evidence Grid", robots: { index: false, follow: false } };

export default function EditorialGridPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <><SiteNav variant="light" /><EditorialGridPreview content={regulatedBusinessesPageContent} /><SiteFooter /></>;
}
