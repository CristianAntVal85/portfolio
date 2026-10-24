# Decisiones técnicas — fase 1 (esqueleto)

Registro de las decisiones tomadas al construir el esqueleto navegable a partir de `docs/first-prompt-portfolio.md` y `docs/bodeto-index.png`.

## Base del proyecto

- **Astro 7, plantilla `minimal`**, instalado con `npm create astro@latest`. Es la última versión estable disponible en el momento de crear el proyecto.
- **TypeScript en modo `strict`** (config `astro/tsconfigs/strict`, generada por el propio scaffold): ayuda a detectar errores de tipos en los datos (`src/data`) y las props de los componentes sin añadir herramientas externas.
- Sin frameworks de interfaz ni librerías CSS, tal y como pide la especificación: todo el marcado es `.astro` y el estilo es CSS propio con variables.

## Tipografía

- Pila de fuentes **monoespaciadas del sistema** (`ui-monospace`, `SFMono-Regular`, `Menlo`, `Consolas`, etc.) en lugar de cargar una fuente externa (p. ej. Google Fonts). Motivo: cero peticiones de red adicionales, cero parpadeo por carga de fuente, y el boceto no especifica una tipografía concreta.

## Tema claro/oscuro

- Variables de color en `:root` (oscuro, por defecto) y sobrescritas bajo `:root[data-theme="light"]`.
- El tema se aplica con un `<script is:inline>` **bloqueante en el `<head>`**, antes de pintar el `<body>`, para evitar parpadeo (FOUC). Lee `localStorage`; si no hay valor guardado, usa oscuro por defecto (tal y como pide la especificación, no la preferencia del sistema).
- El botón de `ThemeToggle` alterna `data-theme` en `<html>` y guarda la preferencia en `localStorage` para que se recuerde entre visitas.

## Navegación en móvil

- El boceto solo muestra la cabecera en escritorio. Para no añadir una funcionalidad que no está en el boceto (p. ej. un menú de hamburguesa), en mobile la cabecera pasa a dos filas mediante `flex-wrap`: marca + selector de tema arriba, enlaces de navegación debajo. Todos los enlaces siguen siendo visibles e iguales en todos los tamaños, solo cambia la disposición.

## Datos separados del marcado

- `src/data/proyectos.ts`, `src/data/experiencia.ts` y `src/data/perfil.ts` contienen el contenido textual (proyectos, experiencia, perfil, principios, soft skills). Las páginas y componentes solo iteran sobre estos datos, para poder editar el contenido sin tocar el marcado.

## Contenido pendiente o no proporcionado

Marcado como `[PENDIENTE]` en el código y/o en esta lista, para que se revise:

- **Enlaces GH / IN**: no se han indicado URLs reales de GitHub/LinkedIn; los botones apuntan a `#` (`perfil.github` / `perfil.linkedin` en `src/data/perfil.ts`).
- **Enlaces "código →" de cada proyecto**: no se han indicado repositorios reales; apuntan a `#` (`href` en `src/data/proyectos.ts`).
- **Stack de "Asistente RAG", "Agente supervisado" y "[PROYECTO 4]"**: el boceto los deja como `[STACK]`; se ha mantenido como `[PENDIENTE]`.
- **"[PROYECTO 4]"**: el boceto lo marca como "Hueco opcional"; se ha dejado tal cual, sin inventar un cuarto proyecto.
- **Contenido de `/proyectos`, `/sobre-mi`, `/trayectoria` y `/metodo`**: solo tienen título y un párrafo `[PENDIENTE]`, tal y como pide la tarea (fase 1 es solo el esqueleto).

## Diferencia intencionada respecto al boceto

- La tarjeta **"Este portfolio"** muestra en el boceto el stack `HTML · CSS · JS · Vite`, pero las restricciones de esta fase piden explícitamente Astro. Se ha cambiado el texto a `Astro · CSS` para que sea una afirmación verídica sobre este mismo proyecto, en vez de copiar literalmente un dato incorrecto del boceto. Queda señalado también en el resumen final para que se revise.

## Foto del hero y CV (añadidos después de la fase 1)

- `docs/foto-cristian.png` (349×349) y el CV real se movieron a `public/` siguiendo la estructura ya documentada (`/public — imágenes, cv.pdf y favicon`): `public/images/foto-cristian.png` y `public/cv.pdf`. `src/data/perfil.ts` referencia ambos (`perfil.foto`, `perfil.cv`); ya no están marcados `[PENDIENTE]`.
- Error encontrado y corregido: el `<img>` del avatar llevaba los atributos HTML `width="349" height="349"`. Un alto fijado por atributo HTML, combinado con un ancho fijado por CSS, anula el `aspect-ratio: 1/1` de `.hero__avatar` (ambas dimensiones quedan "definidas" y la propiedad deja de tener efecto), lo que deformaba el círculo en una cápsula vertical. Se quitaron esos atributos; el `aspect-ratio` en CSS ya reserva el espacio.

# Decisiones técnicas — spec 001 (rediseño del hero y la cuadrícula de proyectos)

Registro de las decisiones de diseño tomadas al implementar `specs/001-rediseno-index/` (plan.md, tareas T1–T10). Detalle completo de cada una, con su alternativa descartada, en `specs/001-rediseno-index/plan.md`; aquí queda el resumen permanente.

## D1 — Diámetro de la foto con `clamp()` + stretch de grid, no con JavaScript

`.hero__photo-frame` usa `height: clamp(16rem, 100%, 20rem)` apoyado en `align-items: stretch` del grid del hero, en vez de medir la altura real del bloque de texto con `ResizeObserver`/JS y fijar el diámetro en píxeles. Motivo: AGENTS.md limita el JS de navegador a "donde haga falta" (hoy solo el cambio de tema); una medición puramente cosmética no lo justifica, añade riesgo de layout shift en la carga y una dependencia de ejecución en cliente que `clamp()` + CSS Grid resuelve de forma declarativa.

## D2 — Foto a la derecha con `order` CSS, sin reordenar el HTML

En `@media (min-width: 56rem)`, `.hero__content` pasa a `order: 1` y `.hero__media` a `order: 2`, sin tocar el orden de los `<div>` en `index.astro`. Alternativa descartada: cambiar el orden del marcado (texto antes que foto). Se descarta para minimizar el diff sobre una página ya aprobada en fase 1 y porque el orden de lectura/tabulado (foto, luego texto) no cambia en ningún viewport; `order` acota el cambio visual exactamente al breakpoint donde lo pide RF-1, sin afectar al comportamiento ya validado en móvil (RF-4).

## D3 — Columnas de proyectos con `repeat(N, 1fr)` fijo por breakpoint, no `auto-fill`/`minmax()`

`.projects-grid` pasa de `grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr))` a conteos explícitos (`1fr`, luego `repeat(2, 1fr)` desde 40rem, luego `repeat(4, 1fr)` desde 64rem). Alternativa descartada: ajustar el `minmax()` del `auto-fill` para que "normalmente" no caiga en 3 columnas. Se descarta porque el número de columnas de `auto-fill` depende del ancho del contenedor dividido por el mínimo de la tarjeta, que es precisamente el mecanismo que producía 3 columnas en anchos intermedios (RF-8); con `repeat(N, 1fr)` el número de columnas es una decisión explícita por breakpoint, así que 3 columnas deja de ser posible en cualquier ancho, presente o futuro.

## D4 — Líneas topográficas con `repeating-radial-gradient`, no con SVG inline

El motivo decorativo de `.hero::before` (RF-6) se hace con dos `repeating-radial-gradient` en CSS. Alternativa descartada: un `<svg>` con `<path>` de curvas de nivel irregulares, visualmente más "orgánico". Se descarta porque el gradiente CSS no añade marcado, se tiñe automáticamente con `var(--color-border)` (ya resuelto por tema, sin duplicar el dibujo para claro/oscuro) y basta para el requisito de la spec ("líneas sutiles", no un mapa topográfico realista); un SVG exigiría mantener el contraste manualmente en ambos temas para un elemento puramente decorativo.

## D5 — Marco HUD con `<span>` decorativos, no con imagen/SVG fija

Las 4 esquinas tipo mira (`hero__photo-corner`) son `<span>` vacíos con bordes CSS en `var(--color-accent)`, no una imagen o SVG de marco superpuesto. Motivo: un asset fijo no se adapta automáticamente al diámetro variable de D1 (16–20rem) ni al color de acento por tema sin JS o múltiples variantes; los `<span>` heredan la variable de tema y se posicionan en unidades relativas al propio marco, así que escalan solos con el diámetro.

## D6 — Cursor parpadeante con `@keyframes` CSS y `prefers-reduced-motion`, no con `setInterval` JS

`.hero__cursor` anima su opacidad con `@keyframes parpadeo` y respeta `@media (prefers-reduced-motion: reduce)` de forma nativa. Alternativa descartada: un script que alternara una clase cada 500ms. Se descarta por la misma razón que D1 (JS de navegador solo donde haga falta) y porque CSS ya cubre el requisito de accesibilidad sin lógica adicional.

## Corrección de RF-3 tras la verificación integral (T9)

Al verificar RF-3 en T9 se detectó que la redacción original de la spec ("marco tipo mira/retícula: 4 esquinas, sin un borde circular continuo") no coincidía con el diseño ya implementado en T3/T4 y validado visualmente en T7: el CSS mantiene el anillo circular continuo alrededor de la foto (ya usado en todos los tamaños, también en móvil) y añade las 4 esquinas tipo HUD solo en escritorio, en vez de sustituir el anillo por las esquinas. Se decidió corregir la **spec**, no el código: el anillo + esquinas era el diseño que se había construido y aprobado visualmente, y reescribir el CSS para quitar el anillo habría sido un cambio de diseño no solicitado, en sentido contrario al propio criterio de "coherente con la estética técnica ya presente en la foto" que pedía la spec. El rol `reviewer` confirmó que la redacción corregida de RF-3 ("el anillo circular continuo... combinado con 4 esquinas... en las 4 puntas diagonales") coincide con el CSS real y no introduce incoherencias con RF-2, RF-4 ni RF-11.

La primera redacción de la corrección decía "puntas cardinales" (N/S/E/O), una imprecisión detectada por `reviewer`: las esquinas están en posiciones diagonales (NE/NO/SE/SO), no cardinales. Se corrigió inmediatamente en `spec.md` a "4 puntas diagonales (superior-izquierda, superior-derecha, inferior-izquierda, inferior-derecha)", que es la redacción vigente.

## Logos reales de GitHub/LinkedIn (cambio posterior al cierre de la spec 001)

Los botones "GH"/"IN" del hero mostraban solo texto, igual que el boceto original (que nunca incluyó logos). A petición explícita del usuario, se sustituyó el texto por los SVG de marca de GitHub y LinkedIn, inline en `src/pages/index.astro` (sin librerías de iconos ni dependencias nuevas, mismo patrón que los iconos de sol/luna del selector de tema), con `aria-label` conservado en el `<a>` y `aria-hidden="true"` en el `<svg>` para accesibilidad. Tamaño fijado en `.btn__icon` (`global.css`), `1.1rem × 1.1rem`, igual en todos los anchos y temas (el SVG hereda `color` vía `currentColor`, ya resuelto por las variables de tema). Cambio pequeño, no se abrió una spec nueva (criterio ya usado antes: cambios que no la merecen se hacen directamente y se documentan aquí).

# Decisiones técnicas — spec 002 (página de trayectoria profesional)

Registro de las decisiones de `specs/002-trayectoria/` (plan.md, tareas T1–T10). Detalle completo de cada una en `specs/002-trayectoria/plan.md`; aquí queda el resumen permanente.

## D1 — `experiencia` derivado de `trayectoria` con `.map`, no dos arrays mantenidos a mano

`src/data/experiencia.ts` expone `trayectoria: Puesto[]` como única fuente, y deriva `experiencia: ExperienciaItem[]` con `.map` para no romper `index.astro`. Alternativa descartada: mantener `experiencia` tal cual estaba y añadir `trayectoria` como array totalmente aparte, repitiendo a mano los mismos años y títulos cortos. Se descarta porque duplicaría literales (p. ej. "2015 – hoy", "Patrón de salvamento") en dos sitios del mismo archivo, violando "sin datos repetidos a mano" (constitución, principio 3) y el propio RF-17 ("única fuente de datos... ampliada").

## D2 — `anioFin: number | "vigente"`, no `{ vigente: boolean; anioFin?: number }`

Se tipó `anioFin` como unión `number | "vigente"`. Alternativa descartada: un campo booleano `vigente` más un `anioFin` opcional. Se descarta porque permite estados imposibles (`vigente: true` con un `anioFin` numérico a la vez, o `vigente: false` sin `anioFin`), que `formatearPeriodo` tendría que validar defensivamente; la unión hace esos estados irrepresentables en el propio tipo.

## D3 — Numeración visual con la función pura `numerarFunciones`, no con un contador mutable en el `.astro`

`numerarFunciones` calcula de antemano la numeración continua ("RF-1" a "RF-6") para los 3 bloques. Alternativa descartada: un `let contador = 0` en el frontmatter de `trayectoria.astro`, incrementado dentro del `.map` de cada puesto mientras se pinta. Se descarta porque mezclaría un efecto secundario dentro de una expresión de marcado, sería más difícil de verificar sin renderizar la página y más frágil si el bloque de un puesto se extrajera en el futuro a un componente reutilizado.

## D4 — Bloque propio sin caja (`.spec-puesto`/`.spec-funcion`), no reutilizar `.card` ni una pestaña de editor

Los 3 bloques de `trayectoria.astro` usan clases nuevas, sin fondo ni borde redondeado, separados por `border-top`, reutilizando solo variables de tema y la tipografía monoespaciada global. Alternativa descartada 1: pintar cada puesto como una `.card` más (como las tarjetas de proyecto). Se descarta porque el usuario pidió explícitamente no reutilizar el tratamiento de tarjeta genérica. Alternativa descartada 2: simular una pestaña de editor con un nombre de archivo falso (`patron-socorrista.spec.ts`) sobre cada bloque. Se descarta porque el usuario fijó una cabecera simple, sin simular una ruta de archivo.

## D5 — Metadatos de Operaciones Especiales como `<dl>` clave/valor, no como prosa narrativa

Rol, misiones y condecoraciones se pintan como lista `clave: valor` (`<dl>`). Alternativa descartada: una frase narrativa que mencione los tres datos seguidos. Se descarta porque mezclaría tres datos verificables en una sola frase, dificultando comprobarlos por separado contra RF-6 a RF-8, y porque el tono "frases cortas, sin prosa narrativa" que la spec exige para las funciones (RF-9) es coherente aplicarlo también aquí.

## D6 — Relación "labor real → equivalente" con `<dt>`/`<dd>`, no con párrafos sueltos

Cada función transferible se pinta como pareja `<dt>` (original) / `<dd>` (traslado) dentro de un `<dl>` por puesto. Alternativa descartada: dos párrafos consecutivos sin relación semántica explícita, apoyándose solo en el orden visual y el símbolo "→". Se descarta porque el caso límite de la spec exige que la relación se entienda con lector de pantalla sin depender de leer "→"; `<dt>`/`<dd>` transmite nativamente una relación término/definición, reforzada con el texto oculto "equivale a".

## D7 — Quitar el `[PENDIENTE]` de `.page-intro` sin añadir texto de introducción nuevo

Se dejó solo `<h1>Trayectoria</h1>` dentro de la misma caja `.page-intro.card` ya existente. Alternativa descartada: redactar una frase de introducción nueva para que la caja no quedara con un único `<h1>`. Se descarta porque esa frase no está en la spec aprobada ni en el encargo, y AGENTS.md prohíbe añadir textos no contemplados sin que el usuario lo pida explícitamente.

## Hallazgo de T9: espacio normal en vez de `&nbsp;` tras la flecha "→"

El pseudocódigo de `plan.md` (sección 3) proponía un `&nbsp;` entre "→" y el primer carácter del traslado, para evitar que la flecha quedara aislada en una línea al partir texto en móvil. En la implementación final quedó un espacio normal (U+0020) en su lugar. Se detectó en la comparación literal de T9 y se decidió dejarlo tal cual, sin ajustarlo, porque T8 ya verificó visualmente a 360 px que no se produce ningún caso real de flecha aislada en una línea separada de ambas frases; forzar el cambio solo para igualar el pseudocódigo del plan no aporta ninguna mejora observable y el plan no es normativo palabra por palabra (solo la spec lo es).

## Hallazgo operativo de T4/T5: MCP de chrome-devtools no disponible al empezar la spec

Durante T4, el subagente `implementer` no tenía disponible el MCP `mcp__chrome-devtools__*` a pesar de que la tarea pedía usarlo para la revisión visual, y tuvo que improvisar una verificación alternativa con un script Python/CDP. El orquestador añadió ese MCP a la configuración de herramientas de `implementer.md` y `reviewer.md` (que antes solo tenían Read/Write/Edit/Bash/Grep/Glob). Desde T5 en adelante el MCP ya estuvo disponible y se usó con normalidad en el resto de la spec (T6, T8).

# Decisiones técnicas — spec 003 (página "Sobre mí")

Registro de las decisiones de `specs/003-sobre-mi/` (spec.md, plan.md, tareas T1–T10). Detalle completo de cada una, con su alternativa descartada, en `specs/003-sobre-mi/plan.md`; aquí queda el resumen permanente.

## D1 — Contenido narrativo en un archivo nuevo `src/data/sobreMi.ts`, no ampliando `perfil.ts` con todo

`perfil.ts` es contenido reutilizado en varias páginas (el hero del index lo consume); cargarlo con un bloque largo de prosa específico de una sola página rompería esa cohesión. Solo pasaron a `perfil.ts` los 2 campos que sí son hechos generales de perfil (`idiomas`, `interesSectorial`), igual que ya conviven ahí `ubicacion`/`disponibilidad`.

## D2 — El bloque de cierre reutiliza `perfil.ubicacion`/`disponibilidad`/`idiomas`/`interesSectorial`/`email`/`cv`, sin copiarlos de nuevo en `sobreMi.ts`

Por "sin datos repetidos a mano" (constitución, principio 3): si cambia la disponibilidad, se corrige una sola vez en `perfil.ts`.

## D3 — Zigzag con la misma técnica `order` del hero (D2 de la spec 001), invirtiendo solo la fila 1

El orden de documento (foto, texto) ya coincide con lo que pide la fila 2 y con el apilado de ambas filas en móvil; solo la fila 1 en escritorio necesita invertirse con el modificador `.sobre-mi__fila--invertida`, sin tocar el HTML.

## D4 — Fotos en marco cuadrado (`aspect-ratio: 1 / 1`), con una esquina de acento y un halo difuso, no el marco circular con 4 esquinas HUD del hero

El marco circular con esquinas es la firma visual específica del retrato de identidad del hero (D5 de la spec 001); clonarlo aquí competiría con él, y RF-15 pide una foto "distinta a la del hero", no solo un archivo distinto con el mismo marco. El usuario pidió explícitamente un tratamiento más elaborado que un recorte plano: se añadió 1 esquina con bracket de `--color-accent` (en el lado del marco más próximo al texto de su fila, invertida junto con `--invertida`) y una sombra difusa con `--color-accent-soft`, reutilizando solo variables ya existentes. El ratio cuadrado (en vez de un recorte más vertical) se eligió tras ver las 2 fotos reales: una vertical de alpinismo y otra casi cuadrada de moto en la duna; un cuadrado recorta razonablemente las dos.

## D5 — Cierre práctico en prosa/lista breve, sin `<dl>` clave:valor

RF-13 prohíbe explícitamente una ficha tipo "config" clave:valor (el bloque que el usuario descartó en la entrevista de la spec, inspirado en un borrador inicial con `ubicacion:`/`stack:` etc.); una prosa corta con `·` transmite el mismo dato sin aspecto de ficha técnica.

## D6 — Reutilizar `.hero__actions` para los botones del cierre, en vez de una clase nueva idéntica

Evita duplicar CSS idéntico (`display:flex; flex-wrap:wrap; gap; margin-top`) sin ninguna diferencia visual que lo justifique.

## D7 — Renombrar las 2 fotos nuevas a kebab-case antes de referenciarlas

`foto_cristian-sobre_mi.jpg` → `foto-cristian-sobre-mi.jpg`, `foto-cristian_moto.jpg` → `foto-cristian-moto.jpg`, para no introducir una inconsistencia de nombres en `public/images/` frente a `foto-cristian.png`.

## D8 — Ningún dato de esta spec se calcula a partir de la fecha del sistema

"Fin previsto en 2027" y "disponible desde marzo de 2027" son literales fijos en los datos, no un cálculo con `Date.now()`; ningún RF pide derivar una fecha del reloj del sistema.

## Hallazgo: "MTB" corregido a "moto de enduro" tras revisar la foto real

La primera entrevista de la spec (antes de redactar `spec.md`) recogió "MTB" como una de las aficiones, a partir del boceto inicial de contenido que trajo el usuario. Al revisar la foto que el usuario añadió para esta fila (`foto-cristian-moto.jpg`), se vio que corresponde a motocross/enduro en el desierto, no a una bicicleta de montaña. Se confirmó con el usuario y se corrigió el dato antes de escribir `sobreMi.ts` (RF-7 exige veracidad: no se mantiene una afición que la propia foto aportada contradice). La misma foto se reutiliza para ilustrar también los viajes en moto, ya que ambos contenidos (aficiones y viajes) comparten la fila 2.

## Texto definitivo de la historia (cierre de la spec) y corrección de un bug de maquetado

El usuario sustituyó el `[PENDIENTE]` de `sobreMi.historia` por su texto real, pero escribió **3 párrafos en vez de los 2 previstos** al redactar la spec (RF-3). La plantilla de `sobre-mi.astro` pintaba la historia por índice fijo (`historia[0]`/`historia[1]`), así que el 3º párrafo no se mostraba: no es un error de tipos (un array de 3 strings sigue siendo `string[]`, válido), es que la plantilla nunca pedía esa posición. Se corrigió a `sobreMi.historia.map(...)`, que admite cualquier número de párrafos, y se desacopló el enlace a `/trayectoria` (RF-6) del texto: en vez de depender de que el último párrafo terminara en una palabra concreta ("...en"), se renderiza siempre como una línea fija aparte ("Más detalle, puesto por puesto, en trayectoria →"), inmune a cómo se redacte la historia en el futuro. Se corrigió también la spec (RF-3: "varios párrafos" en vez de "2 párrafos" exactos), siguiendo el mismo criterio ya usado en la spec 001 (la spec se ajusta a la realidad aprobada, no al revés).

La historia final no menciona el servicio militar ni teje una síntesis explícita de equivalencias con el software; como RF-5 y RF-6 son condicionales ("SI el contenido menciona/se refiere a... ENTONCES"), omitirlo no los incumple. Extensión real de los bloques 1-2: ≈203 palabras, por debajo de las ~300 orientativas del requisito no funcional de extensión; se deja anotado, sin bloquear el cierre de la spec.

Con esto, `sobre-mi.astro` ya no contiene ningún `[PENDIENTE]` y la spec 003 queda **implementada**.

# Curvas de nivel en todos los `.card` y texto justificado en "Sobre mí" (cambio posterior a las specs 001-003)

A petición del usuario, se sustituyó el fondo decorativo del hero (D4 de la spec 001: `repeating-radial-gradient` con círculos concéntricos perfectos) por unas líneas onduladas que leen mejor como curvas de nivel reales, y se generalizó el efecto a **todo contenedor `.card`** (hero, cabeceras de página, tarjetas de proyecto, la caja "cómo desarrollo"/experiencia/soft skills del index y el cierre de "sobre mí"), no solo al hero. Motivo del usuario: las líneas anteriores eran círculos perfectos, poco "orgánicos", y apenas se veían; además pidió que el patrón apareciera en cualquier contenedor más claro que el fondo de la página, no solo en el hero.

- **Implementación**: `.card::before` con `mask-image` (una `<svg>` con 6 trazos ondulados, codificada como data URI) más `background-color: var(--color-border)`. Alternativa descartada: repetir el patrón anterior (`background-image` con gradientes CSS) pero con una forma ondulada en vez de circular. Se descarta porque un degradado no puede dibujar una curva irregular con control de forma; haría falta SVG. Alternativa descartada 2 (la que preveía D4 de la spec 001): `background-image: url(...)` directo con el SVG coloreado a fuego. Se descarta porque el color iría fijo dentro del SVG y no podría adaptarse a `var(--color-border)` por tema (justo el problema que D4 ya había identificado). La solución con `mask-image` resuelve ese problema: el SVG solo aporta la forma (trazos blancos sobre fondo transparente), y el color real lo pone `background-color`, así que se tiñe solo por tema igual que antes, sin mantener una copia del SVG por tema.
- **Generalización a `.card`**: mover el patrón de `.hero::before` a `.card::before` (y `position: relative; isolation: isolate; overflow: hidden;` de `.hero` a `.card`) hace que cualquier página o componente que ya use la clase `.card` reciba el efecto sin tocar su marcado; no hizo falta editar `proyectos.astro`, `metodo.astro`, `trayectoria.astro`, `ProjectCard.astro` ni `index.astro`. Se añadió una regla `.card > * { position: relative; z-index: 1; }` para que el contenido de cualquier tarjeta quede siempre por encima del patrón, sustituyendo la regla equivalente que antes solo cubría `.hero__content`/`.hero__media`.
- **Texto justificado en "sobre mí"**: `.sobre-mi__texto p { text-align: justify; }`, a petición explícita del usuario ("al menos el de sobre-mi"); no se aplicó a otras páginas por no habérselo pedido.
- Verificado visualmente en index, proyectos y sobre-mi, oscuro/claro, 360px y 1280px: sin desbordamiento, patrón legible sin competir con el texto, `astro check`/`astro build` en verde.

## Curvas de nivel: 2 intentos generados por código descartados, versión final con imágenes reales aportadas por el usuario

El patrón ondulado de 6 trazos descrito arriba no convenció al usuario ("madre mía, que desastre de curvas de nivel"). Se intentó una 2ª versión generada por código: 4 grupos de anillos concéntricos irregulares (SVG con curvas Bézier por punto medio, distinto radio por ángulo para romper la regularidad), validada visualmente con una página de prueba antes de aplicarla — tampoco convenció ("tampoco me gusta").

El usuario cambió de enfoque: en vez de seguir generando el patrón por código, diseñó él mismo 2 imágenes reales de topografía (una por tema) y las añadió directamente en `public/images/topografia-oscuro.webp` y `topografia-claro.webp` (1148×756, ya teñidas y con opacidad ajustada a mano para cada tema). Se le facilitaron los colores de `--color-surface`/`--color-border` de ambos temas para que el diseño encajara.

- **Implementación**: `.card::before` pasó de `mask-image` (SVG + `background-color` variable) a `background-image: var(--patron-topografia)` directo, con `--patron-topografia` definida en `:root` (`url("/images/topografia-oscuro.webp")`) y sobrescrita en `:root[data-theme="light"]` (`url("/images/topografia-claro.webp")`) — mismo mecanismo de variable-por-tema que ya usan los colores, así cambia sola al cambiar de tema sin JS adicional. `background-size: cover; background-position: center; background-repeat: no-repeat`, sin `opacity` extra en el `::before` (el contraste ya viene ajustado dentro de cada imagen).
- Se abandona el enfoque "SVG generado + mask" descrito en la sección anterior: con una imagen real no hace falta resolver el teñido por tema vía `mask-image`, el archivo ya viene en el color correcto por tema.
- Las imágenes de referencia usadas para los intentos descartados (`curvas-nivel`, captura de un mapa topográfico de terceros) y los ficheros de previsualización temporales (`public/__preview.html`, `public/images/__preview_pattern.svg`) ya no existen en el repo.
- Verificado visualmente en index y sobre-mi, oscuro/claro, 360px y 1280px: patrón sincronizado con el tema, texto legible, sin desbordamiento; `astro check` (0 errores) y `astro build` en verde.
