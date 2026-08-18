import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { process } from "@/lib/content/home";

export function Process() {
  return (
    <section className="bg-surface py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <h2 className="max-w-[22ch] text-3xl font-bold tracking-tight text-headline-dark">
            {process.heading}
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border-subtle">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="bg-mineral-canvas">
                {["Step", "Deliverable", "What you get"].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={`px-5 py-3 font-mono text-[0.66rem] font-normal uppercase tracking-[0.08em] text-muted ${i === 2 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {process.steps.map((s) => (
                <tr key={s.step} className="border-t border-border-subtle">
                  <td className="px-5 py-3.5 font-mono text-sm tabular-nums text-headline-teal">
                    {s.step}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-headline-dark">{s.label}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-sm whitespace-nowrap text-body">
                    {s.turnaround}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div><Button cta={process.cta} /></div>
      </Container>
    </section>
  );
}
