import { RegulatedBusinesses } from "@/components/sectors/RegulatedBusinesses";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ScrollReveals } from "@/components/v5/ScrollReveals";
import { SiteNav } from "@/components/SiteNav";

export const metadata = {
  title: "NDPA Compliance for Regulated Businesses | Thanelinc",
  description:
    "Fintech, telecoms, insurance, retail, health, and logistics companies — find out your NDPC category, your exposure, and how fast this can be done.",
};

export default function RegulatedBusinessesPage() {
  return (
    <>
      <SiteNav />
      <div style={{ paddingTop: "64px" }}>
        <RegulatedBusinesses />
      </div>
      <SiteFooter />
      <ScrollReveals />
    </>
  );
}
