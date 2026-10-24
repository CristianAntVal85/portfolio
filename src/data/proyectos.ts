export interface Proyecto {
  titulo: string;
  descripcion: string;
  stack: string;
  href: string;
}

// [PENDIENTE] Enlaces a repositorio real para cada proyecto.
export const proyectos: Proyecto[] = [
  {
    titulo: "Este portfolio",
    descripcion: "Hecho con Spec-Driven Development.",
    stack: "Astro · CSS",
    href: "#",
  },
  {
    titulo: "Asistente RAG",
    descripcion: "Responde sobre documentos citando la fuente.",
    stack: "[PENDIENTE]",
    href: "#",
  },
  {
    titulo: "Agente supervisado",
    descripcion: "Propone acciones; una persona las aprueba.",
    stack: "[PENDIENTE]",
    href: "#",
  },
  {
    titulo: "[PROYECTO 4]",
    descripcion: "Hueco opcional.",
    stack: "[PENDIENTE]",
    href: "#",
  },
];
