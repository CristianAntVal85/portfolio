# Plan 002 — Página de trayectoria profesional

Spec de referencia: `specs/002-trayectoria/spec.md` (estado: aprobada). Este plan no modifica la spec; solo decide el CÓMO. Toda la redacción literal (nombres, años, metadatos, las 6 funciones y la frase de cierre) viene ya fijada en RF-1 a RF-19 de esa spec; este plan no inventa ni reformula ningún texto.

**Aviso de numeración (para no confundir dos cosas distintas):**
- "RF-1" a "RF-19" = los requisitos funcionales reales de `spec.md`, ya escritos ahí, no se tocan.
- "RF-1" a "RF-6" en pantalla = una etiqueta puramente visual/decorativa que la página pinta junto a cada una de las 6 funciones transferibles, numerada de forma continua a lo largo de los 3 bloques (RF-1/RF-2 en Patrón, RF-3/RF-4 en Conductor, RF-5/RF-6 en Operaciones Especiales). Es un recurso estético ("cada puesto es como el contenido de una spec"), sin ninguna relación con la numeración del documento. En este plan, cuando se escribe "RF-n" entre comillas o en contexto de maquetado, se refiere siempre a esta etiqueta visual; las referencias a requisitos de la spec van siempre como "RF-n de la spec" o con el prefijo claro de la tabla de tareas.

## Archivos y responsabilidades

| Archivo | Responsabilidad en este cambio |
|---|---|
| `src/data/experiencia.ts` | Fuente única ampliada (RF-17, RF-18): nuevos tipos (`Puesto`, `FuncionTransferible`, `Mision`, `MetadatosOperativos`) y el array `trayectoria: Puesto[]` con los 3 puestos y su contenido literal de la spec. Dos funciones puras nuevas: `formatearPeriodo` y `numerarFunciones` (ver abajo). El export `ExperienciaItem`/`experiencia` que ya consume `index.astro` se mantiene con la misma forma pública, pero ahora se **deriva** de `trayectoria` en vez de escribirse a mano, para que no haya dos fuentes (RF-17). |
| `src/pages/trayectoria.astro` | Sustituir el esqueleto `[PENDIENTE]` por el recorrido de los 3 puestos: cabecera simple por puesto (RF-1 a RF-5), metadatos opcionales solo en Operaciones Especiales (RF-6 a RF-8), las 6 funciones con su etiqueta visual continua (RF-9 a RF-14, RF-16) y la frase de cierre solo tras el último bloque (RF-15). No contiene datos escritos a mano: todo viene de `experiencia.ts` (RF-17). |
| `src/styles/global.css` | Reglas nuevas para el tratamiento visual propio de los 3 bloques: `.spec-trayectoria`, `.spec-puesto` (+ `__cabecera`, `__nombre`, `__mark`, `__meta`), `.spec-puesto__metadatos`, `.spec-puesto__funciones`/`.spec-funcion` (+ `__etiqueta`, `__original`, `__traslado`), `.spec-puesto__cierre` y una utilidad `.visually-hidden`. Ninguna regla nueva reutiliza los selectores `.card` ni `.feature-list`; solo se reutilizan variables de tema (`--color-*`, `--space-section`) y la tipografía monoespaciada ya global en `body`. |
| `src/pages/index.astro` | Sin cambios (RF-19). Se verifica que sigue importando `{ experiencia }` de `../data/experiencia` igual que hoy y que el array resultante tiene exactamente la misma forma y los mismos valores (`periodo`, `titulo`) que antes de ampliar el archivo. |
| `src/layouts/BaseLayout.astro` | Sin cambios. Ningún requisito de esta spec afecta al script de tema ni al `<head>`. |
| `docs/decisiones.md` | Registrar las decisiones D1–D7 de este plan tras implementarlas (tarea final). |
| `MEMORY.md` | Actualizar estado al cerrar la spec (tarea final). |

## Estructura de datos propuesta (`src/data/experiencia.ts`)

```ts
export interface FuncionTransferible {
  original: string;
  traslado: string;
}

export interface Mision {
  lugar: string;
  anio: number;
}

export interface MetadatosOperativos {
  rol?: string;
  misiones?: Mision[];
  condecoraciones?: string[];
}

export interface Puesto {
  nombreCv: string;
  tituloCorto: string;
  organizacion: string;
  anioInicio: number;
  anioFin: number | "vigente";
  funciones: FuncionTransferible[];
  metadatos?: MetadatosOperativos;
  fraseCierre?: string;
}

export const trayectoria: Puesto[] = [
  {
    nombreCv: "Patrón/Socorrista",
    tituloCorto: "Patrón de salvamento",
    organizacion: "Pro-Activa/Ebone",
    anioInicio: 2015,
    anioFin: "vigente",
    funciones: [
      { original: "Protocolo según cada rescate", traslado: "Gestión de cada excepción" },
      { original: "Embarcación revisada antes de zarpar", traslado: "Infraestructura mantenida antes del fallo" },
    ],
  },
  {
    nombreCv: "Conductor de ambulancia",
    tituloCorto: "Emergencias sanitarias",
    organizacion: "Grupo ASV",
    anioInicio: 2020,
    anioFin: 2025,
    funciones: [
      { original: "Material elegido sin vuelta atrás", traslado: "Especificar antes de implementar" },
      { original: "Ruta óptima, criterio entrenado", traslado: "Decisión ágil, criterio fundamentado" },
    ],
  },
  {
    nombreCv: "Soldado, Operaciones Especiales",
    tituloCorto: "Operaciones Especiales · FF. AA.",
    organizacion: "Fuerzas Armadas",
    anioInicio: 2006,
    anioFin: 2013,
    metadatos: {
      rol: "Navegante del equipo: diseño y guía de la infiltración y la exfiltración",
      misiones: [
        { lugar: "Afganistán (ISAF)", anio: 2011 },
        { lugar: "Afganistán (ISAF)", anio: 2012 },
      ],
      condecoraciones: ["Medalla ISAF"],
    },
    funciones: [
      { original: "Plan minucioso antes de actuar", traslado: "Spec antes que código" },
      { original: "Conocer los propios límites", traslado: "Supervisar con criterio la IA" },
    ],
    fraseCierre: "Aquí empieza el método SDD de este portfolio.",
  },
];

export function formatearPeriodo(puesto: Pick<Puesto, "anioInicio" | "anioFin">): string {
  const fin = puesto.anioFin === "vigente" ? "hoy" : String(puesto.anioFin);
  return `${puesto.anioInicio} – ${fin}`;
}

export function numerarFunciones(puestos: Puesto[]): number[][] {
  let contador = 0;
  return puestos.map((puesto) => puesto.funciones.map(() => (contador += 1)));
}

export interface ExperienciaItem {
  periodo: string;
  titulo: string;
}

export const experiencia: ExperienciaItem[] = trayectoria.map((puesto) => ({
  periodo: formatearPeriodo(puesto),
  titulo: puesto.tituloCorto,
}));
```

Notas sobre el texto exacto del rol/misiones: la spec (RF-6) describe el rol en prosa ("Cristian era el navegante del equipo, encargado de diseñar y guiar la infiltración y la exfiltración"); el campo `rol` anterior resume esa misma frase en el registro de "metadato corto" (clave→valor) que ya usa el resto de la página para rol/misiones/condecoraciones, sin añadir ni quitar información (sigue siendo "navegante del equipo" + "diseñar y guiar infiltración y exfiltración", literal de RF-6). Si en implementación se prefiere el texto RF-6 palabra por palabra, se puede pegar literal en `rol` sin que esto afecte a ninguna otra parte del plan.

**Sobre "hoy" y las funciones puras:** `formatearPeriodo` NO calcula una fecha a partir del reloj del sistema (no hay `new Date()` ni año actual); "hoy" es un literal fijo cuando `anioFin === "vigente"`, igual que ya hace el index hoy con el texto escrito a mano. No es la función "pura con fecha de hoy como parámetro" que menciona la convención general del proyecto para lógica de fechas dinámica: aquí no hace falta, porque ningún RF pide calcular el año actual (RF-4 solo pide la palabra "hoy", no una fecha derivada). Se deja constancia explícita de esta distinción para que no se intente "mejorar" la función añadiendo `Date.now()` sin que ningún requisito lo pida.

## Algoritmo / pseudocódigo

### 1. Recorrido de los 3 bloques apilados (RF-1, RF-2)
```
const numeracion = numerarFunciones(trayectoria); // [[1,2],[3,4],[5,6]]

trayectoria.map((puesto, indicePuesto) => (
  <article class="spec-puesto">
    <header class="spec-puesto__cabecera">
      <h2 class="spec-puesto__nombre">
        <span class="spec-puesto__mark" aria-hidden="true">## </span>{puesto.nombreCv}
      </h2>
      <p class="spec-puesto__meta">{puesto.organizacion} · {formatearPeriodo(puesto)}</p>
    </header>

    { /* metadatos solo si existen (bloque 2) */ }
    { /* funciones con numeracion[indicePuesto][indiceFuncion] (bloque 3) */ }
    { /* fraseCierre solo si existe (bloque 4) */ }
  </article>
))
```
`.spec-trayectoria { display: flex; flex-direction: column; }` sin `grid`/columnas: los 3 `<article>` quedan uno debajo de otro a toda la anchura del `.container`, en cualquier viewport (cumple la disposición apilada pedida para escritorio sin necesidad de un `@media` que la cambie).

### 2. Metadatos opcionales solo en Operaciones Especiales (RF-6 a RF-8)
```
{puesto.metadatos && (
  <dl class="spec-puesto__metadatos">
    {puesto.metadatos.rol && (<><dt><span class="spec-puesto__mark" aria-hidden="true">// </span>rol</dt><dd>{puesto.metadatos.rol}</dd></>)}
    {puesto.metadatos.misiones && (
      <><dt><span class="spec-puesto__mark" aria-hidden="true">// </span>misiones</dt>
      <dd><ul>{puesto.metadatos.misiones.map((m) => <li>{m.lugar}, {m.anio}</li>)}</ul></dd></>
    )}
    {puesto.metadatos.condecoraciones && (
      <><dt><span class="spec-puesto__mark" aria-hidden="true">// </span>condecoraciones</dt>
      <dd>{puesto.metadatos.condecoraciones.join(" · ")}</dd></>
    )}
  </dl>
)}
```
Como solo Operaciones Especiales tiene `metadatos` en los datos, el condicional `puesto.metadatos &&` basta para que Patrón/Socorrista y Conductor de ambulancia no pinten ningún `<dl>` ni hueco (caso límite "campos opcionales" de la spec). Dentro de ese `<dl>`, cada `dt`/`dd` solo se pinta si el subcampo existe, por si en el futuro un puesto tuviera solo rol sin misiones, etc.

### 3. Las 6 funciones con etiqueta visual continua (RF-9 a RF-14, RF-16)
```
<dl class="spec-puesto__funciones">
  {puesto.funciones.map((funcion, indiceFuncion) => (
    <div class="spec-funcion">
      <dt class="spec-funcion__original">
        <span class="spec-funcion__etiqueta">RF-{numeracion[indicePuesto][indiceFuncion]}</span>
        {funcion.original}
      </dt>
      <dd class="spec-funcion__traslado">
        <span class="visually-hidden">equivale a </span>
        <span aria-hidden="true">→&nbsp;</span>{funcion.traslado}
      </dd>
    </div>
  ))}
</dl>
```
- `numerarFunciones` ya calculó la numeración continua antes de pintar nada: `numeracion[0] = [1,2]`, `numeracion[1] = [3,4]`, `numeracion[2] = [5,6]`, así que la etiqueta "RF-n" es siempre correcta y continua sin ningún contador mutable en la plantilla.
- `<dt>`/`<dd>` dentro de un único `<dl>` por puesto transmite la relación "labor real → equivalente" de forma semántica (término/definición) sin depender de que el lector de pantalla lea "→"; el `span.visually-hidden` añade el verbo de relación de forma explícita, y el símbolo "→" queda `aria-hidden` porque es redundante una vez dicho "equivale a".
- `&nbsp;` entre "→" y el primer carácter de `traslado` (dentro del mismo `<dd>`) evita que, al partir línea en móvil, la flecha quede como único contenido de una línea separada de ambas frases (caso límite de la spec): como "→" y la palabra siguiente son un único segmento sin espacio de ruptura, el navegador nunca puede aislar la flecha sola.
- `<dl>` con un `<div>` envolviendo cada pareja `dt`/`dd` es contenido válido en HTML5 (un `<dl>` puede alternar grupos `dt+/dd+` opcionalmente envueltos en `<div>`); se usa aquí para poder aplicar `gap`/espaciado por pareja con CSS sin flexbox/grid directo sobre `dt`/`dd` sueltos.

### 4. Frase de cierre solo en el último bloque (RF-15)
```
{puesto.fraseCierre && <p class="spec-puesto__cierre">{puesto.fraseCierre}</p>}
```
Solo Operaciones Especiales tiene `fraseCierre` en los datos; el condicional evita que aparezca, o deje hueco, en los otros dos puestos (caso límite "frase de cierre").

### Boceto de estructura HTML/CSS del bloque (resumen visual)
```
.spec-trayectoria            flex column, gap grande entre puestos
  .spec-puesto                sin fondo/caja; separado del anterior con border-top
    .spec-puesto__cabecera
      h2.spec-puesto__nombre  "## " (accent, aria-hidden) + nombre del CV
      p.spec-puesto__meta     organización · periodo (texto muted)
    dl.spec-puesto__metadatos  solo Operaciones Especiales; "// " (accent) + dt/dd
    dl.spec-puesto__funciones  2 parejas; cada una un div > dt (RF-n + original) + dd (→ traslado)
    p.spec-puesto__cierre      solo Operaciones Especiales, tras las funciones
```
Esto da a cada bloque el aspecto de "contenido de un fichero de spec" (encabezado `##`, comentarios `//`, lista de requisitos numerados) con los mismos colores y fuente monoespaciada de todo el sitio, pero sin fondo de tarjeta, sin borde redondeado ni el patrón de `.feature-list__item` (borde izquierdo de acento + `<strong>` + párrafo).

## Decisiones técnicas (con alternativa descartada)

- **D1 — `experiencia` derivado de `trayectoria` con `.map`, no dos arrays mantenidos a mano.** Alternativa descartada: seguir escribiendo `experiencia` tal cual está hoy y añadir `trayectoria` como un array totalmente aparte con los mismos años/títulos repetidos. Se descarta porque duplicaría literales (p. ej. "2015 – hoy", "Patrón de salvamento") en dos sitios del mismo archivo, violando "sin datos repetidos a mano" (constitución, principio 3) y el propio RF-17 ("única fuente de datos... ampliada"); derivar con `.map` garantiza que cualquier corrección futura de un puesto (p. ej. RF del caso límite "fin del puesto vigente") solo se edita una vez.
- **D2 — `anioFin: number | "vigente"`, no `{ vigente: boolean; anioFin?: number }`.** Alternativa descartada: un campo booleano `vigente` más un `anioFin` opcional. Se descarta porque permite estados imposibles (`vigente: true` con un `anioFin` numérico a la vez, o `vigente: false` sin `anioFin`), que `formatearPeriodo` tendría que validar defensivamente; la unión `number | "vigente"` hace esos estados irrepresentables en el propio tipo y simplifica la función pura a un único `if`.
- **D3 — Numeración visual con la función pura `numerarFunciones`, no con un contador mutable `let` dentro del `.map` de la plantilla `.astro`.** Alternativa descartada: declarar `let contador = 0` en el frontmatter de `trayectoria.astro` e incrementarlo dentro del callback de `puesto.funciones.map(...)` mientras se pinta. Técnicamente funcionaría (Astro evalúa los callbacks de forma síncrona y en orden), pero mezclaría un efecto secundario dentro de una expresión de marcado, sería más difícil de verificar sin renderizar la página y más frágil si en el futuro el bloque de un puesto se extrajera a un componente reutilizado varias veces en la misma página (el estado mutable del módulo podría no reiniciarse como se espera). `numerarFunciones` calcula el resultado completo antes de pintar nada, es trivial de razonar ("recorre los puestos en orden, suma cuántas funciones tiene cada uno") y no depende del orden de evaluación de JSX.
- **D4 — Tratamiento visual propio (`.spec-puesto`/`.spec-funcion`) reutilizando solo variables de tema y la tipografía global, sin fondo/caja ni borde redondeado, separado por `border-top` entre bloques, en vez de usar `.card` o una variante de `.feature-list__item`.** Alternativa descartada 1: pintar cada puesto como una `.card` más (como las tarjetas de proyecto o la caja de "cómo desarrollo"). Se descarta porque el usuario pidió explícitamente que NO se reutilice el tratamiento de tarjeta genérica. Alternativa descartada 2: simular una pestaña de editor con un nombre de archivo falso tipo `patron-socorrista.spec.ts` encima de cada bloque. Se descarta porque el propio usuario fijó que la cabecera es simple (solo el título del puesto), sin simular una ruta de archivo.
- **D5 — Metadatos de Operaciones Especiales como lista `clave: valor` (`<dl>` rol/misiones/condecoraciones), no como un párrafo de prosa.** Alternativa descartada: una frase narrativa que mencione rol, misiones y condecoración seguidas ("Fue el navegante del equipo... participó en dos misiones ISAF en 2011 y 2012... recibió la Medalla ISAF"). Se descarta porque mezclaría tres datos verificables en una sola frase, dificultando comprobarlos por separado contra RF-6 a RF-8, y porque el tono "frases cortas, sin prosa narrativa" que la spec exige para las funciones (RF-9) es coherente aplicarlo también aquí.
- **D6 — Relación "labor real → equivalente" con `<dt>`/`<dd>` dentro de un `<dl>`, no con dos `<p>` sueltos ni una `<ul>` de frases.** Alternativa descartada: dos párrafos consecutivos (`<p>` original, `<p>` traslado) sin relación semántica explícita, apoyándose solo en el orden visual y el símbolo "→". Se descarta porque el caso límite de la spec exige que la relación se entienda con lector de pantalla sin depender de leer "→"; `<dt>`/`<dd>` transmite nativamente una relación término/definición, reforzada aquí con el texto oculto "equivale a".
- **D7 — Quitar el párrafo `[PENDIENTE]` de `.page-intro` sin sustituirlo por ningún texto de introducción nuevo; se deja solo `<h1>Trayectoria</h1>` dentro de la misma caja `.page-intro.card` ya existente.** Alternativa descartada: redactar una frase de introducción (p. ej. "De las misiones a los repositorios") para que la caja superior no quede con un único `<h1>`. Se descarta porque esa frase no está en la spec aprobada ni en el encargo, y AGENTS.md prohíbe añadir textos no contemplados sin que el usuario lo pida explícitamente; además `.page-intro.card` es el único uso de `.card` que se conserva en esta página, y no entra en la prohibición de "no reutilizar `.card`" (esa prohibición es solo para los 3 bloques de puesto, no para el título de página que ya usan `proyectos.astro`/`sobre-mi.astro`/`metodo.astro`).

## Estrategia de verificación

1. `npx astro check` → 0 errores, en particular sobre los tipos nuevos de `experiencia.ts` (strict) y las props implícitas de `trayectoria.astro`.
2. `npm run build` → sin fallos, genera `/trayectoria` (y el resto de rutas existentes: `/`, `/proyectos`, `/sobre-mi`, `/metodo`) sin errores de tipo ni de build.
3. Revisión visual con el MCP de chrome-devtools ya disponible en el entorno (no se instala Playwright/Puppeteer efímero como en la spec 001), en **tema oscuro y claro**, en estos anchos:
   - **360px**: los 3 bloques apilados en una sola columna, sin desbordamiento horizontal; nombres largos ("Soldado, Operaciones Especiales") y organizaciones con barra ("Pro-Activa/Ebone") partiendo línea correctamente; ninguna pareja RF-n deja la flecha "→" aislada en una línea separada de ambas frases.
   - **~700–900px**: igual que 360px pero comprobando que `.spec-trayectoria` sigue sin pasar a 2 columnas o grid (debe seguir apilado, no es un breakpoint con reglas nuevas).
   - **1024px**: bloques apilados a toda la anchura del `.container` (no en fila), cabeceras simples sin simular pestaña de archivo.
   - **1280px**: confirmar que el index (`/`), comparado antes/después, muestra la sección "experiencia" exactamente igual (mismos 3 periodos y títulos cortos, mismo marcado `.timeline`).
   - **>1600px**: los bloques no se limitan de forma distinta a 1280px salvo por el `max-width` ya existente de `.container` (no hay un breakpoint nuevo que cambie el apilado).
   - En cualquier ancho y tema: la numeración visual "RF-1" a "RF-6" aparece de forma continua y en el orden correcto entre los 3 bloques (1,2 en Patrón; 3,4 en Conductor; 5,6 en Operaciones Especiales); los metadatos (rol/misiones/condecoraciones) y la frase de cierre aparecen únicamente en el bloque de Operaciones Especiales; no hay parpadeo de tema al cargar (FOUC); el contraste de `.spec-puesto__meta`/`.spec-funcion__traslado` (texto muted) se mantiene legible en ambos temas; el foco visible (`:focus-visible`) se conserva en cualquier enlace de la página.
4. Comprobación de contenido: ningún `[PENDIENTE]` queda en `trayectoria.astro` ni en `experiencia.ts`; los textos de las 6 funciones, la frase de cierre y los datos de RF-2/RF-6 a RF-8 coinciden literalmente con la spec (comparación campo a campo).
5. No aplica ningún test runner de Node: el sitio es estático, sin lógica de negocio que testear más allá de las dos funciones puras, verificables por lectura directa del código y por `astro check`/`astro build` (constitución, principio 4).

## Riesgos / casos límite a vigilar durante la implementación

- Verificar que `numerarFunciones` recibe siempre `trayectoria` en el mismo orden que se pinta (RF-1); si en el futuro se reordenara el array de datos sin tocar la plantilla, la numeración visual seguiría siendo continua pero el orden on-screen cambiaría junto con los datos, lo cual es el comportamiento esperado (caso límite "puesto nuevo en el futuro" de la spec).
- El `<dl>` con `<div>` agrupando `dt`/`dd` es válido en HTML5, pero conviene revisar en `astro check`/el navegador que no se renderiza ningún `dt`/`dd` huérfano cuando `puesto.metadatos` existe pero algún subcampo (`rol`/`misiones`/`condecoraciones`) no.
- Revisar en ambos temas que `.spec-puesto__mark` (el color de acento para "##"/"//") mantenga suficiente contraste decorativo sin confundirse con un enlace (no debe llevar subrayado ni comportamiento de `:hover`/`:focus`, es texto decorativo `aria-hidden`).
- Confirmar que quitar el párrafo `[PENDIENTE]` de `.page-intro` no deja esa caja con una altura visualmente extraña (demasiado pequeña) comparada con el resto de páginas-esqueleto que aún conservan su propio `[PENDIENTE]` (`proyectos`, `sobre-mi`, `metodo`); si se ve descompensado, es un problema puramente visual de esta página y no debe arreglarse tocando esas otras páginas fuera de alcance.
