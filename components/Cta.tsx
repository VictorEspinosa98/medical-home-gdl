import type { Locale } from '@/content/locales'
import { SITE, telLink, waLink } from '@/content/site'
import { UI } from '@/content/ui'
import { PhoneIcon, WhatsAppIcon } from './Icons'

/**
 * Botón de WhatsApp con mensaje pre-llenado según la sección.
 * El mensaje contextual importa: el negocio recibe el chat ya sabiendo
 * qué servicio interesa, sin preguntar.
 */
export function WhatsAppCta({
  lang,
  message,
  label,
  variant = 'primary',
  className = '',
}: {
  lang: Locale
  message: string
  label?: string
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-${variant} ${className}`}
    >
      <WhatsAppIcon className="h-[1.35em] w-[1.35em] shrink-0" />
      {label ?? UI[lang].ctaWhatsapp}
    </a>
  )
}

export function CallCta({ lang, className = '' }: { lang: Locale; className?: string }) {
  return (
    <a href={telLink()} className={`btn btn-secondary ${className}`}>
      <PhoneIcon className="h-[1.2em] w-[1.2em] shrink-0" />
      {UI[lang].ctaCall}
    </a>
  )
}

/**
 * Botón flotante. Fijo abajo a la derecha, respeta el safe area del iPhone.
 * Es Server Component: un <a>, sin JavaScript.
 */
export function FloatingWhatsApp({ lang, message }: { lang: Locale; message: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={UI[lang].ctaWhatsapp}
      className="fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 focus-visible:scale-105 md:right-6"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}

/** Banda de cierre. Un solo botón primario, como manda design.md §6. */
export function CtaBand({
  lang,
  title,
  body,
  message,
}: {
  lang: Locale
  title: string
  body: string
  message: string
}) {
  return (
    <section className="section relative overflow-hidden bg-ink text-white">
      <div className="blob -top-24 right-[-10%] h-[420px] w-[420px] opacity-60" aria-hidden />
      <div
        className="blob bottom-[-40%] left-[-8%] h-[380px] w-[380px] opacity-40"
        aria-hidden
      />
      <div className="container-site relative z-10 text-center">
        <h2 className="text-h1 text-white">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-mist">{body}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppCta lang={lang} message={message} />
          <a href={telLink()} className="btn glass-dark rounded-full text-white">
            <PhoneIcon className="h-[1.2em] w-[1.2em] shrink-0" />
            {UI[lang].ctaCall}
          </a>
        </div>
        <p className="mt-6 text-[0.9375rem] text-mist/80">
          {UI[lang].hoursValue} ·{' '}
          {lang === 'es'
            ? 'toda la ZMG, Morelia y Querétaro'
            : 'all of metro Guadalajara, Morelia and Queretaro'}
        </p>
      </div>
    </section>
  )
}
