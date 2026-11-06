import type { Metadata } from 'next'
import { Business } from '@/components/pages/Business'
import { page } from '@/content/pages'
import { buildMetadata } from '@/lib/metadata'
import { pageRef } from '@/lib/urls'

const LANG = 'en' as const
const PAGE = 'business' as const

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
  return <Business lang={LANG} />
}
