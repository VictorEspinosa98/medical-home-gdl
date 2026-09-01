// Loader custom de next/image para output: 'export'.
//
// scripts/build-images.mjs genera un WebP por cada ancho de WIDTHS:
//   /img/<name>.<hash>-<ancho>.webp
//
// next/image llama a este loader una vez por entrada del srcset. Aquí solo
// hay que ajustar el ancho pedido al más cercano disponible hacia arriba.

const WIDTHS = [256, 384, 640, 828, 1080, 1280, 1920] as const

export default function imageLoader({
  src,
  width,
}: {
  src: string
  width: number
  quality?: number
}): string {
  // Los SVG y cualquier cosa externa se sirven tal cual.
  if (src.endsWith('.svg') || src.startsWith('http')) return src

  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1]
  return `${src}-${target}.webp`
}
