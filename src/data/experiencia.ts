export interface FuncionTransferible {
  original: string;
  traslado: string;
}

export interface Mision {
  lugar: string;
  anio: number;
}

export interface MetadatosOperativos {
  rol?: string;
  misiones?: Mision[];
  condecoraciones?: string[];
}

export interface Puesto {
  nombreCv: string;
  tituloCorto: string;
  organizacion: string;
  anioInicio: number;
  anioFin: number | "vigente";
  funciones: FuncionTransferible[];
  metadatos?: MetadatosOperativos;
  fraseCierre?: string;
}

export const trayectoria: Puesto[] = [
  {
    nombreCv: "Patrón/Socorrista",
    tituloCorto: "Patrón de salvamento",
    organizacion: "Pro-Activa/Ebone",
    anioInicio: 2015,
    anioFin: "vigente",
    funciones: [
      { original: "Protocolo según cada rescate", traslado: "Gestión de cada excepción" },
      { original: "Embarcación revisada antes de zarpar", traslado: "Infraestructura mantenida antes del fallo" },
    ],
  },
  {
    nombreCv: "Conductor de ambulancia",
    tituloCorto: "Emergencias sanitarias",
    organizacion: "Grupo ASV",
    anioInicio: 2020,
    anioFin: 2025,
    funciones: [
      { original: "Material elegido sin vuelta atrás", traslado: "Especificar antes de implementar" },
      { original: "Ruta óptima, criterio entrenado", traslado: "Decisión ágil, criterio fundamentado" },
    ],
  },
  {
    nombreCv: "Soldado, Operaciones Especiales",
    tituloCorto: "Operaciones Especiales · FF. AA.",
    organizacion: "Fuerzas Armadas",
    anioInicio: 2006,
    anioFin: 2013,
    metadatos: {
      rol: "Navegante del equipo: diseño y guía de la infiltración y la exfiltración",
      misiones: [
        { lugar: "Afganistán (ISAF)", anio: 2011 },
        { lugar: "Afganistán (ISAF)", anio: 2012 },
      ],
      condecoraciones: ["Medalla ISAF"],
    },
    funciones: [
      { original: "Plan minucioso antes de actuar", traslado: "Spec antes que código" },
      { original: "Conocer los propios límites", traslado: "Supervisar con criterio la IA" },
    ],
    fraseCierre: "Aquí empieza el método SDD de este portfolio.",
  },
];

export function formatearPeriodo(anioInicio: number, anioFin: number | "vigente"): string {
  const fin = anioFin === "vigente" ? "hoy" : String(anioFin);
  return `${anioInicio} – ${fin}`;
}

export function numerarFunciones(puestos: Puesto[]): number[][] {
  let contador = 0;
  return puestos.map((puesto) => puesto.funciones.map(() => (contador += 1)));
}

export interface ExperienciaItem {
  periodo: string;
  titulo: string;
}

export const experiencia: ExperienciaItem[] = trayectoria.map((puesto) => ({
  periodo: formatearPeriodo(puesto.anioInicio, puesto.anioFin),
  titulo: puesto.tituloCorto,
}));
