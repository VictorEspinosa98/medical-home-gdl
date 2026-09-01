import type { Locale } from './locales'

export type Area = {
  id: string
  name: string
  /** Colonias y zonas de referencia. Alimenta el SEO local. */
  zones: Record<Locale, string>
}

/**
 * Municipios de la Zona Metropolitana de Guadalajara con cobertura.
 * El orden es por volumen de demanda esperado, no alfabético.
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
]

export const COVERAGE_COPY = {
  /** Bloque extraíble: responde la pregunta literal con la lista completa. */
  answer: {
    es: 'Medical Home Gdl cubre seis municipios de la Zona Metropolitana de Guadalajara: Guadalajara, Zapopan, San Pedro Tlaquepaque, Tonalá, Tlajomulco de Zúñiga y Zapotlanejo. El servicio opera las 24 horas del día, todos los días del año, y el médico llega en menos de 1 hora.',
    en: 'Medical Home Gdl covers six municipalities of the Guadalajara metropolitan area: Guadalajara, Zapopan, San Pedro Tlaquepaque, Tonala, Tlajomulco de Zuniga and Zapotlanejo. The service runs 24 hours a day, every day of the year, and the doctor arrives in under 1 hour.',
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
