import { CtaBand, FloatingWhatsApp } from '@/components/Cta'
import { Header } from '@/components/Header'
import { PinIcon } from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { AnswerBlock, Breadcrumbs, ContactCard, SectionHead } from '@/components/Sections'
import { AREAS, COVERAGE_COPY } from '@/content/coverage'
import { FINAL_CTA } from '@/content/home'
import type { Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { UI } from '@/content/ui'
import { breadcrumbSchema } from '@/lib/jsonld'
import { pageRef, urlOf } from '@/lib/urls'

export function Coverage({ lang }: { lang: Locale }) {
  const t = UI[lang]
  const p = page('coverage')[lang]
  const url = urlOf(lang, pageRef('coverage'))

  return (
    <>
      <Header lang={lang} currentRef={pageRef('coverage')} />

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
              <AnswerBlock>{COVERAGE_COPY.answer[lang]}</AnswerBlock>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-site">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SectionHead title={t.sectionCoverage} />

                <ul className="mt-8 space-y-4">
                  {AREAS.map((area, i) => (
                    <li key={area.id} className="card p-6">
                      <Reveal delay={i * 50}>
                        <h3 className="flex items-center gap-2.5 text-h3">
                          <PinIcon className="h-5 w-5 shrink-0 text-brand" />
                          {area.name}
                        </h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-neutral">
                          <span className="font-medium text-deep">
                            {COVERAGE_COPY.zonesLabel[lang]}:{' '}
                          </span>
                          {area.zones[lang]}
                        </p>
                      </Reveal>
                    </li>
                  ))}
                </ul>

                <div className="card mt-8 bg-haze p-6">
                  <h3 className="text-h3">{COVERAGE_COPY.outsideTitle[lang]}</h3>
                  <p className="mt-2.5 text-neutral">{COVERAGE_COPY.outsideBody[lang]}</p>
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
        data={breadcrumbSchema([
          { name: t.breadcrumbHome, url: urlOf(lang, pageRef('home')) },
          { name: p.navLabel, url },
        ])}
      />
    </>
  )
}
