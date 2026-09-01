import type { Locale } from './locales'

export type ServiceLocale = {
  /** Slug localizado. Cambiarlo rompe URLs indexadas — tratar como estable. */
  slug: string
  /** H1 de la página. */
  name: string
  /** Nombre corto para tarjetas y menús. */
  shortName: string
  /** <title>. Máximo ~60 caracteres. */
  metaTitle: string
  /** <meta description>. Máximo ~155 caracteres. */
  metaDescription: string
  /** Beneficio en una línea. Va en la tarjeta y en llms.txt. */
  benefit: string
  /**
   * Bloque extraíble: 40-60 palabras que responden la pregunta literal,
   * autocontenido. Es lo que citan ChatGPT, Perplexity y AI Overviews.
   */
  answer: string
  /** Cuerpo de la página, 1-2 párrafos. */
  intro: string
  /** Qué incluye el servicio. */
  includes: string[]
  /** Cuándo pedirlo. */
  indications: string[]
  /** 3-4 preguntas propias → FAQPage + markdown. */
  faq: { q: string; a: string }[]
  /** Texto pre-llenado del WhatsApp de esta página. */
  waMessage: string
}

export type Service = {
  /** Llave estable entre idiomas. NUNCA cambia: une ES↔EN, hreflang y .md */
  id: string
  order: number
  /** Ruta base sin extensión en /public/img. */
  image: string
  alt: { es: string; en: string }
  schemaType: 'MedicalProcedure' | 'MedicalTest' | 'MedicalTherapy' | 'Service'
  es: ServiceLocale
  en: ServiceLocale
}

export const SERVICES: Service[] = [
  {
    id: 'consulta-domicilio',
    order: 1,
    image: '/img/services/consulta-domicilio',
    alt: {
      es: 'Médico de Medical Home Gdl atendiendo a un niño en su casa, acompañado de su mamá',
      en: 'Medical Home Gdl doctor treating a child at home while his mother watches',
    },
    schemaType: 'MedicalProcedure',
    es: {
      slug: 'consulta-medica-a-domicilio',
      name: 'Consulta médica a domicilio en Guadalajara',
      shortName: 'Consulta médica a domicilio',
      metaTitle: 'Consulta Médica a Domicilio en Guadalajara | 24/7',
      metaDescription:
        'Un médico llega a tu casa en menos de 1 hora, las 24 horas, en toda la Zona Metropolitana de Guadalajara. Sin filas, sin salir. Pide tu visita por WhatsApp.',
      benefit: 'Un médico en tu puerta en menos de 1 hora, a cualquier hora',
      answer:
        'La consulta médica a domicilio de Medical Home Gdl lleva un médico titulado a tu casa en menos de 1 hora, las 24 horas del día, en Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco y Zapotlanejo. El médico revisa al paciente, da el diagnóstico y deja la receta en la misma visita.',
      intro:
        'No tienes que levantar a un enfermo, manejar hasta un consultorio ni esperar tu turno en una sala llena. Nos dices qué pasa por WhatsApp y un médico va a tu casa. Llega en menos de una hora.\n\nLa visita es igual que una consulta normal: el médico te revisa, te explica qué tienes en palabras que entiendes, te da tu receta y te dice qué sigue. Si necesitas estudios o un suero, lo resolvemos ahí mismo.',
      includes: [
        'Revisión completa por un médico titulado',
        'Diagnóstico explicado en palabras claras',
        'Receta médica en la misma visita',
        'Signos vitales: presión, oxígeno, temperatura y frecuencia cardiaca',
        'Indicaciones por escrito de qué hacer los siguientes días',
        'Aviso de cuándo sí hay que ir a un hospital',
      ],
      indications: [
        'Fiebre, gripa fuerte, tos o dolor de garganta',
        'Dolor de estómago, vómito o diarrea',
        'Presión alta o malestar general',
        'Adultos mayores a los que mover es difícil',
        'Niños que no aguantan la espera de un consultorio',
        'Estás de viaje en Guadalajara y te enfermaste',
      ],
      faq: [
        {
          q: '¿Cuánto tarda en llegar el médico?',
          a: 'Menos de 1 hora desde que confirmas la visita por WhatsApp, dentro de la Zona Metropolitana de Guadalajara.',
        },
        {
          q: '¿Atienden de madrugada y en fin de semana?',
          a: 'Sí. El servicio es 24 horas, los 7 días de la semana, incluidos días festivos.',
        },
        {
          q: '¿El médico me da receta?',
          a: 'Sí. Recibes tu receta médica firmada en la misma visita, junto con las indicaciones por escrito.',
        },
        {
          q: '¿Qué pasa si necesito estudios o un suero?',
          a: 'Se resuelve en la misma visita o coordinamos la toma de laboratorio y la colocación del suero en tu domicilio.',
        },
      ],
      waMessage: 'Hola, necesito una consulta médica a domicilio.',
    },
    en: {
      slug: 'doctor-house-call',
      name: 'Doctor house call in Guadalajara',
      shortName: 'Doctor house call',
      metaTitle: 'Doctor House Call in Guadalajara | English-Speaking, 24/7',
      metaDescription:
        'A licensed doctor comes to your home, hotel or Airbnb in under 1 hour, 24/7, anywhere in Guadalajara. No waiting rooms. Book on WhatsApp.',
      benefit: 'A licensed doctor at your door in under an hour, any hour',
      answer:
        'Medical Home Gdl sends a licensed doctor to your home, hotel or Airbnb in Guadalajara in under 1 hour, 24 hours a day. We cover Guadalajara, Zapopan, Tlaquepaque, Tonala, Tlajomulco and Zapotlanejo. The doctor examines you, explains the diagnosis and hands you a prescription during the same visit.',
      intro:
        'You should not have to move a sick person, find a clinic in a city you do not know, or sit in a crowded waiting room. Tell us what is wrong on WhatsApp and a doctor comes to you. Under one hour.\n\nThe visit works like a normal consultation: the doctor examines you, explains what is going on in plain language, writes your prescription and tells you what comes next. If you need lab work or an IV, we handle it right there.',
      includes: [
        'Full examination by a licensed physician',
        'Diagnosis explained in plain language',
        'Prescription during the same visit',
        'Vital signs: blood pressure, oxygen, temperature and heart rate',
        'Written instructions for the days ahead',
        'Clear guidance on when a hospital is necessary',
      ],
      indications: [
        'Fever, bad cold, cough or sore throat',
        'Stomach pain, vomiting or diarrhea',
        'High blood pressure or general illness',
        'Older adults who are hard to move',
        'Children who cannot handle a waiting room',
        'You are travelling in Guadalajara and got sick',
      ],
      faq: [
        {
          q: 'How long does the doctor take to arrive?',
          a: 'Under 1 hour from the moment you confirm the visit on WhatsApp, anywhere in the Guadalajara metro area.',
        },
        {
          q: 'Do you work at night and on weekends?',
          a: 'Yes. The service runs 24 hours a day, 7 days a week, holidays included.',
        },
        {
          q: 'Do your doctors speak English?',
          a: 'Yes. Tell us on WhatsApp that you need an English-speaking doctor and we assign one to your visit.',
        },
        {
          q: 'Can you come to a hotel or an Airbnb?',
          a: 'Yes. We visit hotels, short-term rentals and private homes across the Guadalajara metro area.',
        },
      ],
      waMessage: 'Hi, I need a doctor house call in Guadalajara.',
    },
  },

  {
    id: 'laboratorio',
    order: 2,
    image: '/img/services/laboratorio',
    alt: {
      es: 'Toma de muestra de sangre a domicilio con material estéril',
      en: 'At-home blood sample being drawn with sterile equipment',
    },
    schemaType: 'MedicalTest',
    es: {
      slug: 'estudios-de-laboratorio-a-domicilio',
      name: 'Estudios de laboratorio a domicilio',
      shortName: 'Estudios de laboratorio',
      metaTitle: 'Estudios de Laboratorio a Domicilio en Guadalajara',
      metaDescription:
        'Tomamos tu muestra en casa y te mandamos los resultados el mismo día por WhatsApp o correo. Sin filas, sin ayuno esperando en un laboratorio.',
      benefit: 'Tus análisis sin salir de casa, resultados el mismo día',
      answer:
        'Medical Home Gdl toma tus estudios de laboratorio en tu domicilio en Guadalajara. Nosotros hacemos la toma, el traslado, el procesamiento y la interpretación. Los resultados llegan en unas horas por WhatsApp o correo electrónico, con la explicación de un médico.',
      intro:
        'Evita las filas y el ayuno esperando de pie. Vamos a tu casa, tomamos la muestra con material estéril y nuevo, y nos la llevamos.\n\nEn unas horas te llegan los resultados a tu WhatsApp o a tu correo. No te los mandamos solos: un médico te explica qué significan y qué hay que hacer.',
      includes: [
        'Toma de muestra en tu domicilio',
        'Material estéril y de un solo uso',
        'Traslado y procesamiento en laboratorio certificado',
        'Resultados el mismo día por WhatsApp o correo',
        'Interpretación médica de los resultados',
        'Biometría, química sanguínea, perfil de lípidos, tiroides y más',
      ],
      indications: [
        'Chequeo general anual',
        'Control de diabetes, colesterol o tiroides',
        'Estudios que te pidió tu médico',
        'Personas con movilidad limitada',
        'No quieres exponerte en una sala de espera',
        'Trámites que piden análisis recientes',
      ],
      faq: [
        {
          q: '¿En cuánto tiempo tengo mis resultados?',
          a: 'En unas horas el mismo día, según el estudio. Te llegan por WhatsApp o correo electrónico.',
        },
        {
          q: '¿Necesito estar en ayuno?',
          a: 'Depende del estudio. Al agendar por WhatsApp te decimos exactamente cuántas horas de ayuno necesitas, si aplica.',
        },
        {
          q: '¿Alguien me explica los resultados?',
          a: 'Sí. Un médico interpreta tus resultados y te explica qué significan y qué sigue.',
        },
        {
          q: '¿Qué estudios pueden tomar en casa?',
          a: 'Biometría hemática, química sanguínea, perfil de lípidos, perfil tiroideo, examen general de orina y la mayoría de los estudios de rutina.',
        },
      ],
      waMessage: 'Hola, quiero estudios de laboratorio a domicilio.',
    },
    en: {
      slug: 'at-home-lab-tests',
      name: 'At-home lab tests in Guadalajara',
      shortName: 'At-home lab tests',
      metaTitle: 'At-Home Lab Tests in Guadalajara | Same-Day Results',
      metaDescription:
        'We draw your sample at home and send results the same day by WhatsApp or email, with a doctor explaining what they mean. No lines, no waiting rooms.',
      benefit: 'Blood work at home, results the same day',
      answer:
        'Medical Home Gdl collects lab samples at your address in Guadalajara. We handle collection, transport, processing and interpretation. Results reach you within hours by WhatsApp or email, together with a doctor explaining what they mean.',
      intro:
        'Skip the line and the fasting wait. We come to you, draw the sample with sterile single-use equipment and take it to the lab.\n\nResults arrive within hours on WhatsApp or by email. We do not send raw numbers: a doctor explains what they mean and what to do next.',
      includes: [
        'Sample collection at your address',
        'Sterile, single-use equipment',
        'Transport and processing at a certified laboratory',
        'Same-day results by WhatsApp or email',
        'Medical interpretation of your results',
        'Blood count, blood chemistry, lipid panel, thyroid panel and more',
      ],
      indications: [
        'Annual health check',
        'Diabetes, cholesterol or thyroid monitoring',
        'Tests your doctor ordered',
        'People with limited mobility',
        'You would rather not sit in a waiting room',
        'Paperwork that requires recent lab work',
      ],
      faq: [
        {
          q: 'How fast do I get results?',
          a: 'Within hours the same day, depending on the test. They arrive by WhatsApp or email.',
        },
        {
          q: 'Do I need to fast?',
          a: 'It depends on the test. When you book on WhatsApp we tell you exactly how many hours of fasting are needed, if any.',
        },
        {
          q: 'Does someone explain the results?',
          a: 'Yes. A doctor interprets your results and explains what they mean and what comes next.',
        },
        {
          q: 'Which tests can you run at home?',
          a: 'Complete blood count, blood chemistry, lipid panel, thyroid panel, urinalysis and most routine tests.',
        },
      ],
      waMessage: 'Hi, I need at-home lab tests in Guadalajara.',
    },
  },

  {
    id: 'pruebas-rapidas',
    order: 3,
    image: '/img/services/pruebas-rapidas',
    alt: {
      es: 'Doctora realizando una prueba rápida con punción en el dedo a un paciente en su casa',
      en: 'Doctor performing a rapid finger-prick test on a patient at home',
    },
    schemaType: 'MedicalTest',
    es: {
      slug: 'pruebas-rapidas-covid-influenza-dengue',
      name: 'Pruebas rápidas de COVID-19, influenza y dengue a domicilio',
      shortName: 'Pruebas rápidas',
      metaTitle: 'Pruebas Rápidas COVID, Influenza y Dengue a Domicilio GDL',
      metaDescription:
        'Resultado en minutos, en tu casa. Pruebas rápidas de COVID-19, influenza y dengue con médico incluido. Guadalajara, 24 horas.',
      benefit: 'Sabes qué tienes en minutos, sin salir de tu casa',
      answer:
        'Medical Home Gdl realiza pruebas rápidas de COVID-19, influenza y dengue en tu domicilio en Guadalajara, con resultado en minutos. Va un médico, hace la prueba, te da el resultado en el momento y, si sale positiva, inicia el tratamiento en la misma visita.',
      intro:
        'Cuando tienes fiebre y no sabes si es gripa, COVID o dengue, cada hora cuenta. Un médico va a tu casa, hace la prueba y te da el resultado en minutos.\n\nSi sale positiva no te dejamos con el papel en la mano: el mismo médico te explica qué significa, te da el tratamiento y te dice a qué señales estar atento.',
      includes: [
        'Prueba rápida de COVID-19, influenza o dengue',
        'Resultado en minutos, en tu casa',
        'Valoración médica incluida',
        'Tratamiento y receta si el resultado es positivo',
        'Indicaciones de aislamiento y cuidados',
        'Señales de alarma explicadas con claridad',
      ],
      indications: [
        'Fiebre que no cede',
        'Tos, dolor de cuerpo o pérdida del olfato',
        'Estuviste con alguien contagiado',
        'Dolor detrás de los ojos y salpullido',
        'Necesitas descartar antes de ver a un familiar vulnerable',
        'Requisito para un viaje o un evento',
      ],
      faq: [
        {
          q: '¿En cuánto tiempo sale el resultado?',
          a: 'En minutos, durante la misma visita. No tienes que esperar a otro día.',
        },
        {
          q: '¿Qué pruebas rápidas manejan?',
          a: 'COVID-19, influenza A y B, y dengue. Si necesitas otra, pregúntanos por WhatsApp.',
        },
        {
          q: '¿Si salgo positivo me tratan ahí mismo?',
          a: 'Sí. El médico que hace la prueba te da el tratamiento y la receta en la misma visita.',
        },
        {
          q: '¿Sirve para viajar?',
          a: 'Depende del requisito de cada aerolínea o país. Dinos a dónde viajas y te confirmamos si la prueba rápida es suficiente.',
        },
      ],
      waMessage: 'Hola, necesito una prueba rápida a domicilio.',
    },
    en: {
      slug: 'rapid-tests-covid-flu-dengue',
      name: 'Rapid COVID-19, flu and dengue tests at home',
      shortName: 'Rapid tests',
      metaTitle: 'Rapid COVID, Flu & Dengue Tests at Home | Guadalajara',
      metaDescription:
        'Results in minutes at your home or hotel in Guadalajara. Rapid COVID-19, influenza and dengue tests with a doctor included. Available 24/7.',
      benefit: 'Know what you have in minutes, without leaving your room',
      answer:
        'Medical Home Gdl performs rapid COVID-19, influenza and dengue tests at your address in Guadalajara, with results in minutes. A doctor runs the test, gives you the result on the spot and, if it is positive, starts treatment during the same visit.',
      intro:
        'When you have a fever and cannot tell whether it is flu, COVID or dengue, every hour counts. A doctor comes to you, runs the test and gives you the result in minutes.\n\nIf it comes back positive we do not just hand you a slip of paper: the same doctor explains what it means, starts treatment and tells you which warning signs to watch for.',
      includes: [
        'Rapid COVID-19, influenza or dengue test',
        'Results in minutes, at your address',
        'Medical assessment included',
        'Treatment and prescription if the result is positive',
        'Isolation and care instructions',
        'Warning signs explained clearly',
      ],
      indications: [
        'A fever that will not break',
        'Cough, body aches or loss of smell',
        'You were exposed to someone infected',
        'Pain behind the eyes and a rash',
        'You need to rule it out before seeing a vulnerable relative',
        'A requirement for travel or an event',
      ],
      faq: [
        {
          q: 'How long do results take?',
          a: 'Minutes, during the same visit. There is no second appointment.',
        },
        {
          q: 'Which rapid tests do you carry?',
          a: 'COVID-19, influenza A and B, and dengue. Ask us on WhatsApp if you need a different one.',
        },
        {
          q: 'If I test positive, do you treat me right away?',
          a: 'Yes. The doctor who runs the test provides treatment and a prescription in the same visit.',
        },
        {
          q: 'Is it valid for travel?',
          a: 'It depends on each airline or country. Tell us where you are travelling and we confirm whether a rapid test is enough.',
        },
      ],
      waMessage: 'Hi, I need a rapid test at my address in Guadalajara.',
    },
  },

  {
    id: 'sueros',
    order: 4,
    image: '/img/services/sueros',
    alt: {
      es: 'Médica ajustando el goteo de un suero intravenoso en el domicilio del paciente',
      en: 'Doctor adjusting an intravenous drip at the patient home',
    },
    schemaType: 'MedicalTherapy',
    es: {
      slug: 'sueros-intravenosos-y-canalizacion',
      name: 'Sueros intravenosos y canalización a domicilio',
      shortName: 'Sueros intravenosos',
      metaTitle: 'Sueros Intravenosos a Domicilio en Guadalajara | 24/7',
      metaDescription:
        'Hidratación y medicamento por vena, aplicados por un médico en tu casa. Ideal para deshidratación, vómito, resaca o debilidad. Guadalajara 24 horas.',
      benefit: 'Te recuperas en tu cama, no en una sala de urgencias',
      answer:
        'Medical Home Gdl coloca sueros intravenosos en tu domicilio en Guadalajara. Un médico te canaliza —te coloca la vía en la vena—, administra el suero con líquidos, electrolitos o medicamento, y se queda a vigilar la aplicación. El servicio está disponible 24 horas.',
      intro:
        'Cuando el cuerpo ya no retiene líquidos, tomar agua no alcanza. El suero entra directo a la vena y funciona mucho más rápido.\n\nUn médico va a tu casa, te coloca la vía, pasa el suero y se queda contigo durante toda la aplicación. Cuando termina, retira la vía y te deja indicaciones. Tú te quedas en tu cama todo el tiempo.',
      includes: [
        'Valoración médica antes de aplicar',
        'Canalización: colocación de la vía en la vena',
        'Suero con líquidos, electrolitos o medicamento',
        'Vigilancia médica durante toda la aplicación',
        'Retiro de la vía y curación del sitio',
        'Material estéril y de un solo uso',
      ],
      indications: [
        'Deshidratación por vómito o diarrea',
        'No puedes retener líquidos',
        'Debilidad o agotamiento fuerte',
        'Malestar intenso después de beber alcohol',
        'Medicamento que necesita entrar por vena',
        'Recuperación después de una infección',
      ],
      faq: [
        {
          q: '¿Qué es la canalización?',
          a: 'Es colocar la vía en tu vena para que pase el suero. Lo hace un médico con material estéril y nuevo.',
        },
        {
          q: '¿Cuánto dura la aplicación?',
          a: 'Entre 45 minutos y 2 horas, según el tipo de suero. El médico se queda contigo todo ese tiempo.',
        },
        {
          q: '¿Duele?',
          a: 'Solo el piquete inicial, igual que al sacar sangre. Después no se siente.',
        },
        {
          q: '¿Se queda alguien conmigo?',
          a: 'Sí. El médico permanece durante toda la aplicación, retira la vía al terminar y deja indicaciones por escrito.',
        },
      ],
      waMessage: 'Hola, necesito un suero intravenoso a domicilio.',
    },
    en: {
      slug: 'iv-therapy-and-cannulation',
      name: 'IV therapy and cannulation at home',
      shortName: 'IV therapy',
      metaTitle: 'IV Therapy at Home in Guadalajara | Doctor Included, 24/7',
      metaDescription:
        'Fluids, electrolytes or medication delivered by IV at your home or hotel in Guadalajara. A doctor places the line and stays throughout. Available 24/7.',
      benefit: 'Recover in your own bed, not in an emergency room',
      answer:
        'Medical Home Gdl provides IV therapy at your address in Guadalajara. A doctor places the cannula in your vein, administers fluids, electrolytes or medication, and stays to monitor the entire infusion. The service is available 24 hours a day.',
      intro:
        'When your body stops holding fluids down, drinking water is not enough. An IV goes straight into the vein and works far faster.\n\nA doctor comes to you, places the line, runs the infusion and stays with you the whole time. When it is done they remove the line and leave written instructions. You never leave your bed.',
      includes: [
        'Medical assessment before starting',
        'Cannulation: placing the line in your vein',
        'Fluids, electrolytes or medication by IV',
        'Medical supervision throughout the infusion',
        'Line removal and site care',
        'Sterile, single-use equipment',
      ],
      indications: [
        'Dehydration from vomiting or diarrhea',
        'You cannot keep fluids down',
        'Severe weakness or exhaustion',
        'Heavy discomfort after drinking alcohol',
        'Medication that must be given intravenously',
        'Recovery after an infection',
      ],
      faq: [
        {
          q: 'What is cannulation?',
          a: 'It is placing the line into your vein so the IV can run. A doctor does it with sterile, single-use equipment.',
        },
        {
          q: 'How long does it take?',
          a: 'Between 45 minutes and 2 hours depending on the IV. The doctor stays with you the entire time.',
        },
        {
          q: 'Does it hurt?',
          a: 'Only the initial needle stick, the same as a blood draw. After that you do not feel it.',
        },
        {
          q: 'Does someone stay with me?',
          a: 'Yes. The doctor remains for the full infusion, removes the line afterwards and leaves written instructions.',
        },
      ],
      waMessage: 'Hi, I need IV therapy at my address in Guadalajara.',
    },
  },

  {
    id: 'medicamentos',
    order: 5,
    image: '/img/services/medicamentos',
    alt: {
      es: 'Paciente recibiendo medicamento intravenoso en su domicilio',
      en: 'Patient receiving intravenous medication at home',
    },
    schemaType: 'MedicalProcedure',
    es: {
      slug: 'aplicacion-de-medicamentos',
      name: 'Aplicación de medicamentos a domicilio',
      shortName: 'Aplicación de medicamentos',
      metaTitle: 'Aplicación de Inyecciones y Medicamentos a Domicilio GDL',
      metaDescription:
        'Inyecciones intramusculares e intravenosas aplicadas por un médico en tu casa. Dosis correcta, material estéril y seguimiento. Guadalajara 24/7.',
      benefit: 'Tu inyección bien puesta, sin buscar quién te la aplique',
      answer:
        'Medical Home Gdl aplica medicamentos por vía intramuscular e intravenosa en tu domicilio en Guadalajara. Un médico verifica la receta y la dosis, aplica el medicamento con material estéril y vigila que no haya reacción. Disponible las 24 horas.',
      intro:
        'Tienes la receta y el medicamento, pero no a quién aplicártelo. Nosotros vamos a tu casa.\n\nUn médico revisa tu receta, confirma que la dosis sea la correcta, aplica el medicamento y se queda unos minutos para verificar que no haya reacción. Si el tratamiento son varias aplicaciones, agendamos todas.',
      includes: [
        'Aplicación intramuscular o intravenosa',
        'Verificación de receta y dosis antes de aplicar',
        'Material estéril y de un solo uso',
        'Vigilancia de reacciones después de aplicar',
        'Registro de cada aplicación del tratamiento',
        'Agenda de esquemas de varios días',
      ],
      indications: [
        'Antibiótico inyectado que te recetaron',
        'Medicamento para el dolor',
        'Tratamientos de varios días',
        'No hay quién aplique la inyección en casa',
        'Adultos mayores o personas encamadas',
        'Prefieres que lo haga un médico y no cualquiera',
      ],
      faq: [
        {
          q: '¿Necesito receta?',
          a: 'Sí. El medicamento inyectable requiere receta. Si no la tienes, agendamos primero una consulta a domicilio y el médico la emite.',
        },
        {
          q: '¿Ustedes traen el medicamento?',
          a: 'Podemos orientarte para conseguirlo. Dinos por WhatsApp cuál es y te confirmamos.',
        },
        {
          q: '¿Aplican tratamientos de varios días?',
          a: 'Sí. Agendamos todas las aplicaciones del esquema y llevamos el registro de cada una.',
        },
        {
          q: '¿Se quedan por si hay reacción?',
          a: 'Sí. El médico permanece unos minutos después de aplicar para verificar que no haya ninguna reacción.',
        },
      ],
      waMessage: 'Hola, necesito que me apliquen un medicamento a domicilio.',
    },
    en: {
      slug: 'medication-administration',
      name: 'Medication administration at home',
      shortName: 'Medication administration',
      metaTitle: 'Injections & Medication at Home in Guadalajara | 24/7',
      metaDescription:
        'Intramuscular and intravenous injections given by a doctor at your home in Guadalajara. Correct dosage, sterile equipment and follow-up. Available 24/7.',
      benefit: 'Your injection given properly, without hunting for someone to do it',
      answer:
        'Medical Home Gdl administers intramuscular and intravenous medication at your address in Guadalajara. A doctor verifies the prescription and dosage, gives the medication using sterile equipment and monitors for any reaction. Available 24 hours a day.',
      intro:
        'You have the prescription and the medication, but nobody to administer it. We come to you.\n\nA doctor checks your prescription, confirms the dosage, gives the medication and stays a few minutes to make sure there is no reaction. If your treatment is a multi-day course, we schedule every dose.',
      includes: [
        'Intramuscular or intravenous administration',
        'Prescription and dosage verified before giving',
        'Sterile, single-use equipment',
        'Monitoring for reactions afterwards',
        'A record of every dose in the course',
        'Scheduling for multi-day regimens',
      ],
      indications: [
        'A prescribed injectable antibiotic',
        'Pain medication',
        'Multi-day treatment courses',
        'Nobody at home can give the injection',
        'Older adults or bedbound patients',
        'You want a doctor doing it, not just anyone',
      ],
      faq: [
        {
          q: 'Do I need a prescription?',
          a: 'Yes. Injectable medication requires one. If you do not have it, we book a house call first and the doctor issues it.',
        },
        {
          q: 'Do you bring the medication?',
          a: 'We can guide you on obtaining it. Tell us on WhatsApp which one you need and we confirm.',
        },
        {
          q: 'Do you handle multi-day courses?',
          a: 'Yes. We schedule every dose in the regimen and keep a record of each one.',
        },
        {
          q: 'Do you stay in case of a reaction?',
          a: 'Yes. The doctor stays for several minutes after administering to make sure there is no reaction.',
        },
      ],
      waMessage: 'Hi, I need medication administered at home in Guadalajara.',
    },
  },

  {
    id: 'sondas',
    order: 6,
    image: '/img/services/sondas',
    alt: {
      es: 'Enfermera acompañando a una paciente con movilidad limitada en su casa',
      en: 'Nurse assisting a patient with limited mobility at home',
    },
    schemaType: 'MedicalProcedure',
    es: {
      slug: 'sondas-urinarias-y-nasogastricas',
      name: 'Colocación y retiro de sondas urinarias y nasogástricas',
      shortName: 'Sondas urinarias y nasogástricas',
      metaTitle: 'Colocación de Sondas a Domicilio en Guadalajara | 24/7',
      metaDescription:
        'Colocación, cambio y retiro de sondas Foley y nasogástricas en tu domicilio, por personal médico capacitado. Guadalajara, 24 horas.',
      benefit: 'Un procedimiento delicado, hecho con calma y en privado',
      answer:
        'Medical Home Gdl coloca, cambia y retira sondas urinarias (Foley) y nasogástricas en tu domicilio en Guadalajara. Lo realiza personal médico capacitado, con técnica estéril, y deja a la familia entrenada en los cuidados diarios. Disponible 24 horas.',
      intro:
        'Trasladar a un paciente encamado solo para cambiar una sonda es incómodo y arriesgado. Nosotros vamos a su casa.\n\nEl procedimiento lo hace personal médico capacitado, con técnica estéril y sin prisa. Al terminar, enseñamos a quien cuida al paciente cómo manejar la sonda día a día y qué señales vigilar.',
      includes: [
        'Colocación de sonda urinaria (Foley) o nasogástrica',
        'Cambio programado de sonda',
        'Retiro cuando ya no se necesita',
        'Técnica estéril y material nuevo',
        'Entrenamiento a la familia en los cuidados diarios',
        'Señales de alarma explicadas con claridad',
      ],
      indications: [
        'Pacientes encamados o con movilidad limitada',
        'Retención urinaria',
        'Alimentación por sonda',
        'Cambio programado de una sonda existente',
        'Cuidados después de una hospitalización',
        'Adultos mayores en casa',
      ],
      faq: [
        {
          q: '¿Quién realiza el procedimiento?',
          a: 'Personal médico capacitado, con técnica estéril y material nuevo en cada procedimiento.',
        },
        {
          q: '¿Nos enseñan a cuidarla?',
          a: 'Sí. Antes de irnos entrenamos a quien cuida al paciente en la limpieza, el manejo diario y las señales de alarma.',
        },
        {
          q: '¿Cada cuánto se cambia una sonda?',
          a: 'Depende del tipo y de la indicación médica. Agendamos el cambio y te avisamos cuando toca.',
        },
        {
          q: '¿Atienden urgencias por sonda tapada?',
          a: 'Sí. El servicio es 24 horas. Escríbenos por WhatsApp y coordinamos la visita.',
        },
      ],
      waMessage: 'Hola, necesito colocación o cambio de sonda a domicilio.',
    },
    en: {
      slug: 'urinary-and-nasogastric-catheters',
      name: 'Urinary and nasogastric catheter placement and removal',
      shortName: 'Catheter care',
      metaTitle: 'Catheter Placement at Home in Guadalajara | 24/7',
      metaDescription:
        'Foley and nasogastric catheter placement, replacement and removal at your home in Guadalajara, by trained medical staff. Available 24 hours.',
      benefit: 'A delicate procedure done calmly and in private',
      answer:
        'Medical Home Gdl places, replaces and removes urinary (Foley) and nasogastric catheters at your address in Guadalajara. Trained medical staff perform the procedure using sterile technique and train the family in daily care. Available 24 hours a day.',
      intro:
        'Moving a bedbound patient just to change a catheter is uncomfortable and risky. We come to them instead.\n\nTrained medical staff perform the procedure with sterile technique and without rushing. Afterwards we teach whoever cares for the patient how to manage the catheter day to day and which warning signs matter.',
      includes: [
        'Foley or nasogastric catheter placement',
        'Scheduled catheter replacement',
        'Removal when no longer needed',
        'Sterile technique and new equipment',
        'Family training in daily care',
        'Warning signs explained clearly',
      ],
      indications: [
        'Bedbound patients or limited mobility',
        'Urinary retention',
        'Tube feeding',
        'Scheduled replacement of an existing catheter',
        'Care after a hospital stay',
        'Older adults at home',
      ],
      faq: [
        {
          q: 'Who performs the procedure?',
          a: 'Trained medical staff, using sterile technique and new equipment every time.',
        },
        {
          q: 'Do you teach us how to care for it?',
          a: 'Yes. Before leaving we train the caregiver in cleaning, daily handling and warning signs.',
        },
        {
          q: 'How often does a catheter need changing?',
          a: 'It depends on the type and the medical indication. We schedule the change and remind you when it is due.',
        },
        {
          q: 'Do you handle blocked-catheter emergencies?',
          a: 'Yes. The service runs 24 hours. Message us on WhatsApp and we coordinate the visit.',
        },
      ],
      waMessage: 'Hi, I need catheter placement or replacement at home.',
    },
  },

  {
    id: 'suturas',
    order: 7,
    image: '/img/services/suturas',
    alt: {
      es: 'Médico atendiendo a un paciente adulto mayor en su recámara',
      en: 'Doctor treating an older adult patient in their bedroom',
    },
    schemaType: 'MedicalProcedure',
    es: {
      slug: 'colocacion-y-retiro-de-suturas',
      name: 'Colocación y retiro de suturas a domicilio',
      shortName: 'Suturas',
      metaTitle: 'Suturas y Retiro de Puntos a Domicilio en Guadalajara',
      metaDescription:
        'Colocación y retiro de puntos en tu casa, por un médico. Mejor cicatrización y menos riesgo de infección. Guadalajara, 24 horas.',
      benefit: 'Tus puntos bien puestos o bien quitados, en tu casa',
      answer:
        'Medical Home Gdl coloca y retira suturas en tu domicilio en Guadalajara. Un médico limpia la herida, valora si necesita puntos, los coloca con técnica estéril y agenda el retiro en la fecha correcta. Disponible 24 horas.',
      intro:
        'Una herida que necesita puntos no espera turno. Un médico va a tu casa, la limpia, valora si hay que suturar y lo hace ahí mismo.\n\nSi ya te pusieron puntos en otro lado y solo hay que quitarlos, también vamos. Retirarlos en la fecha correcta es lo que hace la diferencia entre una cicatriz discreta y una marcada.',
      includes: [
        'Limpieza y valoración de la herida',
        'Anestesia local antes de suturar',
        'Colocación de puntos con técnica estéril',
        'Retiro de puntos en la fecha indicada',
        'Curación y cubierta de la herida',
        'Indicaciones de cuidado por escrito',
      ],
      indications: [
        'Cortadas que no cierran solas',
        'Heridas de cocina o de trabajo',
        'Retiro de puntos de una cirugía previa',
        'Retiro de puntos de urgencias',
        'No quieres pasar horas en una sala de espera',
        'Cuidado de la cicatriz en zonas visibles',
      ],
      faq: [
        {
          q: '¿Duele que me pongan puntos?',
          a: 'Se aplica anestesia local antes de suturar. Sientes el piquete de la anestesia y después la zona queda dormida.',
        },
        {
          q: '¿Cuándo se quitan los puntos?',
          a: 'Entre 5 y 14 días según la zona del cuerpo. El médico te dice la fecha exacta y agendamos el retiro.',
        },
        {
          q: '¿Pueden quitar puntos que me pusieron en otro lado?',
          a: 'Sí. Vamos a tu casa, valoramos la cicatrización y retiramos los puntos.',
        },
        {
          q: '¿Cuándo sí tengo que ir a un hospital?',
          a: 'Si la herida es muy profunda, hay sangrado que no se detiene o hay daño en tendones o nervios. El médico te lo dice con claridad en la valoración.',
        },
      ],
      waMessage: 'Hola, necesito colocación o retiro de puntos a domicilio.',
    },
    en: {
      slug: 'suture-placement-and-removal',
      name: 'Suture placement and removal at home',
      shortName: 'Sutures',
      metaTitle: 'Stitches & Suture Removal at Home in Guadalajara',
      metaDescription:
        'Suture placement and stitch removal at your home in Guadalajara by a doctor. Better healing, lower infection risk. Available 24 hours.',
      benefit: 'Stitches placed or removed properly, at your home',
      answer:
        'Medical Home Gdl places and removes sutures at your address in Guadalajara. A doctor cleans the wound, assesses whether stitches are needed, places them using sterile technique and schedules removal for the right date. Available 24 hours a day.',
      intro:
        'A wound that needs stitches does not wait in line. A doctor comes to you, cleans it, assesses whether suturing is needed and does it on the spot.\n\nIf you already have stitches from somewhere else and only need them removed, we do that too. Removing them on the right date is the difference between a discreet scar and a marked one.',
      includes: [
        'Wound cleaning and assessment',
        'Local anaesthetic before suturing',
        'Stitches placed with sterile technique',
        'Stitch removal on the correct date',
        'Wound dressing and care',
        'Written aftercare instructions',
      ],
      indications: [
        'Cuts that will not close on their own',
        'Kitchen or workplace injuries',
        'Removal of stitches from a previous surgery',
        'Removal of stitches from an ER visit',
        'You would rather not spend hours in a waiting room',
        'Scar care in visible areas',
      ],
      faq: [
        {
          q: 'Does getting stitches hurt?',
          a: 'A local anaesthetic is applied first. You feel the anaesthetic stick, then the area goes numb.',
        },
        {
          q: 'When do stitches come out?',
          a: 'Between 5 and 14 days depending on the body area. The doctor gives you the exact date and we schedule the removal.',
        },
        {
          q: 'Can you remove stitches placed elsewhere?',
          a: 'Yes. We come to you, assess the healing and remove the stitches.',
        },
        {
          q: 'When do I actually need a hospital?',
          a: 'If the wound is very deep, bleeding will not stop, or there is tendon or nerve damage. The doctor tells you clearly during the assessment.',
        },
      ],
      waMessage: 'Hi, I need stitches placed or removed at home in Guadalajara.',
    },
  },

  {
    id: 'curaciones',
    order: 8,
    image: '/img/services/curaciones',
    alt: {
      es: 'Paciente recibiendo atención médica en el sofá de su casa',
      en: 'Patient receiving medical care on the sofa at home',
    },
    schemaType: 'MedicalProcedure',
    es: {
      slug: 'curacion-de-heridas',
      name: 'Curación de heridas a domicilio',
      shortName: 'Curación de heridas',
      metaTitle: 'Curación de Heridas a Domicilio en Guadalajara | 24/7',
      metaDescription:
        'Limpieza y curación profesional de heridas en tu casa. Evaluamos, tratamos y damos seguimiento hasta que cierra. Guadalajara, 24 horas.',
      benefit: 'La herida se cuida bien desde el primer día',
      answer:
        'Medical Home Gdl realiza curación de heridas en tu domicilio en Guadalajara. Un médico evalúa el estado de la herida, la limpia, retira tejido dañado si hace falta, coloca la cubierta adecuada y agenda las curaciones de seguimiento hasta que cierra.',
      intro:
        'Una herida mal curada tarda el doble y se infecta. Un médico va a tu casa, evalúa cómo va y aplica el tratamiento que le toca en esa etapa.\n\nNo es una sola visita: agendamos las curaciones de seguimiento y vigilamos que vaya cerrando. Si aparece infección, la detectamos a tiempo.',
      includes: [
        'Evaluación del estado de la herida',
        'Limpieza y desinfección',
        'Retiro de tejido dañado cuando es necesario',
        'Cubierta y vendaje adecuados a la etapa',
        'Curaciones de seguimiento agendadas',
        'Detección temprana de infección',
      ],
      indications: [
        'Heridas que no terminan de cerrar',
        'Úlceras por presión en pacientes encamados',
        'Pie diabético',
        'Heridas después de una cirugía',
        'Quemaduras leves',
        'Raspones o heridas que se ven mal',
      ],
      faq: [
        {
          q: '¿Cada cuánto se cura una herida?',
          a: 'Depende del tipo. Puede ser diario o cada tercer día. El médico define el plan en la primera visita.',
        },
        {
          q: '¿Atienden úlceras por presión y pie diabético?',
          a: 'Sí. Son heridas que necesitan seguimiento cercano y las tratamos en el domicilio del paciente.',
        },
        {
          q: '¿Cómo sé si se infectó?',
          a: 'Enrojecimiento que crece, calor, pus, mal olor o fiebre. El médico te enseña qué vigilar y lo revisa en cada curación.',
        },
        {
          q: '¿Ustedes traen el material?',
          a: 'Sí. Llevamos el material de curación necesario para cada visita.',
        },
      ],
      waMessage: 'Hola, necesito curación de una herida a domicilio.',
    },
    en: {
      slug: 'wound-care',
      name: 'Wound care at home',
      shortName: 'Wound care',
      metaTitle: 'Wound Care at Home in Guadalajara | 24/7',
      metaDescription:
        'Professional wound cleaning and dressing at your home in Guadalajara. We assess, treat and follow up until it closes. Available 24 hours.',
      benefit: 'The wound is cared for properly from day one',
      answer:
        'Medical Home Gdl provides wound care at your address in Guadalajara. A doctor assesses the wound, cleans it, removes damaged tissue if needed, applies the right dressing and schedules follow-up visits until it closes.',
      intro:
        'A poorly treated wound takes twice as long and gets infected. A doctor comes to you, assesses how it is progressing and applies the treatment that stage calls for.\n\nThis is not a single visit: we schedule follow-up dressings and watch that it closes. If infection appears, we catch it early.',
      includes: [
        'Assessment of the wound',
        'Cleaning and disinfection',
        'Removal of damaged tissue when needed',
        'Dressing suited to the healing stage',
        'Scheduled follow-up visits',
        'Early detection of infection',
      ],
      indications: [
        'Wounds that will not finish closing',
        'Pressure ulcers in bedbound patients',
        'Diabetic foot ulcers',
        'Post-surgical wounds',
        'Minor burns',
        'Scrapes or wounds that look wrong',
      ],
      faq: [
        {
          q: 'How often does a wound need dressing?',
          a: 'It depends on the type. It can be daily or every other day. The doctor sets the plan on the first visit.',
        },
        {
          q: 'Do you treat pressure ulcers and diabetic foot?',
          a: 'Yes. These wounds need close follow-up and we treat them at the patient home.',
        },
        {
          q: 'How do I know if it is infected?',
          a: 'Spreading redness, heat, pus, bad smell or fever. The doctor shows you what to watch and checks at every visit.',
        },
        {
          q: 'Do you bring the supplies?',
          a: 'Yes. We bring the dressing materials needed for each visit.',
        },
      ],
      waMessage: 'Hi, I need wound care at home in Guadalajara.',
    },
  },

  {
    id: 'evaluacion-completa',
    order: 9,
    image: '/img/services/evaluacion-completa',
    alt: {
      es: 'Médico realizando una evaluación médica completa a una paciente en su casa',
      en: 'Doctor performing a complete medical evaluation with a patient at home',
    },
    schemaType: 'MedicalProcedure',
    es: {
      slug: 'evaluacion-medica-completa',
      name: 'Evaluación médica completa a domicilio',
      shortName: 'Evaluación médica completa',
      metaTitle: 'Evaluación Médica Completa a Domicilio en Guadalajara',
      metaDescription:
        'Chequeo integral en tu casa: historial, exploración física y estudios. Un panorama claro de cómo estás de salud. Guadalajara.',
      benefit: 'Saber exactamente cómo estás, sin recorrer consultorios',
      answer:
        'La evaluación médica completa de Medical Home Gdl es un chequeo integral realizado en tu domicilio en Guadalajara. Incluye historial clínico, exploración física, signos vitales y los estudios de laboratorio necesarios. Al final recibes un informe con tu estado de salud y qué atender.',
      intro:
        'Un chequeo completo normalmente significa varias citas en varios lugares. Aquí es una sola visita, en tu casa.\n\nEl médico levanta tu historial, te explora, toma tus signos vitales y coordina los estudios que hagan falta. Cuando llegan los resultados, te entrega un panorama claro: qué está bien, qué hay que vigilar y qué hay que atender ya.',
      includes: [
        'Historial clínico completo',
        'Exploración física detallada',
        'Signos vitales y medidas corporales',
        'Estudios de laboratorio necesarios',
        'Informe con tu estado de salud',
        'Plan de qué atender y cuándo',
      ],
      indications: [
        'Chequeo anual',
        'Te sientes mal pero no sabes de qué',
        'Antecedentes familiares de diabetes o hipertensión',
        'Antes de empezar a hacer ejercicio',
        'Requisito de trabajo o de seguro',
        'Adultos mayores que necesitan una revisión a fondo',
      ],
      faq: [
        {
          q: '¿Cuánto dura la evaluación?',
          a: 'La visita toma entre 45 y 90 minutos. Los resultados de laboratorio llegan después, el mismo día o al siguiente.',
        },
        {
          q: '¿Incluye estudios de laboratorio?',
          a: 'Sí. Se toman en la misma visita y el médico los interpreta cuando llegan los resultados.',
        },
        {
          q: '¿Me entregan un informe?',
          a: 'Sí. Recibes un informe con tu estado de salud, qué está bien, qué vigilar y qué atender.',
        },
        {
          q: '¿Sirve para un trámite de trabajo o seguro?',
          a: 'En muchos casos sí. Dinos qué te están pidiendo y te confirmamos si esta evaluación cubre el requisito.',
        },
      ],
      waMessage: 'Hola, quiero una evaluación médica completa a domicilio.',
    },
    en: {
      slug: 'complete-medical-evaluation',
      name: 'Complete medical evaluation at home',
      shortName: 'Complete evaluation',
      metaTitle: 'Complete Medical Evaluation at Home | Guadalajara',
      metaDescription:
        'A full health check at your home in Guadalajara: history, physical exam and lab work, with a clear report of where your health stands.',
      benefit: 'Know exactly where you stand, without touring clinics',
      answer:
        'The complete medical evaluation from Medical Home Gdl is a full health check performed at your address in Guadalajara. It includes clinical history, physical examination, vital signs and the lab tests you need. You receive a report describing your health status and what to address.',
      intro:
        'A full check-up usually means several appointments in several places. Here it is one visit, at your home.\n\nThe doctor takes your history, examines you, records your vital signs and arranges any lab work needed. Once results are in, you get a clear picture: what is fine, what to watch and what needs attention now.',
      includes: [
        'Complete clinical history',
        'Detailed physical examination',
        'Vital signs and body measurements',
        'The lab tests you need',
        'A written report of your health status',
        'A plan of what to address and when',
      ],
      indications: [
        'Annual check-up',
        'You feel unwell but do not know why',
        'Family history of diabetes or hypertension',
        'Before starting an exercise programme',
        'A work or insurance requirement',
        'Older adults who need a thorough review',
      ],
      faq: [
        {
          q: 'How long does the evaluation take?',
          a: 'The visit takes 45 to 90 minutes. Lab results follow the same day or the next.',
        },
        {
          q: 'Does it include lab work?',
          a: 'Yes. Samples are taken during the same visit and the doctor interprets the results when they arrive.',
        },
        {
          q: 'Do I get a report?',
          a: 'Yes. You receive a report covering your health status, what is fine, what to watch and what to address.',
        },
        {
          q: 'Is it valid for work or insurance paperwork?',
          a: 'In many cases yes. Tell us what is being asked of you and we confirm whether this evaluation covers it.',
        },
      ],
      waMessage: 'Hi, I would like a complete medical evaluation at home.',
    },
  },

  {
    id: 'certificados',
    order: 10,
    image: '/img/services/certificados',
    alt: {
      es: 'Médico entregando documentación médica a un paciente',
      en: 'Doctor handing medical documentation to a patient',
    },
    schemaType: 'Service',
    es: {
      slug: 'certificados-medicos',
      name: 'Certificados médicos a domicilio',
      shortName: 'Certificados médicos',
      metaTitle: 'Certificado Médico a Domicilio en Guadalajara | Mismo Día',
      metaDescription:
        'Certificado médico oficial para trabajo, escuela, trámites o seguros, emitido en tu casa el mismo día por un médico titulado. Guadalajara.',
      benefit: 'Tu certificado firmado el mismo día, sin pedir permiso en el trabajo',
      answer:
        'Medical Home Gdl emite certificados médicos en tu domicilio en Guadalajara, el mismo día. Un médico titulado te realiza la valoración necesaria y firma el documento con su cédula profesional. Sirve para trámites laborales, escolares, gubernamentales y solicitudes de seguro.',
      intro:
        'Casi siempre el certificado médico es lo último que falta para cerrar un trámite, y conseguirlo significa perder medio día.\n\nUn médico va a tu casa, te hace la valoración que el certificado requiere y te entrega el documento firmado el mismo día. Tú no te mueves.',
      includes: [
        'Valoración médica requerida para el certificado',
        'Documento firmado por médico titulado con cédula',
        'Entrega el mismo día',
        'Certificados laborales, escolares y de trámite',
        'Certificados para solicitudes de seguro',
        'Certificados de aptitud física',
      ],
      indications: [
        'Trámite de trabajo o ingreso a un empleo',
        'Inscripción escolar o actividad deportiva',
        'Trámite en una oficina de gobierno',
        'Solicitud de seguro',
        'Justificante por incapacidad',
        'Requisito de una beca o un curso',
      ],
      faq: [
        {
          q: '¿El certificado es oficial?',
          a: 'Sí. Lo firma un médico titulado con cédula profesional, que es lo que requieren los trámites laborales, escolares y de gobierno.',
        },
        {
          q: '¿En cuánto tiempo lo tengo?',
          a: 'El mismo día de la visita, salvo que el certificado requiera estudios de laboratorio.',
        },
        {
          q: '¿Qué necesito tener a la mano?',
          a: 'Una identificación oficial y, si el trámite lo especifica, el formato que te pidieron.',
        },
        {
          q: '¿Cubren certificados que piden estudios?',
          a: 'Sí. Tomamos los estudios en la misma visita y emitimos el certificado cuando llegan los resultados.',
        },
      ],
      waMessage: 'Hola, necesito un certificado médico a domicilio.',
    },
    en: {
      slug: 'medical-certificates',
      name: 'Medical certificates at home',
      shortName: 'Medical certificates',
      metaTitle: 'Medical Certificate at Home in Guadalajara | Same Day',
      metaDescription:
        'Official medical certificate for work, school, paperwork or insurance, issued at your home the same day by a licensed doctor. Guadalajara.',
      benefit: 'Your signed certificate the same day, without taking time off work',
      answer:
        'Medical Home Gdl issues medical certificates at your address in Guadalajara, the same day. A licensed physician performs the required assessment and signs the document with their professional licence number. It is valid for work, school, government paperwork and insurance applications.',
      intro:
        'A medical certificate is almost always the last thing missing before paperwork can close, and getting one usually costs you half a day.\n\nA doctor comes to you, performs the assessment the certificate requires and hands you the signed document the same day. You do not move.',
      includes: [
        'The medical assessment the certificate requires',
        'Document signed by a licensed physician',
        'Same-day delivery',
        'Work, school and administrative certificates',
        'Certificates for insurance applications',
        'Fitness-for-activity certificates',
      ],
      indications: [
        'Employment paperwork or a new job',
        'School enrolment or a sports activity',
        'A government office requirement',
        'An insurance application',
        'Sick-leave documentation',
        'A scholarship or course requirement',
      ],
      faq: [
        {
          q: 'Is the certificate official?',
          a: 'Yes. It is signed by a licensed physician with a professional licence number, which is what employers, schools and government offices require.',
        },
        {
          q: 'How fast do I get it?',
          a: 'The same day as the visit, unless the certificate requires lab work.',
        },
        {
          q: 'What do I need to have ready?',
          a: 'Official photo ID and, if the process specifies one, the form you were given.',
        },
        {
          q: 'Do you cover certificates that require lab tests?',
          a: 'Yes. We take the samples during the same visit and issue the certificate once results arrive.',
        },
      ],
      waMessage: 'Hi, I need a medical certificate at home in Guadalajara.',
    },
  },

  {
    id: 'prenupcial',
    order: 11,
    image: '/img/services/prenupcial',
    alt: {
      es: 'Doctora atendiendo a una pareja durante su valoración prenupcial',
      en: 'Doctor attending a couple during their premarital assessment',
    },
    schemaType: 'Service',
    es: {
      slug: 'paquete-prenupcial',
      name: 'Paquete prenupcial a domicilio',
      shortName: 'Paquete prenupcial',
      metaTitle: 'Paquete Prenupcial a Domicilio en Guadalajara | Registro Civil',
      metaDescription:
        'Estudios y certificado médico prenupcial que pide el registro civil, hechos en tu casa. Para los dos, en una sola visita. Guadalajara.',
      benefit: 'El requisito del registro civil resuelto en una sola visita',
      answer:
        'El paquete prenupcial de Medical Home Gdl incluye los estudios de laboratorio y el certificado médico que exige el registro civil de tu municipio en Jalisco. Se realiza en tu domicilio, para ambos integrantes de la pareja, en una sola visita.',
      intro:
        'Entre los preparativos de la boda, ir los dos a un laboratorio y luego a un consultorio es tiempo que no tienen.\n\nVamos a su casa, tomamos los estudios de los dos en la misma visita y emitimos el certificado médico que pide el registro civil. Un solo trámite, un solo día.',
      includes: [
        'Estudios de laboratorio para ambos',
        'Certificado médico prenupcial',
        'Todo en una sola visita a domicilio',
        'Documentos con el formato que pide el registro civil',
        'Resultados por WhatsApp o correo',
        'Orientación sobre qué entregar y dónde',
      ],
      indications: [
        'Trámite de matrimonio en el registro civil',
        'Boda en Guadalajara o municipios de la ZMG',
        'Quieren resolverlo sin pedir día en el trabajo',
        'Uno de los dos vive fuera y está poco tiempo en la ciudad',
        'Prefieren hacerlo con privacidad',
        'Les urge cerrar el trámite',
      ],
      faq: [
        {
          q: '¿Qué incluye exactamente el paquete?',
          a: 'Los estudios de laboratorio y el certificado médico que exige el registro civil de tu municipio, para los dos integrantes de la pareja.',
        },
        {
          q: '¿Sirve para cualquier municipio de Jalisco?',
          a: 'Los requisitos varían por municipio. Dinos en cuál se van a casar y confirmamos que el paquete cubra exactamente lo que piden.',
        },
        {
          q: '¿Vamos los dos a estar en la misma visita?',
          a: 'Sí. Atendemos a los dos en la misma visita para que sea un solo día.',
        },
        {
          q: '¿Cuánto tardan los documentos?',
          a: 'Los resultados de laboratorio llegan en unas horas y el certificado se emite en cuanto están listos.',
        },
      ],
      waMessage: 'Hola, quiero información del paquete prenupcial a domicilio.',
    },
    en: {
      slug: 'premarital-package',
      name: 'Premarital health package at home',
      shortName: 'Premarital package',
      metaTitle: 'Premarital Medical Package at Home | Guadalajara',
      metaDescription:
        'Lab tests and the premarital medical certificate your civil registry requires, done at home for both partners in a single visit. Guadalajara.',
      benefit: 'The civil registry requirement handled in one visit',
      answer:
        'The premarital package from Medical Home Gdl includes the lab tests and medical certificate required by the civil registry of your municipality in Jalisco. It is performed at your home, for both partners, in a single visit.',
      intro:
        'Between wedding preparations, both of you going to a lab and then to a clinic is time you do not have.\n\nWe come to you, take both sets of tests in the same visit and issue the medical certificate the civil registry requires. One process, one day.',
      includes: [
        'Lab tests for both partners',
        'Premarital medical certificate',
        'Everything in a single home visit',
        'Documents in the format the civil registry requires',
        'Results by WhatsApp or email',
        'Guidance on what to submit and where',
      ],
      indications: [
        'Marriage paperwork at the civil registry',
        'A wedding in Guadalajara or the metro area',
        'You want it done without taking time off work',
        'One partner lives abroad and is in the city briefly',
        'You would rather handle it privately',
        'You need to close the paperwork quickly',
      ],
      faq: [
        {
          q: 'What exactly does the package include?',
          a: 'The lab tests and medical certificate required by your municipality civil registry, for both partners.',
        },
        {
          q: 'Does it work for any municipality in Jalisco?',
          a: 'Requirements vary by municipality. Tell us where you are marrying and we confirm the package covers exactly what they ask for.',
        },
        {
          q: 'Are we both seen in the same visit?',
          a: 'Yes. We attend both partners in the same visit so it takes a single day.',
        },
        {
          q: 'How long do the documents take?',
          a: 'Lab results arrive within hours and the certificate is issued as soon as they are ready.',
        },
      ],
      waMessage: 'Hi, I would like information about the premarital package.',
    },
  },
]

/** Segmento de URL del índice de servicios, por idioma. */
export const SERVICES_BASE: Record<Locale, string> = {
  es: 'servicios',
  en: 'services',
}

export const servicesIndexPath = (lang: Locale): string => `/${lang}/${SERVICES_BASE[lang]}/`

export const servicePath = (lang: Locale, id: string): string => {
  const service = SERVICES.find((s) => s.id === id)
  if (!service) throw new Error(`Servicio desconocido: ${id}`)
  return `/${lang}/${SERVICES_BASE[lang]}/${service[lang].slug}/`
}

export const serviceBySlug = (lang: Locale, slug: string): Service | undefined =>
  SERVICES.find((s) => s[lang].slug === slug)

export const sortedServices = (): Service[] => [...SERVICES].sort((a, b) => a.order - b.order)
