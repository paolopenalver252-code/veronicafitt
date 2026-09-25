import type { Route } from "./+types/cookies";
import { LegalPage } from "~/components/layout/LegalPage";
import { pending } from "~/lib/pending";
import { buildMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Política de cookies | Verónica Calabuch",
    description: "Uso de cookies en el sitio web de Verónica Calabuch.",
    path: "/cookies",
    noindex: true,
  });
}

export default function Cookies() {
  return (
    <LegalPage
      title="Política de cookies"
      intro="Información sobre el uso de cookies y tecnologías similares en esta web."
      sections={[
        {
          title: "Cookies que usa esta web",
          body: (
            <p>
              Actualmente esta web no instala cookies de analítica, publicidad ni de terceros, por eso no muestra un
              aviso de cookies.
            </p>
          ),
          note: pending("Revisar si se añade analítica, mapa o vídeos incrustados (exigirían aviso y consentimiento)"),
        },
      ]}
    />
  );
}
