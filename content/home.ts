import type { Locale } from './locales'

/** Copy de las secciones de la portada. */

export type Step = { n: string; title: string; body: string }
export type Pillar = { icon: 'clock' | 'shield' | 'home' | 'globe'; title: string; body: string }
export type Bullet = { icon: 'clock' | 'shield' | 'pin' | 'heart' | 'check'; text: string }

export const HERO = {
  badge: { es: 'Disponible 24 horas', en: 'Available 24 hours' },
  /** Bloque extraíble para LLMs: dato duro, autocontenido, primera pantalla. */
  answerTitle: {
    es: 'Atención médica profesional, donde la necesites.',
    en: 'Professional medical care, wherever you need it.',
  },
  answer: {
    es: 'Consultas médicas, laboratorio de análisis clínicos, servicio de enfermería y cuidados a domicilio en Guadalajara y toda la Zona Metropolitana. Atención rápida, personalizada y sin traslados innecesarios.',
    en: 'Doctor house calls, clinical lab tests, nursing and at-home caregiving in Guadalajara and across its metropolitan area. Fast, personal care with no unnecessary trips.',
  },
  /** Viñetas de confianza bajo los botones del banner. */
  bullets: {
    es: [
      { icon: 'clock', text: 'Llegamos hasta ti en menos de 1 hora' },
      { icon: 'shield', text: 'Atención médica profesional y certificada' },
      { icon: 'pin', text: 'Amplia cobertura en Guadalajara y Zona Metropolitana' },
      { icon: 'heart', text: 'Enfermería y cuidadores certificados' },
      { icon: 'check', text: 'Precios claros y múltiples formas de pago' },
    ],
    en: [
      { icon: 'clock', text: 'We reach you in under 1 hour' },
      { icon: 'shield', text: 'Professional, certified medical care' },
      { icon: 'pin', text: 'Wide coverage across Guadalajara and its metro area' },
      { icon: 'heart', text: 'Certified nurses and caregivers' },
      { icon: 'check', text: 'Clear prices and several payment methods' },
    ],
  } satisfies Record<Locale, Bullet[]>,
  imageAlt: {
    es: 'Médico de Medical Home Gdl explicando un tratamiento a un paciente mayor',
    en: 'Medical Home Gdl doctor explaining a treatment to an older patient',
  },
} as const

export const PILLARS: Record<Locale, Pillar[]> = {
  es: [
    {
      icon: 'clock',
      title: 'Llegamos en menos de 1 hora',
      body: 'Atención médica rápida, sin filas ni traslados.',
    },
    {
      icon: 'shield',
      title: 'Personal médico certificado',
      body: 'Cada visita se realiza por personal altamente certificado y actualizado.',
    },
    {
      icon: 'home',
      title: 'Todo en tu casa',
      body: 'Consultorio médico, laboratorio de análisis clínicos, servicios de enfermería y cuidadores sin salir de casa.',
    },
    {
      icon: 'globe',
      title: 'Las 24 horas',
      body: 'De día, de noche, de madrugada, domingo o día festivo. Siempre hay un médico disponible.',
    },
  ],
  en: [
    {
      icon: 'clock',
      title: 'We arrive in under 1 hour',
      body: 'Fast medical care, with no queues and no trips across town.',
    },
    {
      icon: 'shield',
      title: 'Certified medical staff',
      body: 'Every visit is made by highly certified, up-to-date staff. English-speaking doctors on request.',
    },
    {
      icon: 'home',
      title: 'Everything at your home',
      body: "Doctor's office, clinical lab, nursing and caregivers without leaving the house.",
    },
    {
      icon: 'globe',
      title: 'Around the clock',
      body: 'Daytime, night, early morning, Sunday or holiday. There is always a doctor available.',
    },
  ],
}

export const STEPS_HEADING = {
  es: { title: 'Cómo funciona', lede: 'Tres pasos. Ninguno requiere que salgas de tu casa.' },
  en: { title: 'How it works', lede: 'Three steps. None of them require you to leave the room.' },
} as const

export const STEPS: Record<Locale, Step[]> = {
  es: [
    {
      n: '01',
      title: 'Escríbenos por WhatsApp',
      body: 'Nos cuentas qué está pasando y en qué dirección estás. No necesitas cita previa ni llenar formularios.',
    },
    {
      n: '02',
      title: 'Te confirmamos costo y hora',
      body: 'Antes de mandar al médico te decimos el precio exacto y en cuánto tiempo llega. Sin sorpresas.',
    },
    {
      n: '03',
      title: 'El médico llega a tu puerta',
      body: 'Te revisa, te explica qué tienes, te da tu receta y deja las indicaciones por escrito.',
    },
  ],
  en: [
    {
      n: '01',
      title: 'Message us on WhatsApp',
      body: 'Tell us what is happening and where you are. No appointment, no forms to fill in.',
    },
    {
      n: '02',
      title: 'We confirm price and time',
      body: 'Before sending the doctor we tell you the exact price and the arrival time. No surprises.',
    },
    {
      n: '03',
      title: 'The doctor arrives at your door',
      body: 'They examine you, explain what is going on, write your prescription and leave written instructions.',
    },
  ],
}

export const ABOUT_TEASER = {
  es: {
    title: 'Atención médica que se adapta a ti, no al revés',
    body: 'Medical Home Gdl existe para quitar de en medio lo que estorba entre una persona enferma y un médico: el traslado, la fila y la espera. Trabajamos con seis valores que definen cómo entramos a la casa de un paciente.',
    cta: 'Conocer nuestra misión y valores',
  },
  en: {
    title: 'Medical care that adapts to you, not the other way around',
    body: 'Medical Home Gdl exists to remove what gets between a sick person and a doctor: the drive, the queue and the wait. We work by six values that define how we walk into a patient home.',
    cta: 'Read our mission and values',
  },
} as const

export const FINAL_CTA = {
  es: {
    title: 'Un médico puede estar en tu casa en menos de 1 hora',
    body: 'Escríbenos por WhatsApp. Te respondemos a cualquier hora, todos los días del año.',
    wa: 'Hola, necesito atención médica a domicilio en Guadalajara.',
  },
  en: {
    title: 'A doctor can be at your door in under an hour',
    body: 'Message us on WhatsApp. We answer at any hour, every day of the year.',
    wa: 'Hi, I need a doctor at my address in Guadalajara.',
  },
} as const
