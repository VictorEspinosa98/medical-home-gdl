import type { RouteRef } from '@/lib/urls'
import type { Locale } from './locales'

/**
 * Promociones de la portada. Carrusel deslizable en móvil, cuadrícula en
 * escritorio.
 *
 * ⚠️  ÚNICO ARCHIVO QUE HAY QUE TOCAR PARA CAMBIAR LAS PROMOCIONES.
 *  · Cada entrada abre WhatsApp con el mensaje ya escrito (`wa`).
 *  · Dejar el array vacío oculta la sección entera, sin tocar la portada.
 *  · `price`, `priceBefore`, `note`, `cta` y `terms` son opcionales.
 *  · `price` es el precio VIGENTE: de ahí sale el Offer del JSON-LD. Lo tachado
 *    va en `priceBefore`, nunca en `price`.
 *  · `PROMOS_VALID_UNTIL` se bumpea cada mes junto con las promos.
 */

export type Promo = {
  badge: string
  title: string
  body: string
  price?: string
  /** Precio anterior, se muestra tachado. No alimenta el JSON-LD. */
  priceBefore?: string
  note?: string
  /** Texto del enlace. Por defecto "Pedir por WhatsApp". */
  cta?: string
  /** Letra chica bajo el enlace. */
  terms?: string
  /** Mensaje pre-llenado de WhatsApp. */
  wa: string
  /** Página con el detalle. Si es un servicio, el precio se publica también ahí. */
  detail?: RouteRef
}

/**
 * ⚠️  BUMPEAR CADA MES, JUNTO CON LAS PROMOCIONES.
 *
 * ISO (YYYY-MM-DD), último día de vigencia inclusive. Se muestra en la
 * sección y alimenta `priceValidUntil` del Offer en JSON-LD.
 *
 * Una sección titulada "Promociones del mes" sin fecha visible es un hueco
 * de confianza: el visitante no tiene forma de saber si el precio sigue en
 * pie, y la página puede quedarse rancia sin que nadie lo note.
 */
export const PROMOS_VALID_UNTIL = '2026-11-30'

/** Vigencia legible, ya localizada. */
export const promosValidUntilLabel = (lang: Locale): string => {
  const formatted = new Intl.DateTimeFormat(lang === 'es' ? 'es-MX' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${PROMOS_VALID_UNTIL}T12:00:00Z`))

  return lang === 'es' ? `Vigencia: hasta el ${formatted}` : `Valid through ${formatted}`
}

export const PROMOS_HEADING: Record<Locale, { eyebrow: string; title: string }> = {
  es: { eyebrow: 'Promociones', title: 'Promociones del mes' },
  en: { eyebrow: 'Offers', title: 'This month’s offers' },
}

const service = (id: string): RouteRef => ({ kind: 'service', id })

export const PROMOS: Record<Locale, Promo[]> = {
  es: [
    {
      badge: 'Consulta a domicilio',
      detail: service('consulta-domicilio'),
      title: 'Primera consulta médica en casa',
      body: 'Valoración completa por médico certificado, sin filas ni traslados. Llegamos en menos de 1 hora.',
      price: 'Desde $850 MXN',
      note: 'Guadalajara y Zona Metropolitana',
      wa: 'Hola, quiero información de la promoción de primera consulta médica a domicilio.',
    },
    {
      badge: 'Prueba rápida',
      detail: service('vsr'),
      title: 'Prueba rápida de VSR 4 en 1',
      body: 'VSR, adenovirus, COVID-19 e influenza. Resultado durante la visita.',
      price: '$950 MXN',
      note: 'A domicilio en Guadalajara y la ZMG o en consultorio.',
      cta: 'Agendar por WhatsApp',
      wa: 'Hola, me interesa la prueba respiratoria 4 en 1 (VSR, adenovirus, COVID e influenza). ¿Me pueden compartir disponibilidad a domicilio o en consultorio?',
    },
    {
      badge: 'Laboratorio',
      detail: service('laboratorio'),
      title: 'Check-up completo',
      body: 'Incluye biometría hemática completa, química sanguínea, perfil de lípidos, pruebas de función hepática, examen general de orina y proteína C reactiva (PCR).',
      price: '$1,650 MXN',
      note: 'Toma de muestras a domicilio sin costo extra en Guadalajara y la ZMG. Resultados en línea.',
      cta: 'Agendar por WhatsApp',
      wa: 'Hola, quiero agendar el check-up completo con toma de muestras a domicilio.',
    },
    {
      badge: 'Terapia intravenosa',
      detail: service('sueros'),
      title: 'Sueros IV a domicilio',
      body: 'Un médico acude a tu domicilio y realiza una valoración previa para determinar si la terapia intravenosa está indicada.',
      priceBefore: 'Antes $2,500 MXN',
      price: 'Ahora $2,200 MXN',
      note: 'Disponible en Guadalajara y la ZMG.',
      cta: 'Consultar disponibilidad por WhatsApp',
      terms: 'Promoción sujeta a excepciones.',
      wa: 'Hola, quiero consultar disponibilidad de la promoción de sueros IV a domicilio.',
    },
    {
      badge: 'Promoción del Buen Fin',
      title: '50% de descuento en el segundo servicio',
      body: 'Agenda dos consultas médicas o dos sueros intravenosos para el mismo día y en el mismo domicilio y recibe 50% de descuento en el segundo servicio.',
      note: 'Disponible en Guadalajara y la ZMG. La aplicación de sueros IV está sujeta a valoración médica.',
      cta: 'Agenda por WhatsApp',
      terms:
        'Promoción sujeta a disponibilidad y excepciones. Promoción válida del 01 de noviembre al 30 de noviembre del 2026.',
      wa: 'Hola, quiero agendar la promoción del Buen Fin con 50% de descuento en el segundo servicio.',
    },
    {
      badge: 'Prenupcial',
      detail: service('prenupcial'),
      title: 'Paquete prenupcial para la pareja',
      body: 'Incluye un certificado médico prenupcial por persona para el trámite de matrimonio civil, además de pruebas de VIH, VDRL, grupo sanguíneo y factor Rh para ambos integrantes.',
      price: '$2,950 MXN',
      note: 'En total por las dos personas.',
      cta: 'Agenda por WhatsApp',
      wa: 'Hola, quiero agendar el paquete prenupcial para la pareja.',
    },
    {
      badge: 'Especialidad',
      detail: service('medicina-interna'),
      title: 'Medicina interna',
      body: 'En Medical Home GDL ya contamos con especialista en Medicina Interna. Puedes agendar una consulta con un médico especialista en consultorio o solicitar atención a domicilio en Guadalajara y la Zona Metropolitana, según disponibilidad.',
      note: 'El servicio incluye valoración de síntomas, revisión de estudios y seguimiento de enfermedades crónicas.',
      cta: 'Consulta horarios y agenda por WhatsApp',
      wa: 'Hola, quiero agendar una consulta de Medicina Interna. ¿Me pueden compartir los horarios disponibles?',
    },
    {
      badge: 'Para empresas',
      detail: { kind: 'page', id: 'business' },
      title: 'Servicios médicos para tu personal',
      body: 'Evaluaciones médicas para candidatos en proceso de selección y personal de nuevo ingreso, certificados médicos y toma de muestras de laboratorio en tus instalaciones.',
      note: 'Cotización según el número de trabajadores y los servicios requeridos. Disponible en Guadalajara y la ZMG.',
      cta: 'Solicitar cotización por WhatsApp',
      wa: 'Hola, quisiera cotizar servicios médicos para mi empresa. Estamos interesados en realizar una cotización para los siguientes servicios:',
    },
    {
      badge: 'Consulta médica virtual',
      detail: service('consulta-en-linea'),
      title: 'Consulta médica en línea',
      body: 'Habla con un médico de Medical Home GDL sobre tus síntomas, revisa tus estudios o da seguimiento a tu tratamiento por videollamada. Atención en todo México y receta digital cuando se indique.',
      priceBefore: 'Antes $650 MXN',
      price: 'Ahora $450 MXN',
      note: 'Por consulta. Pago previo a la consulta.',
      cta: 'Reservar por WhatsApp',
      wa: 'Hola, me gustaría agendar una consulta médica virtual. ¿Me pueden compartir los horarios disponibles y las indicaciones para poder agendar?',
    },
  ],
  en: [
    {
      badge: 'House call',
      detail: service('consulta-domicilio'),
      title: 'First doctor visit at home',
      body: 'Full assessment by a certified doctor, no queues and no travel. We arrive in under an hour.',
      price: 'From $850 MXN',
      note: 'Guadalajara and its metro area',
      wa: 'Hi, I would like information about the first home doctor visit offer.',
    },
    {
      badge: 'Rapid test',
      detail: service('vsr'),
      title: '4-in-1 RSV rapid test',
      body: 'RSV, adenovirus, COVID-19 and influenza. Result during the visit.',
      price: '$950 MXN',
      note: 'At home in Guadalajara and its metro area, or at our clinic.',
      cta: 'Book on WhatsApp',
      wa: 'Hi, I am interested in the 4-in-1 respiratory test (RSV, adenovirus, COVID and influenza). Could you share availability at home or at the clinic?',
    },
    {
      badge: 'Lab',
      detail: service('laboratorio'),
      title: 'Complete check-up',
      body: 'Includes complete blood count, blood chemistry, lipid panel, liver function tests, urinalysis and C-reactive protein (CRP).',
      price: '$1,650 MXN',
      note: 'At-home sample collection at no extra cost in Guadalajara and its metro area. Results online.',
      cta: 'Book on WhatsApp',
      wa: 'Hi, I would like to book the complete check-up with at-home sample collection.',
    },
    {
      badge: 'IV therapy',
      detail: service('sueros'),
      title: 'IV drips at home',
      body: 'A doctor comes to your home and performs an assessment first to determine whether IV therapy is appropriate.',
      priceBefore: 'Was $2,500 MXN',
      price: 'Now $2,200 MXN',
      note: 'Available in Guadalajara and its metro area.',
      cta: 'Check availability on WhatsApp',
      terms: 'Offer subject to exceptions.',
      wa: 'Hi, I would like to check availability of the at-home IV drip offer.',
    },
    {
      badge: 'Buen Fin offer',
      title: '50% off the second service',
      body: 'Book two doctor visits or two IV drips for the same day at the same address and get 50% off the second service.',
      note: 'Available in Guadalajara and its metro area. IV drips are subject to medical assessment.',
      cta: 'Book on WhatsApp',
      terms: 'Offer subject to availability and exceptions. Valid from November 1 to November 30, 2026.',
      wa: 'Hi, I would like to book the Buen Fin offer with 50% off the second service.',
    },
    {
      badge: 'Premarital',
      detail: service('prenupcial'),
      title: 'Premarital package for couples',
      body: 'Includes one premarital medical certificate per person for the civil marriage process, plus HIV, VDRL, blood type and Rh factor tests for both partners.',
      price: '$2,950 MXN',
      note: 'Total for both people.',
      cta: 'Book on WhatsApp',
      wa: 'Hi, I would like to book the premarital package for couples.',
    },
    {
      badge: 'Specialty care',
      detail: service('medicina-interna'),
      title: 'Internal medicine',
      body: 'Medical Home GDL now has an internal medicine specialist. You can book a visit with a specialist at our clinic or request care at home in Guadalajara and its metro area, subject to availability.',
      note: 'The service includes symptom assessment, review of test results and follow-up of chronic conditions.',
      cta: 'See times and book on WhatsApp',
      wa: 'Hi, I would like to book an internal medicine visit. Could you share the available times?',
    },
    {
      badge: 'For companies',
      detail: { kind: 'page', id: 'business' },
      title: 'Medical services for your staff',
      body: 'Medical evaluations for job candidates and new hires, medical certificates and lab sample collection at your facilities.',
      note: 'Quote based on the number of employees and services required. Available in Guadalajara and its metro area.',
      cta: 'Request a quote on WhatsApp',
      wa: 'Hi, I would like a quote for medical services for my company. We are interested in the following services:',
    },
    {
      badge: 'Virtual consultation',
      detail: service('consulta-en-linea'),
      title: 'Online doctor consultation',
      body: 'Talk to a Medical Home GDL doctor about your symptoms, review your test results or follow up on your treatment by video call. Care anywhere in Mexico, with a digital prescription when indicated.',
      priceBefore: 'Was $650 MXN',
      price: 'Now $450 MXN',
      note: 'Per consultation. Payment before the consultation.',
      cta: 'Book on WhatsApp',
      wa: 'Hi, I would like to book a virtual medical consultation. Could you share the available times and instructions for booking?',
    },
  ],
}

/** Promoción ligada a un servicio. Es de donde su página toma el precio. */
export const promoForService = (lang: Locale, id: string): Promo | undefined =>
  PROMOS[lang].find((p) => p.detail?.kind === 'service' && p.detail.id === id)
