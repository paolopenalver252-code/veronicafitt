import { ContactCta } from "~/components/contact/ContactIntent";
import { Accordion } from "~/components/ui/Accordion";
import { textLinkClasses } from "~/components/ui/Button";
import { DevNote } from "~/components/ui/Pending";
import { faq } from "~/data/home";

export function FAQ() {
  const items = faq.map((item) => ({
    id: item.id,
    title: item.question,
    content: (
      <>
        <p className="text-pretty">{item.answer}</p>
        {item.note && <DevNote value={item.note} className="mt-3" />}
      </>
    ),
  }));

  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="section-y">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label text-acento">Preguntas</p>
          <h2 id="preguntas-title" className="font-display mt-5 text-h2">
            Preguntas frecuentes
          </h2>
          <p className="mt-6 text-piedra">
            ¿Tienes otra duda?{" "}
            <ContactCta variant="text" className={textLinkClasses()}>
              Pregúntame
            </ContactCta>
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
