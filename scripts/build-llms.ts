// Genera la capa Markdown para LLMs. Corre DESPUÉS de `next build`.
//
//   out/llms.txt         índice en formato llmstxt.org
//   out/llms-full.txt    todo el contenido del sitio en Markdown plano
//   out/<ruta>.md        versión Markdown de cada una de las 34 páginas
//
// Todo se deriva de content/, la misma fuente que renderiza el HTML.
// No hay forma de que el Markdown y las páginas se desincronicen.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ABOUT_HEADINGS, MISSION, VALUES, VISION } from '../content/about'
import { AREAS, COVERAGE_COPY } from '../content/coverage'
import { FAQ } from '../content/faq'
import { HERO } from '../content/home'
import { HTML_LANG, LOCALES, type Locale } from '../content/locales'
import { PAGES, page } from '../content/pages'
import { PROMOS, PROMOS_HEADING, PROMOS_VALID_UNTIL, promosValidUntilLabel } from '../content/promos'
import { SERVICES_BASE, sortedServices } from '../content/services'
import { SITE, addressDisplay, allAreaNames } from '../content/site'
import { mdUrlFor } from '../lib/urls'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'out')

/** `/es/servicios/x/` → `out/es/servicios/x.md`; `/es/` → `out/es/index.md` */
const mdFileFor = (path: string): string => {
  const trimmed = path.replace(/^\/|\/$/g, '')
  return join(OUT, trimmed === '' ? 'index.md' : `${trimmed}.md`)
}

const frontMatter = (fields: Record<string, string>) =>
  ['---', ...Object.entries(fields).map(([k, v]) => `${k}: ${JSON.stringify(v)}`), '---', ''].join(
    '\n',
  )

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join('\n')

/**
 * Promociones vigentes, con precio.
 *
 * El unico precio duro del sitio ("Desde $600") vivia solo en el carrusel
 * de la portada: no llegaba ni a llms.txt ni a los .md, que es justo donde
 * un asistente busca el dato que mas se pregunta antes de contratar.
 */
const promosBlock = (lang: Locale): string => {
  const promos = PROMOS[lang]
  if (promos.length === 0) return ''

  return [
    `## ${PROMOS_HEADING[lang].title}`,
    '',
    `${promosValidUntilLabel(lang)}.`,
    '',
    promos
      .map((promo) => {
        const detail = [promo.price, promo.note].filter(Boolean).join(' - ')
        return `- **${promo.title}**${detail ? ` (${detail})` : ''}: ${promo.body}`
      })
      .join('\n'),
  ].join('\n')
}

const contactBlock = (lang: Locale) =>
  lang === 'es'
    ? [
        '## Contacto',
        '',
        `- WhatsApp: https://wa.me/${SITE.whatsapp}`,
        `- Teléfono: ${SITE.phone}`,
        `- Correo: ${SITE.email}`,
        `- Consultorio: ${addressDisplay}`,
        '- Horario: 24 horas, los 7 días de la semana',
        `- Cobertura: ${SITE.areas.join(', ')} (Jalisco, México); ${SITE.otherCities
          .map((c) => `${c.name}, ${c.state}`)
          .join('; ')}`,
        `- Tiempo de llegada: menos de ${SITE.responseMinutes} minutos`,
      ].join('\n')
    : [
        '## Contact',
        '',
        `- WhatsApp: https://wa.me/${SITE.whatsapp}`,
        `- Phone: ${SITE.phone}`,
        `- Email: ${SITE.email}`,
        `- Clinic: ${addressDisplay}`,
        '- Hours: 24 hours a day, 7 days a week',
        `- Coverage: ${SITE.areas.join(', ')} (Jalisco, Mexico); ${SITE.otherCities
          .map((c) => `${c.name}, ${c.state}`)
          .join('; ')}`,
        `- Arrival time: under ${SITE.responseMinutes} minutes`,
      ].join('\n')

// ── Documentos por página ───────────────────────────────────────────────────

function homeDoc(lang: Locale): string {
  const p = page('home')[lang]
  const services = sortedServices()
  const L = lang === 'es'

  return [
    frontMatter({
      title: p.metaTitle,
      url: `${SITE.url}${p.path}`,
      lang: HTML_LANG[lang],
      type: 'homepage',
    }),
    `# ${p.h1}`,
    '',
    `> **${HERO.answerTitle[lang]}** ${HERO.answer[lang]}`,
    '',
    p.lede,
    '',
    `## ${L ? 'Servicios disponibles' : 'Available services'}`,
    '',
    services
      .map(
        (s) =>
          `- [${s[lang].shortName}](${SITE.url}/${lang}/${SERVICES_BASE[lang]}/${s[lang].slug}/): ${s[lang].benefit}`,
      )
      .join('\n'),
    '',
    promosBlock(lang),
    '',
    contactBlock(lang),
    '',
  ].join('\n')
}

function servicesIndexDoc(lang: Locale): string {
  const p = page('services')[lang]
  const L = lang === 'es'

  return [
    frontMatter({
      title: p.metaTitle,
      url: `${SITE.url}${p.path}`,
      lang: HTML_LANG[lang],
      type: 'service-index',
    }),
    `# ${p.h1}`,
    '',
    `> ${p.lede}`,
    '',
    sortedServices()
      .map((s) =>
        [
          `## ${s[lang].name}`,
          '',
          s[lang].answer,
          '',
          `${L ? 'Página' : 'Page'}: ${SITE.url}/${lang}/${SERVICES_BASE[lang]}/${s[lang].slug}/`,
        ].join('\n'),
      )
      .join('\n\n'),
    '',
    contactBlock(lang),
    '',
  ].join('\n')
}

function serviceDoc(serviceId: string, lang: Locale): string {
  const service = sortedServices().find((s) => s.id === serviceId)!
  const s = service[lang]
  const url = `${SITE.url}/${lang}/${SERVICES_BASE[lang]}/${s.slug}/`
  const L = lang === 'es'

  return [
    frontMatter({
      title: s.metaTitle,
      url,
      lang: HTML_LANG[lang],
      type: 'service',
      service: service.id,
    }),
    `# ${s.name}`,
    '',
    `> ${s.answer}`,
    '',
    s.intro,
    '',
    `## ${L ? 'Qué incluye' : 'What it includes'}`,
    '',
    bullets(s.includes),
    '',
    `## ${L ? 'Cuándo pedirlo' : 'When to book it'}`,
    '',
    bullets(s.indications),
    '',
    `## ${L ? 'Preguntas frecuentes' : 'Frequently asked questions'}`,
    '',
    s.faq.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n'),
    '',
    contactBlock(lang),
    '',
  ].join('\n')
}

function aboutDoc(lang: Locale): string {
  const p = page('about')[lang]

  return [
    frontMatter({
      title: p.metaTitle,
      url: `${SITE.url}${p.path}`,
      lang: HTML_LANG[lang],
      type: 'about',
    }),
    `# ${p.h1}`,
    '',
    `> ${p.lede}`,
    '',
    `## ${ABOUT_HEADINGS.mission[lang]}`,
    '',
    MISSION[lang].join('\n\n'),
    '',
    `## ${ABOUT_HEADINGS.vision[lang]}`,
    '',
    VISION[lang].join('\n\n'),
    '',
    `## ${ABOUT_HEADINGS.values[lang]}`,
    '',
    VALUES.map((v) => `### ${v.title[lang]}\n\n${v.body[lang]}`).join('\n\n'),
    '',
    contactBlock(lang),
    '',
  ].join('\n')
}

function coverageDoc(lang: Locale): string {
  const p = page('coverage')[lang]
  const L = lang === 'es'

  return [
    frontMatter({
      title: p.metaTitle,
      url: `${SITE.url}${p.path}`,
      lang: HTML_LANG[lang],
      type: 'coverage',
    }),
    `# ${p.h1}`,
    '',
    `> ${COVERAGE_COPY.answer[lang]}`,
    '',
    `## ${L ? 'Municipios con cobertura' : 'Municipalities covered'}`,
    '',
    AREAS.map(
      (a) => `### ${a.name}\n\n${COVERAGE_COPY.zonesLabel[lang]}: ${a.zones[lang]}`,
    ).join('\n\n'),
    '',
    `## ${COVERAGE_COPY.outsideTitle[lang]}`,
    '',
    COVERAGE_COPY.outsideBody[lang],
    '',
    contactBlock(lang),
    '',
  ].join('\n')
}

function faqDoc(lang: Locale): string {
  const p = page('faq')[lang]
  const L = lang === 'es'

  return [
    frontMatter({
      title: p.metaTitle,
      url: `${SITE.url}${p.path}`,
      lang: HTML_LANG[lang],
      type: 'faq',
    }),
    `# ${p.h1}`,
    '',
    `> ${p.lede}`,
    '',
    `## ${L ? 'Sobre el servicio' : 'About the service'}`,
    '',
    FAQ[lang].map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n'),
    '',
    `## ${L ? 'Sobre cada servicio' : 'About each service'}`,
    '',
    sortedServices()
      .map((s) =>
        [
          `### ${s[lang].shortName}`,
          '',
          s[lang].faq.map((f) => `#### ${f.q}\n\n${f.a}`).join('\n\n'),
        ].join('\n'),
      )
      .join('\n\n'),
    '',
    contactBlock(lang),
    '',
  ].join('\n')
}

// ── llms.txt ────────────────────────────────────────────────────────────────

function llmsIndex(): string {
  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> **${HERO.answerTitle.es}** ${HERO.answer.es}`,
    '',
    `> **${HERO.answerTitle.en}** ${HERO.answer.en}`,
    '',
    '## Datos clave / Key facts',
    '',
    `- Nombre / Name: ${SITE.name}`,
    `- Tipo / Type: Servicio médico a domicilio (house-call medical service)`,
    `- Ubicación / Location: ${addressDisplay}, México`,
    `- Cobertura / Coverage: ${allAreaNames.join(', ')}`,
    `- Horario / Hours: 24/7, todos los días del año`,
    `- Tiempo de respuesta / Response time: < ${SITE.responseMinutes} min`,
    `- Precio de referencia / Starting price: primera consulta médica a domicilio desde $600 MXN (first house-call consultation from $600 MXN)`,
    `- Vigencia de promociones / Offers valid until: ${PROMOS_VALID_UNTIL}`,
    `- Idiomas / Languages: Español, English`,
    `- WhatsApp: https://wa.me/${SITE.whatsapp}`,
    `- Teléfono / Phone: ${SITE.phone}`,
    `- Correo / Email: ${SITE.email}`,
    `- Sitio / Website: ${SITE.url}`,
    '',
  ]

  for (const lang of LOCALES) {
    const label = lang === 'es' ? 'Español' : 'English'

    lines.push(`## ${label} — ${lang === 'es' ? 'Páginas' : 'Pages'}`, '')
    for (const p of PAGES) {
      lines.push(
        `- [${p[lang].navLabel}](${SITE.url}${mdUrlFor(p[lang].path)}): ${p[lang].metaDescription}`,
      )
    }
    lines.push('')

    lines.push(`## ${label} — ${lang === 'es' ? 'Servicios' : 'Services'}`, '')
    for (const s of sortedServices()) {
      const path = `/${lang}/${SERVICES_BASE[lang]}/${s[lang].slug}/`
      lines.push(`- [${s[lang].name}](${SITE.url}${mdUrlFor(path)}): ${s[lang].benefit}`)
    }
    lines.push('')
  }

  lines.push(
    '## Optional',
    '',
    `- [Contenido completo / Full content](${SITE.url}/llms-full.txt): todo el sitio en Markdown, en ambos idiomas.`,
    `- [Sitemap](${SITE.url}/sitemap.xml)`,
    '',
  )

  return lines.join('\n')
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const docs: { path: string; body: string }[] = []

  for (const lang of LOCALES) {
    docs.push({ path: page('home')[lang].path, body: homeDoc(lang) })
    docs.push({ path: page('services')[lang].path, body: servicesIndexDoc(lang) })
    docs.push({ path: page('about')[lang].path, body: aboutDoc(lang) })
    docs.push({ path: page('coverage')[lang].path, body: coverageDoc(lang) })
    docs.push({ path: page('faq')[lang].path, body: faqDoc(lang) })

    for (const s of sortedServices()) {
      docs.push({
        path: `/${lang}/${SERVICES_BASE[lang]}/${s[lang].slug}/`,
        body: serviceDoc(s.id, lang),
      })
    }
  }

  for (const doc of docs) {
    const file = mdFileFor(doc.path)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, doc.body, 'utf8')
  }

  await writeFile(join(OUT, 'llms.txt'), llmsIndex(), 'utf8')

  const full = [
    `# ${SITE.name} — ${'contenido completo / full content'}`,
    '',
    `Fuente / Source: ${SITE.url}`,
    '',
    '---',
    '',
    // Se quita el front-matter en el archivo agregado: estorba a mitad del texto.
    docs.map((d) => d.body.replace(/^---\n[\s\S]*?\n---\n\n/, '')).join('\n---\n\n'),
  ].join('\n')

  await writeFile(join(OUT, 'llms-full.txt'), full, 'utf8')

  console.log(`✓ ${docs.length} archivos .md + llms.txt + llms-full.txt → out/`)
}

main().catch((err) => {
  console.error('✗ build-llms falló:', err)
  process.exit(1)
})
