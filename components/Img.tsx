import Image from 'next/image'
import manifest from '@/content/image-manifest.json'

type Manifest = Record<string, { base: string; width: number; height: number }>
const IMAGES = manifest as Manifest

/**
 * Foto del sitio. Resuelve la clave lógica contra el manifest generado por
 * scripts/build-images.mjs, que aporta el nombre con content-hash (para
 * cachear con `immutable`) y las dimensiones reales.
 *
 * Siempre renderiza dentro de un contenedor con `aspect-ratio`, así que el
 * CLS es 0 por construcción — no hay forma de olvidar width/height.
 */
export function Img({
  src,
  alt,
  aspect = '4 / 3',
  bleed = false,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false,
  className = '',
  imgClassName = '',
  tint = true,
}: {
  /** Clave lógica, ej. `/img/services/laboratorio` */
  src: string
  alt: string
  aspect?: string
  /** A sangre: llena el contenedor padre en vez de imponer un aspect-ratio. */
  bleed?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  /** Tinte azul de marca sobre la foto. Desactívalo en logos. */
  tint?: boolean
}) {
  const entry = IMAGES[src]
  if (!entry) {
    // Falla ruidosamente en build en vez de servir una imagen rota:
    // el export estático no valida URLs de imagen por su cuenta.
    throw new Error(
      `Imagen no encontrada en el manifest: "${src}". ` +
        `Corre \`pnpm build:images\` o revisa el nombre en source-images/.`,
    )
  }

  return (
    <div
      className={`${tint ? 'photo' : ''} ${bleed ? 'absolute inset-0' : 'relative'} overflow-hidden ${className}`}
      style={bleed ? undefined : { aspectRatio: aspect }}
    >
      <Image
        src={entry.base}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  )
}

/** Logo del navbar y del footer: dimensiones fijas, sin tinte ni recorte. */
export function Logo({
  variant = 'logo',
  width = 176,
  className = '',
  priority = false,
}: {
  variant?: 'logo' | 'logo-full' | 'isotipo'
  width?: number
  className?: string
  priority?: boolean
}) {
  const entry = IMAGES[`/img/brand/${variant}`]
  if (!entry) throw new Error(`Logo no encontrado en el manifest: ${variant}`)

  const height = Math.round((entry.height / entry.width) * width)

  return (
    <Image
      src={entry.base}
      alt="Medical Home Gdl"
      width={width}
      height={height}
      sizes={`${width}px`}
      priority={priority}
      className={className}
    />
  )
}
