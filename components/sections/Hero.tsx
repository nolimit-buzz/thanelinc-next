import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hero } from "@/lib/content/home";
import { ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mineral-canvas">
      {/* Right-hand forest slate block — the architectural split */}
      <div
        className="absolute inset-y-0 right-0 hidden w-[38%] bg-forest-dark lg:block"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="max-w-[14ch] text-4xl font-bold leading-[1.08] tracking-tight text-headline-dark sm:text-5xl lg:text-[3.4rem]">
            {hero.headlineLead}{" "}
            <span className="text-headline-teal">{hero.headlineAccent}</span>
          </h1>
          <p className="max-w-[58ch] text-base leading-relaxed text-body">{hero.lede}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {hero.ctas.map((c) => (
              <Button
                key={c.href}
                cta={c}
                className={c.variant === "secondary" ? "!text-headline-dark" : ""}
              />
            ))}
          </div>
        </div>

        {/* Chamfered credential card */}
        <div className="relative">
          <div
            className="relative aspect-[4/5] overflow-hidden bg-forest-surface p-8 shadow-2xl"
            style={{ clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%)" }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <div className="relative flex size-28 items-center justify-center rounded-full border border-teal-accent/50">
                <span
                  className="absolute inset-2 rounded-full border border-teal-accent/25"
                  aria-hidden="true"
                />
                <ShieldCheck className="size-9 text-teal-accent" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/55">
                  Nigeria Data Protection Commission
                </p>
                <p className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-teal-accent">
                  Licensed DPCO
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
