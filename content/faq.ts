import type { Locale } from './locales'

export type Faq = { q: string; a: string }

/**
 * FAQ general del sitio. Las preguntas específicas de cada servicio viven
 * en services.ts y se suman al FAQPage de su propia página.
 *
 * Formato deliberado: la respuesta abre con el dato concreto en la primera
 * frase. Es lo que extraen los AI Overviews, ChatGPT y Perplexity.
 */
export const FAQ: Record<Locale, Faq[]> = {
  es: [
    {
      q: '¿Cuánto tarda en llegar el médico a mi casa?',
      a: 'Menos de 1 hora desde que confirmas la visita por WhatsApp, en cualquier punto de la Zona Metropolitana de Guadalajara.',
    },
    {
      q: '¿Atienden las 24 horas?',
      a: 'Sí. Medical Home Gdl atiende las 24 horas del día, los 7 días de la semana, incluidos domingos y días festivos.',
    },
    {
      q: '¿En qué municipios dan servicio?',
      a: 'Guadalajara, Zapopan, San Pedro Tlaquepaque, Tonalá, Tlajomulco de Zúñiga y Zapotlanejo.',
    },
    {
      q: '¿Cuánto cuesta una consulta a domicilio?',
      a: 'El costo depende del servicio y de la zona. Escríbenos por WhatsApp con lo que necesitas y te damos el precio exacto antes de agendar, sin compromiso.',
    },
    {
      q: '¿Cómo agendo una visita?',
      a: 'Por WhatsApp. Nos escribes qué está pasando, te confirmamos el costo y el tiempo de llegada, y mandamos al médico.',
    },
    {
      q: '¿Qué incluye la consulta médica a domicilio?',
      a: 'Revisión completa, toma de signos vitales, diagnóstico explicado con claridad, receta médica firmada e indicaciones por escrito.',
    },
    {
      q: '¿Los médicos están titulados?',
      a: 'Sí. Todas las visitas las realiza personal médico titulado con cédula profesional.',
    },
    {
      q: '¿Atienden niños y adultos mayores?',
      a: 'Sí. Atendemos a toda la familia, desde niños hasta adultos mayores, incluidos pacientes encamados o con movilidad limitada.',
    },
    {
      q: '¿Puedo pedir el servicio para un hotel o Airbnb?',
      a: 'Sí. Vamos a casas, departamentos, hoteles y rentas temporales dentro de nuestra zona de cobertura.',
    },
    {
      q: '¿Los médicos hablan inglés?',
      a: 'Sí. Si necesitas atención en inglés, avísanos por WhatsApp al agendar y asignamos un médico que lo hable.',
    },
    {
      q: '¿Qué pasa si necesito ir a un hospital?',
      a: 'El médico te lo dice con claridad durante la visita, te estabiliza en lo posible y te orienta sobre a dónde acudir y con qué urgencia.',
    },
    {
      q: '¿Puedo pedir estudios de laboratorio sin consulta?',
      a: 'Sí. Podemos tomar la muestra en tu domicilio aunque no lleves consulta, y un médico interpreta los resultados cuando llegan.',
    },
  ],
  en: [
    {
      q: 'How long does the doctor take to arrive?',
      a: 'Under 1 hour from the moment you confirm the visit on WhatsApp, anywhere in the Guadalajara metropolitan area.',
    },
    {
      q: 'Are you available 24 hours?',
      a: 'Yes. Medical Home Gdl operates 24 hours a day, 7 days a week, including Sundays and public holidays.',
    },
    {
      q: 'Which areas do you cover?',
      a: 'Guadalajara, Zapopan, San Pedro Tlaquepaque, Tonala, Tlajomulco de Zuniga and Zapotlanejo.',
    },
    {
      q: 'Do your doctors speak English?',
      a: 'Yes. Tell us on WhatsApp that you need care in English when you book, and we assign an English-speaking doctor to your visit.',
    },
    {
      q: 'Can you come to a hotel or an Airbnb?',
      a: 'Yes. We visit houses, apartments, hotels and short-term rentals anywhere within our coverage area.',
    },
    {
      q: 'How much does a house call cost?',
      a: 'The price depends on the service and the area. Message us on WhatsApp describing what you need and we quote the exact price before booking, with no obligation.',
    },
    {
      q: 'How do I book a visit?',
      a: 'Through WhatsApp. You tell us what is happening, we confirm the price and arrival time, and we send the doctor.',
    },
    {
      q: 'What does a house call include?',
      a: 'A full examination, vital signs, a diagnosis explained clearly, a signed prescription and written instructions.',
    },
    {
      q: 'Are your doctors licensed?',
      a: 'Yes. Every visit is carried out by licensed medical staff holding a professional licence.',
    },
    {
      q: 'Do you treat children and older adults?',
      a: 'Yes. We treat the whole family, from children to older adults, including bedbound patients and those with limited mobility.',
    },
    {
      q: 'I am a tourist without Mexican insurance. Can you still help?',
      a: 'Yes. You do not need Mexican insurance or residency. We can also provide documentation of the visit so you can claim with your travel insurance.',
    },
    {
      q: 'What if I need to go to a hospital?',
      a: 'The doctor tells you clearly during the visit, stabilises you as far as possible and advises where to go and how urgently.',
    },
  ],
}
