import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { HTML_LANG, LOCALES, type Locale, isLocale } from '@/content/locales'
import { SITE } from '@/content/site'
import { UI } from '@/content/ui'
import { medicalBusinessSchema, websiteSchema } from '@/lib/jsonld'

// Self-hosted: next/font descarga en build y sirve desde nuestro dominio.
// Cero request a Google, cero CLS.
//
// Solo subset `latin`: su unicode-range es U+0000-00FF, que ya incluye ñ y
// todas las vocales acentuadas del español. Añadir `latin-ext` sumaba dos
// archivos woff2 precargados que ninguna página del sitio llega a usar.
const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

// Con output:'export' solo se generan los params declarados arriba.
export const dynamicParams = false

export const viewport: Viewport = {
  themeColor: '#289DD1',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Sin `template`: cada página trae su <title> completo y optimizado a ~60
  // caracteres. Un template añadiría la marca dos veces.
  title: { default: SITE.name, absolute: SITE.name },
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, address: false, email: true },
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  // Next 16: params es una Promise.
  params: Promise<{ lang: string }>
}) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()
  const lang: Locale = raw

  return (
    <html lang={HTML_LANG[lang]} className={`${sora.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          {UI[lang].skipToContent}
        </a>
        {children}
        <Footer lang={lang} />
        <JsonLd data={[medicalBusinessSchema(lang), websiteSchema(lang)]} />
      </body>
    </html>
  )
}
