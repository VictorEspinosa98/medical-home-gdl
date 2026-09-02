import type { Locale } from './locales'

/**
 * Promociones de la portada. Carrusel deslizable entre el encabezado de
 * Servicios y las tarjetas.
 *
 * ⚠️  ÚNICO ARCHIVO QUE HAY QUE TOCAR PARA CAMBIAR LAS PROMOCIONES.
 *  · Cada entrada abre WhatsApp con el mensaje ya escrito (`wa`).
 *  · Dejar el array vacío oculta la sección entera, sin tocar la portada.
 *  · `price` y `note` son opcionales: si no hay precio, se omite la línea.
 *  · `PROMOS_VALID_UNTIL` se bumpea cada mes junto con las promos.
 */

export type Promo = {
  badge: string
  title: string
  body: string
  price?: string
  note?: string
  /** Mensaje pre-llenado de WhatsApp. */
  wa: string
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
export const PROMOS_VALID_UNTIL = '2026-09-30'

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

export const PROMOS: Record<Locale, Promo[]> = {
  es: [
    {
      badge: 'Consulta a domicilio',
      title: 'Primera consulta médica en casa',
      body: 'Valoración completa por médico certificado, sin filas ni traslados. Llegamos en menos de 1 hora.',
      price: 'Desde $850',
      note: 'Guadalajara y Zona Metropolitana',
      wa: 'Hola, quiero información de la promoción de primera consulta médica a domicilio.',
    },
    {
      badge: 'Laboratorio',
      title: 'Perfil de laboratorio en casa',
      body: 'Toma de muestra a domicilio y resultados en línea. Química sanguínea, biometría y perfil de lípidos.',
      price: 'Paquete con descuento',
      note: 'Toma sin costo extra',
      wa: 'Hola, quiero información de la promoción del perfil de laboratorio a domicilio.',
    },
    {
      badge: 'Enfermería',
      title: 'Paquete de curaciones',
      body: 'Curaciones y cuidado de heridas por personal de enfermería certificado, con material incluido.',
      price: 'Precio por paquete',
      note: 'Varias visitas programadas',
      wa: 'Hola, quiero información de la promoción del paquete de curaciones a domicilio.',
    },
    {
      badge: 'Cuidados',
      title: 'Cuidador por turno',
      body: 'Acompañamiento y cuidados en casa para adultos mayores o pacientes en recuperación.',
      price: 'Turnos de 8, 12 y 24 h',
      wa: 'Hola, quiero información de la promoción de cuidador a domicilio por turno.',
    },
  ],
  en: [
    {
      badge: 'House call',
      title: 'First doctor visit at home',
      body: 'Full assessment by a certified doctor, no queues and no travel. We arrive in under an hour.',
      price: 'From $850 MXN',
      note: 'Guadalajara and its metro area',
      wa: 'Hi, I would like information about the first home doctor visit offer.',
    },
    {
      badge: 'Lab',
      title: 'Lab panel at home',
      body: 'Sample collection at your address and results online. Blood chemistry, CBC and lipid panel.',
      price: 'Discounted bundle',
      note: 'Collection at no extra cost',
      wa: 'Hi, I would like information about the at-home lab panel offer.',
    },
    {
      badge: 'Nursing',
      title: 'Wound care package',
      body: 'Wound care and dressing changes by certified nurses, supplies included.',
      price: 'Package price',
      note: 'Several scheduled visits',
      wa: 'Hi, I would like information about the wound care package offer.',
    },
    {
      badge: 'Caregiving',
      title: 'Caregiver per shift',
      body: 'Company and at-home care for older adults or patients in recovery.',
      price: '8, 12 and 24 h shifts',
      wa: 'Hi, I would like information about the caregiver per shift offer.',
    },
  ],
}
