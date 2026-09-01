import type { Metadata } from 'next'
import { About } from '@/components/pages/About'
import { page } from '@/content/pages'
import { buildMetadata } from '@/lib/metadata'
import { pageRef } from '@/lib/urls'

// Shell de ruta. El slug de la carpeta es el del idioma, y
// generateStaticParams solo declara ese locale: /en/nosotros/ nunca se genera.
const LANG = 'es' as const
const PAGE = 'about' as const

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
  return <About lang={LANG} />
}
