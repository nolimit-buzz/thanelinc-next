import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { legalDocumentBySlug } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Operational draft terms for use of the Thanelinc website.",
};

export default function TermsPage() {
  return <LegalDocument document={legalDocumentBySlug("terms")} />;
}
