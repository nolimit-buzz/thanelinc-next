import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { legalDocumentBySlug } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Operational draft privacy policy for the Thanelinc website.",
};

export default function PrivacyPage() {
  return <LegalDocument document={legalDocumentBySlug("privacy")} />;
}
