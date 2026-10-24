# Plan 001 — Rediseño del hero y la cuadrícula de proyectos

Spec de referencia: `specs/001-rediseno-index/spec.md` (estado: aprobada). Este plan no modifica la spec; solo decide el CÓMO.

## Archivos y responsabilidades

| Archivo | Responsabilidad en este cambio |
|---|---|
| `src/pages/index.astro` | Añadir el marcado del marco HUD de la foto (`hero__photo-frame` / `hero__photo-circle` / 4 `hero__photo-corner`) y el `span` del cursor parpadeante tras `$ whoami`. No se reordena el DOM (ver decisión D2). No se toca la sección de proyectos (el `<ProjectCard>` y el `.map` siguen igual; el cambio de columnas es solo CSS). |
| `src/styles/global.css` | Todo el trabajo visual: breakpoints fijos de `.projects-grid`, reordenación visual `.hero__media`/`.hero__content` en escritorio, diámetro dinámico de `.hero__photo-frame`, estilos del marco HUD (`.hero__photo-corner`), animación del cursor (`.hero__cursor` + `@keyframes`), líneas topográficas (`.hero::before`), y ajustes de tema (las nuevas reglas reutilizan variables ya existentes en `:root` / `:root[data-theme="light"]`, no se crean variables nuevas salvo que haga falta un color de opacidad para las líneas). |
| `src/data/perfil.ts` | Sustituir `github: "#"` y `linkedin: "#"` por las URLs reales ya fijadas en la spec aprobada (RF-9, RF-10) y quitar los comentarios `[PENDIENTE]` correspondientes. |
| `src/components/ProjectCard.astro` | Sin cambios: el componente ya es agnóstico al número de columnas; el layout lo decide `.projects-grid` en `global.css`. |
| `src/layouts/BaseLayout.astro` | Sin cambios. El script de tema `is:inline` no se toca: ninguno de los requisitos (RF-1 a RF-11) necesita lógica de tema nueva, solo que las reglas CSS usen las variables de tema existentes. Tocarlo sería un riesgo de FOUC no justificado. |
| `docs/decisiones.md` | Registrar las decisiones de diseño de este plan tras implementarlas (tarea final). |
| `MEMORY.md` | Actualizar estado al cerrar la spec (tarea final). |

## Funciones puras

No aplica: es un cambio puramente de maquetado/CSS sobre contenido estático ya existente en `src/data`. No hay lógica de fechas, cálculos ni transformaciones de datos que requieran una función pura; el único "cálculo" (diámetro de la foto entre 16rem y 20rem) se resuelve con `clamp()` en CSS, no con JavaScript (ver decisión D1).

## Algoritmo / pseudocódigo

### 1. Grid de proyectos en 1/2/4 columnas, nunca 3 (RF-7, RF-8)
Sustituir el `grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr))` actual (causa raíz de las 3 columnas en anchos intermedios) por conteos explícitos en los mismos cortes que pide la spec:
```
.projects-grid { grid-template-columns: 1fr; }                      /* < 40rem (640px) */
@media (min-width: 40rem) { grid-template-columns: repeat(2, 1fr); } /* ≥ 640px */
@media (min-width: 64rem) { grid-template-columns: repeat(4, 1fr); } /* ≥ 1024px */
```
`repeat(N, 1fr)` con `N` fijo no puede dar nunca un número distinto de columnas, sea cual sea el ancho (incluido >1600px, que se queda en 4 columnas sin condición adicional, cumpliendo el caso límite de la spec).

### 2. Orden visual foto/texto en escritorio (RF-1) sin tocar el DOM
```
< 56rem: sin cambios (grid de una columna implícita; el DOM ya trae la foto antes que el texto -> foto arriba, texto debajo, tal y como pide RF-4).
≥ 56rem:
  .hero { grid-template-columns: 1fr auto; align-items: stretch; }
  .hero__content { order: 1; align-self: center; }   /* columna 1fr, izquierda */
  .hero__media   { order: 2; align-self: stretch; justify-self: end; } /* columna auto, derecha */
```
El `order` solo se aplica dentro del `@media (min-width: 56rem)`, así que el orden de lectura/tabulación (DOM) no cambia en ningún viewport; solo cambia la posición visual en escritorio.

### 3. Diámetro dinámico de la foto entre 16rem y 20rem (RF-2)
Dentro del mismo `@media (min-width: 56rem)`:
```
.hero__photo-frame {
  height: clamp(16rem, 100%, 20rem);
  aspect-ratio: 1 / 1;
}
```
Con `.hero { align-items: stretch }` y `.hero__media { align-self: stretch }`, la fila del grid toma como altura el contenido intrínseco más alto (el bloque de texto, que no usa porcentajes), y el `100%` de `.hero__photo-frame` se resuelve contra esa altura ya calculada; `clamp()` la recorta a 16–20rem. Si el bloque de texto cambia de longitud, el diámetro se recalcula solo (cubre el caso límite de la spec); si queda fuera de rango, `clamp()` ya aplica el límite.

### 4. Marco tipo retícula/HUD (RF-3, RF-4)
Estructura (solo en `index.astro`):
```
<div class="hero__photo-frame">
  <span class="hero__photo-corner hero__photo-corner--tl" aria-hidden="true"></span>
  <span class="hero__photo-corner hero__photo-corner--tr" aria-hidden="true"></span>
  <span class="hero__photo-corner hero__photo-corner--bl" aria-hidden="true"></span>
  <span class="hero__photo-corner hero__photo-corner--br" aria-hidden="true"></span>
  <div class="hero__photo-circle">
    <img class="hero__avatar" ... />
  </div>
</div>
```
- `.hero__photo-circle` lleva `overflow: hidden; border-radius: 999px;` (el círculo real, como ahora).
- `.hero__photo-corner` son las 4 esquinas tipo HUD: cada una un cuadrado pequeño con solo dos bordes (p. ej. `--tl` usa `border-top` + `border-left`), posicionadas con `position:absolute` fuera del círculo (`top/left/right/bottom: -0.4rem` según esquina), color `var(--color-accent)`. Van fuera de `.hero__photo-circle` (que tiene `overflow:hidden`) para que no se recorten.
- Por defecto `display: none`; dentro de `@media (min-width: 56rem) { display: block; }`, para que en móvil (RF-4) la foto se vea como hoy (círculo simple de 9rem, sin marco), sin tocar `.hero__avatar` fuera de ese media query.

### 5. Cursor parpadeante (RF-5 + accesibilidad)
Marcado: `<span class="hero__cursor" aria-hidden="true"></span>` justo después del texto `whoami → {perfil.nombre}`.
```
.hero__cursor { display:inline-block; width:0.55em; height:1em; background:var(--color-accent); margin-left:0.25em; vertical-align:-0.15em; animation: parpadeo 1s steps(2,start) infinite; }
@keyframes parpadeo { 50% { opacity:0; } }
@media (prefers-reduced-motion: reduce) { .hero__cursor { animation:none; opacity:1; } }
```
CSS puro: cumple RF-5 y el requisito no funcional de `prefers-reduced-motion` sin JavaScript.

### 6. Líneas topográficas sutiles (RF-6)
```
.hero { position:relative; isolation:isolate; overflow:hidden; } /* contiene el fondo dentro del radio del card */
.hero__content, .hero__media { position:relative; z-index:1; }   /* el texto y la foto quedan por encima */
.hero::before {
  content:"";
  position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image: repeating-radial-gradient(circle at 15% 25%, transparent 0 2.25rem, var(--color-border) 2.25rem 2.3rem),
                     repeating-radial-gradient(circle at 85% 80%, transparent 0 2.75rem, var(--color-border) 2.75rem 2.8rem);
  opacity: 0.35;
}
```
Dos `repeating-radial-gradient` con centros distintos simulan curvas de nivel; usar `var(--color-border)` (ya distinto por tema) + `opacity` baja garantiza que se mantenga "sutil" y legible en ambos temas (RF-11) sin definir color nuevo. `pointer-events:none` y `z-index:0` aseguran que no interfiere con el botón primario ni el texto (RF-6, caso límite de contraste).

## Interfaz
No hay props nuevas: los componentes existentes (`ProjectCard`, `SectionHeading`) no cambian su contrato. El único dato nuevo que cruza de `src/data` a la plantilla son los valores reales de `perfil.github` / `perfil.linkedin`, que ya se consumen igual que hoy (`href={perfil.github}` / `href={perfil.linkedin}` en `index.astro`, sin tocar ese marcado).

## URLs reales de GitHub/LinkedIn (RF-9, RF-10)
La spec aprobada ya fija los valores literales:
- LinkedIn: `https://www.linkedin.com/in/cristian-anton-valdes-a13863444`
- GitHub: `https://github.com/CristianAntVal85`

Al estar escritos como texto del propio RF-9/RF-10 en la spec aprobada, se consideran dato aportado y aprobado por el usuario (no se inventan). El plan los trata como un simple cambio de contenido en `src/data/perfil.ts` (tarea T8). No queda ninguna pregunta abierta sobre estas dos URLs; si al ejecutar la tarea el usuario detecta que no son correctas, debe decirlo antes de aplicar el cambio (no se sustituye nada sin ese visto bueno), y en ese caso la corrección se haría primero en la spec.

## Decisiones técnicas (con alternativa descartada)

- **D1 — Diámetro de la foto con `clamp()` + stretch de grid, no con JavaScript.** Alternativa descartada: medir la altura real del bloque de texto con un `ResizeObserver`/JS y fijar el diámetro en píxeles. Se descarta porque AGENTS.md limita el JS de navegador a "donde haga falta" (hoy solo el cambio de tema); una medición puramente cosmética no lo justifica, añade riesgo de layout shift en la carga (similar al FOUC que ya se evita con cuidado en el tema) y una dependencia de ejecución en cliente que el `clamp()` + CSS Grid stretch resuelve de forma declarativa y sin JS.
- **D2 — Reordenar la foto a la derecha con `order` en CSS, sin tocar el DOM.** Alternativa descartada: cambiar el orden de los `<div>` en `index.astro` (texto antes que foto) y usar `grid-template-columns` normal. Se descarta para minimizar el diff sobre una página ya aprobada en fase 1 y porque el orden de lectura/tabulado actual (foto, luego texto) no cambia respecto al que ya existía y fue aceptado; usar `order` acota el cambio visual exactamente al breakpoint donde lo pide RF-1 (≥56rem) sin tocar el comportamiento ya validado en móvil (RF-4).
- **D3 — Columnas de proyectos con `repeat(N, 1fr)` fijo por breakpoint, no `auto-fill`/`auto-fit`.** Alternativa descartada: ajustar el `minmax()` del `auto-fill` actual para que "normalmente" no caiga en 3 columnas. Se descarta porque el número de columnas de `auto-fill`/`auto-fit` depende del ancho del contenedor dividido por el mínimo de la tarjeta, que es precisamente el mecanismo que hoy produce 3 columnas en anchos intermedios (RF-8); con `repeat(N, 1fr)` el número de columnas es una decisión explícita por breakpoint, no una consecuencia del tamaño de las tarjetas, así que 3 columnas deja de ser posible en cualquier ancho, presente o futuro.
- **D4 — Líneas topográficas con `repeating-radial-gradient` en CSS, no con SVG inline.** Alternativa descartada: un `<svg>` con `<path>` de curvas de nivel irregulares (visualmente más "orgánico" como mapa topográfico real). Se descarta porque un gradiente CSS no añade marcado, se tiñe automáticamente con `var(--color-border)` (ya resuelto por tema, sin duplicar el dibujo para claro/oscuro) y basta para el requisito de la spec ("líneas sutiles", no un mapa topográfico realista); un SVG exigiría mantener el contraste manualmente en ambos temas y es más código para un elemento puramente decorativo.
- **D5 — Marco HUD con 4 `<span>` decorativos posicionados con CSS, no con una imagen/SVG de retícula.** Alternativa descartada: una única imagen o SVG de marco superpuesto sobre la foto. Se descarta porque un SVG/imagen fijo no se adapta automáticamente al diámetro variable de D1 (16–20rem) ni al color de acento por tema sin JS o múltiples variantes; 4 `<span>` con bordes CSS heredan `var(--color-accent)` y se posicionan en porcentaje/rem relativos al propio marco, así que escalan solos con el diámetro.
- **D6 — Cursor parpadeante con `@keyframes` CSS y `prefers-reduced-motion`, no con `setInterval` en JS.** Alternativa descartada: un script que alterne una clase cada 500ms. Se descarta por la misma razón que D1 (JS de navegador solo donde haga falta) y porque CSS respeta `prefers-reduced-motion` de forma nativa con un simple `@media`, sin lógica adicional.

## Estrategia de verificación
1. `npx astro check` → 0 errores (antes de dar por cerrada cualquier tarea de implementación).
2. `npm run build` → sin fallos, genera todas las rutas existentes (`/`, `/proyectos`, `/sobre-mi`, `/trayectoria`, `/metodo`).
3. Revisión visual manual (navegador o MCP de Chrome DevTools), en **tema oscuro y claro**, en estos anchos mínimos:
   - 360px: foto circular simple 9rem centrada arriba del texto (RF-4), sin marco HUD, 1 columna de proyectos (RF-7).
   - ~700–900px (zona donde el `auto-fill` actual daría 3 columnas): confirmar exactamente **2** columnas de proyectos (RF-7, RF-8), no 3.
   - ≥1024px (p. ej. 1280px): foto a la derecha del texto (RF-1), diámetro visualmente entre 16–20rem y alineado con el bloque de texto (RF-2), marco HUD visible en las esquinas (RF-3), 4 columnas de proyectos (RF-7).
   - >1600px: proyectos siguen en 4 columnas (caso límite de la spec).
   - En cualquier ancho: cursor parpadeando tras `$ whoami` (RF-5), líneas topográficas visibles pero sutiles sin tapar el botón primario ni bajar el contraste del texto (RF-6), sin parpadeo de tema al cargar (FOUC).
   - Con "reducir movimiento" activado en el sistema/navegador: el cursor deja de parpadear (requisito no funcional).
4. Confirmar que los botones "GH"/"IN" enlazan a las URLs reales (RF-9, RF-10) inspeccionando el `href` renderizado.
5. No aplica ningún test runner de Node (`node --test` ni similar): el sitio es estático, sin lógica de negocio que testear (constitución, principio 4).

## Riesgos / casos límite a vigilar durante la implementación
- Verificar en el navegador que el truco de `clamp(16rem, 100%, 20rem)` con grid-stretch realmente resuelve el porcentaje contra la altura del bloque de texto y no colapsa a `auto`; si el motor de render usado no lo soporta bien, documentar en `docs/decisiones.md` el fallback adoptado (p. ej. `clamp(16rem, 20vw, 20rem)` como aproximación) y por qué.
- Las esquinas del marco HUD (`-0.4rem` fuera del círculo) deben quedar dentro del padding de `.hero` (1.75rem móvil / 2.5rem escritorio) para no recortarse ni desbordar el card.
- La opacidad de las líneas topográficas debe revisarse en ambos temas por separado: lo que es sutil en oscuro puede no serlo en claro y viceversa (RF-11).
