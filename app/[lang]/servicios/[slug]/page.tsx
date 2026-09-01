import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetail } from '@/components/pages/ServiceDetail'
import { SERVICES, serviceBySlug } from '@/content/services'
import { buildMetadata } from '@/lib/metadata'
import { serviceRef } from '@/lib/urls'
import { jsonLdImage } from '@/lib/jsonld'

const LANG = 'es' as const

export function generateStaticParams() {
  return SERVICES.map((s) => ({ lang: LANG, slug: s[LANG].slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = serviceBySlug(LANG, slug)
  if (!service) return {}

  return buildMetadata({
    lang: LANG,
    ref: serviceRef(service.id),
    title: service[LANG].metaTitle,
    description: service[LANG].metaDescription,
    // Cada servicio comparte su propia foto en WhatsApp/Facebook, no la
    // tarjeta genérica del sitio: el enlace compartido es el canal principal.
    image: jsonLdImage(service.image, 1280),
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceBySlug(LANG, slug)
  if (!service) notFound()

  return <ServiceDetail service={service} lang={LANG} />
}
