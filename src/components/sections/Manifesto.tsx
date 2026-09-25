import { FadeIn } from "~/components/motion/Reveal";
import { ScrollWords } from "~/components/motion/ScrollWords";
import { DevNote } from "~/components/ui/Pending";
import { manifesto } from "~/data/home";

/** Declaración de marca: mucho aire, una frase grande que se enciende con el scroll. */
export function Manifesto() {
  return (
    <section id="manifiesto" aria-labelledby="manifiesto-title" className="py-[clamp(8rem,4rem+12vw,16rem)]">
      <div className="container-site">
        <ScrollWords
          as="h2"
          id="manifiesto-title"
          text={manifesto.statement}
          className="font-display max-w-[14ch] text-statement text-balance"
        />

        <div className="mt-20 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-10">
          <FadeIn className="lg:col-span-4 lg:col-start-2">
            <p className="text-lead text-pretty text-piedra">{manifesto.body}</p>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <h3 className="label">{manifesto.forWhomTitle}</h3>
            <ul className="mt-5">
              {manifesto.forWhom.map((item) => (
                <li key={item} className="border-t border-linea py-4 text-pretty last:border-b">
                  {item}
                </li>
              ))}
            </ul>
            <DevNote value={manifesto.forWhomNote} className="mt-4" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
