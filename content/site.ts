// ═══════════════════════════════════════════════════════════════════════════
//  ⚠️  ÚNICO ARCHIVO CON LOS DATOS DE CONTACTO DEL NEGOCIO
//
//  Cambiar un valor aquí se propaga solo a: botón flotante de WhatsApp ·
//  CTAs de cada sección · footer · página de contacto · JSON-LD
//  MedicalBusiness · llms.txt · sitemap · Open Graph.
//
//  No hay ningún otro lugar donde estén hardcodeados.
// ═══════════════════════════════════════════════════════════════════════════

export const SITE = {
  name: 'Medical Home Gdl',
  legalName: 'Medical Home Gdl',

  /** Sin protocolo ni barra final. Se usa para canonical, OG y sitemap. */
  url: 'https://medicalhomegdl.com',

  /**
   * Formato internacional SIN + ni espacios — es lo que exige wa.me.
   * México = 52 + 10 dígitos. WhatsApp eliminó el "1" de los móviles
   * mexicanos en 2020; si por lo que sea el chat no abriera, probar
   * con '5213312446771'.
   */
  whatsapp: '523312446771',

  /** E.164, con +. Se usa en tel: y en el JSON-LD. */
  phone: '+523312446771',

  email: 'medicalhomegdl@gmail.com',

  /** Consultorio. Alimenta el PostalAddress del JSON-LD. */
  address: {
    street: 'C. Juan Álvarez 2470, Ladrón de Guevara',
    locality: 'Guadalajara',
    region: 'Jalisco',
    postalCode: '44650',
    country: 'MX',
  },

  /**
   * Coordenadas aproximadas de la colonia Ladrón de Guevara.
   * ← VERIFICAR contra el pin exacto del Google Business Profile antes de
   *   lanzar: un geo desalineado con la ficha debilita el SEO local.
   */
  geo: { lat: 20.6795, lng: -103.3745 },

  /** Perfiles públicos → `sameAs` del JSON-LD. Deja fuera los que no existan. */
  social: {
    facebook: '', // ← PENDIENTE
    instagram: '', // ← PENDIENTE
    googleBusiness: '', // ← PENDIENTE (muy recomendable para SEO local)
  },

  /** Minutos prometidos para la llegada del médico. Sale del documento del cliente. */
  responseMinutes: 60,

  /** Municipios de la Zona Metropolitana de Guadalajara con cobertura. */
  areas: [
    'Guadalajara',
    'Zapopan',
    'San Pedro Tlaquepaque',
    'Tonalá',
    'Tlajomulco de Zúñiga',
    'Zapotlanejo',
  ],

  /**
   * Ciudades fuera de Jalisco donde también se atiende. Separadas de `areas`
   * porque el copy de la ZMG habla de "municipios de la zona metropolitana"
   * y porque el JSON-LD las tiene que anidar en su propio estado.
   */
  otherCities: [
    { name: 'Morelia', state: 'Michoacán' },
    { name: 'Querétaro', state: 'Querétaro' },
  ],
} as const

/** Enlace de WhatsApp con mensaje pre-llenado según el contexto. */
export const waLink = (message: string): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`

export const telLink = (): string => `tel:${SITE.phone}`

export const mailLink = (): string => `mailto:${SITE.email}`

/** Teléfono formateado para mostrar. */
export const phoneDisplay = '+52 33 1244 6771'

/** Dirección en una línea, para el footer y la tarjeta de contacto. */
export const addressDisplay = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}, ${SITE.address.region}`

/** Los sameAs no vacíos, listos para el JSON-LD. */
export const socialProfiles = (): string[] =>
  (Object.values(SITE.social) as string[]).filter((v) => v.length > 0)

/** ZMG + ciudades fuera de Jalisco, para listados de cobertura. */
export const allAreaNames: string[] = [
  ...SITE.areas,
  ...SITE.otherCities.map((c) => c.name),
]
