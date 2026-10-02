export type ArticlePreview = {
  title: string;
  name: string;
  description: string;
};
export type Interview = ArticlePreview & {
  initials: string;
  role: string;
  tag: string;
  color: "rust" | "navy";
};

export const interviews: Interview[] = [
  {
    name: "Dra. Mariana Restrepo",
    initials: "MR",
    role: "LIDERAZGO • ESTRATEGIA • INNOVACIÓN",
    title:
      "Despliegue de Capital Semilla y Private Equity en Scaling de Biotecnología Tropical",
    description:
      "El talento como capital invertido en proyectos y capacidades; una mirada estratégica al futuro de la región.",
    tag: "ALUMNI",
    color: "rust",
  },
  {
    name: "Ing. Roberto Méndez S.",
    initials: "RM",
    role: "OPERACIONES • TECNOLOGÍA",
    title:
      "Hubs Portuarios y Eficiencia de Flotas: La Carrera por la Automatización en el Pacífico",
    description:
      "La integración tecnológica y la resiliencia de las cadenas de suministro como motores de competitividad.",
    tag: "INVITADO",
    color: "navy",
  },
  {
    name: "Mtra. Lucía Benítez",
    initials: "LB",
    role: "FINANZAS • SOSTENIBILIDAD",
    title:
      "Estructuración de Deuda Sostenible y Bonos Vinculados a ESG en Empresas Regionales",
    description:
      "Cómo las empresas evolucionan sus estructuras financieras para impulsar un crecimiento sostenible.",
    tag: "ALUMNI",
    color: "rust",
  },
  {
    name: "Dr. Andrés Molina",
    initials: "AM",
    role: "ESTRATEGIA • CRECIMIENTO",
    title: "Nuevos Mercados y Alianzas para la Expansión Regional",
    description:
      "Una conversación sobre oportunidades de crecimiento para las empresas latinoamericanas.",
    tag: "INVITADO",
    color: "navy",
  },
];
export const headline =
  "El Giro Estratégico de las Multilatinas: Resiliencia de Cadena de Suministro, Automatización y Escalamiento Regional";
