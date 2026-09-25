import { m } from "motion/react";
import { useEffect, useRef } from "react";
import { ContactCta } from "~/components/contact/ContactIntent";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { InstagramIcon } from "~/components/ui/InstagramIcon";
import { navItems, site } from "~/data/site";
import { AnchorLink } from "./AnchorLink";

/** Menú móvil a pantalla completa. El resto de la página queda inerte mientras está abierto. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const firstLink = useRef<HTMLDivElement>(null);

  useEffect(() => {
    firstLink.current?.querySelector("a")?.focus({ preventScroll: true });
  }, []);

  return (
    <m.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      className="fixed inset-x-0 top-(--nav-h) bottom-0 z-30 flex flex-col overflow-y-auto bg-tiza lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      transition={{ duration: 0.25 }}
    >
      <nav aria-label="Menú móvil" className="container-site flex flex-1 flex-col pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div ref={firstLink}>
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <m.li
                key={item.anchor}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOutSoft, delay: 0.04 * i }}
                className="border-b border-linea"
              >
                <AnchorLink
                  anchor={item.anchor}
                  onClick={onClose}
                  className="font-heading flex min-h-16 items-center text-[1.875rem]"
                >
                  {item.label}
                </AnchorLink>
              </m.li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-col gap-5 pt-10">
          <ContactCta className="w-full" onClick={onClose}>
            Escríbeme
          </ContactCta>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 self-start text-small font-medium text-piedra"
          >
            <InstagramIcon className="size-5" />
            {site.instagram.handle}
          </a>
        </div>
      </nav>
    </m.div>
  );
}
