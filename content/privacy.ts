import type { Locale } from './locales'
import { SITE, addressDisplay } from './site'

/**
 * Aviso de privacidad, conforme a la LFPDPPP publicada en el DOF el 20 de marzo
 * de 2025. Si cambia lo que se recaba o para qué se usa, actualizar este texto y
 * PRIVACY_UPDATED: la ley pide consentimiento nuevo para finalidades distintas.
 */
export const PRIVACY_UPDATED = '2026-11-06'

type PrivacyCopy = {
  updatedLabel: string
  sections: { title: string; paragraphs: string[]; items?: string[] }[]
}

export const PRIVACY: Record<Locale, PrivacyCopy> = {
  es: {
    updatedLabel: 'Última actualización: 6 de noviembre de 2026',
    sections: [
      {
        title: 'Responsable de tus datos',
        paragraphs: [
          `${SITE.name}, con domicilio en ${addressDisplay}, es responsable del tratamiento de tus datos personales. Para cualquier tema relacionado con este aviso, escríbenos a ${SITE.email}.`,
        ],
      },
      {
        title: 'Datos personales que recabamos',
        paragraphs: [
          'Recabamos los datos que nos compartes por WhatsApp, teléfono, correo electrónico, videollamada o durante la atención:',
        ],
        items: [
          'Identificación y contacto: nombre, teléfono, correo electrónico y domicilio donde se presta el servicio.',
          'Datos de pago necesarios para confirmar el pago de un servicio.',
          'En servicios para empresas: datos de la empresa y de la persona de contacto, y datos del personal que recibe la atención.',
        ],
      },
      {
        title: 'Datos personales sensibles',
        paragraphs: [
          'Para atenderte necesitamos datos de salud, que la ley considera sensibles: síntomas, antecedentes médicos, tratamientos, signos vitales, resultados de estudios y demás información clínica. Te pediremos tu consentimiento expreso y por escrito para tratarlos.',
          'Si la persona atendida es menor de edad o no puede otorgar su consentimiento, lo otorgará su madre, padre, tutor o representante legal.',
        ],
      },
      {
        title: 'Para qué usamos tus datos',
        paragraphs: ['Finalidades necesarias para prestar el servicio:'],
        items: [
          'Agendar y coordinar consultas, visitas a domicilio, videollamadas y toma de muestras.',
          'Valorarte, dar diagnóstico y tratamiento, emitir recetas y certificados, y dar seguimiento.',
          'Coordinar estudios de laboratorio y entregarte tus resultados.',
          'Integrar y conservar tu expediente clínico.',
          'Cobrar y dar seguimiento a los pagos.',
          'Coordinar y cotizar servicios para empresas.',
        ],
      },
      {
        title: 'Finalidad adicional',
        paragraphs: [
          `También podemos enviarte información sobre promociones y servicios. No es necesaria para atenderte: si no quieres recibirla, avísanos en cualquier momento a ${SITE.email} o por WhatsApp, y eso no afectará tu atención.`,
        ],
      },
      {
        title: 'Con quién compartimos tus datos',
        paragraphs: [
          'Solo compartimos tus datos en estos casos:',
        ],
        items: [
          'Con los laboratorios y profesionales de la salud que intervienen en tu atención o procesan tus estudios.',
          'Con tu pediatra o médico tratante, cuando lo autorices. Si se trata de un menor, con autorización de su madre, padre o tutor.',
          'Con la empresa que contrata el servicio, cuando el trabajador lo autorice.',
          'Con las autoridades que lo requieran conforme a la ley.',
        ],
      },
      {
        title: 'Cuánto tiempo conservamos tus datos',
        paragraphs: [
          'Conservamos tus datos el tiempo necesario para cumplir las finalidades de este aviso y las obligaciones legales. El expediente clínico se conserva al menos 5 años, conforme a la NOM-004-SSA3-2012.',
        ],
      },
      {
        title: 'Tus derechos ARCO',
        paragraphs: [
          `Puedes solicitar el acceso, la rectificación, la cancelación de tus datos u oponerte a su tratamiento, así como revocar tu consentimiento. Escríbenos a ${SITE.email} con tu nombre, un medio para responderte, un documento que acredite tu identidad o la de tu representante, y una descripción clara de lo que solicitas.`,
          'Te responderemos por el mismo medio dentro de los plazos que señala la ley. Algunos datos no pueden eliminarse de inmediato cuando la ley obliga a conservarlos, como los del expediente clínico.',
          'Si consideras que tus derechos no fueron atendidos, puedes acudir a la Secretaría Anticorrupción y Buen Gobierno, autoridad en la materia.',
        ],
      },
      {
        title: 'Cookies y este sitio web',
        paragraphs: [
          'Este sitio no tiene formularios ni herramientas de analítica o publicidad. Solo usa una cookie (nf_lang) que recuerda el idioma que elegiste, durante un año. Puedes borrarla desde tu navegador.',
          'Los botones de WhatsApp abren un servicio de un tercero, sujeto a sus propias políticas de privacidad.',
        ],
      },
      {
        title: 'Cambios a este aviso',
        paragraphs: [
          'Publicaremos cualquier cambio en esta página, con su fecha de actualización. Si queremos usar tus datos para una finalidad distinta, te pediremos tu consentimiento de nuevo.',
        ],
      },
    ],
  },
  en: {
    updatedLabel: 'Last updated: November 6, 2026',
    sections: [
      {
        title: 'Who is responsible for your data',
        paragraphs: [
          `${SITE.name}, located at ${addressDisplay}, is responsible for processing your personal data. For anything related to this notice, write to ${SITE.email}.`,
        ],
      },
      {
        title: 'Personal data we collect',
        paragraphs: [
          'We collect the data you share with us by WhatsApp, phone, email, video call or during care:',
        ],
        items: [
          'Identification and contact details: name, phone, email and the address where the service is provided.',
          'Payment details needed to confirm payment for a service.',
          'For company services: details of the company and contact person, and of the staff receiving care.',
        ],
      },
      {
        title: 'Sensitive personal data',
        paragraphs: [
          'To care for you we need health data, which the law considers sensitive: symptoms, medical history, treatments, vital signs, test results and other clinical information. We will ask for your express written consent to process it.',
          'If the person receiving care is a minor or cannot give consent, their mother, father, guardian or legal representative will give it.',
        ],
      },
      {
        title: 'How we use your data',
        paragraphs: ['Purposes needed to provide the service:'],
        items: [
          'Booking and coordinating visits, house calls, video calls and sample collection.',
          'Assessing you, providing diagnosis and treatment, issuing prescriptions and certificates, and following up.',
          'Coordinating lab tests and delivering your results.',
          'Creating and keeping your clinical record.',
          'Charging and following up on payments.',
          'Coordinating and quoting services for companies.',
        ],
      },
      {
        title: 'Additional purpose',
        paragraphs: [
          `We may also send you information about offers and services. This is not needed to care for you: if you do not want to receive it, tell us at any time at ${SITE.email} or on WhatsApp, and it will not affect your care.`,
        ],
      },
      {
        title: 'Who we share your data with',
        paragraphs: ['We only share your data in these cases:'],
        items: [
          'With the laboratories and health professionals involved in your care or processing your tests.',
          'With your pediatrician or treating doctor, when you authorize it. For a minor, with authorization from their mother, father or guardian.',
          'With the company that hires the service, when the worker authorizes it.',
          'With authorities that require it under the law.',
        ],
      },
      {
        title: 'How long we keep your data',
        paragraphs: [
          'We keep your data as long as needed to fulfill the purposes in this notice and our legal obligations. Clinical records are kept for at least 5 years, under Mexican standard NOM-004-SSA3-2012.',
        ],
      },
      {
        title: 'Your ARCO rights',
        paragraphs: [
          `You can request access to, rectification or cancellation of your data, object to its processing, and revoke your consent. Write to ${SITE.email} with your name, a way to reply to you, a document proving your identity or that of your representative, and a clear description of your request.`,
          'We will reply by the same means within the time limits set by law. Some data cannot be deleted immediately when the law requires keeping it, such as clinical records.',
          'If you believe your rights were not respected, you can go to the Secretaría Anticorrupción y Buen Gobierno, the competent authority in Mexico.',
        ],
      },
      {
        title: 'Cookies and this website',
        paragraphs: [
          'This site has no forms and no analytics or advertising tools. It only uses one cookie (nf_lang) that remembers the language you chose, for one year. You can delete it from your browser.',
          'WhatsApp buttons open a third-party service, subject to its own privacy policies.',
        ],
      },
      {
        title: 'Changes to this notice',
        paragraphs: [
          'We will publish any change on this page, with its update date. If we want to use your data for a different purpose, we will ask for your consent again.',
        ],
      },
    ],
  },
}
