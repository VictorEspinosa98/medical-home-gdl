import type { Locale } from '@/content/locales'
import { PROMOS, PROMOS_HEADING } from '@/content/promos'
import { waLink } from '@/content/site'
import { ArrowIcon, WhatsAppIcon } from './Icons'

/**
 * Carrusel de promociones. Deslizable con el dedo en móvil y con
 * trackpad/rueda en escritorio, usando scroll-snap nativo: cero JavaScript,
 * cero librerías, y funciona igual con el teclado (Tab lleva a cada tarjeta).
 *
 * Cada tarjeta abre WhatsApp con el mensaje de esa promoción ya escrito.
 * El contenido vive en content/promos.ts; si el array está vacío, la
 * sección no se renderiza.
 */
export function Promos({ lang }: { lang: Locale }) {
  const promos = PROMOS[lang]
  if (promos.length === 0) return null

  const heading = PROMOS_HEADING[lang]

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-brand">
            {heading.eyebrow}
          </p>
          <h3 className="mt-2 text-h3">{heading.title}</h3>
        </div>
        <p aria-hidden className="text-[0.875rem] text-neutral md:hidden">
          {lang === 'es' ? 'Desliza →' : 'Swipe →'}
        </p>
      </div>

      {/* -mx-5/px-5 replican el padding de .container-site para que las
        * tarjetas lleguen al borde de la pantalla al deslizar. */}
      <ul
        className="-mx-5 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden"
        aria-label={heading.title}
      >
        {promos.map((promo) => (
          <li key={promo.title} className="w-[82%] shrink-0 snap-start sm:w-[21rem]">
            <a
              href={waLink(promo.wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-link group flex h-full flex-col p-6"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-mist/60 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-deep">
                {promo.badge}
              </span>

              <h4 className="mt-4 text-[1.125rem] font-display font-bold leading-snug text-deep">
                {promo.title}
              </h4>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-neutral">{promo.body}</p>

              {promo.price && (
                <p className="mt-4 text-[1.375rem] font-display font-bold text-brand">
                  {promo.price}
                </p>
              )}
              {promo.note && <p className="mt-1 text-[0.8125rem] text-neutral">{promo.note}</p>}

              <span className="mt-auto flex items-center gap-2 pt-6 text-[0.9375rem] font-semibold text-brand transition-colors group-hover:text-brand-strong">
                <WhatsAppIcon className="h-[1.15em] w-[1.15em] shrink-0" />
                {lang === 'es' ? 'Pedir por WhatsApp' : 'Ask on WhatsApp'}
                <ArrowIcon className="h-4 w-4" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
