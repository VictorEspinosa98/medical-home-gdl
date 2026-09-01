import type { Locale } from './locales'

export type Area = {
  id: string
  name: string
  /** Colonias y zonas de referencia. Alimenta el SEO local. */
  zones: Record<Locale, string>
}

/**
 * Zonas con cobertura. Primero los seis municipios de la Zona Metropolitana
 * de Guadalajara —ordenados por volumen de demanda esperado, no
 * alfabéticamente— y al final las dos ciudades foráneas.
 */
export const AREAS: Area[] = [
  {
    id: 'guadalajara',
    name: 'Guadalajara',
    zones: {
      es: 'Centro, Americana, Lafayette, Providencia, Chapalita, Moderna, Oblatos, Huentitán y el resto del municipio.',
      en: 'Centro, Americana, Lafayette, Providencia, Chapalita, Moderna, Oblatos, Huentitan and the rest of the municipality.',
    },
  },
  {
    id: 'zapopan',
    name: 'Zapopan',
    zones: {
      es: 'Andares, Puerta de Hierro, Ciudad Granja, Tesistán, Santa Margarita, Valle Real, Bugambilias y zona centro.',
      en: 'Andares, Puerta de Hierro, Ciudad Granja, Tesistan, Santa Margarita, Valle Real, Bugambilias and the town centre.',
    },
  },
  {
    id: 'tlaquepaque',
    name: 'San Pedro Tlaquepaque',
    zones: {
      es: 'Centro histórico, Las Juntas, Álamo Industrial, Revolución y colonias aledañas.',
      en: 'Historic centre, Las Juntas, Alamo Industrial, Revolucion and surrounding neighbourhoods.',
    },
  },
  {
    id: 'tonala',
    name: 'Tonalá',
    zones: {
      es: 'Centro, Loma Dorada, Jalisco, Santa Paula y zonas cercanas.',
      en: 'Centro, Loma Dorada, Jalisco, Santa Paula and nearby areas.',
    },
  },
  {
    id: 'tlajomulco',
    name: 'Tlajomulco de Zúñiga',
    zones: {
      es: 'Chulavista, Santa Fe, Hacienda Santa Fe, Cajititlán, San Agustín y fraccionamientos del corredor sur.',
      en: 'Chulavista, Santa Fe, Hacienda Santa Fe, Cajititlan, San Agustin and the southern corridor developments.',
    },
  },
  {
    id: 'zapotlanejo',
    name: 'Zapotlanejo',
    zones: {
      es: 'Cabecera municipal y localidades cercanas a la carretera libre a Zapotlanejo.',
      en: 'Town centre and localities along the free road to Zapotlanejo.',
    },
  },
  {
    id: 'morelia',
    name: 'Morelia, Michoacán',
    zones: {
      es: 'Centro histórico, Chapultepec, Las Américas, Altozano, Tres Marías y colonias aledañas. Confirma la dirección por WhatsApp para darte el tiempo exacto de llegada.',
      en: 'Historic centre, Chapultepec, Las Americas, Altozano, Tres Marias and nearby neighbourhoods. Confirm your address on WhatsApp and we will give you the exact arrival time.',
    },
  },
  {
    id: 'queretaro',
    name: 'Querétaro, Querétaro',
    zones: {
      es: 'Centro histórico, Juriquilla, El Refugio, Milenio III, Zibatá y zona Álamos. Confirma la dirección por WhatsApp para darte el tiempo exacto de llegada.',
      en: 'Historic centre, Juriquilla, El Refugio, Milenio III, Zibata and the Alamos area. Confirm your address on WhatsApp and we will give you the exact arrival time.',
    },
  },
]

export const COVERAGE_COPY = {
  /** Bloque extraíble: responde la pregunta literal con la lista completa. */
  answer: {
    es: 'Medical Home Gdl cubre los seis municipios de la Zona Metropolitana de Guadalajara —Guadalajara, Zapopan, San Pedro Tlaquepaque, Tonalá, Tlajomulco de Zúñiga y Zapotlanejo— y también atiende en Morelia, Michoacán y en Querétaro. El servicio opera las 24 horas del día, todos los días del año, y en la zona metropolitana el médico llega en menos de 1 hora.',
    en: 'Medical Home Gdl covers the six municipalities of the Guadalajara metropolitan area — Guadalajara, Zapopan, San Pedro Tlaquepaque, Tonala, Tlajomulco de Zuniga and Zapotlanejo — and also serves Morelia, Michoacan and Queretaro. The service runs 24 hours a day, every day of the year, and within the metro area the doctor arrives in under 1 hour.',
  },
  outsideTitle: {
    es: '¿Estás fuera de estos municipios?',
    en: 'Outside these municipalities?',
  },
  outsideBody: {
    es: 'Escríbenos de todas formas por WhatsApp. Según la dirección exacta, podemos confirmarte si alcanzamos a llegar y en cuánto tiempo.',
    en: 'Message us on WhatsApp anyway. Depending on the exact address we can confirm whether we can reach you and how long it would take.',
  },
  zonesLabel: {
    es: 'Zonas frecuentes',
    en: 'Common areas',
  },
} as const
