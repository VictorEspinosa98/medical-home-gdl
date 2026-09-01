'use client'

import { useEffect, useRef } from 'react'

/** Si el observer no se dispara en este tiempo, el contenido se muestra igual. */
const SAFETY_MS = 1500

/**
 * Fade-up al entrar en viewport.
 *
 * Reglas de seguridad, porque este componente puede dejar contenido invisible:
 *
 * 1. Se degrada a visible. El HTML sale sin `data-reveal`, así que sin
 *    JavaScript la página se lee completa — requisito duro del proyecto.
 * 2. Lo que ya está en pantalla al montar NO se oculta. Animar el contenido
 *    visible provoca un parpadeo y no aporta nada.
 * 3. Red de seguridad por tiempo. Si el IntersectionObserver no dispara
 *    (pestaña en segundo plano, motor de captura, navegador raro), el
 *    contenido aparece igualmente a los 1.5 s.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => {
      el.dataset.reveal = 'in'
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    // Ya visible al montar: se queda como está.
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.dataset.reveal = 'pending'
    el.style.transitionDelay = `${delay}ms`

    const safety = window.setTimeout(show, SAFETY_MS + delay)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        show()
        io.disconnect()
        window.clearTimeout(safety)
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      window.clearTimeout(safety)
    }
  }, [delay])

  return (
    <div ref={ref} className={`h-full ${className}`}>
      {children}
    </div>
  )
}
