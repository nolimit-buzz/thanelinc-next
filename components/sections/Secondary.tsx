import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { secondary } from "@/lib/content/home";

export function Secondary() {
  return (
    <section className="bg-surface py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-forest-dark p-10 text-center text-white sm:p-16">
          <div
            className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-teal-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-center gap-5">
            <Eyebrow onDark centered>{secondary.eyebrow}</Eyebrow>
            <h2 className="max-w-[22ch] text-3xl font-bold tracking-tight sm:text-4xl">
              {secondary.heading}
            </h2>
            <p className="max-w-[56ch] text-sm leading-relaxed text-white/70">{secondary.body}</p>
            <Button cta={secondary.cta} className="mt-2" />
          </div>
        </div>
      </Container>
    </section>
  );
}
