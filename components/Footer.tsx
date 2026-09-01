import type { Locale } from '@/content/locales'
import { PAGES, pagePath } from '@/content/pages'
import { SERVICES_BASE, sortedServices } from '@/content/services'
import { SITE, addressDisplay, mailLink, phoneDisplay, telLink } from '@/content/site'
import { UI } from '@/content/ui'
import { MailIcon, PhoneIcon, PinIcon } from './Icons'
import { Logo } from './Img'

export function Footer({ lang }: { lang: Locale }) {
  const t = UI[lang]
  const year = 2026

  return (
    <footer className="relative overflow-hidden border-t border-mist/60 bg-haze">
      <div
        className="blob left-[-10%] top-[-30%] h-[420px] w-[420px] opacity-45"
        aria-hidden
      />

      <div className="container-site relative z-10 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="logo-full" width={196} className="h-auto w-[168px]" />
            <p className="mt-5 max-w-xs text-[0.9375rem] text-neutral">{t.footerTagline}</p>
            <p className="mt-4 flex items-start gap-2 text-[0.9375rem] text-neutral">
              <PinIcon className="mt-0.5 h-[1.1em] w-[1.1em] shrink-0 text-brand" />
              <span>
                {SITE.address.locality}, {SITE.address.region}, México
              </span>
            </p>
          </div>

          <nav className="md:col-span-3" aria-label={t.footerNav}>
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-deep">
              {t.footerNav}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PAGES.map((p) => (
                <li key={p.id}>
                  <a
                    href={p[lang].path}
                    className="text-[0.9375rem] text-neutral transition-colors hover:text-brand"
                  >
                    {p[lang].navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-label={t.sectionServices}>
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-deep">
              {PAGES[1][lang].navLabel}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {sortedServices()
                .slice(0, 6)
                .map((s) => (
                  <li key={s.id}>
                    <a
                      href={`/${lang}/${SERVICES_BASE[lang]}/${s[lang].slug}/`}
                      className="text-[0.9375rem] text-neutral transition-colors hover:text-brand"
                    >
                      {s[lang].shortName}
                    </a>
                  </li>
                ))}
              <li>
                <a
                  href={pagePath(lang, 'services')}
                  className="text-[0.9375rem] font-medium text-brand transition-colors hover:text-brand-strong"
                >
                  {t.ctaServices} →
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-deep">
              {t.sectionContact}
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={telLink()}
                  className="flex items-center gap-2 text-[0.9375rem] text-neutral transition-colors hover:text-brand"
                >
                  <PhoneIcon className="h-[1.05em] w-[1.05em] shrink-0 text-brand" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailLink()}
                  className="flex items-start gap-2 break-all text-[0.875rem] text-neutral transition-colors hover:text-brand"
                >
                  <MailIcon className="mt-1 h-[1.05em] w-[1.05em] shrink-0 text-brand" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[0.875rem] leading-relaxed text-neutral">
                <PinIcon className="mt-1 h-[1.05em] w-[1.05em] shrink-0 text-brand" />
                <span>
                  <span className="block font-medium text-deep">{t.addressLabel}</span>
                  {addressDisplay}
                </span>
              </li>
            </ul>
            <p className="mt-4 text-[0.9375rem] font-medium text-deep">{t.hoursValue}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-mist pt-8">
          <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-deep">
            {t.footerLegal}
          </h2>
          <p className="mt-3 max-w-3xl text-[0.875rem] leading-relaxed text-neutral">
            {t.footerDisclaimer}
          </p>
          <p className="mt-6 text-[0.875rem] text-neutral">
            © {year} {SITE.name}. {t.footerRights}
          </p>
        </div>
      </div>
    </footer>
  )
}
