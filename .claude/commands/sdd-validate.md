---
description: SDD · Valida la spec RF por RF (tests + Chrome DevTools)
---
Recorre specs/$1/spec.md requisito por requisito. Para cada RF indica cómo se verifica (`astro check`, `astro build` o revisión visual) y el resultado.

Los RF de interfaz, verifícalos con el MCP de Chrome DevTools (incluida la vista móvil de 375 px).

Si algún RF no está cubierto o falla, dilo claramente. NO arregles nada todavía.
Después comprueba los criterios de finalización y dame un veredicto:
¿la spec está cumplida?
