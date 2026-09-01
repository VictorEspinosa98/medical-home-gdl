import { CtaBand, FloatingWhatsApp } from '@/components/Cta'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { AnswerBlock, Breadcrumbs, SectionHead } from '@/components/Sections'
import { ServiceCard } from '@/components/ServiceCard'
import { FINAL_CTA } from '@/content/home'
import type { Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { SERVICES_BASE, sortedServices } from '@/content/services'
import { SITE } from '@/content/site'
import { UI } from '@/content/ui'
import { breadcrumbSchema, itemListSchema, webPageSchema } from '@/lib/jsonld'
import { pageRef, urlOf } from '@/lib/urls'

export function ServicesIndex({ lang }: { lang: Locale }) {
  const t = UI[lang]
  const p = page('services')[lang]
  const services = sortedServices()
  const url = urlOf(lang, pageRef('services'))

  const answer =
    lang === 'es'
      ? `Medical Home Gdl ofrece ${services.length} servicios médicos a domicilio en Guadalajara: consulta médica general, estudios de laboratorio, pruebas rápidas, sueros intravenosos, aplicación de medicamentos, sondas, suturas, curación de heridas, evaluación médica completa, certificados médicos y paquete prenupcial. Todos disponibles las 24 horas en ${SITE.areas.length} municipios de la Zona Metropolitana.`
      : `Medical Home Gdl offers ${services.length} at-home medical services in Guadalajara: general house calls, lab tests, rapid tests, IV therapy, medication administration, catheter care, sutures, wound care, complete medical evaluations, medical certificates and premarital packages. All available 24 hours a day across ${SITE.areas.length} municipalities of the metropolitan area.`

  return (
    <>
      <Header lang={lang} currentRef={pageRef('services')} />

      <main id="main">
        <section className="relative overflow-hidden bg-haze pb-14 pt-10 md:pb-20 md:pt-14">
          <div className="blob left-[-12%] top-[-25%] h-[520px] w-[520px] opacity-60" aria-hidden />
          <div className="container-site relative z-10">
            <Breadcrumbs
              items={[
                { name: t.breadcrumbHome, href: pagePath(lang, 'home') },
                { name: p.navLabel },
              ]}
            />
            <h1 className="text-h1 max-w-3xl">{p.h1}</h1>
            <p className="mt-5 max-w-2xl text-[1.125rem] leading-relaxed text-neutral">{p.lede}</p>
            <div className="mt-10 max-w-3xl">
              <AnswerBlock>{answer}</AnswerBlock>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-site">
            {/* Sin este h2 la página saltaba de h1 a los h3 de las tarjetas. */}
            <SectionHead title={t.sectionServices} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={service.id} delay={(i % 3) * 70}>
                  <ServiceCard service={service} lang={lang} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          lang={lang}
          title={FINAL_CTA[lang].title}
          body={FINAL_CTA[lang].body}
          message={FINAL_CTA[lang].wa}
        />
      </main>

      <FloatingWhatsApp lang={lang} message={FINAL_CTA[lang].wa} />
      <JsonLd
        data={[
          webPageSchema({
            lang,
            ref: pageRef('services'),
            name: p.h1,
            description: p.metaDescription,
            medical: true,
          }),
          breadcrumbSchema([
            { name: t.breadcrumbHome, url: urlOf(lang, pageRef('home')) },
            { name: p.navLabel, url },
          ]),
          itemListSchema(
            services.map((s) => ({
              name: s[lang].name,
              url: `${SITE.url}/${lang}/${SERVICES_BASE[lang]}/${s[lang].slug}/`,
            })),
            url,
          ),
        ]}
      />
    </>
  )
}
