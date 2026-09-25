import type { Route } from "./+types/not-found";
import { ButtonLink } from "~/components/ui/Button";
import { buildMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Página no encontrada | Verónica Calabuch",
    description: "Esta página no existe.",
    path: "/404",
    noindex: true,
  });
}

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-(--nav-h) pb-24">
      <p className="text-small font-semibold text-acento">Error 404</p>
      <h1 className="font-display mt-4 text-h2">Esta página no existe.</h1>
      <p className="mt-4 max-w-[32rem] text-piedra">
        Puede que el enlace esté mal escrito o que la página se haya movido.
      </p>
      <ButtonLink href="/" className="mt-8 self-start">
        Volver al inicio
      </ButtonLink>
    </section>
  );
}
