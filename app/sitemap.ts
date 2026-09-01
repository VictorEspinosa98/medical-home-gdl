import { execFileSync } from 'node:child_process'
import type { MetadataRoute } from 'next'
import { HTML_LANG, LOCALES } from '@/content/locales'
import { PAGES } from '@/content/pages'
import { SERVICES, SERVICES_BASE } from '@/content/services'
import { SITE } from '@/content/site'

// OBLIGATORIO con output:'export'. Sin esta línea el build falla con
// "export const dynamic = force-static / revalidate not configured".
export const dynamic = 'force-static'

/**
 * Fecha del último commit que tocó un archivo, en ISO.
 *
 * Es la única fuente de verdad honesta que hay aquí: el contenido vive en
 * TS estático, sin CMS ni campo `updatedAt`. Poner `new Date()` daría una
 * fecha nueva en cada deploy aunque no cambiara una coma — Google detecta
 * ese patrón y deja de confiar en el lastmod de todo el sitemap.
 *
 * `undefined` si git no está disponible (Next omite el <lastmod> entonces),
 * que es preferible a inventar la fecha.
 */
function lastCommitISO(file: string): string | undefined {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out.length > 0 ? out : undefined
  } catch {
    return undefined
  }
}

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

  // Un solo `git log` por archivo de contenido, no uno por URL.
  const pagesModified = lastCommitISO('content/pages.ts')
  const servicesModified = lastCommitISO('content/services.ts')

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
        lastModified: pagesModified,
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
        lastModified: servicesModified,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: alternatesFor(paths),
      })
    }
  }

  return entries
}
