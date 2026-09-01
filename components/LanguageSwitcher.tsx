'use client'

import type { Locale } from '@/content/locales'

/**
 * Único Client Component del chrome, y el JS es opcional.
 *
 * El enlace es un `<a href>` real hacia la URL equivalente en el otro idioma:
 * Google lo rastrea, se puede compartir ya traducido y funciona sin JS.
 *
 * El onClick solo escribe la cookie `nf_lang`, que Netlify prioriza por
 * encima del header Accept-Language. Así, si alguien con navegador en
 * español elige inglés, la próxima visita a la raíz lo manda a /en/.
 */
export function LanguageSwitcher({
  href,
  target,
  label,
  ariaLabel,
}: {
  href: string
  target: Locale
  label: string
  ariaLabel: string
}) {
  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      onClick={() => {
        document.cookie = `nf_lang=${target}; path=/; max-age=31536000; SameSite=Lax`
      }}
      className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-mist px-3.5 text-[0.9375rem] font-semibold text-deep transition-colors hover:border-brand hover:bg-haze"
    >
      {label}
    </a>
  )
}
