import type { Locale } from './locales'

type BusinessCopy = {
  answer: string
  cta: string
  wa: string
  imageAlt: string
  servicesTitle: string
  services: { title: string; body: string; serviceId?: string }[]
  stepsTitle: string
  steps: { title: string; body: string }[]
  closingTitle: string
  closingBody: string
  coverage: string
  homeCardEyebrow: string
  homeCardTitle: string
  homeCardBody: string
  homeCardCta: string
}

export const BUSINESS: Record<Locale, BusinessCopy> = {
  es: {
    answer:
      'En Medical Home GDL ayudamos a las áreas de Recursos Humanos, Administración y Operaciones a coordinar los servicios médicos que necesita su personal. Podemos programar desde una valoración individual para un nuevo ingreso hasta una jornada para un grupo de trabajadores, con horarios acordados según los turnos de la empresa.',
    cta: 'Solicitar cotización por WhatsApp',
    wa: 'Hola, quisiera cotizar servicios médicos para mi empresa. Estamos interesados en realizar una cotización para los siguientes servicios:',
    imageAlt:
      'Profesional de salud toma la presión a un trabajador en una oficina de Guadalajara mientras otro prepara muestras de laboratorio',
    servicesTitle: 'Servicios médicos para tu personal',
    services: [
      {
        title: 'Valoraciones médicas de ingreso',
        body: 'Realizamos evaluaciones clínicas para personal de nuevo ingreso. La valoración puede incluir antecedentes, signos vitales y exploración física. Si el proceso de contratación requiere estudios complementarios, podemos coordinar la toma de muestras como parte del mismo servicio.',
      },
      {
        title: 'Certificados médicos para trabajadores',
        serviceId: 'certificados',
        body: 'Realizamos la valoración clínica y, cuando corresponde, emitimos el certificado médico con base en los hallazgos y el propósito para el que se solicita. Podemos coordinar citas individuales o programar varias valoraciones en una misma jornada.',
      },
      {
        title: 'Estudios de laboratorio en tu empresa',
        serviceId: 'laboratorio',
        body: 'Nuestro equipo puede acudir a tus instalaciones para realizar la toma de muestras del personal. Coordinamos los estudios solicitados, las indicaciones de preparación y la entrega de resultados. Según el servicio requerido, también podemos incluir pruebas antidoping y estudios microbiológicos en la cotización.',
      },
      {
        title: 'Jornadas médicas para grupos',
        body: 'Si necesitas atender a varios trabajadores, podemos organizar las valoraciones y la toma de muestras en una misma jornada. Acordamos contigo el espacio, los horarios y el orden de atención para que el personal pueda acudir por turnos y reducir el tiempo fuera de su puesto.',
      },
    ],
    stepsTitle: '¿Cómo coordinamos el servicio?',
    steps: [
      {
        title: 'Cuéntanos qué necesita tu empresa',
        body: 'Compártenos el municipio, el número aproximado de trabajadores y los servicios o estudios que buscas.',
      },
      {
        title: 'Recibe una propuesta',
        body: 'Te indicamos el alcance del servicio, el costo y las opciones de fecha según disponibilidad.',
      },
      {
        title: 'Programamos la atención',
        body: 'Confirmamos los horarios, el espacio de trabajo y las indicaciones que el personal debe recibir antes de la jornada.',
      },
    ],
    closingTitle: 'Solicita una propuesta para tu empresa',
    closingBody:
      'Atendemos empresas en Guadalajara y la Zona Metropolitana. Escríbenos para cotizar una valoración individual, un grupo de trabajadores o una jornada en tus instalaciones.',
    coverage: 'Guadalajara y la Zona Metropolitana',
    homeCardEyebrow: 'Para empresas',
    homeCardTitle: 'Servicios médicos para tu personal',
    homeCardBody:
      'Valoraciones médicas de ingreso, certificados para trabajadores y toma de muestras de laboratorio en tus instalaciones.',
    homeCardCta: 'Conocer servicios para empresas',
  },
  en: {
    answer:
      'At Medical Home GDL we help Human Resources, Administration and Operations teams coordinate the medical services their staff need. We can schedule anything from an individual assessment for a new hire to a medical day for a group of employees, with times agreed around the company’s shifts.',
    cta: 'Request a quote on WhatsApp',
    wa: 'Hi, I would like a quote for medical services for my company. We are interested in the following services:',
    imageAlt:
      'Healthcare professional taking a worker’s blood pressure in a Guadalajara office while a colleague prepares lab samples',
    servicesTitle: 'Medical services for your staff',
    services: [
      {
        title: 'Pre-employment medical assessments',
        body: 'We perform clinical evaluations for new hires. The assessment can include medical history, vital signs and a physical exam. If the hiring process requires additional tests, we can arrange sample collection as part of the same service.',
      },
      {
        title: 'Medical certificates for workers',
        serviceId: 'certificados',
        body: 'We perform the clinical assessment and, when appropriate, issue the medical certificate based on the findings and the purpose for which it is requested. We can arrange individual appointments or schedule several assessments on the same day.',
      },
      {
        title: 'Lab tests at your company',
        serviceId: 'laboratorio',
        body: 'Our team can come to your facilities to collect samples from your staff. We coordinate the requested tests, preparation instructions and delivery of results. Depending on the service required, we can also include drug screening and microbiological tests in the quote.',
      },
      {
        title: 'Medical days for groups',
        body: 'If you need to attend to several workers, we can organize assessments and sample collection on the same day. We agree with you on the space, times and order of care so staff can come in shifts and spend less time away from their posts.',
      },
    ],
    stepsTitle: 'How do we coordinate the service?',
    steps: [
      {
        title: 'Tell us what your company needs',
        body: 'Share the municipality, the approximate number of employees and the services or tests you are looking for.',
      },
      {
        title: 'Receive a proposal',
        body: 'We tell you the scope of the service, the cost and the date options based on availability.',
      },
      {
        title: 'We schedule the care',
        body: 'We confirm the times, the work space and the instructions staff should receive before the day.',
      },
    ],
    closingTitle: 'Request a proposal for your company',
    closingBody:
      'We serve companies in Guadalajara and its metro area. Message us for a quote on an individual assessment, a group of employees or a medical day at your facilities.',
    coverage: 'Guadalajara and its metro area',
    homeCardEyebrow: 'For companies',
    homeCardTitle: 'Medical services for your staff',
    homeCardBody:
      'Pre-employment medical assessments, worker certificates and lab sample collection at your facilities.',
    homeCardCta: 'See services for companies',
  },
}
