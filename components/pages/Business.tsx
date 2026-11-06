import { CtaBand, FloatingWhatsApp, WhatsAppCta } from '@/components/Cta'
import { Header } from '@/components/Header'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { AnswerBlock, Breadcrumbs, SectionHead } from '@/components/Sections'
import { BUSINESS } from '@/content/business'
import type { Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { servicePath } from '@/content/services'
import { UI } from '@/content/ui'
import { breadcrumbSchema, businessServiceSchema, jsonLdImage, webPageSchema } from '@/lib/jsonld'
import { pageRef, urlOf } from '@/lib/urls'

const IMAGE = '/img/empresas'

export function Business({ lang }: { lang: Locale }) {
  const t = UI[lang]
  const p = page('business')[lang]
  const b = BUSINESS[lang]
  const url = urlOf(lang, pageRef('business'))

  return (
    <>
      <Header lang={lang} currentRef={pageRef('business')} />

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
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h1 className="text-h1">{p.h1}</h1>
                <p className="mt-5 text-[1.125rem] leading-relaxed text-neutral">{p.lede}</p>
                <div className="mt-7">
                  <WhatsAppCta lang={lang} message={b.wa} label={b.cta} />
                </div>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <Img
                  src={IMAGE}
                  alt={b.imageAlt}
                  aspect="4 / 3"
                  sizes="(min-width: 1024px) 460px, 94vw"
                  priority
                  className="shadow-[0_30px_60px_-36px_rgba(29,67,85,0.4)]"
                />
              </div>
            </div>
            <div className="mt-12 max-w-3xl">
              <AnswerBlock>{b.answer}</AnswerBlock>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-site">
            <SectionHead title={b.servicesTitle} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {b.services.map((service, i) => (
                <li key={service.title} className="card hairline h-full p-6">
                  <Reveal delay={(i % 2) * 70}>
                    <h3 className="text-h3">{service.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-neutral">
                      {service.body}
                    </p>
                    {service.serviceId && (
                      <a
                        href={servicePath(lang, service.serviceId)}
                        className="mt-3 inline-block py-1 text-[0.9375rem] font-semibold text-brand transition-colors hover:text-brand-strong"
                      >
                        {lang === 'es' ? 'Ver el servicio' : 'See the service'}
                      </a>
                    )}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section bg-haze">
          <div className="container-site">
            <SectionHead title={b.stepsTitle} />
            <ol className="steps mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
              {b.steps.map((step, i) => (
                <li key={step.title} className="relative">
                  <Reveal delay={i * 90}>
                    <h3 className="mt-3 text-h3">{step.title}</h3>
                    <p className="mt-2.5 text-neutral">{step.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <CtaBand
          lang={lang}
          title={b.closingTitle}
          body={b.closingBody}
          message={b.wa}
          coverage={b.coverage}
          ctaLabel={b.cta}
        />
      </main>

      <FloatingWhatsApp lang={lang} message={b.wa} />
      <JsonLd
        data={[
          businessServiceSchema({
            name: p.h1,
            description: p.metaDescription,
            lang,
            url,
            image: jsonLdImage(IMAGE, 1280),
          }),
          webPageSchema({
            lang,
            ref: pageRef('business'),
            name: p.h1,
            description: p.metaDescription,
            image: jsonLdImage(IMAGE, 1280),
            mainEntityId: `${url}#service`,
            breadcrumbId: `${url}#breadcrumb`,
          }),
          breadcrumbSchema([
            { name: t.breadcrumbHome, url: urlOf(lang, pageRef('home')) },
            { name: p.navLabel, url },
          ], `${url}#breadcrumb`),
        ]}
      />
    </>
  )
}
