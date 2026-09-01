// Misión, visión y valores.
// Fuente: "mision y valores pagina.docx" entregado por el cliente.
// Se corrigieron las erratas del original ("comoda" → "cómoda",
// "medicos" → "médicos", puntuación final) y se dividieron los párrafos
// largos para que se puedan leer. El contenido no se alteró.

import type { Locale } from './locales'

export type Value = {
  id: string
  title: Record<Locale, string>
  body: Record<Locale, string>
}

export const MISSION: Record<Locale, string[]> = {
  es: [
    'En Medical Home Gdl, nuestra misión es brindar atención médica de calidad y confianza en la comodidad de tu hogar. Nos comprometemos a ofrecerte un servicio accesible y profesional que priorice tu salud, seguridad y bienestar, eliminando el complicado desplazamiento y las largas filas de espera.',
    'Estamos aquí para hacer que tu experiencia médica sea cómoda, segura y eficaz, asegurando que cada paciente reciba la atención que necesita, cuando la necesita.',
    'Nuestro compromiso contigo es proporcionar atención médica personalizada, oportuna y eficaz, mediante un equipo de profesionales de la salud altamente calificados que se esfuerzan por construir relaciones duraderas con nuestros pacientes y sus familias, garantizando calidad, accesibilidad y seguridad, con el fin de mejorar la salud y el bienestar de nuestros pacientes en el confort de su hogar.',
  ],
  en: [
    'At Medical Home Gdl, our mission is to deliver trustworthy, quality medical care in the comfort of your home. We are committed to an accessible, professional service that puts your health, safety and wellbeing first, removing the difficult journey and the long waiting lines.',
    'We are here to make your medical experience comfortable, safe and effective, making sure every patient receives the care they need, when they need it.',
    'Our commitment to you is personalised, timely and effective medical care, delivered by a team of highly qualified health professionals who work to build lasting relationships with our patients and their families — guaranteeing quality, accessibility and safety, so that our patients get better in the comfort of their own home.',
  ],
}

export const VISION: Record<Locale, string[]> = {
  es: [
    'Nuestra visión es ser la empresa líder en consultas médicas a domicilio y convertirnos en tu mejor opción. Buscamos la preferencia de la comunidad gracias a la calidad de nuestros servicios médicos.',
    'Somos una empresa que siempre buscará innovar constantemente en sus servicios para adaptarse a las necesidades cambiantes de nuestros pacientes y de la comunidad. Seremos la elección preferida para quienes buscan atención médica en el hogar, reconocidos por nuestra capacidad de brindar soluciones efectivas y de calidad.',
  ],
  en: [
    'Our vision is to be the leading home medical care company and to become your first choice. We seek the preference of the community through the quality of our medical services.',
    'We are a company that will always keep innovating in its services to adapt to the changing needs of our patients and our community. We will be the preferred choice for those seeking medical care at home, recognised for our ability to deliver effective, quality solutions.',
  ],
}

export const VALUES: Value[] = [
  {
    id: 'compromiso',
    title: { es: 'Compromiso', en: 'Commitment' },
    body: {
      es: 'Estamos comprometidos con nuestros pacientes y nos esforzamos por brindar servicios de alta calidad, seguros y efectivos, que cumplan con los más altos estándares de la atención médica.',
      en: 'We are committed to our patients and work to deliver high-quality, safe and effective services that meet the highest standards of medical care.',
    },
  },
  {
    id: 'empatia',
    title: { es: 'Empatía', en: 'Empathy' },
    body: {
      es: 'Nos preocupamos por el bienestar de nuestros pacientes y sus familias, y nos esforzamos por brindar atención personalizada y adaptada a las necesidades individuales, para generar la mayor dignidad y confort para el paciente.',
      en: 'We care about the wellbeing of our patients and their families, and we work to provide personalised care adapted to individual needs, so that every patient keeps their dignity and comfort.',
    },
  },
  {
    id: 'accesibilidad',
    title: { es: 'Accesibilidad', en: 'Accessibility' },
    body: {
      es: 'Nos comprometemos a hacer que nuestros servicios sean accesibles para todos, sin importar su ubicación o situación, para que nadie se quede sin atención médica debido a barreras geográficas o económicas.',
      en: 'We are committed to making our services accessible to everyone, regardless of location or circumstance, so that nobody goes without medical care because of geographic or economic barriers.',
    },
  },
  {
    id: 'innovacion',
    title: { es: 'Innovación', en: 'Innovation' },
    body: {
      es: 'Nos enfocamos en innovar constantemente nuestros servicios y procedimientos para adaptarnos a las necesidades cambiantes de nuestros pacientes y la comunidad, y para mejorar la eficiencia y efectividad de nuestra atención médica.',
      en: 'We focus on constantly innovating our services and procedures to adapt to the changing needs of our patients and community, and to improve the efficiency and effectiveness of our care.',
    },
  },
  {
    id: 'confianza',
    title: { es: 'Confianza', en: 'Trust' },
    body: {
      es: 'Nos esforzamos por construir relaciones duraderas con nuestros pacientes y sus familias, basadas en la confianza y la comunicación abierta, para que se sientan seguros y apoyados en todo momento.',
      en: 'We work to build lasting relationships with our patients and their families, based on trust and open communication, so they feel safe and supported at every moment.',
    },
  },
  {
    id: 'respeto',
    title: { es: 'Respeto', en: 'Respect' },
    body: {
      es: 'Nos comprometemos a tratar a nuestros pacientes y sus familias con respeto, dignidad y compasión, y a brindar atención médica que se adapte a sus necesidades individuales y culturales.',
      en: 'We are committed to treating our patients and their families with respect, dignity and compassion, and to providing care adapted to their individual and cultural needs.',
    },
  },
]

/** Encabezados de sección de la página Nosotros. */
export const ABOUT_HEADINGS = {
  mission: { es: 'Misión', en: 'Mission' },
  vision: { es: 'Visión', en: 'Vision' },
  values: { es: 'Valores', en: 'Values' },
  valuesLede: {
    es: 'Seis principios que definen cómo entramos a la casa de un paciente.',
    en: 'Six principles that define how we walk into a patient home.',
  },
} as const
