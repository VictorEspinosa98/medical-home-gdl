import type { MetadataRoute } from 'next'
import { SITE } from '@/content/site'

// OBLIGATORIO con output:'export' — mismo motivo que en sitemap.ts.
export const dynamic = 'force-static'

/**
 * Los crawlers de IA se permiten explícitamente. No es un descuido: el
 * objetivo del proyecto es que ChatGPT, Perplexity y las AI Overviews citen
 * a Medical Home cuando alguien pregunta por un médico a domicilio en
 * Guadalajara. Bloquearlos sería renunciar a ese canal.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Bingbot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
