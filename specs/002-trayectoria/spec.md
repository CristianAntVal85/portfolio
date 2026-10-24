# Spec 002 — Página de trayectoria profesional

Estado: implementada

## Contexto y objetivo
La página `trayectoria` es hoy un esqueleto con un único párrafo `[PENDIENTE]`. El index ya resume la experiencia en tres líneas (periodo + título corto), pero no explica qué aporta esa experiencia a un perfil de desarrollo de software, que es justo lo que un reclutador técnico necesita entender de alguien que llega al software desde otra carrera.

El objetivo de esta spec es dar contenido real a `trayectoria`: una línea temporal de los 3 puestos del CV en orden cronológico inverso, con 2 funciones por puesto (6 en total) seleccionadas por ser transferibles al desarrollo de software. Cada función se presenta como una pareja de frases muy cortas, en el mismo tono de terminal que el resto del sitio: la labor real del puesto y su equivalente en desarrollo, sin prosa ni primera persona. El hilo conductor, de más reciente a más antiguo, es: **planificar antes de actuar → diseñar para el fallo → sostener el criterio bajo presión**; se transmite con el orden de los puestos y las propias parejas, y cierra en Operaciones Especiales como origen del método SDD que el propio portfolio demuestra.

Solo trayectoria profesional: la formación queda fuera de esta página.

## Usuarios / actores
- Reclutadores y perfiles técnicos de consultoras tecnológicas y empresas de defensa, aeroespacial e ingeniería que evalúan a Cristian para prácticas o empleo, desde móvil o escritorio.
- Cristian, como editor del contenido de la trayectoria y responsable de aprobar la redacción.

## Historias de usuario
- H1: Como reclutador técnico, quiero ver de un vistazo los puestos de Cristian, de más reciente a más antiguo, con su organización y sus años, para situar su trayectoria en segundos.
- H2: Como reclutador técnico, quiero entender qué capacidades concretas de cada puesto se trasladan al desarrollo de software, para valorar un perfil que viene de otra carrera sin tener que deducirlo yo.
- H3: Como reclutador de defensa o aeroespacial, quiero conocer el rol real en Operaciones Especiales, las misiones y la condecoración, para valorar la experiencia operativa con datos verificables.
- H4: Como visitante, quiero que la página cuente una historia coherente con el método SDD del portfolio, para entender por qué ese método es la propuesta de valor del autor.
- H5: Como Cristian, quiero mantener la trayectoria en una única fuente de datos, para que añadir o corregir un puesto no obligue a editar varias páginas a mano.

## Requisitos funcionales (criterios de aceptación en EARS)

### Estructura y orden
- RF-1: EL SISTEMA MUESTRA en la página `trayectoria` una línea temporal con exactamente 3 puestos, en orden cronológico inverso por fecha de fin (el puesto vigente primero): Patrón/Socorrista, Conductor de ambulancia y Soldado, Operaciones Especiales.
- RF-2: EL SISTEMA MUESTRA para cada puesto su nombre exacto del CV, su organización y su rango de años:
  - "Patrón/Socorrista" · "Pro-Activa/Ebone" · "2015 – hoy"
  - "Conductor de ambulancia" · "Grupo ASV" · "2020 – 2025"
  - "Soldado, Operaciones Especiales" · "Fuerzas Armadas" · "2006 – 2013"
- RF-3: EL SISTEMA MUESTRA las fechas de cada puesto solo con el año (sin mes).
- RF-4: MIENTRAS un puesto siga vigente, EL SISTEMA MUESTRA como fecha de fin la palabra "hoy" (no "actualidad"), igual que en el index.
- RF-5: EL SISTEMA MUESTRA el puesto de Conductor de ambulancia con el rango "2020 – 2025" y SIN ninguna etiqueta, nota o indicación de excedencia.

### Operaciones Especiales
- RF-6: EL SISTEMA MUESTRA en el puesto de Soldado, Operaciones Especiales que Cristian era el navegante del equipo, encargado de diseñar y guiar la infiltración y la exfiltración.
- RF-7: EL SISTEMA MUESTRA en el puesto de Soldado, Operaciones Especiales las 2 misiones ISAF en Afganistán, en 2011 y en 2012.
- RF-8: EL SISTEMA MUESTRA en el puesto de Soldado, Operaciones Especiales la condecoración "Medalla ISAF".

### Funciones transferibles
- RF-9: EL SISTEMA MUESTRA exactamente 2 funciones transferibles por puesto (6 en total), cada una como una pareja de frases cortas (unas 4 palabras cada una, sin verbos en primera persona ni prosa narrativa): la labor real del puesto, seguida de "→" y de su equivalente en desarrollo de software.
- RF-10: EL SISTEMA MUESTRA en el puesto de Patrón/Socorrista estas 2 funciones, con esta redacción:
  - a) "Protocolo según cada rescate" → "Gestión de cada excepción"
  - b) "Embarcación revisada antes de zarpar" → "Infraestructura mantenida antes del fallo"
- RF-11: EL SISTEMA MUESTRA en el puesto de Conductor de ambulancia estas 2 funciones, con esta redacción:
  - c) "Material elegido sin vuelta atrás" → "Especificar antes de implementar"
  - d) "Ruta óptima, criterio entrenado" → "Decisión ágil, criterio fundamentado"
- RF-12: EL SISTEMA MUESTRA en el puesto de Soldado, Operaciones Especiales estas 2 funciones, con esta redacción:
  - e) "Plan minucioso antes de actuar" → "Spec antes que código"
  - f) "Conocer los propios límites" → "Supervisar con criterio la IA"
- RF-13: EL SISTEMA NO MUESTRA ninguna función de los puestos distinta de las 6 de RF-10 a RF-12.

### Narrativa
- RF-14: EL SISTEMA TRANSMITE el hilo "planificar antes de actuar → diseñar para el fallo → sostener el criterio bajo presión" únicamente mediante el orden cronológico inverso de los puestos (RF-1) y las parejas de RF-10 a RF-12, sin añadir texto narrativo por función ni exigir que cada puesto corresponda a una única etapa del hilo.
- RF-15: EL SISTEMA MUESTRA en el puesto de Soldado, Operaciones Especiales, tras sus 2 funciones, una única frase de cierre breve, sin primera persona, que lo presenta como origen del método SDD del portfolio, con esta redacción: "Aquí empieza el método SDD de este portfolio."
- RF-16: EL SISTEMA, en la función f), MANTIENE la coherencia con el principio "IA supervisada y segura" ya publicado en el perfil, sin contradecirlo ni duplicar su texto.

### Fuente de datos
- RF-17: EL SISTEMA OBTIENE todo el contenido de la trayectoria (puestos, organizaciones, años, rol, misiones, condecoraciones y funciones) de una única fuente de datos de experiencia, la misma que ya alimenta el index, ampliada; la página no contiene datos de la trayectoria escritos a mano.
- RF-18: La fuente de datos de experiencia PERMITE representar, por cada puesto: el nombre del puesto según el CV, el título corto que hoy usa el index, la organización, el año de inicio, el año de fin o su condición de vigente, y la lista de funciones transferibles (cada una con la función original y su traslado al software); y, solo cuando el puesto los tenga, el rol dentro del equipo, las misiones (con lugar y año) y las condecoraciones.
- RF-19: MIENTRAS esté vigente esta spec, EL SISTEMA MUESTRA en el index la sección de experiencia exactamente igual que antes del cambio (mismos 3 periodos y mismos títulos cortos: "Patrón de salvamento", "Emergencias sanitarias", "Operaciones Especiales · FF. AA.").

## Requisitos no funcionales
- Idioma: todo el texto visible en español; nombres de campos de datos en español, coherentes con los ya usados en `src/data` (`titulo`, `descripcion`, `periodo`...) (constitución, principio 6).
- Veracidad: ningún dato distinto de los fijados en RF-2 y RF-6 a RF-12; no se inventan fechas, organizaciones, misiones ni condecoraciones (constitución, principio 2; AGENTS.md).
- Tono: las frases de RF-10 a RF-12 y RF-15 transmiten método, disciplina y criterio; ninguna debe sugerir azar, improvisación o impulsividad, coherente con la tesis SDD del portfolio.
- Accesibilidad: HTML semántico (la línea temporal debe leerse en orden correcto con lector de pantalla y sin depender del color ni de la posición visual), contraste suficiente en ambos temas, foco visible conservado.
- Mobile-first: comprobado desde 360 px hasta escritorio; en móvil la línea temporal se lee en una sola columna sin desbordamiento horizontal.
- Coherencia visual: solo variables de tema existentes en `global.css`, legible en tema oscuro y claro.
- Sin dependencias nuevas ni JavaScript de navegador: la página es estática (constitución, principio 1).

## Casos límite
- Puesto nuevo en el futuro: si se añade un puesto a la fuente de datos, la página lo muestra en su posición según RF-1 sin cambiar el marcado de la página. La regla de "2 funciones por puesto" aplica a los 3 puestos de esta spec; un puesto nuevo requiere su propia selección curada aprobada.
- Fin del puesto vigente: si Patrón/Socorrista deja de estar vigente, se sustituye "hoy" por el año de fin en la fuente de datos y el resto de la página no cambia.
- Excedencia sin etiqueta: mostrar "2020 – 2025" con año de fin cerrado indica que el puesto no está activo; no debe mostrarse "hoy", ni puntos suspensivos, ni un rango abierto en ese puesto.
- Solapamiento de fechas: Patrón/Socorrista (2015 – hoy) y Conductor de ambulancia (2020 – 2025) se solapan, y Conductor de ambulancia empezó después. Por eso el orden se fija por fecha de fin (RF-1), no por fecha de inicio; el diseño no debe sugerir que los puestos son consecutivos ni que uno sustituyó al otro.
- Campos opcionales: Patrón/Socorrista y Conductor de ambulancia no tienen rol de equipo, misiones ni condecoraciones; la página no debe mostrar huecos, encabezados vacíos ni `[PENDIENTE]` en su lugar.
- Coherencia con el index: los títulos cortos del index y los nombres del CV son distintos a propósito (p. ej. "Patrón de salvamento" frente a "Patrón/Socorrista"); un cambio de redacción en uno no debe alterar el otro.
- Textos largos en móvil: nombres como "Soldado, Operaciones Especiales" y las organizaciones con barra ("Pro-Activa/Ebone") deben partir línea correctamente a 360 px sin desbordar.
- Parejas en móvil y con lector de pantalla: si una pareja no cabe en una línea a 360 px, puede partirse, pero la flecha "→" nunca debe quedar sola al inicio de una línea separada de ambas frases; con lector de pantalla, la relación entre labor real y equivalente en desarrollo debe entenderse sin depender de que se lea el símbolo "→".
- Frase de cierre: solo aparece en Soldado, Operaciones Especiales (RF-15); los otros puestos no muestran frase de cierre ni hueco en su lugar.

## Fuera de alcance
- Estudios y formación de cualquier tipo.
- Modificar `src/pages/index.astro` o su presentación actual de la sección de experiencia (RF-19).
- Añadir cualquier función distinta de las 6 aprobadas; en concreto, no se incluyen: turnos de vigilancia/disciplina de horarios, "la opción menos mala"/deuda técnica consciente, fatiga/nocturnidad como función del puesto de ambulancia, estudio del objetivo/patrones, "toda situación puede empeorar", planificación de alternativas/rollback ni asistencia psicológica a víctimas.
- Mostrar o mencionar la excedencia.
- Enlaces externos, documentos acreditativos o imágenes de la condecoración o de las misiones.
- Rediseño de otras páginas, de la cabecera, el pie o la navegación.

## Criterios de finalización
- RF-1 a RF-19 verificados en tema oscuro y claro, de 360 px a escritorio: `astro check` con 0 errores, `astro build` sin fallos generando la ruta `/trayectoria`, y revisión visual (manual o MCP de Chrome DevTools) (constitución, principio 4).
- Los textos de las 6 funciones coinciden literalmente con RF-10 a RF-12, la frase de cierre con RF-15, y los datos de RF-2 y RF-6 a RF-8 coinciden literalmente con esta spec.
- El index, comparado antes y después, muestra la sección de experiencia sin ningún cambio visible.
- La página `trayectoria` ya no contiene ningún `[PENDIENTE]`.
- `docs/decisiones.md` y `MEMORY.md` actualizados con las decisiones tomadas en la implementación.

## Dudas abiertas
- Ninguna. La duda anterior sobre la correspondencia del hilo narrativo queda resuelta por el cambio a formato corto: el hilo se transmite con el orden de los puestos y la frase de cierre de RF-15, sin asignar una etapa por puesto (RF-14).
