# AGENTS.md — Portfolio de Cristian Antón Valdés
Portfolio profesional en Astro para prácticas/empleo en consultoras tecnológicas, defensa, aeroespacial e ingeniería. Es también el primer caso de estudio del método SDD (Spec-Driven Development) que es la propuesta de valor del autor, así que forma parte del repositorio público que se enseña en candidaturas.

## Stack y estructura
- Astro (última estable), plantilla `minimal`, sin React/Vue/Svelte ni librerías de CSS: CSS propio con variables de tema.
- TypeScript en modo `strict` (solo para tipar `src/data` y las props de los componentes).
- JavaScript en el navegador únicamente donde haga falta (cambio de tema); el resto es estático.
- `/docs` — specs, plan y decisiones del proyecto (SDD). Antes de tocar código revisa `docs/first-prompt-portfolio.md` (encargo original) y `docs/decisiones.md` (decisiones ya tomadas y por qué).
- `/src/data` — contenido (proyectos, experiencia, perfil, principios, soft skills) separado del marcado. Edita aquí, no en las páginas.
- `/src/components` — piezas que se repiten entre páginas (cabecera, nav, pie, selector de tema, tarjeta de proyecto, cabecera de sección).
- `/src/layouts/BaseLayout.astro` — plantilla común a todas las páginas; incluye el script de tema bloqueante en el `<head>`.
- `/src/styles/global.css` — único fichero de estilos; variables de tema en `:root` y `:root[data-theme="light"]`.

## Comandos
```sh
npm install        # instalar dependencias
npm run dev         # servidor local en localhost:4321
npm run build        # build de producción en ./dist
npm run preview       # servir la build localmente
npx astro check        # type-check y diagnósticos de .astro
```
Para arrancar el servidor de desarrollo en segundo plano: `astro dev --background`. Gestiónalo con `astro dev stop`, `astro dev status` y `astro dev logs`.

## Convenciones
- Todos los textos de cara al usuario, en español.
- Nombres de props y campos de datos en español (`titulo`, `descripcion`, `etiqueta`...), consistente con lo ya usado en `src/data`.
- Mobile-first: toda vista nueva debe comprobarse desde 360 px hasta escritorio.
- Imágenes siempre con `aspect-ratio` fijo para que no se deformen (ver `.project-card__media` en `global.css`).
- HTML semántico y accesible: contraste suficiente, navegación por teclado, texto alternativo. Usa `:focus-visible` ya definido, no lo quites.
- Sin comentarios salvo que expliquen un motivo no obvio (ver reglas globales del repo).
- Patrón de referencia para una página nueva: `src/pages/proyectos.astro` (esqueleto mínimo) o `src/pages/index.astro` (página con contenido real) + `BaseLayout`.

## Reglas de dominio / trampas conocidas
- El tema por defecto es **oscuro**, no la preferencia del sistema. El script de `BaseLayout.astro` debe seguir siendo `is:inline` y estar en el `<head>` antes de cualquier CSS que pinte color, o vuelve el parpadeo (FOUC).
- Los marcadores `[PENDIENTE]` en `src/data/*.ts` y en las páginas-esqueleto son intencionados (sin foto real, sin `cv.pdf`, sin URLs de GitHub/LinkedIn, sin repos de proyectos). No los rellenes con datos inventados; si tienes el dato real, sustitúyelo y quita la nota en `docs/decisiones.md`.
- No añadas secciones, textos o funcionalidades que no estén en el boceto (`docs/bodeto-index.png`) o en el encargo (`docs/first-prompt-portfolio.md`), salvo que el usuario lo pida explícitamente en la conversación.
- El texto de stack de la tarjeta "Este portfolio" es intencionadamente distinto del boceto original (decía `HTML · CSS · JS · Vite`, aquí es `Astro · CSS`) porque debe describir la tecnología real del proyecto. Está documentado en `docs/decisiones.md`; no lo "corrijas" de vuelta al boceto.

## Forma de trabajar
- Este proyecto sigue SDD: antes de un cambio no trivial (nueva página con contenido real, nueva sección, cambio de layout), deja claro el plan y, al terminar, anota la decisión técnica y su motivo en `docs/decisiones.md`.
- Cambios pequeños y por fases, alineados con lo que ya se decidió (ver histórico en `docs/decisiones.md`); evita rediseños amplios de una vez.
- Al terminar una tarea, resume: qué se hizo, cómo probarlo, y qué decisiones tomaste por tu cuenta que el usuario debería revisar (igual que se hizo en la fase 1).

# Memoria 
- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas. 
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su porqué) y errores a evitar. 
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte. 
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de dejarlo en la memoria. 
- No guardes nunca datos sensibles (claves, tokens, datos personales). 

## Límites
- ✅ Siempre: editar contenido en `src/data`, seguir los patrones de componentes/layout ya existentes, mantener coherencia visual (variables de `global.css`), actualizar `docs/decisiones.md` cuando tomes una decisión técnica.
- ⚠ Pregunta antes: añadir dependencias nuevas (frameworks de UI, librerías de CSS, fuentes externas), crear páginas o secciones no previstas en el encargo, sustituir un `[PENDIENTE]` por una URL real que no te haya dado el usuario.
- Nunca: inventar URLs de GitHub/LinkedIn/repos, usar imágenes del boceto como si fueran assets reales, añadir frameworks de interfaz (React/Vue/Svelte) o librerías de CSS, quitar o reescribir el histórico de `docs/decisiones.md`.
- ✅Siempre: actualizar `MEMORY.md` al terminar cada tarea.

## Verificación
- `npx astro check` debe dar 0 errores antes de dar por terminado un cambio.
- `npm run build` debe completar sin fallos y generar todas las rutas esperadas.
- Revisión visual: capturar o abrir en navegador a ~360 px (móvil) y ~1280 px (escritorio), en tema oscuro y en tema claro, comprobando que no hay parpadeo al cargar y que el contraste se mantiene.

# Reglas 
- Lee `docs/constitution.md` y la spec activa (`specs/NNN-*/`) antes de tocar código. 
