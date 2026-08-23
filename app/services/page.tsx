import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/v5/SiteFooter";
import { ServicesDirectory } from "@/components/services/ServicesDirectory";
import { services } from "@/lib/content/servicesIndex";

export const metadata = {
  title: "Compliance Services",
  description: "Eight services, from registration to ongoing monitoring — each with a stated deliverable and turnaround.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteNav variant="light" splitHero />
      <ServicesDirectory services={services} />
      <SiteFooter />
    </>
  );
}
