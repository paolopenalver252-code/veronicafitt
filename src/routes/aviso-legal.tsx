import type { Route } from "./+types/aviso-legal";
import { LegalPage } from "~/components/layout/LegalPage";
import { pending } from "~/lib/pending";
import { buildMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Aviso legal | Verónica Calabuch",
    description: "Aviso legal del sitio web de Verónica Calabuch.",
    path: "/aviso-legal",
    noindex: true,
  });
}

export default function AvisoLegal() {
  return (
    <LegalPage
      title="Aviso legal"
      intro="Información sobre la titularidad y las condiciones de uso de este sitio web, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI)."
      sections={[
        {
          title: "Titular del sitio web",
          body: <p>Nombre o razón social, NIF, domicilio y email de contacto del titular.</p>,
          note: pending("Nombre del titular, NIF/CIF, domicilio y email"),
        },
        {
          title: "Objeto",
          body: (
            <p>
              Este sitio web presenta los servicios de entrenamiento personal, fuerza funcional y entrenamiento en grupos
              reducidos de Verónica Calabuch, así como información sobre sus futuros entrenamientos online.
            </p>
          ),
        },
        {
          title: "Propiedad intelectual",
          body: (
            <p>
              Los textos, fotografías y vídeos de este sitio son propiedad de su titular o se usan con autorización. No
              está permitida su reproducción sin consentimiento previo.
            </p>
          ),
        },
        {
          title: "Responsabilidad",
          body: (
            <p>
              La información de esta web es orientativa y no sustituye el consejo de un profesional sanitario. Ante
              cualquier lesión o condición médica, consulta con tu médico antes de empezar a entrenar.
            </p>
          ),
        },
      ]}
    />
  );
}
