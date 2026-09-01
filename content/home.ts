import type { Locale } from './locales'

/** Copy de las secciones de la portada. */

export type Step = { n: string; title: string; body: string }
export type Pillar = { icon: 'clock' | 'shield' | 'home' | 'globe'; title: string; body: string }

export const HERO = {
  badge: { es: 'Disponible 24 horas', en: 'Available 24 hours' },
  /** Bloque extraíble para LLMs: dato duro, autocontenido, primera pantalla. */
  answer: {
    es: 'Medical Home Gdl es un servicio de atención médica a domicilio en Guadalajara, Jalisco. Un médico titulado llega a tu casa, hotel o departamento en menos de 1 hora, las 24 horas del día, en Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco y Zapotlanejo. También atendemos en Morelia, Michoacán y en Querétaro.',
    en: 'Medical Home Gdl is a house-call medical service in Guadalajara, Mexico. A licensed doctor reaches your home, hotel or apartment in under 1 hour, 24 hours a day, across Guadalajara, Zapopan, Tlaquepaque, Tonala, Tlajomulco and Zapotlanejo. We also serve Morelia and Queretaro. English-speaking doctors available on request.',
  },
  imageAlt: {
    es: 'Médico de Medical Home Gdl explicando un tratamiento a un paciente mayor',
    en: 'Medical Home Gdl doctor explaining a treatment to an older patient',
  },
} as const

export const PILLARS: Record<Locale, Pillar[]> = {
  es: [
    {
      icon: 'clock',
      title: 'En menos de 1 hora',
      body: 'Confirmas por WhatsApp y el médico va en camino. Sin sala de espera, sin turno.',
    },
    {
      icon: 'shield',
      title: 'Médicos titulados',
      body: 'Cada visita la hace personal médico con cédula profesional y material estéril de un solo uso.',
    },
    {
      icon: 'home',
      title: 'Todo en tu casa',
      body: 'Consulta, laboratorio, sueros, curaciones y certificados. No tienes que salir para nada.',
    },
    {
      icon: 'globe',
      title: 'Las 24 horas',
      body: 'Madrugada, domingo o día festivo. Siempre hay un médico disponible.',
    },
  ],
  en: [
    {
      icon: 'clock',
      title: 'Under one hour',
      body: 'You confirm on WhatsApp and the doctor is on the way. No waiting room, no queue number.',
    },
    {
      icon: 'shield',
      title: 'Licensed physicians',
      body: 'Every visit is made by licensed medical staff using sterile, single-use equipment.',
    },
    {
      icon: 'globe',
      title: 'English spoken',
      body: 'Ask for an English-speaking doctor when you book. No Mexican insurance or residency needed.',
    },
    {
      icon: 'home',
      title: 'Everything at your address',
      body: 'Consultations, lab work, IV therapy, wound care and certificates. You never leave the room.',
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
