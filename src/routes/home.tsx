import type { Route } from "./+types/home";
import { About } from "~/components/sections/About";
import { Contact } from "~/components/sections/Contact";
import { FAQ } from "~/components/sections/FAQ";
import { Hero } from "~/components/sections/Hero";
import { Manifesto } from "~/components/sections/Manifesto";
import { OnlineTraining } from "~/components/sections/OnlineTraining";
import { Packs } from "~/components/sections/Packs";
import { Process } from "~/components/sections/Process";
import { Services } from "~/components/sections/Services";
import { Studio } from "~/components/sections/Studio";
import { Testimonials } from "~/components/sections/Testimonials";
import { site } from "~/data/site";
import { buildMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return [
    // Cuando se confirme la ciudad: "Verónica Calabuch | Entrenadora personal en [Ciudad]"
    ...buildMeta({
      title: "Verónica Calabuch | Entrenadora personal",
      description:
        "Entrenamiento personal y grupos reducidos en mi sala, y entrenamiento online en directo desde casa. Adaptado a tu nivel y a tu ritmo, sin necesidad de experiencia previa.",
      path: "/",
    }),
    // Solo datos confirmados. LocalBusiness se añadirá con dirección, horario y teléfono reales.
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        jobTitle: "Entrenadora personal",
        knowsAbout: ["Entrenamiento personal", "Fuerza funcional", "Entrenamiento en grupos reducidos"],
        sameAs: [site.instagram.url],
        ...(site.url ? { url: site.url } : {}),
      },
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <About />
      <Services />
      <Studio />
      <OnlineTraining />
      <Packs />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
