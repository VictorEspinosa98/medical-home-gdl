// ═══════════════════════════════════════════════════════════════════════════
//  ⚠️  ÚNICO ARCHIVO CON LOS DATOS DE CONTACTO DEL NEGOCIO
//
//  Cambia los valores marcados con  ← PENDIENTE  y se propagan solos a:
//  botón flotante de WhatsApp · CTAs de cada sección · footer · página de
//  contacto · JSON-LD MedicalBusiness · llms.txt · sitemap · Open Graph.
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
   * México = 52. Ejemplo: '523312345678'
   */
  whatsapp: '523300000000', // ← PENDIENTE

  /** Formato E.164, con +. Se usa en tel: y en el JSON-LD. */
  phone: '+523300000000', // ← PENDIENTE

  email: 'contacto@medicalhomegdl.com', // ← PENDIENTE confirmar

  /**
   * Dirección física. Si la empresa no atiende al público en un domicilio,
   * déjala vacía: Google penaliza un LocalBusiness con dirección inventada.
   * Con `street` vacío el JSON-LD omite postalAddress y usa solo areaServed.
   */
  address: {
    street: '', // ← PENDIENTE (opcional)
    locality: 'Guadalajara',
    region: 'Jalisco',
    postalCode: '', // ← PENDIENTE (opcional)
    country: 'MX',
  },

  /** Centro de la ZMG. Ajustar si hay domicilio real. */
  geo: { lat: 20.6597, lng: -103.3496 },

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
} as const

/** Enlace de WhatsApp con mensaje pre-llenado según el contexto. */
export const waLink = (message: string): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`

export const telLink = (): string => `tel:${SITE.phone}`

export const mailLink = (): string => `mailto:${SITE.email}`

/** Los sameAs no vacíos, listos para el JSON-LD. */
export const socialProfiles = (): string[] =>
  (Object.values(SITE.social) as string[]).filter((v) => v.length > 0)
