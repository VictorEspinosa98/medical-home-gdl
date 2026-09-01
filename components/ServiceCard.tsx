import type { Locale } from '@/content/locales'
import { SERVICES_BASE, type Service } from '@/content/services'
import { UI } from '@/content/ui'
import { ArrowIcon } from './Icons'
import { Img } from './Img'

export function ServiceCard({
  service,
  lang,
  priority = false,
}: {
  service: Service
  lang: Locale
  priority?: boolean
}) {
  const t = service[lang]
  const href = `/${lang}/${SERVICES_BASE[lang]}/${t.slug}/`

  return (
    <a
      href={href}
      className="card card-link group flex h-full flex-col overflow-hidden focus-visible:outline-offset-4"
    >
      <Img
        src={service.image}
        alt={service.alt[lang]}
        aspect="16 / 10"
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
        priority={priority}
        className="rounded-none"
        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3">{t.shortName}</h3>
        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-neutral">{t.benefit}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand">
          {UI[lang].ctaServiceDetail}
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  )
}
