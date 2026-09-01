import type { MetadataRoute } from 'next'
import manifest from '@/content/image-manifest.json'
import { SITE } from '@/content/site'

// OBLIGATORIO con output:'export' — mismo motivo que en sitemap.ts y robots.ts.
export const dynamic = 'force-static'

const ICON = (manifest as Record<string, { base: string }>)['/img/brand/icon-512'].base

/**
 * Web App Manifest. No es un factor de posicionamiento, pero sí lo revisan
 * Lighthouse y el "Añadir a pantalla de inicio" de Android — que para un
 * servicio que se contrata desde el móvil a las 3 de la mañana no es un
 * detalle menor.
 *
 * `display: 'browser'` a propósito: el sitio son páginas estáticas que
 * llevan a WhatsApp, no una app. Un standalone sin barra de direcciones
 * solo estorbaría al compartir el enlace.
 */
export default function webManifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Médico a domicilio en Guadalajara`,
    short_name: SITE.name,
    description:
      'Médicos titulados a domicilio en la Zona Metropolitana de Guadalajara, las 24 horas. Consultas, laboratorio, sueros y curaciones en tu casa.',
    lang: 'es-MX',
    start_url: '/es/',
    scope: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#289DD1',
    icons: [
      { src: `${ICON}-256.webp`, sizes: '256x256', type: 'image/webp' },
      { src: `${ICON}-384.webp`, sizes: '384x384', type: 'image/webp' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
