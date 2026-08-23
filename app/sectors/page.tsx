import { SiteNav } from "@/components/SiteNav";
import { SectorsDirectory } from "@/components/sectors/SectorsDirectory";
import { SiteFooter } from "@/components/v5/SiteFooter";

export const metadata = {
  title: "Who We Serve",
  description:
    "Sector-specific NDPA compliance guidance for higher institutions and regulated private businesses in Nigeria.",
};

export default function SectorsPage() {
  return (
    <>
      <SiteNav variant="light" splitHero />
      <SectorsDirectory />
      <SiteFooter />
    </>
  );
}
