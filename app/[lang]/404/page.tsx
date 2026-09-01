import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WhatsAppCta } from '@/components/Cta'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { FINAL_CTA } from '@/content/home'
import { isLocale, LOCALES, type Locale } from '@/content/locales'
import { pagePath } from '@/content/pages'
import { sortedServices } from '@/content/services'
import { UI } from '@/content/ui'
import { pageRef } from '@/lib/urls'

/**
 * Página 404 con marca, una por idioma.
 *
 * `app/[lang]/not-found.tsx` nunca llegaba a producción: con
 * `output: 'export'` Next escribe un único out/404.html con su plantilla
 * genérica en inglés, sin cabecera, sin navegación y sin WhatsApp — un
 * callejón sin salida para quien entra por un enlace viejo.
 *
 * Como ruta estática normal sí se construye, y public/_redirects la sirve
 * con status 404 real para cualquier URL que no exista.
 */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: raw } = await params
  if (!isLocale(raw)) return {}

  return {
    title: UI[raw].notFoundTitle,
    // Es una página de error: fuera del índice y sin canonical ni hreflang,
    // que solo confundirían al rastreador.
    robots: { index: false, follow: true },
  }
}

export default async function NotFoundPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params
  if (!isLocale(raw)) notFound()
  const lang: Locale = raw
  const t = UI[lang]
  const services = sortedServices().slice(0, 6)

  return (
    <>
      {/* El selector de idioma no tiene una gemela real desde un 404:
        * mandarlo a la portada del otro idioma es lo menos sorprendente. */}
      <Header lang={lang} currentRef={pageRef('home')} />

      <main id="main" className="relative overflow-hidden bg-haze py-20 md:py-28">
        <div className="blob left-[-10%] top-[-15%] h-[520px] w-[520px] opacity-60" aria-hidden />

        <div className="container-site relative z-10">
          <p className="font-display text-[5rem] font-bold leading-none text-mist">404</p>

          <h1 className="mt-6 max-w-2xl text-h2">{t.notFoundTitle}</h1>
          <p className="mt-4 max-w-2xl text-neutral">{t.notFoundBody}</p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <WhatsAppCta lang={lang} message={FINAL_CTA[lang].wa} />
            <a href={pagePath(lang, 'home')} className="btn btn-secondary">
              {lang === 'es' ? 'Ir al inicio' : 'Go to home'}
            </a>
            <a href={pagePath(lang, 'services')} className="btn btn-secondary">
              {t.ctaServices}
            </a>
          </div>

          {/* La salida real: en vez de un callejón sin salida, los servicios
            * que la persona probablemente venía buscando. */}
          <h2 className="mt-16 text-h3">
            {lang === 'es' ? 'Quizá buscabas esto' : 'You may have been looking for'}
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  className="text-brand underline-offset-4 hover:underline"
                  href={`/${lang}/${lang === 'es' ? 'servicios' : 'services'}/${service[lang].slug}/`}
                >
                  {service[lang].shortName}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-[0.875rem] text-neutral">{t.emergencyNotice}</p>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  )
}
