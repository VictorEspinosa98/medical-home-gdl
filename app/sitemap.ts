import type { MetadataRoute } from 'next'
import { HTML_LANG, LOCALES } from '@/content/locales'
import { PAGES } from '@/content/pages'
import { SERVICES, SERVICES_BASE } from '@/content/services'
import { SITE } from '@/content/site'

// OBLIGATORIO con output:'export'. Sin esta línea el build falla con
// "export const dynamic = force-static / revalidate not configured".
export const dynamic = 'force-static'

/**
 * Sitemap generado desde content/. Una página nueva entra sola, y cada
 * entrada declara sus `alternates` — Next los emite como
 * <xhtml:link rel="alternate" hreflang="..."> dentro del sitemap.
 *
 * La raíz `/` NO se incluye a propósito: es una redirección 302 que negocia
 * idioma, no una página canónica.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  const alternatesFor = (paths: Record<string, string>) => ({
    languages: Object.fromEntries(
      LOCALES.map((l) => [HTML_LANG[l], `${SITE.url}${paths[l]}`]),
    ),
  })

  for (const p of PAGES) {
    const paths = Object.fromEntries(LOCALES.map((l) => [l, p[l].path]))
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE.url}${p[lang].path}`,
        changeFrequency: p.changeFrequency,
        priority: p.priority,
        alternates: alternatesFor(paths),
      })
    }
  }

  for (const s of SERVICES) {
    const paths = Object.fromEntries(
      LOCALES.map((l) => [l, `/${l}/${SERVICES_BASE[l]}/${s[l].slug}/`]),
    )
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE.url}${paths[lang]}`,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alternatesFor(paths),
      })
    }
  }

  return entries
}
