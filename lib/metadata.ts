import type { Metadata } from 'next'
import { HTML_LANG, type Locale } from '@/content/locales'
import { SITE } from '@/content/site'
import { absolute, languagesFor, mdUrlFor, pathOf, type RouteRef, urlOf } from './urls'

/**
 * Constructor único de metadata para las 34 páginas.
 * Centralizarlo es lo que garantiza que ninguna se quede sin canonical
 * o sin hreflang recíproco.
 */
export function buildMetadata({
  lang,
  ref,
  title,
  description,
  image,
}: {
  lang: Locale
  ref: RouteRef
  title: string
  description: string
  image?: string
}): Metadata {
  const url = urlOf(lang, ref)
  // Cada idioma tiene su propia tarjeta OG (el copy dentro de la imagen
  // está traducido), así que el default depende del locale.
  const ogImage = image ?? (lang === 'en' ? '/img/og/en-1200.webp' : '/img/og/default-1200.webp')

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: languagesFor(ref),
      // Señala a los LLMs la versión Markdown de esta misma página.
      types: { 'text/markdown': absolute(mdUrlFor(pathOf(lang, ref))) },
    },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: HTML_LANG[lang].replace('-', '_'),
      url,
      title,
      description,
      images: [{ url: absolute(ogImage), width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absolute(ogImage)],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  }
}
