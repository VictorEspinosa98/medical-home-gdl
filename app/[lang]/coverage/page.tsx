import type { Metadata } from 'next'
import { Coverage } from '@/components/pages/Coverage'
import { page } from '@/content/pages'
import { buildMetadata } from '@/lib/metadata'
import { pageRef } from '@/lib/urls'

// Shell de ruta. El slug de la carpeta es el del idioma, y
// generateStaticParams solo declara ese locale: /es/coverage/ nunca se genera.
const LANG = 'en' as const
const PAGE = 'coverage' as const

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
  return <Coverage lang={LANG} />
}
