import type { Locale } from './locales'

/** Copy de las secciones de la portada. */

export type Step = { n: string; title: string; body: string }
export type Pillar = { icon: 'clock' | 'shield' | 'home' | 'globe'; title: string; body: string }
export type Bullet = { icon: 'clock' | 'shield' | 'pin' | 'heart' | 'check'; text: string }

export const HERO = {
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
      title: 'Llámanos o escríbenos por WhatsApp',
      body: 'Cuéntanos qué servicio necesitas y dónde te encuentras.',
    },
    {
      n: '02',
      title: 'Confirmamos tu atención',
      body: 'Te compartimos disponibilidad, costo y tiempo estimado.',
    },
    {
      n: '03',
      title: 'Vamos hasta ti',
      body: 'Coordinamos tu servicio y te atendemos donde lo necesites.',
    },
  ],
  en: [
    {
      n: '01',
      title: 'Call us or message us on WhatsApp',
      body: 'Tell us which service you need and where you are.',
    },
    {
      n: '02',
      title: 'We confirm your visit',
      body: 'We share availability, price and estimated arrival time.',
    },
    {
      n: '03',
      title: 'We come to you',
      body: 'We arrange your service and attend you wherever you need it.',
    },
  ],
}

export const ABOUT_TEASER = {
  es: {
    title: 'Atención médica que se adapta a ti',
    body: 'En Medical Home GDL hacemos que recibir atención profesional sea más fácil. Acercamos nuestros servicios médicos, laboratorio, enfermería y cuidados hasta donde los necesites, evitando traslados y tiempos de espera innecesarios.',
    cta: 'Conoce más sobre Medical Home',
  },
  en: {
    title: 'Medical care that adapts to you',
    body: 'At Medical Home GDL we make professional care easier to get. We bring our medical, lab, nursing and caregiving services to wherever you need them, with no unnecessary trips or waiting times.',
    cta: 'Learn more about Medical Home',
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
