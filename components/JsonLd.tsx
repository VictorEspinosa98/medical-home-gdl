/**
 * Inyecta datos estructurados. Server Component: el JSON se serializa en
 * build y no viaja ningun JavaScript al cliente.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const graph = Array.isArray(data) ? data : [data]
  return (
    <>
      {graph.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // El contenido proviene de content/, no de entrada de usuario.
          // Escapamos "<" por si un texto llegara a contener "</script>".
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\u003c'),
          }}
        />
      ))}
    </>
  )
}
