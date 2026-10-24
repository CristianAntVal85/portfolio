## Rol
Actúa como desarrollador frontend senior. Escribe código simple, claro y bien organizado: lo entiende alguien que empieza, pero un tech lead lo leería sin encontrar malas prácticas, porque el repositorio será público y forma parte de mi candidatura.

## Contexto
Soy Cristian Antón, estudiante de 2º de DAW, y quiero crear desde cero mi portfolio profesional. Busco prácticas y empleo en consultoras tecnológicas y empresas de defensa, aeroespacial e ingeniería (tipo Indra o PLD Space) que trabajen con soluciones basadas en IA.

Mi propuesta de valor no es una lista de tecnologías, sino un método: desarrollo con IA dirigido por especificación (SDD), supervisado y seguro. Además, vengo de 15 años en entornos críticos (Fuerzas Armadas, salvamento, emergencias), y esa disciplina de planificar antes de actuar es el hilo conductor del portfolio.

El portfolio se construirá por fases y con SDD. Este propio proyecto es mi primer caso de estudio, así que la especificación, el plan y las decisiones deben quedar documentados en el repositorio.

## Idea del portfolio
- Un index breve, pensado para alguien que tiene un minuto: solo lo esencial y una pincelada que despierte curiosidad.
- El resto de información en páginas propias enlazadas desde la navegación: proyectos, sobre mí, trayectoria y método.
- Estilo técnico tipo consola: tipografía monoespaciada, tema oscuro por defecto con opción de cambiar a claro, y un color de acento azul.
- En una fase posterior trabajaremos un fondo inspirado en planificación de rutas: curvas de nivel, código y elementos de navegación.

Te adjunto el boceto del index como referencia visual. El resultado debe ser igual o muy parecido.

## Tarea (fase 1: esqueleto y primera aproximación)
Crea el esqueleto navegable del portfolio. Es una primera aproximación: después escribiremos la especificación y afinaremos cada página.
1. `index`: lo más parecido posible al boceto adjunto.
2. Las páginas enlazadas desde la navegación, con su estructura básica y contenido [PENDIENTE]:
   - proyectos
   - sobre mí
   - trayectoria
   - método
3. Cabecera, navegación, pie y cambio de tema compartidos por todas las páginas, para que todo el sitio sea coherente.

## Restricciones y reglas
Técnicas:
- Astro, en su última versión estable, partiendo de la plantilla mínima.
- Sin frameworks de interfaz (React, Vue…) ni librerías de CSS: CSS propio con variables para los temas claro y oscuro.
- JavaScript en el navegador solo donde haga falta (cambio de tema). El tema se aplica antes de pintar la página, para que no haya parpadeo.
- Sigue esta estructura desde el inicio:
  ```
  /docs                 specs, planes y decisiones (SDD)
  /public               imágenes, cv.pdf y favicon
  /src
    /components         cabecera, pie, cambio de tema, tarjeta de proyecto…
    /layouts            plantilla base común a todas las páginas
    /pages              index, proyectos, sobre-mi, trayectoria, metodo
    /data               datos de proyectos y experiencia, separados del marcado
    /styles             estilos globales y variables de tema
  ```
- Cada pieza que se repite entre páginas es un componente; nada de código duplicado.
- Incluye un `README.md` con lo que es el proyecto y cómo arrancarlo.
- HTML semántico y accesible: contraste suficiente, navegación por teclado y textos alternativos.
- Mobile first: debe verse bien desde 360 px hasta escritorio.
- Imágenes con proporciones fijas para que nunca se deformen.
- El tema elegido se recuerda entre visitas.
- Todos los textos en español.
- No añadas secciones, funcionalidades ni textos que no estén en el boceto o en este mensaje. Si falta información, usa un marcador como [PENDIENTE] y apúntalo.

## Formato de salida
1. Crea los archivos directamente en la carpeta del proyecto, respetando la estructura indicada. Anota en `docs/decisiones.md` cada decisión técnica que tomes y su motivo.
2. Al terminar, responde con:
   - Un resumen de 3-4 líneas de lo que has creado.
   - Los pasos para probarlo.
   - Las diferencias que veas entre tu index y el boceto.
   - Cualquier decisión que hayas tomado por tu cuenta y que yo deba revisar.
