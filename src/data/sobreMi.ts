export interface Foto {
  src: string;
  alt: string;
}

export interface FormacionItem {
  nombre: string;
  centro: string;
  nota: string;
}

export const sobreMi = {
  guionConsola: "cat sobre-mi.md",

  historia: [
    "Este es un hueco para presentaros mi lado más alejado de las máquinas. De hecho, como podéis ver en mi trayectoria, soy bastante nuevo en esto.",
    "Resumiendo, hay 2 cosas que siempre se repiten. Deporte y montaña. Ya sea ponerme las zapatillas y salir a correr un rato, con bici, incluso moto, pero como dicen... la cabra tira al monte.",
    "Diariamente es un entrenamiento para cuando puedo reunir unos cuantos días juntos, y aquí es cuando pongo a prueba lo que he hecho a lo largo del año. Aprovecho para ir a Pirineos, realizar rutas a pie de varios días y así llegar a sitios a los que únicamente unos pocos llegan.",
  ],
  fotoHistoria: {
    src: "/images/foto-cristian-sobre-mi.jpg",
    alt: "Cristian subiendo por una vía ferrata entre rocas y niebla, con bastones de trekking y mochila de montaña.",
  } satisfies Foto,

  aficiones: [
    "Disfrutar de la naturaleza lejos de la civilización es uno de los mejores sentimientos que siento. Es paradójico que quiera dedicarme a este sector, sin embargo, tiene muchas ventajas sobre el resto de trabajos que he tenido.",
    "Otra de mis aficiones es viajar: seguramente esta tiene gran parte de la culpa de que yo haya descubierto este oficio. Los viajes siguen el mismo patrón que todo en mi vida, no hay un guión absoluto... sí hay preparación, estudio, acción.",
    "Me han llamado desorganizado, yo lo llamo organización flexible. Este método nunca me ha fallado: Marruecos x5, Tailandia x2, Jordania..."
  ],

  formacion: [
    { nombre: "CFGS Desarrollo de Aplicaciones Web (DAW)", centro: "IES San Vicente", nota: "fin previsto en 2027" },
    { nombre: "Desarrollo con IA", centro: "mouredev · BIG school", nota: "certificado de asistencia, 4 h" },
  ] satisfies FormacionItem[],
  fotoAficiones: {
    src: "/images/foto-cristian-moto.jpg",
    alt: "Cristian con equipo de motocross junto a su moto de enduro, sobre una duna del desierto.",
  } satisfies Foto,
};
