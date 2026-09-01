# Medical Home Gdl

Sitio corporativo bilingüe (ES/EN) para servicios médicos a domicilio en la Zona Metropolitana de Guadalajara.

**Dominio:** `medicalhomegdl.com` · **Hosting:** Netlify · **Stack:** Next.js 16 (`output: 'export'`) + Tailwind v4 + TypeScript

---

## ⚠️ Lo primero: los datos de contacto

El sitio está completo salvo por **cuatro valores** que el cliente aún no entregó. Están todos en un solo archivo:

**`content/site.ts`** — busca los comentarios `← PENDIENTE`:

```ts
whatsapp: '523300000000',                 // ← formato wa.me: 52 + 10 dígitos, sin + ni espacios
phone:    '+523300000000',                // ← E.164
email:    'contacto@medicalhomegdl.com',  // ← confirmar
address.street / postalCode               // ← opcionales
social.facebook / instagram / googleBusiness
```

Cambiarlos ahí se propaga solo a: botón flotante de WhatsApp, los CTAs de cada sección, el footer, la página de contacto, el JSON-LD `MedicalBusiness`, `llms.txt` y los 32 archivos Markdown. **No hay ningún otro lugar donde estén escritos.**

### Información que conviene pedir al cliente

No bloquea el lanzamiento, pero cada una mueve el ranking:

| Dato | Por qué importa |
|---|---|
| Nombre y **cédula profesional** del médico responsable | Google trata la salud como contenido YMYL y prioriza autoría verificable |
| Enlace al **Google Business Profile** | Va en `sameAs` del JSON-LD y es el activo #1 de SEO local |
| Testimonios o reseñas reales | Habilita schema `AggregateRating` |
| Fotos del equipo real | Hoy todas las fotos son stock de Freepik |
| Precio de la consulta | *"cuánto cuesta un médico a domicilio Guadalajara"* tiene volumen real, y las AI Overviews citan mucho más las páginas con cifras concretas |

---

## Comandos

```bash
pnpm install
pnpm dev            # desarrollo en localhost:3000
pnpm build          # imágenes → next build → markdown para LLMs, todo a out/
pnpm serve          # sirve out/ en localhost:3000 para QA del build real
pnpm typecheck
pnpm build:images   # solo re-procesa source-images/ → public/img/
pnpm build:llms     # solo regenera llms.txt y los .md (requiere out/ existente)
```

---

## Estructura

```
content/          ← FUENTE ÚNICA DE VERDAD. Todo el copy vive aquí.
  site.ts           datos de contacto y cobertura   ⚠️ el archivo a editar
  services.ts       los 11 servicios, ES + EN
  pages.ts          rutas y metadatos de las 5 páginas estáticas
  about.ts          misión, visión, 6 valores
  coverage.ts       municipios y colonias
  faq.ts            preguntas generales
  home.ts           copy de la portada
  ui.ts             strings de interfaz (botones, menú, etiquetas)

lib/              urls · metadata · jsonld
components/       chrome del sitio + components/pages/ con el cuerpo de cada página
app/[lang]/       shells de ruta, uno por idioma (ver abajo)
scripts/          build-images.mjs · build-llms.ts
source-images/    originales sin optimizar (no se publican)
design.md         sistema de diseño — leerlo antes de tocar estilos
```

### Por qué hay carpetas duplicadas por idioma

`app/[lang]/servicios/` y `app/[lang]/services/` existen ambas, y cada una declara en `generateStaticParams()` un solo locale. Así los slugs quedan localizados de verdad (`/en/services/`, nunca `/en/servicios/`) sin un catch-all que degenere en un `switch`. Cada archivo de ruta son ~20 líneas; el contenido real está en `components/pages/`.

---

## Cómo agregar un servicio

1. Añade la foto a `source-images/services/<id>.jpg`.
2. Agrega un objeto al array `SERVICES` de `content/services.ts` con su `id` estable, `order`, `image: '/img/services/<id>'`, y los bloques `es` y `en` completos.
3. `pnpm build`.

Eso es todo. La página, la tarjeta del índice, el footer, el sitemap, el hreflang, el JSON-LD y el Markdown para LLMs se generan solos.

---

## Despliegue en Netlify

1. Sube el repo a GitHub y crea el sitio en Netlify apuntando a ese repo.
2. Netlify lee `netlify.toml`: `command = "pnpm run build"`, `publish = "out"`.
3. Apunta `medicalhomegdl.com` (apex) y redirige `www` al apex.
4. Verifica la propiedad de dominio en Google Search Console (registro DNS TXT) y envía `https://medicalhomegdl.com/sitemap.xml`.

### Si el build falla en Netlify

Netlify autodetecta Next.js e instala su runtime, que a veces pisa el publish directory (`"Your publish directory does not contain expected Next.js build output"`). Con `output: 'export'` no se necesita: desactiva el **Next.js Runtime** en *Site configuration → Build & deploy*.

### Detección de idioma — solo se puede probar desplegado

`public/_redirects` negocia el idioma en el CDN. **`netlify dev` no evalúa las condiciones `Language`**, así que esto solo se verifica contra un deploy preview o producción:

```bash
curl -sI https://medicalhomegdl.com/ -H "Accept-Language: en-US,en;q=0.9" | grep -i location   # → /en/
curl -sI https://medicalhomegdl.com/ -H "Accept-Language: es-MX,es;q=0.9" | grep -i location   # → /es/
curl -sI https://medicalhomegdl.com/                                      | grep -i location   # → /es/ (fallback)
curl -sI https://medicalhomegdl.com/ -H "Cookie: nf_lang=en"              | grep -i location   # → /en/
```

La cookie `nf_lang` la escribe el selector de idioma y tiene prioridad sobre `Accept-Language`: quien elige inglés desde un navegador en español aterriza en `/en/` la próxima vez.

Después del primer deploy con HTTPS funcionando en apex y www, descomenta el header `Strict-Transport-Security` en `netlify.toml`.

---

## Decisiones que parecen raras y no lo son

- **`output: 'export'` y `<a>` en vez de `<Link>`.** El requisito es que no sea una SPA: cada navegación es una carga de página real y cada URL es un `.html` en el CDN.
- **Sin `next/image` optimizado, pero tampoco `unoptimized: true`.** Ese flag elimina el `srcset` en silencio y manda el hero de 1920 px al móvil. Se usa un loader custom (`image-loader.ts`) que conserva `srcset`, `sizes`, lazy loading y CLS 0.
- **WebP y no AVIF.** Un `srcset` solo admite un formato. Negociar AVIF obligaría a `<picture>` y a perder todo lo anterior, por ~15% de bytes.
- **`export const dynamic = 'force-static'` en `sitemap.ts` y `robots.ts`.** Sin esa línea el build revienta con `output: 'export'`.
- **`onlyBuiltDependencies` en `package.json`.** pnpm 10 bloquea los postinstall; sin eso `sharp` se instala sin binario nativo en el CI de Netlify.
- **Solo 3 superficies de cristal esmerilado.** `backdrop-filter` cuesta 10–30 ms por frame en Android de gama media. Ver `design.md` §5.
- **Los blobs azules son `radial-gradient`, no `filter: blur()`.** Mismo resultado visual, costo de render cero.

---

## Capa para LLMs (GEO)

Generada por `scripts/build-llms.ts` desde el mismo `content/` que renderiza el HTML, así que no se puede desincronizar:

- `/llms.txt` — índice en formato [llmstxt.org](https://llmstxt.org) con los datos duros y las 32 URLs
- `/llms-full.txt` — todo el sitio en Markdown, en ambos idiomas, en un solo request
- `/es/servicios/<slug>.md` — gemelo Markdown de cada página, anunciado en el `<head>` con `<link rel="alternate" type="text/markdown">`

`robots.txt` permite explícitamente a GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended y compañía. Es deliberado: el objetivo es que citen a Medical Home.
