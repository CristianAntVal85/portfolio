export const perfil = {
  nombre: "Cristian Antón Valdés",
  disponibilidad: "Disponible · prácticas FCT · marzo 2027",
  ubicacion: "Alicante, ES",
  email: "cristian.ant.val@gmail.com",
  github: "https://github.com/CristianAntVal85",
  linkedin: "https://www.linkedin.com/in/cristian-anton-valdes-a13863444",
  cv: "/cv.pdf",
  foto: "/images/foto-cristian.png",
  titular: "Software fiable con IA, de la especificación al despliegue.",
  bio: "Desarrollador full stack en formación. En las Fuerzas Armadas era el navegante del equipo: planificaba y guiaba la ruta a nuestro objetivo. Hoy aplico esa disciplina al software: especificar, construir, medir.",
  idiomas: "Español nativo · inglés A1, en curso",
  interesSectorial: "Defensa, aeroespacial e ingeniería",
};

export interface Principio {
  titulo: string;
  descripcion: string;
}

export const principios: Principio[] = [
  {
    titulo: "Desarrollo dirigido por especificación",
    descripcion: "Spec → plan → código → evaluación, orquestando agentes de IA.",
  },
  {
    titulo: "IA supervisada y segura",
    descripcion: "Reviso cada cambio: tests, permisos y control de los datos.",
  },
  {
    titulo: "Full stack de extremo a extremo",
    descripcion: "Interfaz, backend, datos y despliegue, en el lenguaje que pida el proyecto.",
  },
];

export const softSkills: string[] = [
  "trabajo bajo presión",
  "toma de decisiones",
  "trabajo en equipo",
];
