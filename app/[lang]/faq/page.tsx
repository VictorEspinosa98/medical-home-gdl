import type { Metadata } from 'next'
import { FaqPage } from '@/components/pages/FaqPage'
import { page } from '@/content/pages'
import { buildMetadata } from '@/lib/metadata'
import { pageRef } from '@/lib/urls'

// Shell de ruta. El slug de la carpeta es el del idioma, y
// generateStaticParams solo declara ese locale: /es/faq/ nunca se genera.
const LANG = 'en' as const
const PAGE = 'faq' as const

export function generateStaticParams() {
  return [{ lang: LANG }]
}

export function generateMetadata(): Metadata {
  const p = page(PAGE)[LANG]
  return buildMetadata({
    lang: LANG,
    ref: pageRef(PAGE),
    title: p.metaTitle,
    description: p.metaDescription,
  })
}

export default function Page() {
  return <FaqPage lang={LANG} />
}
