import { m } from "motion/react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { ContactCta } from "~/components/contact/ContactIntent";
import { easeOutSoft } from "~/components/motion/MotionProvider";
import { InstagramIcon } from "~/components/ui/InstagramIcon";
import { navItems, site } from "~/data/site";
import { cn } from "~/lib/cn";
import { AnchorLink } from "./AnchorLink";

/** Menú móvil a pantalla completa. El resto de la página queda inerte mientras está abierto. */
export function MobileMenu({ onClose, active }: { onClose: () => void; active: string | null }) {
  const listRef = useRef<HTMLUListElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    listRef.current?.querySelector("a")?.focus({ preventScroll: true });
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
      <nav
        aria-label="Menú móvil"
        className="container-site flex flex-1 flex-col pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <ul ref={listRef} className="flex flex-col">
          {navItems.map((item, i) => {
            const isActive = item.to ? pathname === item.to : active === item.anchor;
            return (
              <m.li
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOutSoft, delay: 0.05 + 0.04 * i }}
              >
                <AnchorLink
                  anchor={item.anchor}
                  to={item.to}
                  current={active === item.anchor}
                  onClick={onClose}
                  className={cn(
                    "font-display flex min-h-15 items-center gap-4 text-[2.25rem] leading-none transition-colors",
                    isActive ? "text-acento" : "text-grafito",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("h-px bg-acento transition-[width] duration-500", isActive ? "w-6" : "w-0")}
                  />
                  {item.label}
                </AnchorLink>
              </m.li>
            );
          })}
        </ul>

        <m.div
          className="mt-auto flex flex-col gap-5 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ContactCta className="w-full" onClick={onClose}>
            Escríbeme
          </ContactCta>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 self-center text-small text-piedra"
          >
            <InstagramIcon className="size-5" />
            {site.instagram.handle}
          </a>
        </m.div>
      </nav>
    </m.div>
  );
}
