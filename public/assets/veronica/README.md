# Material visual de Verónica

Coloca aquí los originales (no descargas de Instagram, que vienen recomprimidas):

- hero/         Fondo del hero (crear la carpeta):
                · veronica-hero.mp4          vídeo horizontal 16:9, 8–15 s en bucle, sin sonido ni textos, 1080p, ≤ 4 MB
                · veronica-hero.jpg          fotograma del vídeo, 1920×1080, ≤ 250 KB (se ve al instante y si el vídeo no carga)
                · veronica-hero-movil.jpg    foto vertical de la misma escena, 1080×1350, ≤ 200 KB (en móvil no hay vídeo)
                · veronica-hero-vertical.mp4 opcional: versión vertical para tablet en vertical
                Verónica en la mitad derecha del plano; la izquierda despejada para el texto.
- about/        Retrato cercano + foto guiando a alguien (4:5)
- training/     Fuerza (foto) y fuerza funcional (vídeo corto), grupo reducido
- studio/       Plano general de la sala (3:2) + detalles (4:5)
- online/       Verónica frente a cámara, como la ve quien entrena desde casa (vertical 4:5)
- testimonials/ Solo fotos con consentimiento firmado

Después, en `src/data/media.ts`, sustituye `pending(...)` por la ruta, p. ej.
`video: "/assets/veronica/hero/veronica-hero.mp4"`. El layout no cambia: cada
hueco ya tiene su proporción final.
