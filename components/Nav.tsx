import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { nav } from "@/lib/content/home";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-forest-dark/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-8 py-4">
        <Link href="/" className="font-bold text-lg tracking-tight text-white">
          THANELINC<span className="text-teal-accent">.</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Button cta={nav.cta} withArrow={false} className="!px-5 !py-2 text-xs" />
      </Container>
    </header>
  );
}
