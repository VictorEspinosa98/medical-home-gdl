import { WhatsAppCta } from '@/components/Cta'
import { FINAL_CTA } from '@/content/home'
import { DEFAULT_LOCALE } from '@/content/locales'
import { pagePath } from '@/content/pages'
import { UI } from '@/content/ui'

/**
 * 404 bilingüe en una sola página.
 *
 * Netlify sirve un único out/404.html para todo el sitio, así que no tiene
 * sentido hacer una versión por idioma: quien llegue aquí puede venir de
 * cualquiera de los dos. Mostramos los dos mensajes.
 */
export default function NotFound() {
  const es = UI.es
  const en = UI.en

  return (
    <main
      id="main"
      className="relative flex min-h-screen items-center overflow-hidden bg-haze py-20"
    >
      <div className="blob left-[-10%] top-[-15%] h-[520px] w-[520px] opacity-60" aria-hidden />

      <div className="container-site relative z-10 text-center">
        <p className="font-display text-[5rem] font-bold leading-none text-mist">404</p>

        <div className="mx-auto mt-8 max-w-xl space-y-6">
          <div>
            <h1 className="text-h2" lang="es">
              {es.notFoundTitle}
            </h1>
            <p className="mt-3 text-neutral" lang="es">
              {es.notFoundBody}
            </p>
          </div>

          <div className="border-t border-mist pt-6">
            <h2 className="text-h3" lang="en">
              {en.notFoundTitle}
            </h2>
            <p className="mt-2 text-neutral" lang="en">
              {en.notFoundBody}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={pagePath('es', 'home')} className="btn btn-secondary">
            Inicio
          </a>
          <a href={pagePath('en', 'home')} className="btn btn-secondary">
            Home
          </a>
          <WhatsAppCta
            lang={DEFAULT_LOCALE}
            message={FINAL_CTA[DEFAULT_LOCALE].wa}
            label="WhatsApp"
          />
        </div>
      </div>
    </main>
  )
}
