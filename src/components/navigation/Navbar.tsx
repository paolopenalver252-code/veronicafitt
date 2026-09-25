import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { ContactCta } from "~/components/contact/ContactIntent";
import { navItems, site } from "~/data/site";
import { useScrollDirection } from "~/hooks/useScrollDirection";
import { cn } from "~/lib/cn";
import { AnchorLink } from "./AnchorLink";
import { MobileMenu } from "./MobileMenu";

export function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const { direction, scrolled } = useScrollDirection();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const hidden = direction === "down" && scrolled && !menuOpen;

  // Cerrar el menú al cambiar de ruta o de ancla.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash, setMenuOpen]);

  // Menú abierto: bloquear scroll, dejar inerte el resto de la página y cerrar con Esc.
  useEffect(() => {
    if (!menuOpen) return;
    const page = document.getElementById("page-content");
    const root = document.documentElement;
    page?.setAttribute("inert", "");
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      page?.removeAttribute("inert");
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 h-(--nav-h) transition-[transform,background-color,border-color] duration-300 ease-(--ease-out-soft)",
          "border-b",
          scrolled || menuOpen ? "border-linea bg-tiza/95 backdrop-blur-sm" : "border-transparent bg-tiza",
          hidden && "-translate-y-full",
        )}
      >
        <div className="container-site flex h-full items-center justify-between gap-6">
          <Link
            to="/"
            className="font-heading text-[1.125rem] leading-none [--wdth:80] xs:text-[1.25rem] lg:text-[1.375rem]"
            aria-label={`${site.name}, inicio`}
          >
            {site.name}
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.anchor}>
                  <AnchorLink
                    anchor={item.anchor}
                    className="text-small font-medium text-grafito/80 transition-colors hover:text-grafito"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ContactCta className={cn("min-h-10 px-4 text-small sm:min-h-11 sm:px-5", menuOpen && "invisible")}>
              Escríbeme
            </ContactCta>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}
