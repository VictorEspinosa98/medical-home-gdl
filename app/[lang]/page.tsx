import type { Metadata } from 'next'
import { CtaBand, FloatingWhatsApp, WhatsAppCta } from '@/components/Cta'
import { Header } from '@/components/Header'
import { ArrowIcon, ClockIcon, PILLAR_ICONS, ShieldIcon } from '@/components/Icons'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { AnswerBlock, SectionHead } from '@/components/Sections'
import { ServiceCard } from '@/components/ServiceCard'
import { FAQ } from '@/content/faq'
import { ABOUT_TEASER, FINAL_CTA, HERO, PILLARS, STEPS, STEPS_HEADING } from '@/content/home'
import { LOCALES, type Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { sortedServices } from '@/content/services'
import { UI } from '@/content/ui'
import { faqPageSchema } from '@/lib/jsonld'
import { buildMetadata } from '@/lib/metadata'
import { pageRef, urlOf } from '@/lib/urls'

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const { lang } = await params
  const p = page('home')[lang]
  return buildMetadata({
    lang,
    ref: pageRef('home'),
    title: p.metaTitle,
    description: p.metaDescription,
  })
}

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const t = UI[lang]
  const p = page('home')[lang]
  const services = sortedServices()
  const featured = services.slice(0, 6)
  const topFaqs = FAQ[lang].slice(0, 5)

  return (
    <>
      <Header lang={lang} currentRef={pageRef('home')} />

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-haze pb-16 pt-12 md:pb-24 md:pt-16">
          <div
            className="blob left-[-14%] top-[-18%] h-[560px] w-[560px] opacity-70"
            aria-hidden
          />
          <div
            className="blob bottom-[-30%] right-[-10%] h-[460px] w-[460px] opacity-50"
            aria-hidden
          />

          <div className="container-wide relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <p
                  className="hero-in chip"
                  style={{ animationDelay: '0ms' }}
                >
                  <span
                    className="h-2 w-2 rounded-full bg-brand"
                    aria-hidden
                  />
                  {HERO.badge[lang]}
                </p>

                <h1
                  className="hero-in mt-6 text-display"
                  style={{ animationDelay: '60ms' }}
                >
                  {p.h1}
                </h1>

                <p
                  className="hero-in mt-6 max-w-lg text-[1.125rem] leading-relaxed text-neutral"
                  style={{ animationDelay: '120ms' }}
                >
                  {p.lede}
                </p>

                <div
                  className="hero-in mt-9 flex flex-col gap-3 sm:flex-row"
                  style={{ animationDelay: '180ms' }}
                >
                  <WhatsAppCta lang={lang} message={FINAL_CTA[lang].wa} />
                  <a href={pagePath(lang, 'services')} className="btn btn-secondary">
                    {t.ctaServices}
                  </a>
                </div>

                <ul
                  className="hero-in mt-9 flex flex-wrap gap-x-7 gap-y-3"
                  style={{ animationDelay: '240ms' }}
                >
                  <li className="flex items-center gap-2 text-[0.9375rem] text-deep">
                    <ClockIcon className="h-[1.15em] w-[1.15em] text-brand" />
                    {t.responseTime}
                  </li>
                  <li className="flex items-center gap-2 text-[0.9375rem] text-deep">
                    <ShieldIcon className="h-[1.15em] w-[1.15em] text-brand" />
                    {t.licensedDoctors}
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <div className="relative">
                  <Img
                    src="/img/hero"
                    alt={HERO.imageAlt[lang]}
                    aspect="4 / 3"
                    sizes="(min-width: 1024px) 620px, 94vw"
                    priority
                    className="shadow-[0_40px_80px_-40px_rgba(29,67,85,0.45)]"
                  />
                  {/* .glass #1 de los 3 permitidos (design.md §5) */}
                  <div className="glass absolute bottom-4 left-4 rounded-2xl px-5 py-3.5 md:bottom-6 md:left-6">
                    <p className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-deep">
                      <span className="relative flex h-2.5 w-2.5" aria-hidden>
                        <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
                      </span>
                      {t.available247}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloque extraíble por LLMs, primer contenido tras el hero */}
            <div className="mt-14 max-w-3xl">
              <AnswerBlock>{HERO.answer[lang]}</AnswerBlock>
            </div>
          </div>
        </section>

        {/* ── Pilares ──────────────────────────────────────────────────── */}
        <section className="section">
          <div className="container-site">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS[lang].map((pillar, i) => {
                const Icon = PILLAR_ICONS[pillar.icon]
                return (
                  <Reveal key={pillar.title} delay={i * 70}>
                    <div className="card h-full p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-haze text-brand">
                        <Icon className="h-[1.375rem] w-[1.375rem]" />
                      </span>
                      <h3 className="mt-5 text-h3">{pillar.title}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-neutral">
                        {pillar.body}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Servicios ────────────────────────────────────────────────── */}
        <section className="section relative overflow-hidden bg-haze">
          <div className="blob right-[-12%] top-[10%] h-[440px] w-[440px] opacity-50" aria-hidden />
          <div className="container-site relative z-10">
            <SectionHead
              eyebrow={lang === 'es' ? 'Servicios' : 'Services'}
              title={t.sectionServices}
              lede={t.sectionServicesLede}
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((service, i) => (
                <Reveal key={service.id} delay={(i % 3) * 70}>
                  <ServiceCard service={service} lang={lang} />
                </Reveal>
              ))}
            </div>

            <div className="mt-10">
              <a
                href={pagePath(lang, 'services')}
                className="inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-strong"
              >
                {t.ctaServices}
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Cómo funciona ────────────────────────────────────────────── */}
        <section className="section">
          <div className="container-site">
            <SectionHead title={STEPS_HEADING[lang].title} lede={STEPS_HEADING[lang].lede} />

            <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
              {STEPS[lang].map((step, i) => (
                <Reveal key={step.n} delay={i * 90}>
                  <li className="relative">
                    <span className="font-display text-[3.25rem] font-bold leading-none text-mist">
                      {step.n}
                    </span>
                    <h3 className="mt-3 text-h3">{step.title}</h3>
                    <p className="mt-2.5 text-neutral">{step.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Nosotros (teaser) ────────────────────────────────────────── */}
        <section className="section relative overflow-hidden bg-haze">
          <div className="blob left-[-8%] bottom-[-20%] h-[420px] w-[420px] opacity-55" aria-hidden />
          <div className="container-site relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Img
                  src="/img/services/sondas"
                  alt={ABOUT_TEASER[lang].title}
                  aspect="5 / 4"
                  sizes="(min-width: 1024px) 460px, 94vw"
                />
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <h2 className="text-h2">{ABOUT_TEASER[lang].title}</h2>
                <p className="mt-5 text-neutral">{ABOUT_TEASER[lang].body}</p>
                <a
                  href={pagePath(lang, 'about')}
                  className="mt-7 inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-strong"
                >
                  {ABOUT_TEASER[lang].cta}
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="section">
          <div className="container-site">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHead title={t.sectionFaq} />
                <a
                  href={pagePath(lang, 'faq')}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-strong"
                >
                  {lang === 'es' ? 'Ver todas las preguntas' : 'See all questions'}
                  <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <dl className="divide-y divide-mist/80 border-y border-mist/80">
                  {topFaqs.map((f) => (
                    <div key={f.q} className="py-5">
                      <dt className="text-[1.0625rem] font-semibold text-deep">{f.q}</dt>
                      <dd className="mt-2 text-neutral">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
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
      <JsonLd data={faqPageSchema(topFaqs, urlOf(lang, pageRef('home')))} />
    </>
  )
}
