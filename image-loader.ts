// Loader custom de next/image para output: 'export'.
//
// scripts/build-images.mjs genera, por cada imagen fuente, tres WebP:
//   /img/<name>.<hash>-640.webp
//   /img/<name>.<hash>-1280.webp
//   /img/<name>.<hash>-1920.webp
//
// next/image llama a este loader una vez por entrada del srcset. Aquí solo
// hay que ajustar el ancho pedido al más cercano disponible hacia arriba.

const WIDTHS = [640, 1280, 1920] as const

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
