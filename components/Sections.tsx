import type { Faq } from '@/content/faq'
import type { Locale } from '@/content/locales'
import { pagePath } from '@/content/pages'
import { SITE, addressDisplay, allAreaNames, mailLink, phoneDisplay, telLink } from '@/content/site'
import { UI } from '@/content/ui'
import { CallCta, WhatsAppCta } from './Cta'
import { ArrowIcon, CheckIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'

/** Encabezado de sección reutilizable. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow?: string
  title: string
  lede?: string
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand">
          {eyebrow}
        </p>
      )}
      <h2 className={`text-h2 ${eyebrow ? 'mt-3' : ''}`}>{title}</h2>
      {lede && <p className="mt-4 text-neutral">{lede}</p>}
    </div>
  )
}

/**
 * Migas de pan. Además del valor de navegación, es lo que alimenta el
 * BreadcrumbList del JSON-LD y ayuda a Google a entender la jerarquía.
 */
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem] text-neutral">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {item.href ? (
              <a href={item.href} className="transition-colors hover:text-brand">
                {item.name}
              </a>
            ) : (
              <span aria-current="page" className="text-deep">
                {item.name}
              </span>
            )}
            {i < items.length - 1 && (
              <span aria-hidden className="text-mist">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Bloque de respuesta directa. Primer elemento de contenido de cada página:
 * 40-60 palabras autocontenidas que responden la pregunta literal.
 * Es el formato que citan AI Overviews, ChatGPT y Perplexity.
 */
export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="card hairline relative border-l-[3px] border-l-brand p-6 md:p-7">
      <p className="text-[1.0625rem] leading-relaxed text-deep">{children}</p>
    </div>
  )
}

export function CheckList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3.5 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist/70 text-brand">
            <CheckIcon className="h-3 w-3" />
          </span>
          <span className="text-neutral">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * FAQ con <details> nativo: accesible, indexable y con cero JavaScript.
 * El contenido está en el HTML aunque esté colapsado, así que Google y los
 * LLMs lo leen igual.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-mist/80 border-y border-mist/80">
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex items-start justify-between gap-4 text-left">
            <h3 className="text-[1.0625rem] font-semibold text-deep md:text-[1.125rem]">{f.q}</h3>
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-mist text-brand transition-transform group-open:rotate-45"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pr-10 text-neutral">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

/** Tarjeta de contacto. Es el `.glass` #2 de los tres permitidos. */
export function ContactCard({ lang, message }: { lang: Locale; message: string }) {
  const t = UI[lang]
  return (
    <div className="glass rounded-[var(--radius-card)] p-7 md:p-8">
      <h2 className="text-h3">{t.contactTitle}</h2>
      <p className="mt-3 text-neutral">{t.contactLede}</p>

      <dl className="mt-6 space-y-4">
        <div className="flex items-start gap-3">
          <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-deep">
              {t.hours}
            </dt>
            <dd className="text-neutral">{t.hoursValue}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-deep">
              {t.coverageLabel}
            </dt>
            <dd className="text-neutral">{allAreaNames.join(' · ')}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-deep">
              {t.phoneLabel}
            </dt>
            <dd>
              <a href={telLink()} className="text-neutral transition-colors hover:text-brand">
                {phoneDisplay}
              </a>
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-deep">
              {t.emailLabel}
            </dt>
            <dd>
              <a
                href={mailLink()}
                className="break-all text-[0.9375rem] text-neutral transition-colors hover:text-brand"
              >
                {SITE.email}
              </a>
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div>
            <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-deep">
              {t.addressLabel}
            </dt>
            <dd className="text-[0.9375rem] leading-relaxed text-neutral">{addressDisplay}</dd>
          </div>
        </div>
      </dl>

      <div className="mt-7 flex flex-col gap-3">
        <WhatsAppCta lang={lang} message={message} className="w-full" />
        <CallCta lang={lang} className="w-full" />
      </div>
    </div>
  )
}

/** Enlace de vuelta al índice de servicios. */
export function BackLink({ lang }: { lang: Locale }) {
  return (
    <a
      href={pagePath(lang, 'services')}
      className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand transition-colors hover:text-brand-strong"
    >
      <ArrowIcon className="h-4 w-4 rotate-180" />
      {UI[lang].ctaBack}
    </a>
  )
}
