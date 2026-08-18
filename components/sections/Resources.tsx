import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AbstractPanel } from "@/components/panels/AbstractPanel";
import { resources } from "@/lib/content/home";

function reviewed(iso: string) {
  return new Date(iso)
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    .toUpperCase();
}

export function Resources() {
  return (
    <section className="bg-mineral-canvas py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Eyebrow>{resources.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-headline-dark">
            {resources.heading}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {resources.items.map((r) => (
            <Link key={r.id} href={r.href} className="group flex flex-col gap-4">
              <AbstractPanel
                kind={r.panel}
                className="aspect-[16/10] rounded-xl transition-transform duration-300 group-hover:-translate-y-1"
              />
              {/* "Reviewed", not "Published" — evergreen regulatory explainers
                  age badly with a publish date. */}
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-headline-teal">
                Reviewed {reviewed(r.lastReviewed)}
              </p>
              <h3 className="flex items-start gap-2 text-base font-bold leading-snug text-headline-dark">
                <span className="flex-1">{r.title}</span>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-headline-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </h3>
              <p className="text-sm leading-relaxed text-body">{r.body}</p>
            </Link>
          ))}
        </div>

        <div><Button cta={resources.cta} /></div>
      </Container>
    </section>
  );
}
