# Tareas 003 — Página "Sobre mí"

Spec: `specs/003-sobre-mi/spec.md` (aprobada). Plan: `specs/003-sobre-mi/plan.md`.
"RF-n" se refiere siempre a la numeración de `spec.md` (RF-1 a RF-19).

## T1 [x] — Renombrar las 2 fotografías nuevas a kebab-case
En `public/images/`, renombrar `foto_cristian-sobre_mi.jpg` → `foto-cristian-sobre-mi.jpg` y `foto-cristian_moto.jpg` → `foto-cristian-moto.jpg`.
RF: RF-15 (D7 del plan).
Hecho cuando: los 2 archivos existen con el nombre nuevo en `public/images/` y no queda ningún archivo con el nombre antiguo.

## T2 [x] — Crear `src/data/sobreMi.ts`
Añadir los tipos `Foto`, `FormacionItem` y el objeto `sobreMi` (guion de consola, 2 párrafos de historia, 2 párrafos de aficiones/viajes con 2-3 países de ejemplo, los 2 items de formación y las 2 fotos con su `src`/`alt`, apuntando a los nombres renombrados en T1).
RF: RF-2, RF-3, RF-5, RF-6, RF-7, RF-7b, RF-8, RF-9, RF-15.
Hecho cuando: el archivo compila en TypeScript estricto sin errores de tipo propios; los países de `paisesEjemplo` son 2 o 3 y están todos en la lista de RF-7b; los 2 `formacion` coinciden literalmente con RF-8/RF-9 (el curso de mouredev/BIG school incluye "certificado de asistencia, 4 h").

## T3 [x] — Ampliar `src/data/perfil.ts`
Añadir los campos `idiomas` e `interesSectorial` al objeto `perfil` ya existente, sin tocar ningún campo actual.
RF: RF-11, RF-12.
Hecho cuando: `perfil.ts` sigue exportando exactamente los mismos campos de antes más estos 2 nuevos, y `index.astro` sigue compilando sin cambios.

## T4 [x] — Estilos nuevos en `global.css`
Añadir `.sobre-mi`, `.sobre-mi__guion`, `.sobre-mi__fila` (+ modificador `--invertida` con `order` solo en `min-width: 56rem`), `.sobre-mi__texto`, `.sobre-mi__foto` (aspect-ratio fijo, `object-fit: cover`, 1 esquina con bracket de `--color-accent` y halo difuso con `--color-accent-soft`, con la esquina invertida al lado contrario en `--invertida`), `.sobre-mi__formacion` y `.sobre-mi__cierre`, reutilizando variables de tema y `.card`/`.btn`/`.hero__actions` ya existentes.
RF: requisitos no funcionales de coherencia visual, accesibilidad y mobile-first.
Hecho cuando: ninguna regla nueva reutiliza `.hero__photo-frame`/`.hero__photo-circle`/las esquinas HUD (D4 del plan); `npx astro check` y `npm run build` siguen sin errores tras el cambio.

## T5 [x] — Guion de consola + fila 1 (historia y foto) en `sobre-mi.astro`
Sustituir el párrafo `[PENDIENTE]` de `.page-intro` por el guion de consola, y añadir la fila 1 con la foto de `sobreMi.fotoHistoria` y los párrafos de `sobreMi.historia` (recorridos con `.map`, cualquier número), con el modificador `--invertida`.
RF: RF-2, RF-3, RF-4, RF-5, RF-6, RF-16, RF-17, RF-18.
Hecho cuando: en escritorio (≥56rem) el texto queda a la izquierda y la foto a la derecha; en 360px la foto aparece antes que el texto; la historia no repite la frase de `perfil.bio` ni los principios del index.
Corrección post-T10: la primera versión indexaba `historia[0]`/`historia[1]` a mano; al escribir el usuario un 3º párrafo real no se pintaba (TypeScript no lo marca como error, solo es una plantilla que no lo pide). Se cambió a `.map` y el enlace a trayectoria se desacopló a una línea fija aparte.

## T6 [x] — Fila 2 (aficiones, viajes y formación) en `sobre-mi.astro`
Añadir la fila 2, sin modificador `--invertida`, con la foto de `sobreMi.fotoAficiones`, el párrafo de aficiones/viajes y la lista `sobreMi.formacion`.
RF: RF-7, RF-7b, RF-8, RF-9, RF-10, RF-16, RF-17, RF-18.
Hecho cuando: en escritorio la foto queda a la izquierda y el texto a la derecha (zigzag completo respecto a la fila 1); en 360px la foto aparece antes que el texto; no aparecen los chips de `softSkills` del index.

## T7 [x] — Bloque de cierre y llamada a la acción
Añadir, fuera de `.sobre-mi`, la sección `.sobre-mi__cierre.card` a ancho completo con ubicación/disponibilidad/idiomas, el interés sectorial y los 2 botones (`mailto:` y CV.pdf) reutilizando `.hero__actions`.
RF: RF-11, RF-12, RF-13, RF-14, RF-19.
Hecho cuando: los 4 datos del cierre vienen de `perfil.ts` (ninguno escrito a mano en la página); no aparece ninguna empresa concreta ni ningún bloque `clave: valor`; los 2 botones funcionan igual que en el hero del index.

## T8 [x] — Verificación de tipos y build
Ejecutar `npx astro check` y `npm run build`.
RF: criterios de finalización de la spec (todos los RF indirectamente).
Hecho cuando: `astro check` termina con 0 errores y `npm run build` completa sin fallos generando `/sobre-mi` junto con el resto de rutas existentes.

## T9 [x] — Revisión visual en breakpoints y temas
Con el MCP de chrome-devtools, revisar 360px, ~700–900px, 1024px y 1280px, en tema oscuro y claro: zigzag correcto en escritorio (fila 1 texto-izq./foto-der., fila 2 foto-izq./texto-der.), apilado foto-luego-texto en móvil en ambas filas, orden de tabulado igual en todos los anchos (RF-18), bloque de cierre a ancho completo, ninguna de las 2 fotos deformada ni mal recortada, la esquina de acento y el halo difuso se ven con suficiente contraste en ambos temas (y la esquina queda en el lado correcto en cada fila), sin parpadeo de tema, contraste y foco visible conservados.
RF: RF-16, RF-17, RF-18, requisitos no funcionales de accesibilidad y mobile-first.
Hecho cuando: los 8 escenarios (4 anchos × 2 temas) se revisan sin desbordamiento horizontal, sin problema de contraste y sin que el orden de tabulado cambie entre anchos.

## T10 [x] — Comparación de contenido y cierre de la spec
Comprobar que los bloques 1-2 suman aproximadamente 300 palabras, que el guion de consola es distinto al del hero y al de trayectoria, que la mención militar es una sola frase sin repetir metadatos de `trayectoria`, que la síntesis de equivalencias enlaza a `/trayectoria` sin repetir ningún par "original → traslado", y que no queda ningún `[PENDIENTE]`; registrar en `docs/decisiones.md` las decisiones D1–D8 del plan y actualizar `MEMORY.md`.
RF: criterios de finalización de la spec (cierre de documentación), veracidad (no funcional), "Fuera de alcance".
Hecho cuando: la comparación no encuentra ninguna discrepancia, ambos archivos de documentación quedan actualizados sin reescribir su histórico anterior, y la spec 003 queda en condiciones de marcarse como implementada.
Nota de cierre (texto definitivo del usuario, sustituido el `[PENDIENTE]` tras T10): países y formación correctos, sin empresas concretas, sin ficha clave:valor, guion distinto, enlace a trayectoria funcional. La historia final no menciona el paso por las Fuerzas Armadas ni teje una síntesis explícita de equivalencias (RF-5/RF-6 son condicionales "SI... ENTONCES", así que no se incumplen por omitirlo); el enlace a trayectoria se mantiene como línea fija, independiente del texto. Extensión real ≈203 palabras (bloques 1-2), algo por debajo de las ~300 orientativas del NFR de extensión; no bloquea el cierre, queda anotado por si se quiere ampliar más adelante.
