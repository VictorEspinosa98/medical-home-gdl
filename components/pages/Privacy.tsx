import { FloatingWhatsApp } from '@/components/Cta'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { Breadcrumbs, SectionHead } from '@/components/Sections'
import { FINAL_CTA } from '@/content/home'
import type { Locale } from '@/content/locales'
import { page, pagePath } from '@/content/pages'
import { PRIVACY, PRIVACY_UPDATED } from '@/content/privacy'
import { UI } from '@/content/ui'
import { breadcrumbSchema, webPageSchema } from '@/lib/jsonld'
import { pageRef, urlOf } from '@/lib/urls'

export function Privacy({ lang }: { lang: Locale }) {
  const t = UI[lang]
  const p = page('privacy')[lang]
  const copy = PRIVACY[lang]
  const url = urlOf(lang, pageRef('privacy'))

  return (
    <>
      <Header lang={lang} currentRef={pageRef('privacy')} />

      <main id="main">
        <section className="bg-haze pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="container-site">
            <Breadcrumbs
              items={[
                { name: t.breadcrumbHome, href: pagePath(lang, 'home') },
                { name: p.navLabel },
              ]}
            />
            <h1 className="text-h1 max-w-3xl">{p.h1}</h1>
            <p className="mt-5 max-w-2xl text-[1.125rem] leading-relaxed text-neutral">{p.lede}</p>
            <p className="mt-4 text-[0.875rem] text-neutral">
              <time dateTime={PRIVACY_UPDATED}>{copy.updatedLabel}</time>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container-site space-y-12">
            {copy.sections.map((section) => (
              <div key={section.title}>
                <SectionHead title={section.title} />
                <div className="prose-mh measure mt-5">
                  {section.paragraphs.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                  {section.items && (
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FloatingWhatsApp lang={lang} message={FINAL_CTA[lang].wa} />
      <JsonLd
        data={[
          {
            ...webPageSchema({
              lang,
              ref: pageRef('privacy'),
              name: p.h1,
              description: p.metaDescription,
              breadcrumbId: `${url}#breadcrumb`,
            }),
            dateModified: PRIVACY_UPDATED,
          },
          breadcrumbSchema(
            [
              { name: t.breadcrumbHome, url: urlOf(lang, pageRef('home')) },
              { name: p.navLabel, url },
            ],
            `${url}#breadcrumb`,
          ),
        ]}
      />
    </>
  )
}
