import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AbstractPanel } from "@/components/panels/AbstractPanel";
import { problem } from "@/lib/content/home";

export function Problem() {
  const [a, b, c, d] = problem.pains;
  return (
    <section className="bg-mineral-canvas py-20">
      <Container>
        {/* Elevated header card */}
        <div className="rounded-2xl bg-surface p-8 shadow-sm sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="flex flex-col gap-4">
              <Eyebrow>{problem.eyebrow}</Eyebrow>
              <h2 className="max-w-[18ch] text-3xl font-bold leading-tight tracking-tight text-headline-dark sm:text-4xl">
                {problem.heading}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-body sm:text-base">{problem.statLine}</p>
          </div>
        </div>

        {/* Four pains around a central panel */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.05fr_1fr]">
          <div className="flex flex-col gap-6">
            <PainCard {...a} />
            <PainCard {...b} />
          </div>
          <AbstractPanel kind="redaction" className="min-h-[280px] rounded-2xl" />
          <div className="flex flex-col gap-6">
            <PainCard {...c} />
            <PainCard {...d} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function PainCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-2xl border border-border-subtle bg-surface p-6">
      <h3 className="text-base font-bold text-headline-dark">{title}</h3>
      <p className="text-sm leading-relaxed text-body">{body}</p>
    </div>
  );
}
