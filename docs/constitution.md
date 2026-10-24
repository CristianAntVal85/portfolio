# Constitución del proyecto — Portfolio de Cristian Antón Valdés

Principios innegociables. Cualquier spec, plan o código que los contradiga se corrige antes de continuar.

1. **Stack simple**: Astro + CSS propio, sin React/Vue/Svelte ni librerías de UI/CSS; cualquier dependencia nueva requiere aprobación explícita del usuario.
2. **La spec manda**: nada se implementa sin spec o encargo aprobado (`docs/first-prompt-portfolio.md`, `specs/`); si falta una decisión, se pregunta, nunca se inventa.
3. **Lógica fuera de la interfaz**: todo el contenido vive en `src/data/*.ts`; componentes y páginas solo lo renderizan, sin datos repetidos a mano.
4. **Tests sin dependencias nuevas**: se verifica con `astro check` (0 errores) + `astro build` (sin fallos) + revisión visual (manual o Chrome DevTools), en oscuro/claro y de 360 px a escritorio; no se instala ningún framework de test.
5. **Datos del usuario**: cero recogida de datos de visitantes (sin analítica, formularios ni cookies de terceros); los únicos datos personales publicados son los del propio autor, y solo con su aprobación.
6. **Idioma**: textos e identificadores de código en español; sin comentarios salvo que el motivo no sea obvio.
