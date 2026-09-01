import { HTML_LANG, LOCALES, type Locale } from '@/content/locales'
import { type PageId, pagePath } from '@/content/pages'
import { servicePath } from '@/content/services'
import { SITE } from '@/content/site'

/**
 * Referencia a cualquier ruta del sitio, independiente del idioma.
 * Es la pieza que hace posible el hreflang recíproco: desde una referencia
 * se derivan las dos URLs equivalentes sin hardcodear ninguna.
 */
export type RouteRef = { kind: 'page'; id: PageId } | { kind: 'service'; id: string }

export const pageRef = (id: PageId): RouteRef => ({ kind: 'page', id })
export const serviceRef = (id: string): RouteRef => ({ kind: 'service', id })

/** Ruta absoluta desde la raíz, con barra final. */
export const pathOf = (lang: Locale, ref: RouteRef): string =>
  ref.kind === 'page' ? pagePath(lang, ref.id) : servicePath(lang, ref.id)

/** URL completa con dominio. */
export const urlOf = (lang: Locale, ref: RouteRef): string => `${SITE.url}${pathOf(lang, ref)}`

export const absolute = (path: string): string =>
  path.startsWith('http') ? path : `${SITE.url}${path}`

/**
 * Mapa de hreflang para `alternates.languages` de Next.
 *
 * `x-default` apunta a la versión ES **de esta misma página**, no a la raíz.
 *
 * La raíz es un 302 que negocia idioma en el edge de Netlify: no es
 * indexable, no tiene <head> propio y obliga a un salto extra. Google pide
 * que x-default resuelva a una página real, y el mercado primario es
 * Guadalajara — así que el fallback correcto es el español.
 */
export const languagesFor = (ref: RouteRef): Record<string, string> => {
  const map: Record<string, string> = {}
  for (const lang of LOCALES) map[HTML_LANG[lang]] = urlOf(lang, ref)
  map['x-default'] = urlOf('es', ref)
  return map
}

/**
 * Ruta del gemelo Markdown de una página, que emite scripts/build-llms.ts.
 * `/es/servicios/x/` → `/es/servicios/x.md` · `/es/` → `/es.md`
 *
 * Se declara en el <head> como <link rel="alternate" type="text/markdown">,
 * que es como un LLM descubre que existe una versión limpia de la página.
 */
export const mdUrlFor = (path: string): string => {
  const trimmed = path.replace(/\/$/, '')
  return `${trimmed === '' ? '/index' : trimmed}.md`
}
