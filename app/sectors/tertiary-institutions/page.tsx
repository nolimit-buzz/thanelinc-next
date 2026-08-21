import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { GuidedSectorPageTemplate } from "@/components/sectors/GuidedSectorPageTemplate";
import { tertiaryInstitutionsPage, sectorsTertiaryInstitutionsContent } from "@/lib/content/sectorsTertiaryInstitutions";

export const metadata = {
  title: sectorsTertiaryInstitutionsContent.title,
  description: sectorsTertiaryInstitutionsContent.summary,
};

/**
 * Rebuilt on the shared sector template 2026-08-20 (W-028), superseding the
 * ported v5 tertiary drawer for this route only. `components/v5/TertiaryView.tsx`
 * is deliberately left in the repository so the port stays recoverable.
 */
export default function TertiaryInstitutions() {
  return (
    <>
      <SiteNav variant="light" />
      <GuidedSectorPageTemplate content={tertiaryInstitutionsPage} />
      <SiteFooter />
    </>
  );
}
