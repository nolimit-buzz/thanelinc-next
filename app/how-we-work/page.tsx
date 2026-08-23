import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { HowWeWorkPage } from "@/components/how-we-work/HowWeWorkPage";
import { howWeWorkContent } from "@/lib/content/howWeWork";

export const metadata = {
  title: howWeWorkContent.title,
  description: howWeWorkContent.summary,
};

export default function HowWeWorkRoute() {
  return (
    <>
      <SiteNav variant="light" />
      <HowWeWorkPage content={howWeWorkContent} />
      <SiteFooter />
    </>
  );
}
