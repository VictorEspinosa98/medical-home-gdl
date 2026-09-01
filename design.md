# Medical Home Gdl — Sistema de Diseño

> Documento fuente. Todo componente, página y estilo del sitio se implementa contra este archivo.
> Si el código contradice este documento, o el documento gana o el documento se actualiza — nunca se dejan divergir.

---

## 1. Dirección visual: "Clínico luminoso"

Un único criterio para toda decisión visual: **minimalismo médico con una capa de luz tecnológica.**

| Es | No es |
|---|---|
| Blanco, aire, calma clínica | Fondos oscuros tipo dashboard |
| Luz azul como atmósfera | Degradados morados de SaaS |
| Una foto que pesa | Pilas de tarjetas equivalentes |
| Tipografía grande y tranquila | Texto denso de folleto |
| Cristal esmerilado en 3 lugares | Glassmorphism en todo |

**Lo que el usuario debe recordar:** *un médico llega a mi casa en menos de una hora, a cualquier hora.*

**Emoción objetivo: alivio.** El visitante suele llegar asustado o apurado — tiene a un familiar mal, o está enfermo fuera de su país. El diseño debe bajar pulsaciones, no subirlas. Por eso: nada de rojos de urgencia, nada de contadores, nada de pop-ups.

### La regla de las tres capas

Cada pantalla se compone en exactamente tres capas de profundidad. No hay una cuarta.

```
capa 0  ·  fondo blanco/niebla + blobs radiales azules (decorativo, pointer-events:none)
capa 1  ·  contenido: tipografía, fotos, tarjetas sólidas
capa 2  ·  cristal esmerilado: SOLO badge 24/7, navbar en scroll, tarjeta de contacto
```

---

## 2. Color

### Tokens

| Token | Hex | Rol | Prohibido |
|---|---|---|---|
| `--color-glow` | `#0cbdff` | Luz: blobs, gradientes, bordes de cristal, `::selection` | **Nunca como color de texto. Nunca como fondo de botón.** |
| `--color-brand` | `#289DD1` | Botones, links, iconos, acentos sólidos | Como texto sobre blanco por debajo de 18px |
| `--color-deep` | `#365B6D` | Títulos y texto principal | — |
| `--color-ink` | `#1D4355` | Footer, overlays sobre foto, texto máximo | — |
| `--color-mist` | `#C9E6F3` | Fondos suaves, chips, separadores | Como texto |
| `--color-neutral` | `#777777` | Párrafos secundarios, metadatos | Como texto de cuerpo principal |
| `--color-surface` | `#FFFFFF` | Superficie base | — |
| `--color-haze` | `#F4FAFD` | Fondo de sección alterna | — |

`--color-brand`, `--color-deep` y `--color-ink` salen de un análisis pixel a pixel del logo real (`#289DD1` = 79% del isotipo, `#365B6D` = 74.8% del wordmark). El logo nunca desentona porque el sitio usa literalmente sus colores.

### Contraste — verificado, no asumido

| Combinación | Ratio | Veredicto |
|---|---|---|
| `#1D4355` sobre blanco | **10.9:1** | Texto de cuerpo |
| `#365B6D` sobre blanco | **7.4:1** | Títulos y cuerpo |
| `#777777` sobre blanco | **4.5:1** | Justo en el mínimo AA — solo texto secundario, nunca por debajo de 16px |
| Blanco sobre `#289DD1` | **3.4:1** | Solo texto grande (18.66px bold o 24px regular). Es el caso de todos los CTAs |
| `#0cbdff` sobre blanco | **1.9:1** | **Falla AA. Decorativo únicamente.** |
| Blanco sobre `#1D4355` | **10.9:1** | Footer |

**Regla dura:** si `#0cbdff` aparece en una propiedad `color:` de texto, es un bug.

### Blobs de luz (capa 0)

```css
.blob {
  position: absolute;
  pointer-events: none;
  background: radial-gradient(circle closest-side,
              color-mix(in oklab, var(--color-glow) 38%, transparent), transparent);
  /* SIN filter: blur() — un radial-gradient ya es suave y cuesta 0 */
}
```

**Nunca `filter: blur(120px)` sobre un div grande.** Fuerza una capa de compositing enorme y destroza el INP en Android de gama media. El `radial-gradient` da el mismo resultado visual con costo cero de render.

Máximo **2 blobs por sección**, siempre en capa 0, siempre `aria-hidden`.

---

## 3. Tipografía

| Rol | Fuente | Pesos | Razón |
|---|---|---|---|
| Display / títulos | **Sora** | 600, 700 | Grotesca geométrica, emparenta con el wordmark del logo y aporta el aire técnico |
| Cuerpo / UI | **Inter** | 400, 500, 600 | Máxima legibilidad a 17px; el público incluye adultos mayores |

Self-hosted vía `next/font/google` (se descarga en build y se sirve desde nuestro dominio) con `display: swap` y **solo el subset `latin`**: su unicode-range `U+0000-00FF` ya cubre la ñ y todas las vocales acentuadas del español. Añadir `latin-ext` sumaba dos woff2 precargados que ninguna página usa. Cero request a terceros, cero CLS.

### Escala fluida, ratio 1.25

```css
--text-display: clamp(2.5rem,  5.5vw, 4.25rem);  /* h1 del hero */
--text-h1:      clamp(2rem,    4vw,   3rem);
--text-h2:      clamp(1.5rem,  2.6vw, 2.125rem);
--text-h3:      clamp(1.25rem, 1.8vw, 1.5rem);
--text-body:    1.0625rem;  /* 17px — deliberadamente mayor que el default */
--text-sm:      0.9375rem;  /* 15px — mínimo absoluto del sitio */
```

**Nada baja de 15px.** Un sitio médico que obliga a hacer zoom ya perdió.

### Reglas de texto

- Medida de lectura: 65–72 caracteres (`max-width: 68ch`).
- `line-height`: 1.65 en cuerpo, 1.1 en display, 1.25 en h2/h3.
- `text-wrap: balance` en títulos, `text-wrap: pretty` en párrafos — evita viudas.
- Un solo `<h1>` por página, y contiene la keyword objetivo.

---

## 4. Espaciado y layout

Ritmo base 4px. Espaciado vertical de sección: `clamp(4rem, 9vw, 8rem)`.

```
--container:   1200px   /* contenido general */
--container-l: 1360px   /* hero y bandas de imagen */
--measure:     68ch     /* bloques de texto largo */
```

**Composición asimétrica a propósito.** La rejilla base es de 12 columnas, pero los bloques de contenido usan 7/5 o 5/7 en vez de 6/6, y las imágenes sangran fuera del contenedor en desktop. La simetría se reserva para la rejilla de servicios, donde sí es lo correcto.

---

## 5. Superficies

### Tarjeta sólida — el 90% de los casos

```css
background: #fff;
border: 1px solid color-mix(in oklab, var(--color-mist) 70%, transparent);
border-radius: 20px;
box-shadow: 0 1px 2px rgb(29 67 85 / .04), 0 8px 24px -16px rgb(29 67 85 / .18);
```

Hover: `border-color` a `--color-brand` al 40%, `translateY(-2px)`, sombra un punto más profunda. 180ms.

### Cristal esmerilado (`.glass`) — capa 2, solo 3 usos

```css
.glass {
  background: color-mix(in srgb, #fff 62%, transparent);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid color-mix(in srgb, var(--color-glow) 22%, transparent);
  box-shadow: 0 8px 32px -12px color-mix(in srgb, var(--color-ink) 24%, transparent);
}
@supports not (backdrop-filter: blur(1px)) { .glass { background: #fff; } }
@media (prefers-reduced-transparency: reduce) {
  .glass { background: #fff; backdrop-filter: none; }
}
```

**Los únicos tres lugares permitidos:**

1. Badge "Disponible 24/7" del hero
2. Tarjeta de contacto flotante sobre foto
3. Navbar cuando la página está scrolleada

**La restricción no es estética sino de rendimiento.** `backdrop-filter` cuesta 10–30 ms por frame en Android de gama media. Nunca se aplica a un elemento que scrollee o se anime. Máximo 3 superficies de cristal simultáneas en pantalla.

### Hairline de gradiente

Borde superior de 1px en tarjetas destacadas, vía `::before`:
`linear-gradient(90deg, transparent, var(--color-glow), transparent)`.

---

## 6. Componentes

| Componente | Tipo | Notas |
|---|---|---|
| `Header` / `Nav` | Server | Menú móvil con `<details>`/`<summary>` nativo — **cero JS** |
| `LanguageSwitcher` | **Client** | `<a href>` real a la URL equivalente; el JS solo escribe la cookie `nf_lang` |
| `WhatsAppCta` | Server | `<a href="https://wa.me/...?text=...">` con mensaje contextual por sección |
| `FloatingWhatsApp` | Server | Fijo abajo-derecha, `env(safe-area-inset-bottom)`, 56×56px |
| `Img` | Server | `next/image` + loader custom, `srcset` WebP automático |
| `GlassPanel` | Server | Encapsula `.glass` con su fallback |
| `Blob` | Server | Decorativo `aria-hidden` de capa 0 |
| `ServiceCard` | Server | Foto + nombre + beneficio en una línea + flecha |
| `JsonLd` | Server | `<script type="application/ld+json">` |
| `Reveal` | **Client** | `IntersectionObserver`, ~15 líneas, se degrada a visible sin JS |

**Presupuesto de Client Components: 2** (`LanguageSwitcher`, `Reveal`). Un tercero necesita justificación explícita.

### Botones

| Variante | Fondo | Texto | Uso |
|---|---|---|---|
| Primario | `--color-brand` | Blanco, 600, mínimo 17px | WhatsApp — **un solo primario por pantalla** |
| Secundario | Blanco | `--color-deep`, borde `--color-mist` | Llamar, ver servicios |
| Fantasma | Transparente | `--color-brand` | Navegación interna |

Altura mínima 48px, área táctil mínima 44×44px, `border-radius: 999px`.

---

## 7. Movimiento

Presupuesto corto y deliberado. **Tres animaciones en todo el sitio:**

1. **Entrada del hero** — título, subtítulo y CTA escalonados a 60ms. `@keyframes` puro, sin JS.
2. **Fade-up de sección** — `IntersectionObserver`, `translateY(16px)` a 0 más opacidad, 500ms, una sola vez.
3. **Hover** — botones y tarjetas, 180ms `cubic-bezier(.2,.7,.3,1)`.

Nada más. Sin parallax, sin contadores animados, sin carruseles automáticos.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

**Todo elemento animado con `Reveal` es visible por defecto en el CSS.** El JS solo lo oculta justo antes de revelarlo. Así, sin JavaScript, la página se lee completa — requisito duro del proyecto.

---

## 8. Imágenes

- **WebP** en anchos 640 / 1280 / 1920. Sin AVIF: un `srcset` solo admite un formato, y `<picture>` con negociación por `type` obligaría a abandonar `next/image` y perder `srcset`, `sizes`, `lazy` y control de CLS automáticos. WebP tiene ~97% de soporte.
- `width` y `height` **siempre explícitos** — CLS 0.
- Hero: `priority` más `fetchPriority="high"`. Todo lo demás: `loading="lazy"`.
- Tratamiento de marca: overlay `linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--color-ink) 55%, transparent))` cuando hay texto encima, y un tinte `--color-glow` al 8% para que las fotos de stock se sientan de la misma familia.
- `border-radius: 20px` en todas las fotos salvo las de sangrado completo.

---

## 9. Accesibilidad (no negociable)

- Contraste AA verificado — ver §2.
- Todo interactivo alcanzable por teclado, con `:focus-visible` de 2px en `--color-brand` y `outline-offset: 2px`.
- Skip link al contenido principal.
- Jerarquía de encabezados sin saltos.
- `alt` descriptivo en fotos de contenido, `alt=""` más `aria-hidden` en decorativas.
- Los iconos nunca comunican solos: siempre acompañados de texto.
- `lang` correcto en `<html>` según idioma.
- Respeta `prefers-reduced-motion` y `prefers-reduced-transparency`.

**El sitio debe ser legible y navegable con JavaScript desactivado.** Es a la vez requisito de accesibilidad y de SEO/GEO.

---

## 10. Responsive

Mobile-first real: **el tráfico de "médico a domicilio urgente" es 80%+ móvil.**

| Breakpoint | Ancho | Cambio |
|---|---|---|
| base | 360px+ | 1 columna, nav en `<details>`, WhatsApp flotante |
| `sm` | 640px | 2 columnas en la rejilla de servicios |
| `md` | 768px | Nav horizontal, hero a 2 columnas |
| `lg` | 1024px | 3 columnas, sangrado de imágenes |
| `xl` | 1280px | Contenedor completo, composición asimétrica |

Probado a 360 / 768 / 1024 / 1440 / 1920. **Cero scroll horizontal en cualquiera.**

---

## 11. Voz y copy

Escrito para alguien asustado o con prisa, no para alguien navegando.

- **Nivel de lectura 6º de primaria.** Frases de 20 palabras máximo.
- **Sin jerga.** "Canalización" se convierte en *"te colocamos la vía para el suero"*.
- **Beneficio antes que servicio.** No *"Toma de estudios de laboratorio"* sino *"Tus análisis sin salir de casa, resultados el mismo día por WhatsApp"*.
- **Un solo CTA por bloque**, siempre el mismo verbo.
- **El SLA de menos de 1 hora es el activo número 1.** Va en el hero, en cada página de servicio y en el JSON-LD.
- **El inglés traduce intención, no palabras.** El público extranjero en Guadalajara son expats, turistas médicos y nómadas digitales: necesitan leer *"English-speaking doctor at your hotel or Airbnb in under an hour"*. Ese ángulo no existe en español y se escribe aparte.
- **Sin promesas clínicas.** Nunca "curamos", "garantizamos resultados" ni diagnósticos. Es contenido YMYL: Google lo penaliza y además es incorrecto.

---

## 12. Quality gate

Antes de dar por terminada cualquier pantalla:

- [ ] Tiene un punto de vista visual claro, no parece plantilla genérica
- [ ] `#0cbdff` no aparece en ninguna propiedad `color:` de texto
- [ ] Máximo 3 superficies `.glass` en pantalla
- [ ] Un solo botón primario por vista
- [ ] Legible y navegable con JS desactivado
- [ ] Cero scroll horizontal a 360px
- [ ] Todas las imágenes con `width` y `height` — CLS 0
- [ ] Recorrido completo por teclado con foco visible
- [ ] `prefers-reduced-motion` respetado
