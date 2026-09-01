import { CtaBand, FloatingWhatsApp } from '@/components/Cta'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { AnswerBlock, Breadcrumbs, ContactCard, FaqList, SectionHead } from '@/components/Sections'
import { FAQ } from '@/content/faq'
import { FINAL_CTA } from '@/content/home'
import type { Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { sortedServices } from '@/content/services'
import { UI } from '@/content/ui'
import { breadcrumbSchema, faqPageSchema } from '@/lib/jsonld'
import { pageRef, urlOf } from '@/lib/urls'

export function FaqPage({ lang }: { lang: Locale }) {
  const t = UI[lang]
  const p = page('faq')[lang]
  const url = urlOf(lang, pageRef('faq'))
  const general = FAQ[lang]

  // Las preguntas de cada servicio también viven aquí: una sola página
  // responde todo, que es exactamente lo que un LLM prefiere citar.
  const byService = sortedServices().map((s) => ({
    title: s[lang].shortName,
    faqs: s[lang].faq,
  }))

  const allFaqs = [...general, ...byService.flatMap((g) => g.faqs)]

  return (
    <>
      <Header lang={lang} currentRef={pageRef('faq')} />

      <main id="main">
        <section className="relative overflow-hidden bg-haze pb-14 pt-10 md:pb-20 md:pt-14">
          <div className="blob right-[-12%] top-[-25%] h-[520px] w-[520px] opacity-60" aria-hidden />
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
              <AnswerBlock>{general[0].a}</AnswerBlock>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-site">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SectionHead title={lang === 'es' ? 'Sobre el servicio' : 'About the service'} />
                <div className="mt-7">
                  <FaqList faqs={general} />
                </div>

                <div className="mt-16">
                  <SectionHead
                    title={lang === 'es' ? 'Sobre cada servicio' : 'About each service'}
                  />
                  <div className="mt-8 space-y-10">
                    {byService.map((group) => (
                      <div key={group.title}>
                        <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand">
                          {group.title}
                        </h3>
                        <div className="mt-3">
                          <FaqList faqs={group.faqs} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4 lg:col-start-9">
                <div className="lg:sticky lg:top-[96px]">
                  <ContactCard lang={lang} message={FINAL_CTA[lang].wa} />
                </div>
              </aside>
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
          faqPageSchema(allFaqs, url),
          breadcrumbSchema([
            { name: t.breadcrumbHome, url: urlOf(lang, pageRef('home')) },
            { name: p.navLabel, url },
          ]),
        ]}
      />
    </>
  )
}
