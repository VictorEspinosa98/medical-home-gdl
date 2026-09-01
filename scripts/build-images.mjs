// Convierte source-images/ a WebP multi-ancho en public/img/.
//
// Corre antes de `next build`. Es idempotente: si el hash del archivo fuente
// no cambió, no vuelve a procesar nada.
//
// Salida por cada imagen:
//   public/img/<ruta>.<hash>-640.webp
//   public/img/<ruta>.<hash>-1280.webp
//   public/img/<ruta>.<hash>-1920.webp
//
// Y un manifest con el ancho y alto reales de cada una, para que <Img>
// pueda fijar width/height y el CLS sea 0 sin medir nada en el navegador.

import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'source-images')
const OUT = join(ROOT, 'public', 'img')
const MANIFEST = join(ROOT, 'content', 'image-manifest.json')

// Mismos anchos para todo, logos incluidos. `withoutEnlargement` hace que
// una fuente de 578px salga a 578px en los tres tamanos: pesa unos KB de mas
// y elimina la clase entera de bugs de "el loader pidio un ancho que no existe".
const WIDTHS = [640, 1280, 1920]
const WEBP_QUALITY = 80

const BRAND = { glow: '#0cbdff', brand: '#289DD1', ink: '#1D4355' }

/** Recorre source-images/ y devuelve rutas relativas de imágenes. */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(full)
  }
  return files
}

const hashOf = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 8)

/** Clave lógica que usan los componentes: /img/services/consulta-domicilio */
const keyOf = (file) =>
  '/img/' + relative(SRC, file).replace(/\\/g, '/').replace(extname(file), '')

async function buildPhoto(file, key, hash) {
  const input = sharp(file)
  const meta = await input.metadata()
  const outBase = join(OUT, key.replace('/img/', '')) + `.${hash}`
  await mkdir(dirname(outBase), { recursive: true })

  for (const w of WIDTHS) {
    // No agrandamos: si la fuente es menor, el archivo sale a su tamaño real.
    const target = Math.min(w, meta.width)
    await sharp(file)
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6, alphaQuality: 100 })
      .toFile(`${outBase}-${w}.webp`)
  }

  return {
    base: `${key}.${hash}`,
    width: meta.width,
    height: meta.height,
  }
}

/**
 * Tarjeta Open Graph 1200x630. Importa más de lo que parece: es la primera
 * impresión cuando alguien comparte el sitio por WhatsApp, que es
 * justamente el canal principal de este negocio.
 *
 * El degradado va de izquierda a derecha, no sobre toda la foto: el texto
 * se lee sobre azul sólido y el médico queda limpio a la derecha.
 * El wordmark va como texto blanco en SVG — el logo PNG tiene el texto en
 * azul petróleo y desaparece sobre un fondo oscuro.
 */
const OG_COPY = {
  default: {
    l1: 'Un médico en tu casa',
    l2: 'en menos de 1 hora',
    foot: 'Guadalajara · Atención 24 horas',
  },
  en: {
    l1: 'A doctor at your door',
    l2: 'in under an hour',
    foot: 'Guadalajara · English-speaking · 24/7',
  },
}

async function buildOgCard(heroFile, variant) {
  const W = 1200
  const H = 630
  const copy = OG_COPY[variant]
  const font = 'Segoe UI, Verdana, DejaVu Sans, sans-serif'

  const photo = await sharp(heroFile)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .toBuffer()

  const overlay = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="${BRAND.ink}" stop-opacity="0.97"/>
          <stop offset="42%"  stop-color="${BRAND.ink}" stop-opacity="0.92"/>
          <stop offset="72%"  stop-color="${BRAND.brand}" stop-opacity="0.42"/>
          <stop offset="100%" stop-color="${BRAND.brand}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="${BRAND.glow}"/>
          <stop offset="100%" stop-color="${BRAND.glow}" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <rect width="${W}" height="${H}" fill="url(#scrim)"/>
      <rect x="0" y="0" width="${W}" height="6" fill="url(#rule)"/>

      <text x="72" y="120" font-family="${font}" font-size="34"
            font-weight="700" fill="#ffffff" letter-spacing="6">MEDICAL HOME</text>
      <text x="72" y="152" font-family="${font}" font-size="17"
            fill="${BRAND.glow}" letter-spacing="4">TU MÉDICO A DOMICILIO</text>

      <text x="72" y="330" font-family="${font}" font-size="58"
            font-weight="700" fill="#ffffff">${copy.l1}</text>
      <text x="72" y="404" font-family="${font}" font-size="58"
            font-weight="700" fill="#ffffff">${copy.l2}</text>

      <rect x="72" y="452" width="88" height="4" rx="2" fill="${BRAND.glow}"/>

      <text x="72" y="520" font-family="${font}" font-size="26"
            fill="#C9E6F3">${copy.foot}</text>
    </svg>`,
  )

  await mkdir(join(OUT, 'og'), { recursive: true })
  await sharp(photo)
    .composite([{ input: overlay, blend: 'over' }])
    .webp({ quality: 88 })
    .toFile(join(OUT, 'og', `${variant}-1200.webp`))

  return { base: `/img/og/${variant}`, width: W, height: H }
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`✗ No existe ${SRC}. Las imágenes fuente son obligatorias.`)
    process.exit(1)
  }

  // Regeneramos limpio: 16 imágenes tardan segundos y evita huérfanos
  // con hashes viejos acumulándose en public/img/.
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })

  const files = await walk(SRC)
  if (files.length === 0) {
    console.error(`✗ No se encontró ninguna imagen en ${SRC}.`)
    process.exit(1)
  }

  const manifest = {}
  for (const file of files) {
    const key = keyOf(file)
    const hash = hashOf(await readFile(file))
    manifest[key] = await buildPhoto(file, key, hash)
    console.log(`  ✓ ${key}`)
  }

  for (const variant of ['default', 'en']) {
    manifest[`/img/og/${variant}`] = await buildOgCard(join(SRC, 'hero.jpg'), variant)
    console.log(`  ✓ /img/og/${variant} (tarjeta Open Graph)`)
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\n✓ ${Object.keys(manifest).length} imágenes → public/img/`)
}

main().catch((err) => {
  console.error('✗ build-images falló:', err)
  process.exit(1)
})
