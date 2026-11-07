const STRAPI_URL =
  process.env.STRAPI_URL || "https://incae-backend.onrender.com";

const TOKEN =
  process.env.STRAPI_API_TOKEN || process.argv[2];

if (!TOKEN) {
  console.error(`
❌ Falta STRAPI_API_TOKEN.

Ejemplo:

STRAPI_API_TOKEN="TU_TOKEN" node scripts/seed-mvp-rest.js
`);
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function request(path, options = {}) {
  const response = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  let body = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    console.error(`\n❌ ${options.method || "GET"} ${path}`);
    console.error(JSON.stringify(body, null, 2));
    throw new Error(`HTTP ${response.status}`);
  }

  return body;
}

async function findBySlug(endpoint, slug) {
  const result = await request(
    `/api/${endpoint}?filters[slug][$eq]=${encodeURIComponent(slug)}`
  );

  return result.data?.[0] || null;
}

async function createIfMissing({
  endpoint,
  slug,
  data,
  label,
}) {
  const existing = await findBySlug(endpoint, slug);

  if (existing) {
    console.log(`↪️  Ya existe: ${label}`);
    return existing;
  }

  const result = await request(`/api/${endpoint}`, {
    method: "POST",
    body: JSON.stringify({
      data,
    }),
  });

  console.log(`✅ Creado: ${label}`);

  return result.data;
}

async function main() {
  console.log("\n=====================================");
  console.log(" INCAE / America's Business Review");
  console.log(" Seed MVP");
  console.log("=====================================\n");

  console.log(`🌐 Strapi: ${STRAPI_URL}\n`);

  /*
   * =====================================================
   * 1. CONTRIBUTOR TYPE
   * =====================================================
   */

  await createIfMissing({
    endpoint: "contributor-types",
    slug: "lider-empresarial-invitado",
    label: "Líder Empresarial Invitado",
    data: {
      name: "Líder Empresarial Invitado",
      slug: "lider-empresarial-invitado",
    },
  });

  /*
   * =====================================================
   * 2. EDITION
   * =====================================================
   */

  let edition = await findBySlug("editions", "edition");

  if (!edition) {
    const result = await request("/api/editions", {
      method: "POST",
      body: JSON.stringify({
        data: {
          volume: 48,
          title: "test",
          slug: "edition",
          startDate: "2026-10-24",
          endDate: "2026-10-31",
        },
      }),
    });

    edition = result.data;

    console.log("✅ Creada: Edición 48");
  } else {
    console.log("↪️  Ya existe: Edición 48");
  }

  /*
   * =====================================================
   * 3. PAGES
   * =====================================================
   */

  const pages = [
    {
      title: "Estrategia",
      subtitle:
        "Ideas para competir, crecer y tomar mejores decisiones.",
      slug: "estrategia",
      description:
        "Perspectivas sobre estrategia empresarial, competitividad, crecimiento y ejecución en América Latina.",
      showInMenu: true,
    },
    {
      title: "Innovación",
      subtitle:
        "Transformación, tecnología y nuevos modelos de negocio.",
      slug: "innovacion",
      description:
        "Análisis sobre innovación, inteligencia artificial, transformación digital y nuevos modelos empresariales.",
      showInMenu: true,
    },
    {
      title: "Sostenibilidad",
      subtitle:
        "Creación de valor con una visión de largo plazo.",
      slug: "sostenibilidad",
      description:
        "Perspectivas sobre sostenibilidad, finanzas verdes, resiliencia y crecimiento responsable.",
      showInMenu: true,
    },
    {
      title: "Liderazgo",
      subtitle:
        "Decisiones, cultura y dirección en contextos complejos.",
      slug: "liderazgo",
      description:
        "Ideas sobre liderazgo ejecutivo, gobierno corporativo, talento y capacidad organizacional.",
      showInMenu: true,
    },
    {
      title: "Regional Insights",
      subtitle:
        "Una mirada empresarial a América Latina.",
      slug: "regional-insights",
      description:
        "Análisis de tendencias económicas, empresariales y competitivas relevantes para América Latina.",
      showInMenu: true,
    },
  ];

  for (const page of pages) {
    await createIfMissing({
      endpoint: "pages",
      slug: page.slug,
      data: page,
      label: page.title,
    });
  }

  /*
   * =====================================================
   * 4. NEARSHORING — FEATURED
   * =====================================================
   */

  await createIfMissing({
    endpoint: "posts",
    slug: "nearshoring",
    label:
      "Nearshoring, Competitividad Operativa y Cadenas Regionales de Valor",

    data: {
      title:
        "Nearshoring, Competitividad Operativa y Cadenas Regionales de Valor",

      subtitle:
        "La nueva arquitectura empresarial de América Latina exige resiliencia, gobernanza y velocidad estratégica.",

      slug: "nearshoring",

      summary:
        "La reorganización global de las cadenas de suministro está redefiniendo las ventajas competitivas de las empresas latinoamericanas y obligando a sus directorios a replantear operaciones, capital y gobernanza.",

      readingMinutes: 8,

      isFeatured: true,

      edicion: edition.documentId,

      content: [
        {
          __component: "article.section-header",
          index: 1,
          title:
            "Gobernanza Estratégica y Resiliencia Operativa",
        },
        {
          __component: "article.text-block",
          dropCap: true,
          body: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text:
                    "La reorganización global de las cadenas de valor exige nuevas capacidades de gestión, resiliencia operativa y gobernanza institucional. Las empresas latinoamericanas necesitan estructuras capaces de responder con mayor velocidad a los cambios en comercio, logística y disponibilidad de capital.",
                },
              ],
            },
          ],
        },
        {
          __component: "article.impact-message",
          quote:
            "La resiliencia empresarial no se construye reaccionando a las crisis, sino diseñando organizaciones capaces de absorberlas.",
          author: "Dr. Mateo Villalobos R.",
          affiliation: "INCAE Business School",
        },
      ],

      references: [
        {
          citation:
            "Villalobos, M. & Méndez, R. (2024). Nearshoring y Arquitectura Financiera en Mercados Emergentes. INCAE Business Review Series.",
        },
        {
          citation:
            "Banco Interamericano de Desarrollo (BID). (2024). Integración y Comercio: El Salto de Productividad en las Américas.",
        },
        {
          citation:
            "World Economic Forum & INCAE. (2024). Global Competitiveness and Supply Chain Resilience Index: Latin America Edition.",
        },
      ],
    },
  });

  /*
   * =====================================================
   * 5. OTHER POSTS
   * =====================================================
   */

  const posts = [
    {
      title:
        "Gobernanza de IA en Directorios Latinoamericanos",

      subtitle:
        "La adopción de inteligencia artificial exige nuevas capacidades de supervisión, riesgo y toma de decisiones.",

      slug:
        "gobernanza-ia-directorios-latinoamericanos",

      summary:
        "Los directorios empresariales están incorporando inteligencia artificial en procesos críticos mientras redefinen los mecanismos de control, responsabilidad y creación de valor.",

      readingMinutes: 7,

      isFeatured: false,
    },

    {
      title:
        "Finanzas Verdes y Competitividad Regional",

      subtitle:
        "El acceso a capital sostenible está transformando las decisiones de inversión y crecimiento empresarial.",

      slug:
        "finanzas-verdes-competitividad-regional",

      summary:
        "Las empresas latinoamericanas enfrentan una nueva arquitectura financiera donde sostenibilidad, costo de capital y competitividad comienzan a converger.",

      readingMinutes: 6,

      isFeatured: false,
    },

    {
      title:
        "Automatización Inteligente en la Banca Centroamericana",

      subtitle:
        "La eficiencia operativa avanza hacia modelos que combinan automatización, datos y supervisión humana.",

      slug:
        "automatizacion-inteligente-banca-centroamericana",

      summary:
        "La automatización está modificando operaciones, atención al cliente y gestión de riesgo en las instituciones financieras de Centroamérica.",

      readingMinutes: 8,

      isFeatured: false,
    },

    {
      title:
        "Liderazgo Resiliente en Mercados Volátiles",

      subtitle:
        "La incertidumbre exige líderes capaces de combinar disciplina estratégica, adaptabilidad y ejecución.",

      slug:
        "liderazgo-resiliente-mercados-volatiles",

      summary:
        "La volatilidad económica obliga a las organizaciones a fortalecer capacidades de liderazgo que permitan decidir con rapidez sin sacrificar visión de largo plazo.",

      readingMinutes: 9,

      isFeatured: false,
    },
  ];

  for (const post of posts) {
    await createIfMissing({
      endpoint: "posts",
      slug: post.slug,
      label: post.title,
      data: {
        ...post,
      },
    });
  }

  console.log("\n=====================================");
  console.log("✅ MVP creado correctamente");
  console.log("=====================================\n");

  console.log("Ahora asignas manualmente:");
  console.log("• Autor Roberto Méndez");
  console.log("• Foto de Roberto");
  console.log("• Hero de Nearshoring");
  console.log("• Imagen Gobernanza IA");
  console.log("• Imagen Finanzas Verdes");
  console.log("• Imagen Automatización");
  console.log("• Imagen Liderazgo Resiliente");
  console.log("");
}

main().catch((error) => {
  console.error("\n❌ Seed detenido.");
  console.error(error);
  process.exit(1);
});