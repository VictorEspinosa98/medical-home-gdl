import { CtaBand, FloatingWhatsApp } from '@/components/Cta'
import { Header } from '@/components/Header'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { AnswerBlock, Breadcrumbs, SectionHead } from '@/components/Sections'
import { ABOUT_HEADINGS, MISSION, VALUES, VISION } from '@/content/about'
import { FINAL_CTA } from '@/content/home'
import type { Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { SITE } from '@/content/site'
import { UI } from '@/content/ui'
import { breadcrumbSchema } from '@/lib/jsonld'
import { pageRef, urlOf } from '@/lib/urls'

export function About({ lang }: { lang: Locale }) {
  const t = UI[lang]
  const p = page('about')[lang]
  const url = urlOf(lang, pageRef('about'))

  const answer =
    lang === 'es'
      ? `Medical Home Gdl es una empresa de servicios médicos a domicilio con sede en Guadalajara, Jalisco. Su misión es brindar atención médica de calidad y confianza en el hogar del paciente, eliminando traslados y filas de espera. Opera las 24 horas en ${SITE.areas.length} municipios de la Zona Metropolitana y se rige por seis valores: compromiso, empatía, accesibilidad, innovación, confianza y respeto.`
      : `Medical Home Gdl is a house-call medical company based in Guadalajara, Jalisco, Mexico. Its mission is to deliver trustworthy, quality care in the patient home, removing travel and waiting lines. It operates 24 hours a day across ${SITE.areas.length} municipalities of the metropolitan area and is guided by six values: commitment, empathy, accessibility, innovation, trust and respect.`

  return (
    <>
      <Header lang={lang} currentRef={pageRef('about')} />

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
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <Img
                  src="/img/services/consulta-domicilio"
                  alt={p.h1}
                  aspect="4 / 3"
                  sizes="(min-width: 1024px) 460px, 94vw"
                  priority
                  className="shadow-[0_30px_60px_-36px_rgba(29,67,85,0.4)]"
                />
              </div>
            </div>
            <div className="mt-12 max-w-3xl">
              <AnswerBlock>{answer}</AnswerBlock>
            </div>
          </div>
        </section>

        {/* ── Misión y visión ──────────────────────────────────────────── */}
        <section className="section">
          <div className="container-site">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <SectionHead
                    eyebrow={lang === 'es' ? 'Por qué existimos' : 'Why we exist'}
                    title={ABOUT_HEADINGS.mission[lang]}
                  />
                  <div className="prose-mh mt-7">
                    {MISSION[lang].map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={90}>
                <div>
                  <SectionHead
                    eyebrow={lang === 'es' ? 'A dónde vamos' : 'Where we are going'}
                    title={ABOUT_HEADINGS.vision[lang]}
                  />
                  <div className="prose-mh mt-7">
                    {VISION[lang].map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Valores ──────────────────────────────────────────────────── */}
        <section className="section relative overflow-hidden bg-haze">
          <div className="blob right-[-10%] top-[8%] h-[440px] w-[440px] opacity-50" aria-hidden />
          <div className="container-site relative z-10">
            <SectionHead
              eyebrow={lang === 'es' ? 'Cómo trabajamos' : 'How we work'}
              title={ABOUT_HEADINGS.values[lang]}
              lede={ABOUT_HEADINGS.valuesLede[lang]}
            />

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map((value, i) => (
                <Reveal key={value.id} delay={(i % 3) * 70}>
                  <li className="card hairline h-full p-6">
                    <span className="font-display text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-h3">{value.title[lang]}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-neutral">
                      {value.body[lang]}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
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
