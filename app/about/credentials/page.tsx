import { SiteFooter } from "@/components/v5/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CredentialsPage } from "@/components/about/CredentialsPage";
import { credentialsPageContent } from "@/lib/content/credentials";

export const metadata = { title: credentialsPageContent.title, description: credentialsPageContent.summary };

export default function CredentialsRoute() {
  return <><SiteNav variant="light" /><CredentialsPage content={credentialsPageContent} /><SiteFooter /></>;
}
