# Spec 003 — Página "Sobre mí"

Estado: implementada

## Contexto y objetivo
La página `sobre-mi` es hoy un esqueleto con un único párrafo `[PENDIENTE]`. El index ya cubre el pitch profesional (bio corta, principios de cómo se desarrolla, soft skills, timeline resumido) y `trayectoria` ya cubre el detalle de cada puesto con sus equivalencias "labor real → traslado a software". Si "sobre mí" repitiera cualquiera de esas dos cosas, sería una tercera versión de lo mismo.

El objetivo de esta spec es dar contenido real a `sobre-mi` centrado en lo único que ninguna otra página cuenta: **quién es Cristian como persona** — por qué cambia de profesión, cómo es fuera del código (aficiones, situación formativa actual) y su situación práctica (ubicación, disponibilidad, idiomas, interés sectorial), cerrando con la misma llamada a la acción que el hero del index.

## Usuarios / actores
- Reclutadores y perfiles técnicos de consultoras tecnológicas y empresas de defensa, aeroespacial e ingeniería que, tras ver el index, quieren entender la motivación y la persona detrás del perfil antes de decidir si encaja.
- Cristian, como editor del contenido y responsable de aprobar la redacción final.

## Historias de usuario
- H1: Como reclutador que ya ha visto el pitch del index, quiero entender por qué Cristian cambia de profesión y en qué momento se interesó por programar, para valorar si la motivación es sólida y no un capricho.
- H2: Como reclutador, quiero saber cómo es Cristian fuera del currículum (aficiones, qué estudia ahora), para hacerme una idea de la persona, no solo del perfil técnico.
- H3: Como reclutador, quiero ver de un vistazo la ubicación, la disponibilidad, el nivel de idiomas y el interés sectorial, para valorar el encaje logístico sin tener que buscarlo en otra página.
- H4: Como visitante que ya conoce la trayectoria militar por la página de `trayectoria`, no quiero volver a leer la misma ficha de datos aquí, sino solo una mención de contexto personal.
- H5: Como Cristian, quiero que este texto sea sincero y concreto, sin sonar a eslogan ni inflar logros (en particular el curso de 4 horas), para que la página genere confianza.

## Requisitos funcionales (criterios de aceptación en EARS)

### Estructura general
- RF-1: EL SISTEMA MUESTRA en `sobre-mi` tres bloques de contenido, en este orden: (1) historia personal, (2) quién es fuera del código, (3) cierre práctico con llamada a la acción.
- RF-2: EL SISTEMA ABRE la página con un guiño visual tipo consola, coherente con el resto del sitio (en el mismo estilo que el `$ whoami` del hero o las marcas `##`/`//` de trayectoria), antes del contenido narrativo, y con un texto distinto al ya usado en esas otras páginas.

### Bloque 1 — Historia personal
- RF-3: EL SISTEMA MUESTRA una historia en primera persona, en varios párrafos breves (redactados: 3), que cubre: a qué se dedicaba antes, en qué momento se interesó por programar, y por qué decide el cambio de profesión ahora. *(Corregido tras la implementación: la redacción final del usuario usa 3 párrafos cortos en vez de los 2 previstos al escribir la spec; la plantilla recorre `historia` con un bucle, no por índice fijo, así que admite cualquier número de párrafos.)*
- RF-4: EL SISTEMA NO REPITE en este bloque la frase de la bio del index (`perfil.bio`) ni los principios de "cómo desarrollo" ya publicados ahí.
- RF-5: SI el contenido menciona el paso por las Fuerzas Armadas, ENTONCES EL SISTEMA lo presenta como una única frase breve de contexto personal, sin repetir el rol, las misiones ISAF ni la condecoración que ya muestra `trayectoria`.
- RF-6: SI el contenido se refiere a la relación entre la experiencia previa (navegación, emergencias) y el desarrollo de software, ENTONCES EL SISTEMA la resume en una idea única de cierre de párrafo (no como una lista de equivalencias puesto a puesto) y enlaza a `trayectoria` para quien quiera el detalle completo.

### Bloque 2 — Quién es fuera del código
- RF-7: EL SISTEMA MUESTRA las aficiones de Cristian (alpinismo, trail running, MTB, y viajar como mochilero por cuenta propia, sin agencia ni viaje organizado) como parte de su personalidad, sin presentarlas como metáfora forzada de una competencia profesional ya cubierta en el index.
- RF-7b: EL SISTEMA, al mencionar los viajes, ILUSTRA el carácter de mochilero autogestionado con 2 o 3 países a modo de ejemplo (de la lista real: Marruecos ×5, Tailandia ×2, Filipinas, Jordania, Brasil, EE. UU., México, Polonia, Ucrania, Rumanía), SIN listar todos los países ni inventar ninguno fuera de esa lista.
- RF-8: EL SISTEMA MUESTRA, en este mismo bloque, la situación formativa actual: el CFGS DAW en el IES San Vicente (fin previsto en 2027).
- RF-9: EL SISTEMA MUESTRA el curso "Desarrollo con IA" (mouredev / BIG school) presentado como formación reciente, identificado explícitamente como un certificado de asistencia de 4 horas, sin darle apariencia de una acreditación de mayor alcance.
- RF-10: EL SISTEMA NO MUESTRA en este bloque los chips de soft skills ya publicados en el index (`softSkills`).

### Bloque 3 — Cierre práctico
- RF-11: EL SISTEMA MUESTRA la ubicación, la disponibilidad para prácticas FCT (marzo de 2027) y el nivel de inglés (A1, en curso, en tono positivo).
- RF-12: EL SISTEMA MUESTRA el interés de Cristian por los sectores de defensa, aeroespacial e ingeniería, en términos genéricos, SIN nombrar empresas concretas.
- RF-13: EL SISTEMA NO MUESTRA un bloque de ficha técnica tipo "config" (clave: valor) con el stack tecnológico; el interés sectorial y los datos prácticos se presentan en prosa o lista breve, no como una ficha de configuración.
- RF-14: EL SISTEMA MUESTRA al final de la página una llamada a la acción equivalente a la del hero del index: enlace de correo (`mailto:`) y enlace al CV en PDF.

### Imágenes y disposición
- RF-15: EL SISTEMA MUESTRA en esta página 2 fotografías distintas a la del hero del index: una junto al bloque 1 (historia personal) y otra junto al bloque 2 (quién es fuera del código / aficiones y viajes).
- RF-16: EN ESCRITORIO, EL SISTEMA DISPONE el bloque 1 y su foto en una fila (texto en una columna, foto en la otra) y el bloque 2 y su foto en la fila siguiente, con la foto en el lado contrario al de la fila anterior (disposición en zigzag).
- RF-17: EN MÓVIL, EL SISTEMA APILA cada bloque con su foto en una sola columna, con el mismo orden de apilado en ambas filas (p. ej. foto y luego texto en las dos), sin alternar el orden entre bloques.
- RF-18: EL SISTEMA MANTIENE el orden de lectura y de tabulado de cada bloque igual en todos los anchos de pantalla, aunque la posición visual de la foto cambie entre escritorio y móvil (mismo criterio ya usado en el hero del index).
- RF-19: EL SISTEMA MUESTRA el bloque 3 (cierre práctico y llamada a la acción) a ancho completo, fuera de la cuadrícula de texto/foto de los bloques 1 y 2.

## Requisitos no funcionales
- Extensión: el texto narrativo de los bloques 1 y 2 (sin contar el bloque 3 ni la CTA) tiene una longitud aproximada de 300 palabras, de forma que se lea en torno a 1-2 minutos (constitución, principio no explícito pero coherente con el resto de páginas, pensadas para lectura rápida).
- Veracidad: ningún dato distinto de los ya confirmados en esta spec (ubicación, disponibilidad, idioma, formación, aficiones, países visitados); no se inventan fechas, cursos, logros ni países fuera de la lista de RF-7b (constitución, principio 2; AGENTS.md).
- Tono: sincero y concreto, sin eslóganes; el curso de 4 horas se presenta con su tamaño real (RF-9), no como un grado o certificación formal.
- Idioma: todo el texto visible en español; nombres de campos de datos en español, coherentes con los ya usados en `src/data` (constitución, principio 6).
- Accesibilidad: imagen con texto alternativo descriptivo, contraste suficiente en ambos temas, navegación por teclado, foco visible conservado.
- Mobile-first: comprobado desde 360 px hasta escritorio, en tema oscuro y claro, sin desbordamiento horizontal.
- Coherencia visual: solo variables de tema ya existentes en `global.css`; sin dependencias nuevas ni JavaScript de navegador añadido (constitución, principio 1).
- Datos variables en `src/data`: los datos puntuales que pueden cambiar sin cambiar el tono del texto (ubicación, disponibilidad, nivel de idioma) deben poder actualizarse sin reescribir la narrativa (constitución, principio 3: contenido fuera del marcado).

## Casos límite
- Cambio de disponibilidad o de nivel de idioma: si en el futuro Cristian ya no busca FCT en marzo de 2027 o su inglés sube de nivel, debe poder corregirse el dato puntual sin reescribir los párrafos de historia personal.
- Guiño de consola duplicado: el texto del guiño de RF-2 no debe coincidir literalmente con el `$ whoami` del hero ni con las marcas de `trayectoria`, para que cada página se distinga por su propio "prompt".
- Mención militar fuera de tono: la frase de RF-5 no debe sonar épica ni dar detalles operativos (coherente con AGENTS.md: "disciplina y método, no que parezca un currículum de otra profesión").
- Enlace a trayectoria roto o ausente: si la síntesis de RF-6 enlaza a `/trayectoria`, el enlace debe apuntar a una ruta que exista en el sitio.
- Imagen ausente: si en algún momento la fotografía de RF-15 no estuviera disponible, la página no debe mostrar un hueco roto ni un `alt` vacío; hoy esto no aplica porque la foto ya existe en `public/images/`.
- Textos largos en móvil: los 2 párrafos de la historia y el bloque de aficiones/formación no deben desbordar ni partirse de forma ilegible a 360 px.

## Fuera de alcance
- Repetir los chips de soft skills del index (RF-10).
- Repetir las equivalencias "labor real → traslado" puesto por puesto de `trayectoria`; solo una síntesis y un enlace (RF-6).
- Un bloque de ficha técnica tipo "config" con el stack tecnológico (RF-13).
- Nombrar empresas concretas en el interés sectorial (RF-12).
- Detalles operativos del servicio militar: misiones, condecoración o rol de equipo (ya están en `trayectoria`).
- Cualquier sección o funcionalidad no contemplada en el encargo original (`docs/first-prompt-portfolio.md`) ni en esta spec.
- Rediseño de la cabecera, el pie, la navegación o cualquier otra página.

## Criterios de finalización
- RF-1 a RF-19 verificados en tema oscuro y claro, de 360 px a escritorio: `astro check` con 0 errores, `astro build` sin fallos generando la ruta `/sobre-mi`, y revisión visual (manual o MCP de Chrome DevTools) (constitución, principio 4).
- La página `sobre-mi` ya no contiene ningún `[PENDIENTE]`.
- Los datos nuevos de contenido (formación actual, aficiones, idioma) viven en `src/data`, no escritos a mano en la página.
- `docs/decisiones.md` y `MEMORY.md` actualizados con las decisiones tomadas en la implementación.

## Dudas abiertas
- Ninguna. Las 5 ambigüedades planteadas durante la entrevista (foto, guiño de consola, mención militar, extensión, mención de empresas concretas) quedan resueltas en RF-2, RF-5, RF-12, RF-15 y en el requisito no funcional de extensión.
