import type { Faq } from '@/content/faq'
import { HTML_LANG, type Locale } from '@/content/locales'
import type { Service } from '@/content/services'
import { SITE, socialProfiles } from '@/content/site'
import { absolute } from './urls'

/**
 * `@id` estable del negocio. Todas las demás entidades lo referencian en
 * vez de repetir el NAP en las 34 páginas — es lo que evita que Google vea
 * 34 negocios distintos.
 */
export const BUSINESS_ID = `${SITE.url}/#business`

export function medicalBusinessSchema(lang: Locale) {
  const hasAddress = SITE.address.street.length > 0

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': BUSINESS_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/${lang}/`,
    telephone: SITE.phone,
    email: SITE.email,
    image: absolute('/img/brand/logo-full-640.webp'),
    logo: absolute('/img/brand/logo-full-640.webp'),
    description:
      lang === 'es'
        ? 'Servicio de atención médica a domicilio en la Zona Metropolitana de Guadalajara. Médicos titulados en tu casa en menos de 1 hora, las 24 horas del día.'
        : 'House-call medical service in the Guadalajara metropolitan area. Licensed doctors at your address in under 1 hour, 24 hours a day.',
    medicalSpecialty: 'PrimaryCare',
    availableLanguage: [
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    ...(hasAddress
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: SITE.address.street,
            addressLocality: SITE.address.locality,
            addressRegion: SITE.address.region,
            postalCode: SITE.address.postalCode,
            addressCountry: SITE.address.country,
          },
        }
      : {}),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SITE.areas.map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'State', name: 'Jalisco', address: { '@type': 'PostalAddress', addressCountry: 'MX' } },
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    ...(socialProfiles().length > 0 ? { sameAs: socialProfiles() } : {}),
  }
}

export function serviceSchema(service: Service, lang: Locale, url: string) {
  const t = service[lang]

  return {
    '@context': 'https://schema.org',
    '@type': service.schemaType,
    '@id': `${url}#service`,
    name: t.name,
    description: t.answer,
    url,
    inLanguage: HTML_LANG[lang],
    image: absolute(`${service.image}-1280.webp`),
    provider: { '@id': BUSINESS_ID },
    areaServed: SITE.areas.map((name) => ({ '@type': 'City', name })),
    ...(service.schemaType === 'Service'
      ? { serviceType: t.shortName, providerMobility: 'dynamic' }
      : { howPerformed: t.intro.split('\n\n')[0] }),
  }
}

export function faqPageSchema(faqs: Faq[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function itemListSchema(items: { name: string; url: string }[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#list`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  }
}
