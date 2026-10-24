# Spec 001 — Rediseño del hero y la cuadrícula de proyectos del index

Estado: implementada

## Contexto y objetivo
El `index` actual (fase 1) es un esqueleto fiel al boceto original, correcto pero sin un acabado de diseño deliberado. El objetivo de esta spec es dar al hero y a la sección de proyectos un diseño moderno, coherente con la identidad "técnica/espía" que ya sugieren la paleta oscura y la foto de referencia (motivos tipo HUD, coordenadas, retícula), sin salirse del contenido ya aprobado ni añadir dependencias nuevas. Es la primera iteración de diseño real tras el esqueleto de la fase 1.

## Usuarios / actores
- Reclutadores y perfiles técnicos de consultoras y empresas de defensa, aeroespacial e ingeniería que visitan el portfolio desde el móvil o el escritorio.
- Cristian, como editor del contenido (`src/data`) y responsable de aprobar el diseño.

## Historias de usuario
- H1: Como visitante de escritorio, quiero que la foto tenga presencia visual fuerte y una composición cuidada junto al texto, para formarme una impresión profesional en los primeros segundos.
- H2: Como visitante de móvil, quiero seguir viendo una foto bien proporcionada y legible, sin que el rediseño de escritorio rompa la composición en pantallas pequeñas.
- H3: Como visitante, quiero ver los proyectos en una cuadrícula visualmente equilibrada en cualquier tamaño de pantalla, sin filas descompensadas.
- H4: Como reclutador que quiere contactar o ver el perfil, quiero que los botones de GitHub y LinkedIn lleven a los perfiles reales.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA, en viewports de escritorio (≥56rem), MUESTRA la foto de perfil a la derecha del bloque de texto del hero.
- RF-2: EL SISTEMA, en viewports de escritorio (≥56rem), AJUSTA el diámetro de la foto a la altura real del bloque de texto (desde el borde superior de la insignia "Disponible" hasta el borde inferior de la fila de botones de acción), con un mínimo de 16rem (256px) y un máximo de 20rem (320px).
- RF-3: EL SISTEMA, en viewports de escritorio (≥56rem), MUESTRA la foto con un marco decorativo tipo retícula/HUD: el anillo circular continuo ya usado en todos los tamaños, combinado con 4 esquinas tipo mira en las 4 puntas diagonales (superior-izquierda, superior-derecha, inferior-izquierda, inferior-derecha), coherente con la estética técnica ya presente en la foto.
- RF-4: EL SISTEMA, en viewports por debajo de 56rem, MUESTRA la foto centrada encima del texto del hero, con el tamaño actual (9rem de diámetro), sin aplicar el RF-2.
- RF-5: EL SISTEMA MUESTRA un cursor de terminal parpadeante al final de la línea "$ whoami → Cristian Antón Valdés".
- RF-6: EL SISTEMA MUESTRA, en la tarjeta del hero, un motivo decorativo de líneas topográficas sutiles, sin interferir con la legibilidad del texto ni del botón primario.
- RF-7: EL SISTEMA MUESTRA la cuadrícula de proyectos en 1 columna por debajo de 640px, 2 columnas entre 640px y 1024px, y 4 columnas a partir de 1024px.
- RF-8: EL SISTEMA, EN NINGÚN viewport, MUESTRA la cuadrícula de proyectos en 3 columnas.
- RF-9: EL SISTEMA ENLAZA el botón "IN" a `https://www.linkedin.com/in/cristian-anton-valdes-a13863444`.
- RF-10: EL SISTEMA ENLAZA el botón "GH" a `https://github.com/CristianAntVal85`.
- RF-11: SI el usuario cambia entre tema oscuro y claro, ENTONCES EL SISTEMA mantiene legibles el marco de la foto, el cursor parpadeante y las líneas topográficas en ambos temas.

## Requisitos no funcionales
- Accesibilidad: el cursor parpadeante respeta `prefers-reduced-motion` (se detiene o no aparece si el visitante lo tiene activado).
- Sin dependencias nuevas: los motivos decorativos (retícula, líneas topográficas) se hacen con CSS/SVG inline (constitución, principio 1).
- Mobile-first: hero y cuadrícula de proyectos comprobados desde 360px hasta escritorio ancho (constitución/AGENTS.md).
- Idioma: sin cambios, todo en español (constitución, principio 6).

## Casos límite
- Si en el futuro el texto del hero cambia de longitud (bio más larga o más corta), el diámetro se recalcula dentro del rango 16rem–20rem del RF-2; si la altura real del bloque de texto queda fuera de ese rango, prevalece el límite (16rem o 20rem) aunque entonces el borde ya no coincida exactamente con el texto.
- Pantallas muy anchas (>1600px): la cuadrícula se mantiene en 4 columnas, no en más.
- Con los 4 proyectos actuales y 2 columnas, deben quedar 2 filas completas de 2, nunca 3+1.
- El marco tipo retícula y las líneas topográficas no deben bajar el contraste del texto por debajo de lo exigido en AGENTS.md.

## Fuera de alcance
- Cambiar el contenido real de `src/data/proyectos.ts` (siguen siendo los mismos 4 proyectos, con sus `[PENDIENTE]`).
- Rediseñar "cómo desarrollo", "experiencia", "soft skills", la cabecera, el pie o las páginas `proyectos`/`sobre-mi`/`trayectoria`/`metodo`.
- El fondo de "planificación de rutas" para todo el sitio (curvas de nivel, código, navegación) previsto para una fase posterior: aquí se aplica, de forma acotada, solo a la tarjeta del hero (RF-6).
- Añadir enlaces reales a los repositorios de cada proyecto (siguen apuntando a `#`).
- Qué pasa si el número de proyectos deja de ser múltiplo de las columnas (p. ej. 5 proyectos en 4 columnas): la última fila queda incompleta, no se fuerza a evitarlo.

## Criterios de finalización
- RF-1 a RF-11 verificados en oscuro y claro, de 360px a escritorio ancho: `astro check` sin errores, `astro build` sin fallos, revisión visual (manual o MCP de Chrome DevTools) confirmando cada RF (constitución, principio 4).
- La cuadrícula de proyectos comprobada explícitamente en un ancho donde el `grid-template-columns: repeat(auto-fill, ...)` actual daría 3 columnas, para confirmar que ya no ocurre.
- `docs/decisiones.md` y `MEMORY.md` actualizados con las decisiones de diseño tomadas durante la implementación.

## Dudas abiertas
Ninguna por ahora: la única duda abierta (límites del diámetro de la foto) quedó resuelta en el RF-2 (16rem–20rem).
