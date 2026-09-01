import type { Metadata } from 'next'
import { CtaBand, FloatingWhatsApp, WhatsAppCta } from '@/components/Cta'
import { Header } from '@/components/Header'
import { ArrowIcon, BULLET_ICONS, PILLAR_ICONS, PhoneIcon } from '@/components/Icons'
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
import { telLink } from '@/content/site'
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
        {/* ── Hero ─────────────────────────────────────────────────────────
         * Banner a sangre: foto de fondo + velo azul, todo el contenido
         * centrado encima. Mismo bloque en móvil, solo cambia el ritmo.
         */}
        <section className="relative isolate flex min-h-[540px] items-center overflow-hidden md:min-h-[640px]">
          <Img
            src="/img/hero"
            alt={HERO.imageAlt[lang]}
            bleed
            tint={false}
            priority
            sizes="100vw"
            /* Foto vertical dentro de un banner apaisado: el recorte deja solo
             * una franja, así que un desenfoque suave la convierte en textura
             * (y es el look del banner anterior). scale-105 tapa el borde
             * translúcido que deja blur() en los cantos. */
            imgClassName="scale-105 object-[50%_0%] blur-[3px]"
          />
          <div className="hero-veil absolute inset-0" aria-hidden />

          <div className="container-site relative z-10 py-20 text-center md:py-28">
            <h1
              className="hero-in mx-auto max-w-4xl text-display text-white"
              style={{ animationDelay: '0ms' }}
            >
              {p.h1}
            </h1>

            <div
              className="hero-in mx-auto mt-9 flex max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center"
              style={{ animationDelay: '180ms' }}
            >
              <WhatsAppCta lang={lang} message={FINAL_CTA[lang].wa} />
              <a href={telLink()} className="btn glass-dark text-white">
                <PhoneIcon className="h-[1.2em] w-[1.2em] shrink-0" />
                {t.ctaCall}
              </a>
              <a href={pagePath(lang, 'services')} className="btn glass-dark text-white">
                {t.ctaServices}
              </a>
            </div>

            <ul
              className="hero-in mx-auto mt-9 flex max-w-sm flex-col items-start gap-x-7 gap-y-3 text-white/90 sm:max-w-3xl sm:flex-row sm:flex-wrap sm:justify-center"
              style={{ animationDelay: '240ms' }}
            >
              {HERO.bullets[lang].map((b) => {
                const Icon = BULLET_ICONS[b.icon]
                return (
                  <li key={b.text} className="flex items-start gap-2 text-left text-[0.9375rem]">
                    <Icon className="mt-[0.28em] h-[1.15em] w-[1.15em] shrink-0 text-glow" />
                    {b.text}
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* ── Pilares ──────────────────────────────────────────────────── */}
        <section className="section">
          <div className="container-site">
            {/* Bloque extraíble por LLMs, primer contenido tras el hero */}
            <div className="mb-14 max-w-3xl">
              <AnswerBlock title={HERO.answerTitle[lang]}>{HERO.answer[lang]}</AnswerBlock>
            </div>

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
