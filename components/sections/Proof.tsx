import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { proof } from "@/lib/content/home";

export function Proof() {
  return (
    <section className="bg-mineral-canvas py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Eyebrow>{proof.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-headline-dark">{proof.heading}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {proof.items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface p-8"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-headline-teal">
                {item.engagement}
              </p>
              <h3 className="text-xl font-bold text-headline-dark">{item.client}</h3>
              <p className="text-sm leading-relaxed text-body">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
