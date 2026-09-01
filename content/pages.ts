import type { Locale } from './locales'

export type PageId = 'home' | 'services' | 'about' | 'coverage' | 'faq'

export type PageLocale = {
  /** Ruta absoluta con barra final. Debe coincidir con la carpeta en app/. */
  path: string
  /** Etiqueta del menú. */
  navLabel: string
  metaTitle: string
  metaDescription: string
  h1: string
  /** Bajada bajo el h1. */
  lede: string
}

export type StaticPage = {
  id: PageId
  priority: number
  changeFrequency: 'weekly' | 'monthly' | 'yearly'
  /** Si aparece en el menú principal. */
  inNav: boolean
  es: PageLocale
  en: PageLocale
}

export const PAGES: StaticPage[] = [
  {
    id: 'home',
    priority: 1.0,
    changeFrequency: 'monthly',
    inNav: false,
    es: {
      path: '/es/',
      navLabel: 'Inicio',
      metaTitle: 'Médico a Domicilio en Guadalajara 24/7 | Medical Home Gdl',
      metaDescription:
        'Un médico titulado llega a tu casa en menos de 1 hora, las 24 horas, en toda la Zona Metropolitana de Guadalajara. Consultas, laboratorio, sueros y más.',
      h1: 'Todo lo que necesitas para cuidar tu salud',
      lede: 'Atención médica inmediata, estudios de laboratorio y cuidados profesionales a domicilio, en Guadalajara y toda la zona metropolitana.',
    },
    en: {
      path: '/en/',
      navLabel: 'Home',
      metaTitle: 'Doctor at Home in Guadalajara 24/7 | Medical Home Gdl',
      metaDescription:
        'A licensed, English-speaking doctor at your home, hotel or Airbnb in under 1 hour, 24/7, across Guadalajara. House calls, lab tests, IV therapy and more.',
      h1: 'Everything you need to take care of your health',
      lede: 'Immediate medical care, lab tests and professional nursing at your home, hotel or Airbnb in Guadalajara. English-speaking doctors, 24 hours a day.',
    },
  },
  {
    id: 'services',
    priority: 0.9,
    changeFrequency: 'monthly',
    inNav: true,
    es: {
      path: '/es/servicios/',
      navLabel: 'Servicios',
      metaTitle: 'Servicios Médicos a Domicilio en Guadalajara | Medical Home',
      metaDescription:
        'Consultas, laboratorio, pruebas rápidas, sueros, curaciones, suturas, certificados médicos y paquete prenupcial. Todo en tu casa, 24 horas.',
      h1: 'Nuestros servicios médicos a domicilio',
      lede: 'Once servicios que resolvemos en tu casa, con médicos titulados y material estéril. Todos disponibles las 24 horas.',
    },
    en: {
      path: '/en/services/',
      navLabel: 'Services',
      metaTitle: 'At-Home Medical Services in Guadalajara | Medical Home',
      metaDescription:
        'House calls, lab tests, rapid tests, IV therapy, wound care, sutures, medical certificates and premarital packages. All at your address, 24 hours.',
      h1: 'Our at-home medical services',
      lede: 'Eleven services we deliver at your address, with licensed doctors and sterile equipment. All available 24 hours a day.',
    },
  },
  {
    id: 'about',
    priority: 0.7,
    changeFrequency: 'yearly',
    inNav: true,
    es: {
      path: '/es/nosotros/',
      navLabel: 'Nosotros',
      metaTitle: 'Nosotros: Misión, Visión y Valores | Medical Home Gdl',
      metaDescription:
        'Quiénes somos en Medical Home Gdl. Nuestra misión, visión y los seis valores con los que atendemos a cada paciente en su hogar.',
      h1: 'Llevamos la consulta a donde estás',
      lede: 'Medical Home Gdl nació para quitar de en medio lo que estorba entre una persona enferma y un médico: el traslado, la fila y la espera.',
    },
    en: {
      path: '/en/about/',
      navLabel: 'About us',
      metaTitle: 'About Us: Mission, Vision and Values | Medical Home Gdl',
      metaDescription:
        'Who we are at Medical Home Gdl. Our mission, vision and the six values behind every visit we make to a patient home.',
      h1: 'We bring the consultation to you',
      lede: 'Medical Home Gdl exists to remove what gets between a sick person and a doctor: the drive, the queue and the wait.',
    },
  },
  {
    id: 'coverage',
    priority: 0.8,
    changeFrequency: 'monthly',
    inNav: true,
    es: {
      path: '/es/cobertura/',
      navLabel: 'Cobertura y contacto',
      metaTitle: 'Cobertura y Contacto en Guadalajara | Medical Home Gdl',
      metaDescription:
        'Atendemos toda la Zona Metropolitana de Guadalajara, más Morelia y Querétaro, las 24 horas. Contáctanos por WhatsApp, teléfono o correo.',
      h1: 'Dónde atendemos y cómo contactarnos',
      lede: 'Cubrimos los seis municipios de la Zona Metropolitana de Guadalajara y también atendemos en Morelia y Querétaro, las 24 horas del día, todos los días del año.',
    },
    en: {
      path: '/en/coverage/',
      navLabel: 'Coverage & contact',
      metaTitle: 'Coverage and Contact in Guadalajara | Medical Home Gdl',
      metaDescription:
        'We cover the whole Guadalajara metro area, plus Morelia and Queretaro, 24 hours a day. Reach us on WhatsApp, phone or email.',
      h1: 'Where we go and how to reach us',
      lede: 'We cover all six municipalities of the Guadalajara metropolitan area, and we also serve Morelia and Queretaro, 24 hours a day, every day of the year.',
    },
  },
  {
    id: 'faq',
    priority: 0.7,
    changeFrequency: 'monthly',
    inNav: true,
    es: {
      path: '/es/preguntas-frecuentes/',
      navLabel: 'Preguntas frecuentes',
      metaTitle: 'Preguntas Frecuentes | Medical Home Gdl Guadalajara',
      metaDescription:
        'Cuánto tarda el médico, cuánto cuesta, qué incluye la visita, si atienden de madrugada y en qué municipios. Respuestas claras y directas.',
      h1: 'Preguntas frecuentes',
      lede: 'Lo que más nos preguntan antes de agendar una visita, respondido sin rodeos.',
    },
    en: {
      path: '/en/faq/',
      navLabel: 'FAQ',
      metaTitle: 'Frequently Asked Questions | Medical Home Gdl',
      metaDescription:
        'How long the doctor takes, what the visit includes, whether doctors speak English, night coverage and which areas we serve. Straight answers.',
      h1: 'Frequently asked questions',
      lede: 'What people ask us most before booking a visit, answered without the runaround.',
    },
  },
]

export const page = (id: PageId): StaticPage => {
  const found = PAGES.find((p) => p.id === id)
  if (!found) throw new Error(`Página desconocida: ${id}`)
  return found
}

export const pagePath = (lang: Locale, id: PageId): string => page(id)[lang].path

export const navPages = (): StaticPage[] => PAGES.filter((p) => p.inNav)
