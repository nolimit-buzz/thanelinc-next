import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { GuidedSectorPageTemplate } from "@/components/sectors/GuidedSectorPageTemplate";
import { publicSectorPage, sectorsPublicSectorContent } from "@/lib/content/sectorsPublicSector";

export const metadata = {
  title: sectorsPublicSectorContent.title,
  description: sectorsPublicSectorContent.summary,
};

export default function PublicSectorPage() {
  return (
    <>
      <SiteNav variant="light" />
      <GuidedSectorPageTemplate content={publicSectorPage} />
      <SiteFooter />
    </>
  );
}
