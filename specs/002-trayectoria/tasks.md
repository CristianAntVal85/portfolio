# Tareas 002 — Página de trayectoria profesional

Spec: `specs/002-trayectoria/spec.md` (aprobada). Plan: `specs/002-trayectoria/plan.md`.
"RF-n" en los RF cubiertos se refiere siempre a la numeración real de `spec.md`; cuando una tarea toca la etiqueta visual continua de pantalla se indica aparte como "numeración visual RF-1..RF-6".

## T1 [x] — Tipos y datos de `trayectoria` en `src/data/experiencia.ts`
Añadir los tipos `FuncionTransferible`, `Mision`, `MetadatosOperativos` y `Puesto`, y el array `trayectoria: Puesto[]` con los 3 puestos en orden cronológico inverso, incluyendo nombre del CV, título corto, organización, años, metadatos de Operaciones Especiales y las 6 funciones con su redacción literal.
RF: RF-1, RF-2, RF-6, RF-7, RF-8, RF-9, RF-10, RF-11, RF-12, RF-13, RF-15, RF-18.
Hecho cuando: el archivo compila en TypeScript estricto sin errores de tipo propios, y cada dato (nombre, organización, años, rol, misiones, condecoración, las 6 frases y la frase de cierre) coincide literalmente con la spec.

## T2 [x] — Funciones puras y `experiencia` derivado
Añadir `formatearPeriodo` y `numerarFunciones` en `src/data/experiencia.ts`, y reescribir `ExperienciaItem`/`experiencia` para que se derive de `trayectoria` con `.map`, manteniendo exactamente la misma forma pública (`{ periodo, titulo }`) que usa hoy `index.astro`.
RF: RF-3, RF-4, RF-5, RF-17, RF-19.
Hecho cuando: `index.astro` no se modifica y, tras el cambio, `experiencia` contiene los mismos 3 objetos (mismos `periodo`/`titulo`) que antes de ampliar el archivo.

## T3 [x] — Estilos nuevos en `global.css`
Añadir `.spec-trayectoria`, `.spec-puesto` (+ `__cabecera`, `__nombre`, `__mark`, `__meta`), `.spec-puesto__metadatos`, `.spec-puesto__funciones`/`.spec-funcion` (+ `__etiqueta`, `__original`, `__traslado`), `.spec-puesto__cierre` y `.visually-hidden`, usando solo variables de tema ya existentes.
RF: requisitos no funcionales de coherencia visual, accesibilidad y mobile-first (sección "Requisitos no funcionales" de la spec).
Hecho cuando: ninguna regla nueva usa los selectores `.card` ni `.feature-list`; `npx astro check` y `npm run build` siguen sin errores tras el cambio.

## T4 [x] — Cabeceras y periodos de los 3 bloques en `trayectoria.astro`
Sustituir el esqueleto `[PENDIENTE]` por el recorrido de `trayectoria`, pintando por cada puesto una cabecera simple (nombre del CV) y una línea de metadatos básicos (organización · periodo con `formatearPeriodo`), apilados a toda la anchura.
RF: RF-1, RF-2, RF-3, RF-4, RF-5.
Hecho cuando: la página muestra los 3 puestos en el orden Patrón/Socorrista, Conductor de ambulancia, Soldado-Operaciones Especiales, con "2015 – hoy" / "2020 – 2025" / "2006 – 2013" exactos y sin ninguna etiqueta de excedencia.

## T5 [x] — Metadatos de Operaciones Especiales
Pintar, solo cuando `puesto.metadatos` existe, el rol de navegante, las 2 misiones ISAF (Afganistán, 2011 y 2012) y la Medalla ISAF, con `<dl>` clave/valor.
RF: RF-6, RF-7, RF-8.
Hecho cuando: en pantalla el bloque de metadatos aparece únicamente en Operaciones Especiales; Patrón/Socorrista y Conductor de ambulancia no muestran hueco, encabezado vacío ni `[PENDIENTE]` en su lugar.

## T6 [x] — Las 6 funciones con numeración visual continua
Pintar, en cada bloque, las 2 funciones transferibles como pareja `<dt>`/`<dd>` (original → traslado), con la etiqueta "RF-n" calculada con `numerarFunciones` para que sea continua entre los 3 bloques, y la frase de cierre solo tras las funciones de Operaciones Especiales.
RF: RF-9, RF-10, RF-11, RF-12, RF-13, RF-14, RF-15, RF-16 (numeración visual RF-1..RF-6 en pantalla).
Hecho cuando: en pantalla se lee de forma continua "RF-1"/"RF-2" en Patrón, "RF-3"/"RF-4" en Conductor y "RF-5"/"RF-6" en Operaciones Especiales; la frase "Aquí empieza el método SDD de este portfolio." aparece una sola vez, al final del bloque de Operaciones Especiales, y en ningún otro bloque.

## T7 [x] — Verificación de tipos y build
Ejecutar `npx astro check` y `npm run build`.
RF: criterios de finalización de la spec (todos los RF indirectamente).
Hecho cuando: `astro check` termina con 0 errores y `npm run build` completa sin fallos generando la ruta `/trayectoria` junto con el resto de rutas existentes.

## T8 [x] — Revisión visual en breakpoints y temas
Con el MCP de chrome-devtools, revisar 360px, ~700–900px, 1024px, 1280px y >1600px, en tema oscuro y claro: apilado a toda la anchura (nunca en fila ni en grid), textos largos partiendo línea sin desbordar a 360px, flecha "→" nunca aislada al partir línea, contraste y foco visible conservados, sin parpadeo de tema al cargar; comparar `/` antes y después para confirmar que la sección de experiencia del index no cambia.
RF: requisitos no funcionales de accesibilidad y mobile-first, RF-19.
Hecho cuando: los 10 escenarios (5 anchos × 2 temas) se revisan sin desbordamiento horizontal ni de contraste, y el index queda visualmente idéntico al estado previo al cambio.

## T9 [x] — Comparación literal de contenido contra la spec
Revisar campo a campo que los textos de las 6 funciones (RF-10 a RF-12), la frase de cierre (RF-15) y los datos de RF-2 y RF-6 a RF-8 coinciden literalmente con `spec.md`, que no aparece ninguna función ni mención fuera de las 6 aprobadas (RF-13) y que no se menciona la excedencia del puesto de ambulancia.
RF: RF-13, veracidad (no funcional), "Fuera de alcance" de la spec.
Hecho cuando: la comparación 1:1 no encuentra ninguna discrepancia y la página ya no contiene ningún `[PENDIENTE]`.

## T10 [x] — Cerrar la spec: `docs/decisiones.md` y `MEMORY.md`
Registrar en `docs/decisiones.md` las decisiones D1–D7 del plan (con su alternativa descartada) y actualizar `MEMORY.md` (estado actual, decisiones y próximos pasos), siguiendo el mismo formato usado al cerrar la spec 001.
RF: criterios de finalización de la spec (cierre de documentación).
Hecho cuando: ambos archivos reflejan el cambio sin reescribir su histórico anterior, y la spec 002 queda en condiciones de marcarse como implementada.
