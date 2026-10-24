# MEMORY.md — Portfolio de Cristian Antón Valdés
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- Fase 1 (esqueleto navegable) hecha: páginas `proyectos`/`sobre-mi`/`metodo` aún con esqueleto básico y `[PENDIENTE]`; componentes compartidos (Header, Nav, Footer, ThemeToggle, ProjectCard, SectionHeading).
- Astro 7 (plantilla `minimal`), TypeScript strict, sin frameworks de UI ni librerías CSS.
- Tema oscuro por defecto / claro opcional, persistente en `localStorage`, aplicado antes de pintar (sin parpadeo).
- Foto y CV reales ya enganchados: `public/images/foto-cristian.png` y `public/cv.pdf`.
- `specs/001-rediseno-index` **implementada y cerrada** (T1–T10): hero con foto a la derecha en escritorio, marco HUD, cursor parpadeante, grid de proyectos fijo 1/2/4 columnas, URLs reales de GH/IN en `src/data/perfil.ts`.
- `specs/002-trayectoria` **implementada y cerrada** (T1–T10): página `trayectoria` con los 3 puestos del CV (Patrón/Socorrista, Conductor de ambulancia, Soldado-Operaciones Especiales) en orden cronológico inverso, metadatos (rol/misiones ISAF 2011-2012/Medalla ISAF) solo en Operaciones Especiales, 6 funciones transferibles con numeración visual continua "RF-1" a "RF-6" y frase de cierre sobre el método SDD. `src/data/experiencia.ts` ahora tiene `trayectoria: Puesto[]` como fuente única, de la que se deriva `experiencia` (consumido sin cambios por `index.astro`). Ya no queda `[PENDIENTE]` en `trayectoria.astro`.
- `specs/003-sobre-mi` **implementada y cerrada** (T1–T10): página `sobre-mi` con guion de consola, 2 filas en zigzag (historia+foto / aficiones-viajes+foto, técnica `order` igual que el hero) y bloque de cierre con CTA, reutilizando `perfil.ts` (campos nuevos `idiomas`/`interesSectorial`). Fotos reales en `public/images/foto-cristian-sobre-mi.jpg` y `foto-cristian-moto.jpg`, marco cuadrado con esquina de acento + halo difuso (no el marco circular del hero). `sobreMi.historia` se recorre con `.map` (no por índice fijo: un bug real hizo que un 3er párrafo del usuario no se pintara hasta corregirlo) y el enlace a `/trayectoria` es una línea fija, desacoplada del texto. La formación (`sobreMi.formacion`) ya no se pinta en la página (dato sigue en `sobreMi.ts`, sin usar). Texto justificado en `.sobre-mi__texto p`. Ya no queda `[PENDIENTE]` en `sobre-mi.astro`.
- **Curvas de nivel en todos los `.card`** (cambio posterior a 001-003): el fondo decorativo vive en `.card::before`, visible en cualquier contenedor `.card` del sitio (hero, cabeceras de página, tarjetas de proyecto, caja de "cómo desarrollo", cierre de sobre-mí) sin tocar el marcado de cada página. Tras 2 intentos generados por código (líneas onduladas, luego anillos concéntricos) descartados por el usuario, la versión final usa 2 imágenes reales aportadas por él: `public/images/topografia-oscuro.webp`/`topografia-claro.webp`, referenciadas vía `background-image: var(--patron-topografia)`, variable definida en `:root`/`:root[data-theme="light"]` (mismo patrón que los colores) para que cambien solas con el tema.

## Aprendizajes y errores a evitar
- No dar por supuesto que una plantilla o carpeta pegada de otro proyecto encaja sin revisarla.
- El `<img>` del avatar no lleva atributos `width`/`height` HTML: combinados con el `width` por CSS, anulaban el `aspect-ratio: 1/1`.
- Grid con `auto-fill`/`minmax()` puede dar un número de columnas no deseado; usar `repeat(N, 1fr)` explícito por breakpoint.
- Si una spec aprobada no refleja un diseño ya implementado y validado visualmente, se corrige la spec, no el código; se documenta en `docs/decisiones.md`, nunca se reescribe el histórico.
- Numeración visual secuencial en plantillas: calcularla antes de pintar con una función pura (`numerarFunciones`), no con un contador mutable dentro de un `.map` de marcado.
- Verificar que las herramientas MCP necesarias (p. ej. chrome-devtools) están en el `tools:` del subagente antes de pedirle revisión visual; si falta, añadirla a la configuración en vez de dejar que improvise una alternativa.

## Decisiones (y por qué)
- Sitio 100% estático: verificación con `astro check` + `astro build` + revisión visual (MCP de Chrome DevTools), sin test runner de Node (constitución, principio 4).
- Contenido separado del marcado en `src/data/*.ts`; arrays derivados (`.map`) en vez de duplicar literales cuando dos vistas comparten datos (p. ej. `experiencia` desde `trayectoria`).
- Tipos de unión (`number | "vigente"`) en vez de pares booleano+opcional, para hacer irrepresentables los estados imposibles.
- Bloques de contenido nuevos con clases propias cuando el usuario pide explícitamente no reutilizar un patrón visual existente (`.card`, `.feature-list`); no forzar la reutilización por economía de CSS si contradice lo pedido.
- Detalle completo de cada decisión técnica, con alternativa descartada: `docs/decisiones.md` (histórico fase 1 + spec 001 D1–D6 + spec 002 D1–D7 + spec 003 D1–D8, más los hallazgos de T9/002 sobre `&nbsp;`, de T4/T5/002 sobre el MCP de chrome-devtools, de 003 sobre "MTB"→"moto de enduro", y el bug de `historia[0]`/`historia[1]` por índice fijo).
- Pintar listas de contenido editable por el usuario (`src/data/*.ts`) siempre con `.map`, nunca por índice fijo aunque la spec prevea un número exacto de elementos: un array con más elementos de los previstos no da error de tipos, solo deja de pintarse lo que sobra.

## Próximos pasos
- Escribir el contenido real de `proyectos` y `metodo` (ahora `[PENDIENTE]`).
- Repos de proyectos individuales siguen `[PENDIENTE]` (solo se resolvieron GH/IN del perfil).
