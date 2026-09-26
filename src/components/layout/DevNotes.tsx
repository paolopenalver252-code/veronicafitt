import { EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "~/data/site";

/**
 * Script en <head> (solo demo). Se ejecuta antes de pintar:
 * - ?notas=1 / ?notas=0 activa o desactiva las notas internas (se recuerda).
 * - ?paleta=granate / ?paleta=verde cambia el color de acento para comparar.
 */
export const devScript = `try{var q=new URLSearchParams(location.search),s=localStorage,d=document.documentElement;
var n=q.get("notas");if(n!==null)s.setItem("vc-notas",n==="1"?"on":"off");
var p=q.get("paleta");if(p!==null)s.setItem("vc-paleta",p);
if(s.getItem("vc-notas")==="on")d.dataset.notes="on";
var c=s.getItem("vc-paleta");if(c&&c!=="verde")d.dataset.palette=c}catch(e){}`;

/** Aviso flotante visible solo cuando las notas internas están activas, para poder salir. */
export function DevNotesBadge() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(document.documentElement.dataset.notes === "on");
  }, []);

  if (!site.demo || !on) return null;

  const turnOff = () => {
    delete document.documentElement.dataset.notes;
    try {
      localStorage.setItem("vc-notas", "off");
    } catch {
      /* sin almacenamiento: se desactiva solo en esta visita */
    }
    setOn(false);
  };

  return (
    <button
      type="button"
      onClick={turnOff}
      className="fixed right-4 bottom-24 z-30 inline-flex min-h-11 items-center gap-2 rounded-full border border-pendiente-line bg-pendiente-bg px-4 text-small font-semibold text-pendiente shadow-float lg:bottom-5"
    >
      <EyeOff aria-hidden className="size-4" />
      Ocultar notas internas
    </button>
  );
}
