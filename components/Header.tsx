import { type Locale, otherLocale } from '@/content/locales'
import { navPages, pagePath } from '@/content/pages'
import { UI } from '@/content/ui'
import { type RouteRef, pathOf } from '@/lib/urls'
import { WhatsAppCta } from './Cta'
import { Logo } from './Img'
import { LanguageSwitcher } from './LanguageSwitcher'

/**
 * Cabecera. El menú móvil usa <details>/<summary> nativo — cero JavaScript
 * y funciona con teclado por defecto (design.md §6).
 *
 * `currentRef` permite que el selector de idioma apunte a la página
 * equivalente exacta, no al home.
 */
export function Header({ lang, currentRef }: { lang: Locale; currentRef: RouteRef }) {
  const t = UI[lang]
  const other = otherLocale(lang)
  const links = navPages()

  return (
    <header className="sticky top-0 z-50 border-b border-mist/60 bg-white/85 backdrop-blur-md">
      <div className="container-wide flex h-[72px] items-center justify-between gap-4">
        <a
          href={pagePath(lang, 'home')}
          className="shrink-0"
          aria-label={`Medical Home Gdl — ${t.breadcrumbHome}`}
        >
          <Logo width={168} priority className="h-auto w-[148px] md:w-[168px]" />
        </a>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 md:flex" aria-label={t.footerNav}>
          {links.map((p) => (
            <a
              key={p.id}
              href={p[lang].path}
              className="rounded-full px-3.5 py-2.5 text-[0.9375rem] font-medium text-deep transition-colors hover:bg-haze"
            >
              {p[lang].navLabel}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <LanguageSwitcher
            href={pathOf(other, currentRef)}
            target={other}
            label={t.langSwitch}
            ariaLabel={t.langSwitchLabel}
          />
          <WhatsAppCta
            lang={lang}
            message={
              lang === 'es'
                ? 'Hola, necesito atención médica a domicilio en Guadalajara.'
                : 'Hi, I need a doctor at my address in Guadalajara.'
            }
            label={t.ctaWhatsappShort}
            className="!min-h-[44px] !px-5 !text-[0.9375rem]"
          />
        </div>

        {/* Móvil — <details> nativo */}
        <details className="group relative md:hidden">
          <summary
            className="flex h-11 w-11 items-center justify-center rounded-full border border-mist text-deep"
            aria-label={t.openMenu}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path d="m6 6 12 12M18 6 6 18" className="hidden group-open:block" />
            </svg>
          </summary>

          <nav
            className="card pop-in absolute right-0 top-[calc(100%+12px)] w-[min(88vw,320px)] p-2.5"
            aria-label={t.footerNav}
          >
            {links.map((p) => (
              <a
                key={p.id}
                href={p[lang].path}
                className="block rounded-xl px-4 py-3.5 font-medium text-deep transition-colors hover:bg-haze"
              >
                {p[lang].navLabel}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2.5 border-t border-mist/70 px-2 pt-3">
              <LanguageSwitcher
                href={pathOf(other, currentRef)}
                target={other}
                label={t.langSwitch}
                ariaLabel={t.langSwitchLabel}
              />
              <WhatsAppCta
                lang={lang}
                message={
                  lang === 'es'
                    ? 'Hola, necesito atención médica a domicilio en Guadalajara.'
                    : 'Hi, I need a doctor at my address in Guadalajara.'
                }
                label={t.ctaWhatsappShort}
                className="!min-h-[44px] flex-1 !px-4 !text-[0.9375rem]"
              />
            </div>
          </nav>
        </details>
      </div>
    </header>
  )
}
