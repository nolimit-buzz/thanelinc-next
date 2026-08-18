import Link from "next/link";
import { ArrowUpRight, ShieldCheck, FolderClosed, UserRoundCheck, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/lib/content/home";

const icons = {
  "shield-check": ShieldCheck,
  folder: FolderClosed,
  "user-shield": UserRoundCheck,
  alert: TriangleAlert,
} as const;

export function Services() {
  return (
    <section className="bg-forest-dark py-20 text-white">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow onDark centered>
            {services.eyebrow}
          </Eyebrow>
          <h2 className="max-w-[24ch] text-3xl font-bold tracking-tight sm:text-4xl">
            {services.heading}
          </h2>
        </div>

        {/* Four in a single row — the layout the 2×2 grid got wrong */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((s) => {
            const Icon = icons[s.icon as keyof typeof icons];
            return (
              <Link
                key={s.id}
                href={s.href}
                className="group flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-accent/60 hover:bg-white/[0.07]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-teal-accent/12 text-teal-accent transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold leading-snug">{s.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-white/65">{s.body}</p>
                {/* "What you get" — deliberately not "Turnaround". Only two of
                    these four have a true turnaround figure. */}
                <p className="border-t border-white/10 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.07em] text-teal-accent">
                  {s.whatYouGet}
                </p>
                <ArrowUpRight
                  className="size-4 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-accent"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Load-bearing for R9 — keeps the other four services reachable. */}
        <div className="flex justify-center">
          <Button
            cta={services.allServicesLink}
            className="!border-white/25 !text-white hover:!border-teal-accent hover:!text-teal-accent"
          />
        </div>
      </Container>
    </section>
  );
}
