import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { AboutPage } from "@/components/about/AboutPage";
import { aboutPageContent } from "@/lib/content/about";
import { credentialsPageContent } from "@/lib/content/credentials";
import { teamPageContent } from "@/lib/content/team";

export const metadata = { title: aboutPageContent.title, description: aboutPageContent.summary };

export default function AboutRoute() {
  return <><SiteNav variant="light" /><AboutPage content={aboutPageContent} credentialsContent={credentialsPageContent} teamContent={teamPageContent} /><SiteFooter /></>;
}
