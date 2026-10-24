# Portfolio — Cristian Antón Valdés

Portfolio profesional construido con [Astro](https://astro.build), siguiendo un desarrollo dirigido por especificación (SDD): primero se documenta la especificación y las decisiones en `/docs`, después se implementa.

La propuesta de valor no es una lista de tecnologías, sino un método: desarrollo con IA dirigido por especificación, supervisado y seguro.

## Estructura del proyecto

```text
/docs                 specs, planes y decisiones (SDD)
/public               imágenes, cv.pdf y favicon
/src
  /components          cabecera, pie, cambio de tema, tarjeta de proyecto…
  /layouts              plantilla base común a todas las páginas
  /pages                index, proyectos, sobre-mi, trayectoria, metodo
  /data                 datos de proyectos y experiencia, separados del marcado
  /styles               estilos globales y variables de tema
```

## Cómo arrancarlo

Requiere Node.js 22 o superior.

```sh
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:4321`.

| Comando           | Acción                                          |
| :----------------- | :----------------------------------------------- |
| `npm install`       | Instala las dependencias                          |
| `npm run dev`       | Arranca el servidor local en `localhost:4321`     |
| `npm run build`     | Genera la versión de producción en `./dist/`      |
| `npm run preview`   | Sirve localmente la build de producción           |

## Estado

Fase 1 (esqueleto navegable): hecha. El index sigue el boceto de referencia; el resto de páginas tienen estructura básica con contenido marcado como `[PENDIENTE]`. Los detalles de cada decisión técnica están en [`docs/decisiones.md`](./docs/decisiones.md).
