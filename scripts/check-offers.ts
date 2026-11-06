// Falla si un precio publicado en JSON-LD no coincide con el vigente:
// el precio anterior ("Antes") no debe llegar nunca al Offer.
//   pnpm check:offers

import assert from 'node:assert/strict'
import { PROMOS } from '../content/promos'
import { promoOfferSchema } from '../lib/jsonld'

const offerFor = (title: string) => {
  const promo = PROMOS.es.find((p) => p.title === title)
  assert.ok(promo, `Promo no encontrada: ${title}`)
  return promoOfferSchema(promo, 'es', 'https://example.com') as Record<string, unknown> | null
}

assert.equal(offerFor('Sueros IV a domicilio')?.price, 2200)
assert.equal(offerFor('Consulta médica en línea')?.price, 450)
assert.equal(offerFor('Prueba rápida de VSR 4 en 1')?.price, 950)
assert.equal(offerFor('Paquete prenupcial para la pareja')?.price, 2950)
assert.equal(offerFor('Medicina interna'), null)

const firstVisit = offerFor('Primera consulta médica en casa')
assert.equal(firstVisit?.price, undefined)
assert.deepEqual((firstVisit?.priceSpecification as { minPrice: number }).minPrice, 850)

for (const lang of ['es', 'en'] as const) {
  assert.equal(PROMOS[lang].length, 9, `${lang}: deben ser 9 promociones`)
}

console.log('✓ precios de ofertas correctos')
