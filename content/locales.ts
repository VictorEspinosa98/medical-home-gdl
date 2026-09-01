export const LOCALES = ['es', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'es'

/** El idioma contrario. Con dos locales no hace falta más. */
export const otherLocale = (lang: Locale): Locale => (lang === 'es' ? 'en' : 'es')

/** Atributo `lang` del <html> y valor de hreflang. */
export const HTML_LANG: Record<Locale, string> = {
  es: 'es-MX',
  en: 'en',
}

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v)
