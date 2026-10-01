import { Link } from "react-router";
import { AnchorLink } from "~/components/navigation/AnchorLink";
import { InstagramIcon } from "~/components/ui/InstagramIcon";
import { DevNote } from "~/components/ui/Pending";
import { navItems, site } from "~/data/site";
import { isPending } from "~/lib/pending";

const legal = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/privacidad", label: "Privacidad" },
  { to: "/cookies", label: "Cookies" },
];

/** Pie claro, con la firma de Verónica en grande como cierre editorial. */
export function Footer() {
  const { email, whatsapp } = site.contact;
  const linkClass = "inline-flex min-h-11 items-center text-grafito/80 transition-colors hover:text-acento";

  return (
    <footer id="site-footer" className="bg-tiza">
      <div className="container-site pt-16 pb-10 lg:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-pretty text-piedra">Entrenadora personal y monitora de fitness.</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium hover:text-acento"
            >
              <InstagramIcon className="size-5" />
              {site.instagram.handle}
            </a>
            {!isPending(email) && (
              <a href={`mailto:${email}`} className={`${linkClass} mt-1 block`}>
                {email}
              </a>
            )}
            {!isPending(whatsapp) && <p className="mt-1 text-grafito/80">WhatsApp +{whatsapp}</p>}
            <div className="mt-3 flex flex-col items-start gap-2">
              <DevNote value={email} />
              <DevNote value={whatsapp} />
            </div>
          </div>

          <nav aria-label="Secciones" className="md:col-span-4 md:col-start-9">
            <ul className="grid grid-cols-2 gap-x-6">
              {navItems.map((item) => (
                <li key={item.anchor}>
                  <AnchorLink anchor={item.anchor} to={item.to} className={linkClass}>
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden
          className="font-display mt-20 text-[clamp(2.5rem,10.2vw,10.5rem)] leading-[0.9] tracking-[-0.03em] whitespace-nowrap"
        >
          {site.name}
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-linea pt-6 text-small md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6">
            {legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-piedra">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
