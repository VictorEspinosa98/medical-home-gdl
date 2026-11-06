import type { Faq } from '@/content/faq'
import manifest from '@/content/image-manifest.json'
import { HTML_LANG, type Locale } from '@/content/locales'
import { type Promo, PROMOS_VALID_UNTIL } from '@/content/promos'
import { type Service, sortedServices } from '@/content/services'
import { SITE, allAreaNames, socialProfiles } from '@/content/site'
import { absolute, type RouteRef, serviceRef, urlOf } from './urls'

/**
 * `@id` estable del negocio. Todas las demás entidades lo referencian en
 * vez de repetir el NAP en cada página — es lo que evita que Google vea
 * un negocio distinto por URL.
 */
export const BUSINESS_ID = `${SITE.url}/#business`

/** `@id` único del sitio. Lo referencian los WebPage vía `isPartOf`. */
export const WEBSITE_ID = `${SITE.url}/#website`

type ManifestEntry = { base: string; width: number; height: number }
const IMAGES = manifest as Record<string, ManifestEntry>

/**
 * Resuelve una clave lógica (`/img/brand/logo-full`) contra el manifest con
 * content-hash que genera scripts/build-images.mjs, y arma la URL absoluta.
 *
 * Escribir la ruta a mano aquí era un 404 silencioso: el archivo real lleva
 * hash (`logo-full.28eef23a-640.webp`), así que `logo-full-640.webp` no
 * existió nunca y Google resolvía en 404 el `logo` y el `image` de las 32
 * páginas. Mismo patrón que components/Img.tsx: si falta la clave, revienta
 * el build en vez de publicar una imagen rota.
 */
export function jsonLdImage(key: string, width: 640 | 1280 = 1280): string {
  const entry = IMAGES[key]
  if (!entry) {
    throw new Error(
      `Imagen no encontrada en el manifest para JSON-LD: "${key}". ` +
        `Corre \`pnpm build:images\` o revisa el nombre en source-images/.`,
    )
  }
  return absolute(`${entry.base}-${width}.webp`)
}

const areaServedFor = (online = false) =>
  online
    ? { '@type': 'Country', name: 'México' }
    : allAreaNames.map((name) => ({ '@type': 'City', name }))

export function medicalBusinessSchema(lang: Locale) {
  const hasAddress = SITE.address.street.length > 0

  return {
    '@context': 'https://schema.org',
    // MedicalClinic y no MedicalBusiness: `medicalSpecialty` no aplica a este
    // último según schema.org. Medicina Interna no existe en la enumeración de
    // MedicalSpecialty, así que no se declara: va en el `serviceType`.
    '@type': 'MedicalClinic',
    '@id': BUSINESS_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    // `image` va una foto representativa del servicio (el hero) y `logo` el
    // logotipo: Google los usa para cosas distintas y pedía >=1200px de ancho
    // en la primera. Ambas resueltas contra el manifest, nunca a mano.
    image: jsonLdImage('/img/hero', 1280),
    logo: jsonLdImage('/img/brand/logo-full', 640),
    description:
      lang === 'es'
        ? 'Servicio de atención médica a domicilio en la Zona Metropolitana de Guadalajara, Morelia y Querétaro. Médicos titulados en tu casa en menos de 1 hora, las 24 horas del día. También ofrece consultorio en Guadalajara, consulta médica en línea en todo México y servicios médicos para empresas.'
        : 'House-call medical service in the Guadalajara metropolitan area, Morelia and Queretaro. Licensed doctors at your address in under 1 hour, 24 hours a day. Also offers a clinic in Guadalajara, online doctor consultations across Mexico and medical services for companies.',
    medicalSpecialty: 'PrimaryCare',
    // `hasOfferCatalog` cierra el enlace bidireccional: cada Service ya
    // apunta al negocio con `provider`, esto hace que el negocio apunte de
    // vuelta a todos los servicios — por @id, sin re-declararlos.
    hasOfferCatalog: serviceCatalogSchema(lang),
    // `availableLanguage` NO pertenece a Organization/LocalBusiness según
    // schema.org (domainIncludes: ContactPoint, Demand, Offer, Service).
    // Anidado en contactPoint sí valida.
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: 'MX',
      availableLanguage: [
        { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
    },
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
    // Derivado de las coordenadas que ya existen — no inventa un Place ID.
    // Sustituir por el enlace real del Google Business Profile en cuanto se
    // reclame la ficha: es una señal local bastante mejor que este ?q=.
    hasMap: `https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}`,
    areaServed: [
      ...SITE.areas.map((name) => ({ '@type': 'City' as const, name, state: 'Jalisco' })),
      ...SITE.otherCities.map((c) => ({ '@type': 'City' as const, name: c.name, state: c.state })),
    ].map(({ name, state }) => ({
      '@type': 'City',
      name,
      containedInPlace: {
        '@type': 'State',
        name: state,
        address: { '@type': 'PostalAddress', addressCountry: 'MX' },
      },
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

/**
 * Nodo `Service` (lo que se contrata) y, si aplica, un nodo médico aparte.
 * `provider`, `areaServed` y `offers` no existen en los tipos médicos según
 * schema.org: por eso son dos nodos y no uno.
 */
export function serviceSchema(service: Service, lang: Locale, url: string, promo?: Promo) {
  const t = service[lang]
  const image = jsonLdImage(service.image, 1280)
  const offer = promo ? promoOfferSchema(promo, url, service.online) : null

  const serviceNode = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: t.name,
    description: t.answer,
    url,
    image,
    serviceType: t.shortName,
    provider: { '@id': BUSINESS_ID },
    areaServed: areaServedFor(service.online),
    ...(service.online ? {} : { providerMobility: 'dynamic' }),
    ...(offer ? { offers: offer } : {}),
  }
  if (service.schemaType === 'Service') return [serviceNode]

  return [
    serviceNode,
    {
      '@context': 'https://schema.org',
      '@type': service.schemaType,
      '@id': `${url}#medical`,
      name: t.shortName,
      description: t.answer,
      url,
      image,
      // `howPerformed` lo define MedicalProcedure (y lo hereda MedicalTherapy).
      // MedicalTest es hermano, no descendiente: ahí no se emite.
      ...(service.schemaType === 'MedicalTest' ? {} : { howPerformed: t.intro.split('\n\n')[0] }),
    },
  ]
}

/** Servicio de la página de Empresas: mismo proveedor, audiencia corporativa. */
export function businessServiceSchema({
  name,
  description,
  lang,
  url,
  image,
}: {
  name: string
  description: string
  lang: Locale
  url: string
  image: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    image,
    provider: { '@id': BUSINESS_ID },
    areaServed: SITE.areas.map((city) => ({ '@type': 'City', name: city })),
    audience: { '@type': 'BusinessAudience', audienceType: lang === 'es' ? 'Empresas' : 'Companies' },
  }
}

/**
 * Nodo `WebSite` único. `publisher` referencia el @id del negocio en vez de
 * repetir el NAP, igual que el resto del archivo.
 *
 * Sin `SearchAction` a propósito: el sitio no tiene buscador interno, y
 * declarar uno inexistente es justo el tipo de dato estructurado que Google
 * trata como spam.
 */
export function websiteSchema(lang: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: HTML_LANG[lang],
    publisher: { '@id': BUSINESS_ID },
  }
}

/**
 * Catálogo de los servicios referenciados por @id. No se re-declaran:
 * cada página de servicio ya emite su propio nodo completo.
 */
function serviceCatalogSchema(lang: Locale) {
  return {
    '@type': 'OfferCatalog',
    name: lang === 'es' ? 'Servicios médicos a domicilio' : 'At-home medical services',
    itemListElement: sortedServices().map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@id': `${urlOf(lang, serviceRef(service.id))}#service` },
    })),
  }
}

/**
 * Nodo de página. `MedicalWebPage` en portada y servicios (contenido médico
 * real), `WebPage` en el resto.
 *
 * Sin `dateModified`: el contenido vive en TS estático, así que la única
 * fecha disponible en build sería `new Date()` — que cambiaría en cada
 * deploy sin que el contenido cambie. Una fecha falsa es peor que ninguna.
 */
export function webPageSchema({
  lang,
  ref,
  name,
  description,
  image,
  medical = false,
  mainEntityId,
  aboutIds = [],
  breadcrumbId,
}: {
  lang: Locale
  ref: RouteRef
  name: string
  description: string
  image?: string
  medical?: boolean
  mainEntityId?: string
  aboutIds?: string[]
  breadcrumbId?: string
}) {
  const url = urlOf(lang, ref)

  return {
    '@context': 'https://schema.org',
    '@type': medical ? 'MedicalWebPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: HTML_LANG[lang],
    isPartOf: { '@id': WEBSITE_ID },
    about: [BUSINESS_ID, ...aboutIds].map((id) => ({ '@id': id })),
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
    ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image } } : {}),
  }
}

/** Primer número con `$` de un texto de precio. `null` si no hay ninguno. */
const leadingPrice = (raw?: string): number | null => {
  const match = raw?.match(/\$\s?([\d,]+)/)
  if (!match) return null
  const n = Number(match[1].replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

/**
 * `Offer` de una promoción, SOLO si trae un precio numérico real.
 *
 * Una promo sin cifra no emite Offer: convertir copy en `price` sería inventar
 * un dato que Google puede acabar mostrando tal cual en el SERP. Devuelve
 * `null` y el llamador lo filtra.
 *
 * "Desde $850" es un mínimo, no un precio cerrado — de ahí `minPrice` y no
 * `price`. El precio anterior vive en `priceBefore` y nunca llega aquí.
 */
export function promoOfferSchema(promo: Promo, url: string, online = false) {
  const amount = leadingPrice(promo.price)
  if (amount === null) return null
  const isMinimum = /^(desde|from)\b/i.test(promo.price ?? '')
  const listPrice = leadingPrice(promo.priceBefore)

  return {
    '@type': 'Offer',
    name: promo.title,
    description: promo.body,
    priceCurrency: 'MXN',
    ...(isMinimum
      ? {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            minPrice: amount,
            priceCurrency: 'MXN',
          },
        }
      : { price: amount }),
    ...(listPrice === null || isMinimum
      ? {}
      : {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: listPrice,
            priceCurrency: 'MXN',
            priceType: 'https://schema.org/ListPrice',
          },
        }),
    availableAtOrFrom: { '@id': BUSINESS_ID },
    seller: { '@id': BUSINESS_ID },
    areaServed: areaServedFor(online),
    url,
    priceValidUntil: PROMOS_VALID_UNTIL,
  }
}

/** Oferta suelta de la portada, ligada al servicio de su página. */
export function homeOfferSchema(promo: Promo, lang: Locale, homeUrl: string) {
  const serviceId = promo.detail?.kind === 'service' ? promo.detail.id : null
  const url = promo.detail ? urlOf(lang, promo.detail) : homeUrl
  const online = sortedServices().find((s) => s.id === serviceId)?.online
  const offer = promoOfferSchema(promo, url, online)
  if (!offer) return null

  return {
    '@context': 'https://schema.org',
    ...offer,
    ...(serviceId ? { itemOffered: { '@id': `${url}#service` } } : {}),
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

export function breadcrumbSchema(items: { name: string; url: string }[], id?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
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
