import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { selfCheck } from "@/lib/content/home";

export function SelfCheckBand() {
  return (
    <section className="bg-forest-dark py-16 text-white">
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="max-w-[20ch] text-2xl font-bold tracking-tight sm:text-3xl">
            {selfCheck.heading}
          </h2>
          <p className="max-w-[56ch] text-sm leading-relaxed text-white/70">{selfCheck.body}</p>
        </div>
        <Button cta={selfCheck.cta} />
      </Container>
    </section>
  );
}
