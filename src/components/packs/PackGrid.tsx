import { FadeIn } from "~/components/motion/Reveal";
import type { PlaceholderTone } from "~/components/media/MediaPlaceholder";
import { cn } from "~/lib/cn";
import type { Pack } from "~/types/content";
import { PackCard } from "./PackCard";

const tones: PlaceholderTone[] = ["deep", "light", "soft"];

/** Rejilla de packs generada desde datos: añadir un pack en src/data/packs.ts basta. */
export function PackGrid({ packs, className }: { packs: Pack[]; className?: string }) {
  return (
    <ul
      className={cn(
        "grid gap-x-8 gap-y-20 sm:grid-cols-2",
        packs.length >= 3 ? "lg:grid-cols-3" : "lg:max-w-4xl",
        className,
      )}
    >
      {packs.map((pack, i) => (
        <FadeIn as="li" key={pack.id} delay={i * 0.08}>
          <PackCard pack={pack} tone={tones[i % tones.length]} />
        </FadeIn>
      ))}
    </ul>
  );
}
