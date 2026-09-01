import { CtaBand, FloatingWhatsApp } from '@/components/Cta'
import { Header } from '@/components/Header'
import { ClockIcon } from '@/components/Icons'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import {
  AnswerBlock,
  BackLink,
  Breadcrumbs,
  CheckList,
  ContactCard,
  FaqList,
  SectionHead,
} from '@/components/Sections'
import { ServiceCard } from '@/components/ServiceCard'
import type { Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { type Service, sortedServices } from '@/content/services'
import { UI } from '@/content/ui'
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/jsonld'
import { pageRef, serviceRef, urlOf } from '@/lib/urls'

export function ServiceDetail({ service, lang }: { service: Service; lang: Locale }) {
  const t = UI[lang]
  const s = service[lang]
  const url = urlOf(lang, serviceRef(service.id))
  const servicesPage = page('services')[lang]

  const related = sortedServices()
    .filter((x) => x.id !== service.id)
    .slice(0, 3)

  return (
    <>
      <Header lang={lang} currentRef={serviceRef(service.id)} />

      <main id="main">
        {/* ── Encabezado ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-haze pb-14 pt-10 md:pb-20 md:pt-14">
          <div className="blob right-[-12%] top-[-22%] h-[500px] w-[500px] opacity-60" aria-hidden />
          <div className="container-site relative z-10">
            <Breadcrumbs
              items={[
                { name: t.breadcrumbHome, href: pagePath(lang, 'home') },
                { name: servicesPage.navLabel, href: servicesPage.path },
                { name: s.shortName },
              ]}
            />

            <div className="grid items-start gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h1 className="text-h1">{s.name}</h1>
                <p className="mt-5 text-[1.125rem] leading-relaxed text-neutral">{s.benefit}</p>

                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  <li className="flex items-center gap-2 text-[0.9375rem] text-deep">
                    <ClockIcon className="h-[1.15em] w-[1.15em] text-brand" />
                    {t.responseTime}
                  </li>
                  <li className="flex items-center gap-2 text-[0.9375rem] text-deep">
                    <span className="pulse-dot ml-0.5 mr-0.5" aria-hidden />
                    {t.available247}
                  </li>
                </ul>

                <div className="mt-9 max-w-2xl">
                  <AnswerBlock>{s.answer}</AnswerBlock>
                </div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <Img
                  src={service.image}
                  alt={service.alt[lang]}
                  aspect="4 / 3"
                  sizes="(min-width: 1024px) 460px, 94vw"
                  priority
                  className="shadow-[0_30px_60px_-36px_rgba(29,67,85,0.4)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Detalle ──────────────────────────────────────────────────── */}
        <section className="section">
          <div className="container-site">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="prose-mh measure">
                  {s.intro.split('\n\n').map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>

                <div className="mt-14">
                  <SectionHead title={t.sectionIncludes} />
                  <div className="mt-7">
                    <CheckList items={s.includes} />
                  </div>
                </div>

                <div className="mt-14">
                  <SectionHead title={t.sectionIndications} />
                  <div className="mt-7">
                    <CheckList items={s.indications} />
                  </div>
                </div>

                <div className="mt-14">
                  <SectionHead title={t.sectionFaq} />
                  <div className="mt-7">
                    <FaqList faqs={s.faq} />
                  </div>
                </div>

                <div className="mt-12">
                  <BackLink lang={lang} />
                </div>
              </div>

              <aside className="lg:col-span-4 lg:col-start-9">
                <div className="lg:sticky lg:top-[96px]">
                  <ContactCard lang={lang} message={s.waMessage} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── Relacionados ─────────────────────────────────────────────── */}
        <section className="section relative overflow-hidden bg-haze">
          <div className="blob left-[-10%] bottom-[-30%] h-[420px] w-[420px] opacity-50" aria-hidden />
          <div className="container-site relative z-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHead title={t.sectionAllServices} />
              <a
                href={pagePath(lang, 'services')}
                className="font-semibold text-brand transition-colors hover:text-brand-strong"
              >
                {t.ctaServices} →
              </a>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 70}>
                  <ServiceCard service={r} lang={lang} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          lang={lang}
          title={
            lang === 'es'
              ? '¿Necesitas este servicio hoy?'
              : 'Do you need this service today?'
          }
          body={UI[lang].contactLede}
          message={s.waMessage}
        />
      </main>

      <FloatingWhatsApp lang={lang} message={s.waMessage} />
      <JsonLd
        data={[
          serviceSchema(service, lang, url),
          faqPageSchema(s.faq, url),
          breadcrumbSchema([
            { name: t.breadcrumbHome, url: urlOf(lang, pageRef('home')) },
            { name: servicesPage.navLabel, url: urlOf(lang, pageRef('services')) },
            { name: s.shortName, url },
          ]),
        ]}
      />
    </>
  )
}
