import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "./v5.css";

// Self-hosted via next/font — no external font CDN request.
// Deliberate: a data protection firm's site should not hand visitor IPs to a
// third party for a typeface.
const outfit = Outfit({
  variable: "--nf-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Thanelinc — NDPC-Licensed Data Protection Compliance Organization",
    template: "%s · Thanelinc",
  },
  description:
    "Thanelinc is an NDPC-licensed DPCO. Find out if your organisation must register and file with the NDPC, and get it done on a stated timeline.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={`${outfit.variable} h-full antialiased`}
    >
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to
          <body> before React hydrates, which React reports as a mismatch. This
          suppresses that noise only; it does not mask app-level mismatches. */}
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
