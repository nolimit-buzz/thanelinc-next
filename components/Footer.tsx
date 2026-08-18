import Link from "next/link";
import { ExternalLink } from "lucide-react";

/** lucide-react removed brand icons, so LinkedIn is inline. */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/content/home";

export function Footer() {
  return (
    <footer className="bg-forest-dark text-white/70">
      {/* Tagline band */}
      <Container className="flex flex-col gap-8 border-b border-white/10 py-14 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="max-w-[16ch] text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {footer.tagline.lead}{" "}
          <span className="text-teal-accent">{footer.tagline.accent}</span>{" "}
          {footer.tagline.trail}
        </h2>
        <div className="flex flex-wrap gap-3">
          {footer.ctas.map((c) => (
            <Button key={c.href} cta={c} withArrow={false} />
          ))}
        </div>
      </Container>

      {/* Brand + columns */}
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="flex flex-col items-start gap-4">
          <span className="text-lg font-bold tracking-tight text-white">
            THANELINC<span className="text-teal-accent">.</span>
          </span>
          <p className="max-w-[34ch] text-sm leading-relaxed">{footer.descriptor}</p>
          <Link
            href="https://www.linkedin.com/"
            aria-label="Thanelinc on LinkedIn"
            className="text-teal-accent transition-opacity hover:opacity-75"
          >
            <LinkedInIcon className="size-5" />
          </Link>
          {/* Pill carries the credential link — cross-linking rule R8. */}
          <Link
            href={footer.credentialLink.href}
            className="inline-flex items-center gap-2 rounded-full border border-teal-accent/40 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-teal-accent transition-colors hover:bg-teal-accent/10"
          >
            <span className="size-1.5 rounded-full bg-teal-accent" aria-hidden="true" />
            {footer.credentialLink.label}
            <ExternalLink className="size-3" aria-hidden="true" />
          </Link>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-teal-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 font-mono text-[0.68rem] tracking-[0.05em]">
        <span>{footer.legal.copyright}</span>
        <span>{footer.legal.domain}</span>
        <span>{footer.legal.credit}</span>
      </Container>
    </footer>
  );
}
