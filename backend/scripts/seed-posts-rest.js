const token = process.argv[2];

if (!token) {
  console.error("❌ Falta el API token.");
  console.error(
    "Uso: node scripts/seed-posts-rest.js TU_API_TOKEN"
  );
  process.exit(1);
}

const STRAPI_URL = "http://localhost:1337";

const posts = [
  {
    title: "Gobernanza de IA en Directorios Latinoamericanos",
    subtitle:
      "La adopción de inteligencia artificial exige nuevas capacidades de supervisión, riesgo y toma de decisiones.",
    slug: "gobernanza-ia-directorios-latinoamericanos",
    summary:
      "Los directorios empresariales están incorporando inteligencia artificial en procesos críticos mientras redefinen los mecanismos de control, responsabilidad y creación de valor.",
    readingMinutes: 7,
    isFeatured: false,
  },

  {
    title: "Finanzas Verdes y Competitividad Regional",
    subtitle:
      "El acceso a capital sostenible está transformando las decisiones de inversión y crecimiento empresarial.",
    slug: "finanzas-verdes-competitividad-regional",
    summary:
      "Las empresas latinoamericanas enfrentan una nueva arquitectura financiera donde sostenibilidad, costo de capital y competitividad comienzan a converger.",
    readingMinutes: 6,
    isFeatured: false,
  },

  {
    title: "Automatización Inteligente en la Banca Centroamericana",
    subtitle:
      "La eficiencia operativa avanza hacia modelos que combinan automatización, datos y supervisión humana.",
    slug: "automatizacion-inteligente-banca-centroamericana",
    summary:
      "La automatización está modificando operaciones, atención al cliente y gestión de riesgo en las instituciones financieras de Centroamérica.",
    readingMinutes: 8,
    isFeatured: false,
  },

  {
    title: "Liderazgo Resiliente en Mercados Volátiles",
    subtitle:
      "La incertidumbre exige líderes capaces de combinar disciplina estratégica, adaptabilidad y ejecución.",
    slug: "liderazgo-resiliente-mercados-volatiles",
    summary:
      "La volatilidad económica obliga a las organizaciones a fortalecer capacidades de liderazgo que permitan decidir con rapidez sin sacrificar visión de largo plazo.",
    readingMinutes: 9,
    isFeatured: false,
  },
];

async function request(path, options = {}) {
  const response = await fetch(`${STRAPI_URL}${path}`, {
    ...options,

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}\n${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  }

  return data;
}

async function seed() {
  console.log("🌱 Creando artículos...\n");

  for (const post of posts) {
    try {
      /* =========================
         CHECK EXISTING
      ========================== */

      const existing = await request(
        `/api/posts?filters[slug][$eq]=${encodeURIComponent(
          post.slug
        )}`
      );

      if (existing.data?.length > 0) {
        console.log(`⏭️ Ya existe: ${post.title}`);
        continue;
      }

      /* =========================
         CREATE + PUBLISH
      ========================== */

      await request("/api/posts", {
        method: "POST",

        body: JSON.stringify({
          data: post,
        }),
      });

      console.log(`✅ ${post.title}`);
    } catch (error) {
      console.error(`\n❌ Error con: ${post.title}`);
      console.error(error.message);
    }
  }

  console.log("\n🎉 Seed terminado.");
}

seed();