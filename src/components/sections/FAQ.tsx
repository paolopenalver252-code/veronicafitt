import { ContactCta } from "~/components/contact/ContactIntent";
import { Accordion } from "~/components/ui/Accordion";
import { PendingNote } from "~/components/ui/Pending";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { faq } from "~/data/home";

export function FAQ() {
  const items = faq.map((item) => ({
    id: item.id,
    title: item.question,
    content: (
      <>
        <p className="text-pretty">{item.answer}</p>
        {item.note && <PendingNote value={item.note} className="mt-3" />}
      </>
    ),
  }));

  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="section-y">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="preguntas-title" title="Preguntas frecuentes" />
          <p className="mt-5 text-piedra">¿Tienes otra duda?</p>
          <ContactCta variant="secondary" className="mt-4">
            Pregúntame
          </ContactCta>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
