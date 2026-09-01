import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Export estático puro: un .html real por ruta en out/.
  // Es el requisito duro del proyecto — nada de SPA.
  output: 'export',

  // Emite una carpeta con index.html por ruta. Elimina la ambigüedad
  // /x vs /x/ entre hosts y hace que canonical, sitemap y disco coincidan.
  trailingSlash: true,

  // Con output:'export' el optimizador de imágenes de Next no corre.
  // 'unoptimized: true' sería lo obvio y es un error: elimina el srcset
  // en silencio y manda el hero de 1920px al móvil.
  // Un loader custom conserva srcset/sizes/lazy/priority y CLS 0.
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
    // Deben coincidir con WIDTHS de scripts/build-images.mjs. Si no, next
    // genera entradas de srcset duplicadas apuntando al mismo archivo.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [256, 384],
  },

  // La hoja de estilos son 9 KB que bloqueaban el render: en 4G ese ida y
  // vuelta costaba ~450 ms de FCP. Inline en el <head> lo elimina. El sitio
  // son 32 paginas estaticas de una sola visita, asi que perder la cache
  // compartida del .css no cuesta nada.
  experimental: {
    inlineCss: true,
  },
}

export default nextConfig
