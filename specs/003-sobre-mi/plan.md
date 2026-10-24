# Plan 003 — Página "Sobre mí"

Spec de referencia: `specs/003-sobre-mi/spec.md` (estado: aprobada). Este plan no modifica la spec; solo decide el CÓMO. La redacción literal de la historia, las aficiones y el cierre no está fijada palabra por palabra en la spec (al contrario que en la 002): los RF fijan qué debe aparecer y qué no, no el texto exacto, así que ese texto se redacta durante la implementación respetando los RF y las listas cerradas que sí son literales (los países de RF-7b, el nombre de los cursos de RF-8/RF-9).

## Archivos y responsabilidades

| Archivo | Responsabilidad en este cambio |
|---|---|
| `src/data/sobreMi.ts` (nuevo) | Contenido narrativo específico de esta página, que no se reutiliza en ninguna otra: guion de consola (RF-2), historia en 2 párrafos (RF-3 a RF-6), aficiones y viajes (RF-7, RF-7b), formación actual (RF-8, RF-9) y las 2 fotografías con su `alt` (RF-15). |
| `src/data/perfil.ts` | Ampliar con 2 campos nuevos, `idiomas` e `interesSectorial`, junto a los ya existentes `ubicacion`/`disponibilidad`/`email`/`cv` que el bloque de cierre reutiliza sin copiarlos (RF-11, RF-12, RF-14). |
| `src/pages/sobre-mi.astro` | Sustituir el esqueleto `[PENDIENTE]` por los 3 bloques de la spec: guion de consola (RF-2), fila 1 historia+foto (RF-3 a RF-6, RF-16 a RF-18), fila 2 aficiones/formación+foto (RF-7 a RF-10, RF-16 a RF-18) y bloque de cierre a ancho completo con CTA (RF-11 a RF-14, RF-19). No contiene ningún párrafo narrativo escrito a mano: todo viene de `sobreMi.ts`/`perfil.ts`. |
| `src/styles/global.css` | Reglas nuevas: `.sobre-mi`, `.sobre-mi__guion`, `.sobre-mi__fila` (+ modificador `--invertida`), `.sobre-mi__texto`, `.sobre-mi__foto`, `.sobre-mi__formacion`, `.sobre-mi__cierre`. Reutiliza variables de tema, `.btn`/`.btn--primary`/`.card` y `.hero__actions` ya existentes; ninguna regla nueva duplica un layout que ya cubra otra clase. |
| `public/images/` | Renombrar los 2 archivos ya añadidos a kebab-case coherente con `foto-cristian.png`: `foto_cristian-sobre_mi.jpg` → `foto-cristian-sobre-mi.jpg`, `foto-cristian_moto.jpg` → `foto-cristian-moto.jpg` (D7). |
| `docs/decisiones.md` | Registrar las decisiones D1–D8 de este plan tras implementarlas (tarea final). |
| `MEMORY.md` | Actualizar estado al cerrar la spec (tarea final). |

## Estructura de datos propuesta

### `src/data/sobreMi.ts` (nuevo — forma final tras implementar T2)
```ts
export interface Foto {
  src: string;
  alt: string;
}

export interface FormacionItem {
  nombre: string;
  centro: string;
  nota: string;
}

export const sobreMi = {
  guionConsola: "$ cat sobre-mi.md",

  historia: ["<párrafo 1, RF-3>", "<párrafo 2, RF-5/RF-6, termina en 'trayectoria →'>"],
  fotoHistoria: { src: "/images/foto-cristian-sobre-mi.jpg", alt: "..." } satisfies Foto,

  aficiones: ["<párrafo deporte: alpinismo, trail running, moto de enduro — RF-7>", "<párrafo viajes: mochilero, 2-3 países de RF-7b>"],

  formacion: [
    { nombre: "CFGS Desarrollo de Aplicaciones Web (DAW)", centro: "IES San Vicente", nota: "fin previsto en 2027" },
    { nombre: "Desarrollo con IA", centro: "mouredev · BIG school", nota: "certificado de asistencia, 4 h" },
  ] satisfies FormacionItem[],
  fotoAficiones: { src: "/images/foto-cristian-moto.jpg", alt: "..." } satisfies Foto,
};
```
Respecto a la propuesta inicial de este plan, `aficionesDeporte`/`viajes` (listas separadas, pensadas para una concatenación mecánica tipo `.join(" · ")`) se sustituyeron por `aficiones: string[]` con la prosa ya redactada: el usuario pidió un tono narrativo concreto (trail running/alpinismo/moto de enduro como quién es, no como lista), así que el texto se escribe una vez en el dato y la plantilla solo pinta los 2 párrafos, igual que `historia`. La afición "MTB" de la entrevista inicial se corrigió a "moto de enduro" al revisar la foto real (RF-7: veracidad, no se inventa ni se mantiene un dato que la propia foto desmiente).
El texto de `historia` y de `aficiones` no queda fijado literalmente en esta spec (a diferencia del plan 002): los RF fijan qué debe cubrir cada bloque, no la frase exacta. Los 2-3 países sí son literales cerrados (de la lista real de RF-7b) y los 2 `formacion` son literales de RF-8/RF-9; ninguno de los dos se redacta libremente. Mientras el contenido definitivo de `historia` no esté redactado, sus 2 párrafos llevan el prefijo `[PENDIENTE]` seguido de texto de relleno de longitud similar a la final, para poder revisar el maquetado sin esperar al texto real (criterio del usuario); la spec no se da por cerrada hasta sustituirlo.

### `src/data/perfil.ts` (ampliación, sin tocar los campos existentes)
```ts
export const perfil = {
  // ...campos ya existentes (nombre, disponibilidad, ubicacion, email, github, linkedin, cv, foto, titular, bio)
  idiomas: "Español nativo · inglés A1, en curso",
  interesSectorial: "Defensa, aeroespacial e ingeniería",
};
```

## Algoritmo / pseudocódigo

### 1. Guion de consola (RF-2)
```astro
<section class="page-intro card">
  <h1>Sobre mí</h1>
  <p class="sobre-mi__guion"><span class="prompt">$</span> cat sobre-mi.md</p>
</section>
```
Literal distinto al `$ whoami` del hero y a las marcas `##`/`//` de trayectoria (caso límite "guion de consola duplicado"), importado de `sobreMi.guionConsola` en vez de escrito a mano dos veces (una en el dato, otra en la plantilla), para que solo haya una fuente del texto exacto.

### 2. Fila 1 — historia + foto, invertida en escritorio (RF-3 a RF-6, RF-16 a RF-18)
```astro
<div class="sobre-mi__fila sobre-mi__fila--invertida">
  <div class="sobre-mi__foto">
    <img src={sobreMi.fotoHistoria.src} alt={sobreMi.fotoHistoria.alt} />
  </div>
  <div class="sobre-mi__texto">
    {sobreMi.historia.map((parrafo) => <p>{parrafo}</p>)}
    <p class="muted">Más detalle, puesto por puesto, en <a class="link-arrow" href="/trayectoria">trayectoria →</a></p>
  </div>
</div>
```
Orden de documento: foto, luego texto (igual que la fila 2 y que el hero). En móvil no hay `@media`, así que se apila en ese mismo orden (RF-17). En escritorio, `--invertida` aplica `order` solo a `.sobre-mi__texto`/`.sobre-mi__foto` de esta fila, para que el texto quede a la izquierda y la foto a la derecha (RF-16), sin mover nada en el HTML.

**Revisión tras la implementación real (T5/T10):** la primera versión indexaba `historia[0]`/`historia[1]` a mano, porque la spec preveía exactamente 2 párrafos. Al sustituir el `[PENDIENTE]` por el texto definitivo, el usuario escribió 3 párrafos en vez de 2 y, al no haber bucle, el tercero no se pintaba (bug detectado por el propio usuario). Se corrigió a `sobreMi.historia.map(...)`, que admite cualquier número de párrafos, y el enlace de RF-6 se desacopló del texto: en vez de depender de que el último párrafo terminara en una palabra concreta ("en"), se renderiza siempre como una línea fija aparte ("Más detalle, puesto por puesto, en trayectoria →"), inmune a cómo se redacte `historia`. La spec (RF-3) se corrigió para reflejar "varios párrafos" en vez de "2 párrafos" exactos.

### 3. Fila 2 — aficiones/formación + foto, sin invertir (RF-7 a RF-10, RF-16 a RF-18)
```astro
<div class="sobre-mi__fila">
  <div class="sobre-mi__foto">
    <img src={sobreMi.fotoAficiones.src} alt={sobreMi.fotoAficiones.alt} />
  </div>
  <div class="sobre-mi__texto">
    {sobreMi.aficiones.map((parrafo) => <p>{parrafo}</p>)}
    <ul class="sobre-mi__formacion">
      {sobreMi.formacion.map((item) => (
        <li><strong>{item.nombre}</strong> · {item.centro} — {item.nota}</li>
      ))}
    </ul>
  </div>
</div>
```
Al no llevar `--invertida`, el orden de documento (foto, texto) coincide con el orden visual también en escritorio: foto a la izquierda, texto a la derecha. Es el zigzag de RF-16 sin necesitar ninguna regla `order` adicional, porque el orden que pide la fila 2 ya es el orden natural del HTML. `sobreMi.aficiones` ya es prosa redactada (2 párrafos), igual que `historia`; la plantilla solo mapea el array a `<p>`, sin componer frases a partir de listas sueltas.

### 4. Bloque de cierre, a ancho completo (RF-11 a RF-14, RF-19)
```astro
<section class="section sobre-mi__cierre card">
  <p>{perfil.ubicacion} · {perfil.disponibilidad} · {perfil.idiomas}</p>
  <p>{perfil.interesSectorial}</p>
  <div class="hero__actions">
    <a class="btn btn--primary" href={`mailto:${perfil.email}`}>{perfil.email}</a>
    <a class="btn" href={perfil.cv}>CV.pdf</a>
  </div>
</section>
```
Prosa/lista breve (2 líneas cortas), no una ficha `clave: valor` (RF-13); ningún dato se repite a mano porque los 4 valores vienen de `perfil.ts`, el mismo origen que ya usa el hero del index para `ubicacion`/`disponibilidad`/`email`/`cv`.

### Boceto de estructura HTML/CSS (resumen visual)
```
.page-intro.card
  h1 "Sobre mí"
  p.sobre-mi__guion      "$ cat sobre-mi.md"

.sobre-mi
  .sobre-mi__fila--invertida   (móvil: foto arriba, texto abajo · escritorio: texto izq., foto der.)
    .sobre-mi__foto              aspect-ratio fijo, object-fit: cover, 1 esquina de acento + halo difuso
    .sobre-mi__texto             2 <p> (historia)
  .sobre-mi__fila               (móvil: foto arriba, texto abajo · escritorio: foto izq., texto der.)
    .sobre-mi__foto
    .sobre-mi__texto             p (aficiones+viajes) + ul.sobre-mi__formacion

section.sobre-mi__cierre.card    ancho completo, fuera de .sobre-mi
  p (ubicación · disponibilidad · idiomas)
  p (interés sectorial)
  div.hero__actions (CTA, reutilizada del hero)
```

## Decisiones técnicas (con alternativa descartada)

- **D1 — Contenido narrativo en un archivo nuevo `sobreMi.ts`, no ampliando `perfil.ts` con todo.** Alternativa descartada: meter historia, aficiones y formación dentro de `perfil.ts`. Se descarta porque `perfil.ts` es contenido reutilizado en varias páginas (el hero del index lo consume hoy); cargarlo con un bloque largo de prosa específico de una sola página rompería esa cohesión. Solo pasan a `perfil.ts` los 2 campos que sí son hechos generales de perfil (`idiomas`, `interesSectorial`), igual que ya conviven ahí `ubicacion`/`disponibilidad`.
- **D2 — El bloque de cierre reutiliza `perfil.ubicacion`/`disponibilidad`/`email`/`cv` en vez de copiarlos de nuevo en `sobreMi.ts`.** Alternativa descartada: duplicar esos 4 valores como literales nuevos en el archivo de esta página. Se descarta por "sin datos repetidos a mano" (constitución, principio 3): si cambia la disponibilidad, se corrige una sola vez en `perfil.ts` y el cambio se refleja también aquí (caso límite "cambio de disponibilidad o de nivel de idioma").
- **D3 — Zigzag con la técnica de `order` ya usada en el hero (D2 de la spec 001), invirtiendo solo la fila 1 con el modificador `--invertida`.** Alternativa descartada: fijar un `order` explícito en las 4 combinaciones de ambas filas, o reordenar el HTML de cada fila a mano. Se descarta porque el orden de documento (foto, texto) ya coincide con lo que pide la fila 2 y con el apilado de ambas filas en móvil (RF-17/RF-18); solo la fila 1 en escritorio necesita invertirse, así que basta un único modificador en vez de fijar `order` en cada elemento de cada fila.
- **D4 — Fotos en marco cuadrado (`aspect-ratio: 1 / 1`) fijo, `object-fit: cover`, una única esquina con bracket de acento y una sombra azul difusa (`box-shadow` con `--color-accent-soft`) alrededor del marco; no el marco circular con 4 esquinas HUD del hero.** Ratio cuadrado en vez de un recorte más vertical (p. ej. `4 / 5`): con las 2 fotos reales ya disponibles (una vertical de alpinismo, otra casi cuadrada de la moto en la duna), un cuadrado recorta de forma razonable las dos sin sacrificar demasiado contexto en ninguna; se revisa en T9 y se ajusta si el recorte no queda bien en pantalla. Alternativa descartada 1: reutilizar `.hero__photo-frame`/`.hero__photo-circle`/las esquinas HUD para estas 2 fotos. Se descarta porque ese tratamiento circular con 4 esquinas es la firma visual específica del retrato de identidad del hero (D5 de la spec 001); clonarlo aquí competiría con el hero, y RF-15 pide una foto "distinta a la del hero", no solo un archivo distinto con el mismo marco. Alternativa descartada 2: foto recortada a `aspect-ratio` sin ningún adorno (como `.project-card__media`). Se descarta porque el usuario pidió explícitamente un tratamiento más elaborado que un recorte plano; la opción elegida (1 esquina + halo difuso) añade ese matiz reutilizando solo `--color-accent`/`--color-accent-soft` ya existentes, sin imágenes ni librerías nuevas. La esquina se sitúa en el lado del marco más próximo al bloque de texto de su fila (superior-izquierda en la fila 1, superior-derecha en la fila 2, invertida junto con `--invertida`), como un guiño visual que conecta la foto con el texto sin añadir marcado nuevo.
- **D5 — Cierre práctico en prosa/lista breve (2 `<p>`), sin `<dl>` clave:valor.** Alternativa descartada: reutilizar el patrón `<dl>` de `trayectoria` (`.spec-puesto__metadatos`) para ubicación/disponibilidad/idioma/interés. Se descarta porque RF-13 prohíbe explícitamente una ficha tipo "config" clave:valor (es justo el bloque que se descartó en la entrevista de la spec); una prosa corta transmite el mismo dato sin el aspecto de ficha técnica.
- **D6 — Reutilizar `.hero__actions` para la fila de botones del cierre, en vez de una clase nueva idéntica.** Alternativa descartada: crear `.sobre-mi__cta` con las mismas reglas (`display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:1.75rem`). Se descarta por duplicar CSS idéntico sin ninguna diferencia visual que lo justifique.
- **D7 — Renombrar los 2 archivos de imagen a kebab-case antes de referenciarlos.** Alternativa descartada: referenciarlos con su nombre actual (`foto_cristian-sobre_mi.jpg`, `foto-cristian_moto.jpg`, que mezclan guion y guion bajo). Se descarta por mantener la convención ya usada en `foto-cristian.png` y no introducir una inconsistencia de nombres en `public/images/`.
- **D8 — Ningún dato de esta spec se calcula a partir de la fecha del sistema.** "Fin previsto en 2027" y "disponible desde marzo de 2027" (ya existente en `perfil.disponibilidad`) son literales fijos en los datos, no un cálculo con `Date.now()` o similar, igual que se dejó constancia en el plan 002: ningún RF de esta spec pide derivar una fecha del reloj del sistema, así que no hace falta (ni se debe añadir) lógica de fechas dinámica.

## Estrategia de verificación

1. `npx astro check` → 0 errores, en particular sobre los tipos nuevos de `sobreMi.ts` (modo `strict`), los 2 campos añadidos a `perfil.ts` y las props implícitas de `sobre-mi.astro`.
2. `npm run build` → sin fallos, genera `/sobre-mi` y el resto de rutas existentes (`/`, `/proyectos`, `/trayectoria`, `/metodo`) sin errores de tipo ni de build.
3. Revisión visual con el MCP de chrome-devtools, en tema oscuro y claro, en estos anchos:
   - **360px**: fila 1 y fila 2 apiladas en una sola columna, siempre con la foto antes del texto en ambas; ningún desbordamiento horizontal; el bloque de cierre se lee bien debajo, sin que la fila de botones se corte.
   - **~700–900px**: igual que 360px (no hay breakpoint intermedio nuevo, el cambio ocurre en `min-width: 56rem` como en el hero).
   - **1024px / 1280px**: fila 1 con el texto a la izquierda y la foto a la derecha; fila 2 con la foto a la izquierda y el texto a la derecha (zigzag); el bloque de cierre ocupa el ancho completo, fuera de esa cuadrícula.
   - En cualquier ancho y tema: tabulando con teclado, el orden de foco en cada fila es foto → texto (el mismo en los 2 anchos, solo cambia la posición visual, nunca el orden de tabulado — RF-18); no hay parpadeo de tema al cargar; el contraste del texto muted se mantiene legible en ambos temas; `:focus-visible` se conserva en los enlaces del cierre y en el enlace a `/trayectoria`.
   - Las 2 fotos no se ven deformadas ni recortadas de forma extraña con el `aspect-ratio` elegido; si alguna de las 2 fotos reales se recorta mal, se ajusta el `aspect-ratio` antes de cerrar la tarea (no se cambia la foto).
4. Comprobación de contenido: ningún `[PENDIENTE]` queda en `sobre-mi.astro`; los párrafos de historia + aficiones/formación suman aproximadamente 300 palabras; el guion de consola es distinto, letra por letra, al `$ whoami` del hero y a las marcas de `trayectoria`; la mención militar es una sola frase sin repetir rol/misiones/condecoración; la síntesis de equivalencias enlaza a `/trayectoria` y no repite ningún par "original → traslado" de `experiencia.ts`; los países mencionados son 2 o 3 y están todos en la lista de RF-7b; el curso de mouredev/BIG school aparece etiquetado como certificado de 4 h; no aparece ninguna empresa concreta en el interés sectorial; no hay ningún bloque `clave: valor`.
5. No se instala ningún test runner de Node: el sitio sigue siendo estático, sin lógica de negocio más allá de mapear arrays de datos a marcado (constitución, principio 4).

## Riesgos / casos límite a vigilar durante la implementación

- Las fotos reales (`foto-cristian-sobre-mi.jpg` ≈ 1,8 MB) son bastante pesadas comparadas con `foto-cristian.png` (≈ 215 KB); no hay un requisito de peso en la spec, pero conviene vigilar que no degraden visiblemente el tiempo de carga y, si es necesario, comprimirlas sin cambiar el archivo que el usuario ha aportado.
- Confirmar que el enlace a `/trayectoria` de la síntesis (RF-6) usa una ruta relativa válida y no rompe si en el futuro cambia el slug de esa página.
- Revisar que el modificador `--invertida` solo cambie la posición visual (orden CSS) y nunca el orden real de los nodos en el DOM, para no romper el caso límite RF-18 por accidente al implementar.
- Verificar visualmente que el `aspect-ratio` elegido no corta una parte importante de ninguna de las 2 fotos reales (p. ej. la cara en la foto de la historia, o la moto entera en la segunda); si corta mal, ajustar el `aspect-ratio` o el `object-position`, no sustituir la foto.
