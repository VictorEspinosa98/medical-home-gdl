import type { Locale } from './locales'

/**
 * Strings de interfaz (chrome): navegación, botones, etiquetas.
 * El contenido de cada página vive en su propio archivo de content/.
 *
 * Un solo objeto en vez de dos archivos JSON: TypeScript verifica en
 * compilación que ningún idioma tenga claves de menos.
 */

type Ui = {
  skipToContent: string
  openMenu: string
  closeMenu: string
  langSwitch: string
  langSwitchLabel: string

  ctaWhatsapp: string
  ctaWhatsappShort: string
  ctaCall: string
  ctaEmail: string
  ctaServices: string
  ctaServiceDetail: string
  ctaBack: string

  available247: string
  responseTime: string
  licensedDoctors: string

  sectionServices: string
  sectionServicesLede: string
  sectionIncludes: string
  sectionIndications: string
  sectionFaq: string
  sectionCoverage: string
  sectionContact: string
  sectionAllServices: string

  breadcrumbHome: string
  contactTitle: string
  contactLede: string
  hours: string
  hoursValue: string
  coverageLabel: string
  whatsappLabel: string
  phoneLabel: string
  emailLabel: string

  footerTagline: string
  footerNav: string
  footerLegal: string
  footerDisclaimer: string
  footerRights: string

  notFoundTitle: string
  notFoundBody: string
}

export const UI: Record<Locale, Ui> = {
  es: {
    skipToContent: 'Saltar al contenido',
    openMenu: 'Menú',
    closeMenu: 'Cerrar',
    langSwitch: 'EN',
    langSwitchLabel: 'Ver esta página en inglés',

    ctaWhatsapp: 'Pedir visita por WhatsApp',
    ctaWhatsappShort: 'WhatsApp',
    ctaCall: 'Llamar ahora',
    ctaEmail: 'Escribir por correo',
    ctaServices: 'Ver todos los servicios',
    ctaServiceDetail: 'Ver detalles',
    ctaBack: 'Volver a servicios',

    available247: 'Disponible 24/7',
    responseTime: 'Llegamos en menos de 1 hora',
    licensedDoctors: 'Médicos titulados con cédula profesional',

    sectionServices: 'Qué resolvemos en tu casa',
    sectionServicesLede:
      'Once servicios médicos que llevamos a tu domicilio, con material estéril y médicos titulados.',
    sectionIncludes: 'Qué incluye',
    sectionIndications: 'Cuándo pedirlo',
    sectionFaq: 'Preguntas frecuentes',
    sectionCoverage: 'Dónde atendemos',
    sectionContact: 'Contacto',
    sectionAllServices: 'Otros servicios a domicilio',

    breadcrumbHome: 'Inicio',
    contactTitle: '¿Necesitas un médico ahora?',
    contactLede:
      'Escríbenos por WhatsApp con lo que está pasando. Te confirmamos el costo y el tiempo de llegada antes de mandar al médico.',
    hours: 'Horario',
    hoursValue: '24 horas, los 7 días de la semana',
    coverageLabel: 'Cobertura',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Teléfono',
    emailLabel: 'Correo',

    footerTagline: 'Tu médico a domicilio en Guadalajara',
    footerNav: 'Navegación',
    footerLegal: 'Aviso importante',
    footerDisclaimer:
      'La información de este sitio es orientativa y no sustituye una valoración médica presencial. Ante una emergencia que ponga en riesgo la vida, llama al 911 o acude al hospital más cercano.',
    footerRights: 'Todos los derechos reservados.',

    notFoundTitle: 'No encontramos esta página',
    notFoundBody: 'El enlace puede estar mal escrito o la página ya no existe.',
  },
  en: {
    skipToContent: 'Skip to content',
    openMenu: 'Menu',
    closeMenu: 'Close',
    langSwitch: 'ES',
    langSwitchLabel: 'View this page in Spanish',

    ctaWhatsapp: 'Book on WhatsApp',
    ctaWhatsappShort: 'WhatsApp',
    ctaCall: 'Call now',
    ctaEmail: 'Send an email',
    ctaServices: 'See all services',
    ctaServiceDetail: 'See details',
    ctaBack: 'Back to services',

    available247: 'Available 24/7',
    responseTime: 'We arrive in under 1 hour',
    licensedDoctors: 'Licensed physicians, English-speaking on request',

    sectionServices: 'What we handle at your address',
    sectionServicesLede:
      'Eleven medical services delivered to your door, with sterile equipment and licensed doctors.',
    sectionIncludes: 'What it includes',
    sectionIndications: 'When to book it',
    sectionFaq: 'Frequently asked questions',
    sectionCoverage: 'Where we go',
    sectionContact: 'Contact',
    sectionAllServices: 'Other at-home services',

    breadcrumbHome: 'Home',
    contactTitle: 'Need a doctor right now?',
    contactLede:
      'Message us on WhatsApp describing what is happening. We confirm the price and arrival time before sending the doctor.',
    hours: 'Hours',
    hoursValue: '24 hours a day, 7 days a week',
    coverageLabel: 'Coverage',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Phone',
    emailLabel: 'Email',

    footerTagline: 'Your doctor at home in Guadalajara',
    footerNav: 'Navigation',
    footerLegal: 'Important notice',
    footerDisclaimer:
      'The information on this site is for guidance only and does not replace an in-person medical assessment. In a life-threatening emergency, call 911 or go to the nearest hospital.',
    footerRights: 'All rights reserved.',

    notFoundTitle: 'We could not find this page',
    notFoundBody: 'The link may be mistyped, or the page no longer exists.',
  },
}
