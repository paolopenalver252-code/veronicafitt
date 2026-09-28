import serifUrl from "../node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2?url";
import sansUrl from "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2?url";
import { useState, type ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
} from "react-router";
import type { Route } from "./+types/root";
import { ContactIntentProvider } from "~/components/contact/ContactIntent";
import { Footer } from "~/components/layout/Footer";
import { DevNotesBadge, devScript } from "~/components/layout/DevNotes";
import { MotionProvider } from "~/components/motion/MotionProvider";
import { MobileCTABar } from "~/components/navigation/MobileCTABar";
import { Navbar } from "~/components/navigation/Navbar";
import { buttonClasses } from "~/components/ui/Button";
import { site } from "~/data/site";
import "./styles/app.css";

export const links: LinksFunction = () => [
  { rel: "preload", href: serifUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: sansUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f1f1ee" />
        <Meta />
        <Links />
        {site.demo && <script dangerouslySetInnerHTML={{ __html: devScript }} />}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MotionProvider>
      <ContactIntentProvider>
        <a
          href="#contenido"
          className={buttonClasses("primary", "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50")}
        >
          Saltar al contenido
        </a>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div id="page-content">
          <main id="contenido" tabIndex={-1} className="outline-none">
            <Outlet />
          </main>
          <Footer />
          <MobileCTABar hidden={menuOpen} />
          <DevNotesBadge />
        </div>
      </ContactIntentProvider>
    </MotionProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="container-site flex min-h-svh flex-col justify-center py-24">
      <p className="text-small font-semibold text-acento">{is404 ? "Error 404" : "Error"}</p>
      <h1 className="font-display mt-4 text-h2">{is404 ? "Esta página no existe." : "Algo ha fallado."}</h1>
      <p className="mt-4 max-w-[32rem] text-piedra">
        {is404 ? "Puede que el enlace esté mal escrito o que la página se haya movido." : "Recarga la página o vuelve al inicio."}
      </p>
      <a href="/" className={buttonClasses("primary", "mt-8 self-start")}>
        Volver al inicio
      </a>
    </main>
  );
}
