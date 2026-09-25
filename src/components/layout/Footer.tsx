import { Link } from "react-router";
import { AnchorLink } from "~/components/navigation/AnchorLink";
import { InstagramIcon } from "~/components/ui/InstagramIcon";
import { PendingNote } from "~/components/ui/Pending";
import { navItems, site } from "~/data/site";
import { isPending } from "~/lib/pending";
import { ReviewToggle } from "./ReviewToggle";

const legal = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/privacidad", label: "Privacidad" },
  { to: "/cookies", label: "Cookies" },
];

export function Footer() {
  const { email, whatsapp } = site.contact;
  const linkClass = "inline-flex min-h-11 items-center text-tiza/75 transition-colors hover:text-tiza";

  return (
    <footer id="site-footer" className="bg-grafito text-tiza">
      <div className="container-site border-t border-linea-dark pt-14 pb-10 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-heading text-[2rem] leading-none [--wdth:78]">{site.name}</p>
            <p className="mt-3 text-tiza/70">Entrenadora personal y monitora de fitness.</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-tiza hover:text-cobalto-light"
            >
              <InstagramIcon className="size-5" />
              {site.instagram.handle}
            </a>
          </div>

          <nav aria-label="Secciones" className="md:col-span-3">
            <h2 className="mb-3 text-small font-semibold text-tiza/60">Secciones</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.anchor}>
                  <AnchorLink anchor={item.anchor} className={linkClass}>
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="mb-3 text-small font-semibold text-tiza/60">Contacto</h2>
            <ul className="flex flex-col gap-2">
              <li>
                {isPending(email) ? (
                  <span className="text-tiza/60">Email pendiente de confirmar</span>
                ) : (
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                )}
              </li>
              <li>
                {isPending(whatsapp) ? (
                  <span className="text-tiza/60">WhatsApp pendiente de confirmar</span>
                ) : (
                  <span className="text-tiza/75">WhatsApp: +{whatsapp}</span>
                )}
              </li>
            </ul>
            <PendingNote value={email} tone="dark" className="mt-4" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-linea-dark pt-6 text-small md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6">
            {legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <ReviewToggle variant="inline" />
            <p className="text-tiza/60">© {new Date().getFullYear()} {site.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
