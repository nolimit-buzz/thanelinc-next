import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { sectorDoors } from "@/lib/content/home";

export function SectorDoors() {
  return (
    <section className="bg-surface py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Eyebrow>{sectorDoors.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-headline-dark">
            {sectorDoors.heading}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {sectorDoors.doors.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              className="group flex flex-col gap-4 rounded-2xl border border-border-subtle bg-mineral-canvas p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal-accent"
            >
              <h3 className="text-xl font-bold text-headline-dark">{d.label}</h3>
              <p className="flex-1 text-sm leading-relaxed text-body">{d.body}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-headline-teal">
                {d.linkLabel}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
