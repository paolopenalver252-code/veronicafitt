import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { ContactCta } from "~/components/contact/ContactIntent";
import { navItems, site } from "~/data/site";
import { useActiveSection } from "~/hooks/useActiveSection";
import { useScrollDirection } from "~/hooks/useScrollDirection";
import { cn } from "~/lib/cn";
import { AnchorLink } from "./AnchorLink";
import { MobileMenu } from "./MobileMenu";

export function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const { direction, scrolled } = useScrollDirection();
  const active = useActiveSection(navItems.flatMap((i) => (i.anchor ? [i.anchor] : [])));
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
            className="font-heading inline-flex min-h-11 items-center text-[1.1875rem] leading-none whitespace-nowrap lg:text-[1.375rem]"
            aria-label={`${site.name}, inicio`}
          >
            {site.name}
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            {/* 7 enlaces: entre 1024 y 1279 px, separación algo menor para que quepa el botón. */}
            <ul className="flex items-center gap-4 xl:gap-7">
              {navItems.map((item) => {
                const isActive = item.to ? location.pathname === item.to : active === item.anchor;
                return (
                  <li key={item.label}>
                    <AnchorLink
                      anchor={item.anchor}
                      to={item.to}
                      current={active === item.anchor}
                      className={cn(
                        "relative inline-flex min-h-11 items-center text-small font-medium whitespace-nowrap transition-colors hover:text-grafito",
                        "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-acento after:transition-transform after:duration-500",
                        isActive ? "text-grafito after:scale-x-100" : "text-grafito/75 after:scale-x-0",
                      )}
                    >
                      {item.label}
                    </AnchorLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* En móvil la cabecera queda limpia: el CTA vive en el hero y en la píldora flotante. */}
            <div className="hidden sm:block">
              <ContactCta className={cn("min-h-11 px-6 text-small", menuOpen && "invisible")}>Escríbeme</ContactCta>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex min-h-11 items-center gap-2.5 px-2 text-small font-semibold lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span aria-hidden>{menuOpen ? "Cerrar" : "Menú"}</span>
              {menuOpen ? <X aria-hidden className="size-5" strokeWidth={1.5} /> : <Menu aria-hidden className="size-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <MobileMenu active={active} onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}
