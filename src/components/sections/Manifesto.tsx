import { Check } from "lucide-react";
import { RevealLines } from "~/components/motion/RevealLines";
import { PendingNote } from "~/components/ui/Pending";
import { manifesto } from "~/data/home";

/** Propuesta de valor + espejo ("esto es para ti si…"). */
export function Manifesto() {
  return (
    <section id="manifiesto" aria-labelledby="manifiesto-title" className="section-y">
      <div className="container-site">
        <RevealLines
          as="h2"
          id="manifiesto-title"
          lines={manifesto.lines}
          width={{ from: 104, to: 84 }}
          className="font-display text-statement"
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <p className="text-lead text-pretty text-piedra lg:col-span-5">{manifesto.body}</p>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="font-heading text-h3">{manifesto.forWhomTitle}</h3>
            <ul className="mt-6 border-t border-linea">
              {manifesto.forWhom.map((item) => (
                <li key={item} className="flex gap-4 border-b border-linea py-4">
                  <Check aria-hidden className="mt-1 size-5 shrink-0 text-cobalto" strokeWidth={2.25} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <PendingNote value={manifesto.forWhomNote} className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
