import type { Metadata } from "next";
import { ResourcesLibraryPage } from "@/components/resources/ResourcesLibraryPage";

export const metadata: Metadata = { title: "Resources & Explainers", description: "Practical explainers and future compliance insights from Thanelinc." };

export default function ResourcesPage() { return <ResourcesLibraryPage />; }
