import type { Route } from "./+types/privacidad";
import { LegalPage } from "~/components/layout/LegalPage";
import { pending } from "~/lib/pending";
import { buildMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Política de privacidad | Verónica Calabuch",
    description: "Cómo se tratan los datos personales en el sitio web de Verónica Calabuch.",
    path: "/privacidad",
    noindex: true,
  });
}

export default function Privacidad() {
  return (
    <LegalPage
      title="Política de privacidad"
      intro="Qué datos se recogen en esta web, para qué se usan y cómo puedes ejercer tus derechos, conforme al RGPD y a la LOPDGDD."
      sections={[
        {
          title: "Responsable del tratamiento",
          body: <p>Datos identificativos y de contacto del responsable.</p>,
          note: pending("Nombre, NIF, domicilio y email del responsable"),
        },
        {
          title: "Qué datos se recogen y para qué",
          body: (
            <>
              <p>
                <strong className="font-semibold text-grafito">Formulario de contacto:</strong> nombre, email o
                teléfono, servicio de interés y el mensaje que escribas, para responder a tu consulta.
              </p>
              <p>
                <strong className="font-semibold text-grafito">Lista de espera online:</strong> tu email, para
                avisarte cuando los entrenamientos online estén disponibles.
              </p>
              <p>
                Esta web no solicita datos de salud. Si tienes alguna lesión o limitación, se hablará en persona.
              </p>
            </>
          ),
        },
        {
          title: "Base legal",
          body: <p>Tu consentimiento, que puedes retirar en cualquier momento.</p>,
        },
        {
          title: "Conservación",
          body: <p>Plazo durante el que se conservarán los datos.</p>,
          note: pending("Plazo de conservación de mensajes y de la lista de espera"),
        },
        {
          title: "Destinatarios",
          body: <p>Proveedores que tratan los datos por cuenta del responsable (alojamiento web y envío de email).</p>,
          note: pending("Proveedores definitivos (hosting, email, lista de espera) y transferencias internacionales"),
        },
        {
          title: "Tus derechos",
          body: (
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
              escribiendo al email del responsable. También puedes presentar una reclamación ante la Agencia Española de
              Protección de Datos (aepd.es).
            </p>
          ),
        },
      ]}
    />
  );
}
