import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { legalDocumentBySlug } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Operational draft cookie policy for the Thanelinc website.",
};

export default function CookiePolicyPage() {
  return <LegalDocument document={legalDocumentBySlug("cookie-policy")} />;
}
