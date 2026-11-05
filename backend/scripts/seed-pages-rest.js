const token =
  process.env.STRAPI_API_TOKEN ||
  process.argv[2];

if (!token) {
  console.error("❌ Falta STRAPI_API_TOKEN.");
  process.exit(1);
}

const STRAPI_URL = "http://localhost:1337";

const pages = [
  {
    title: "Estrategia",
    subtitle: "Ideas para competir, crecer y tomar mejores decisiones.",
    slug: "estrategia",
    description:
      "Perspectivas sobre estrategia empresarial, competitividad, crecimiento y ejecución en América Latina.",
    showInMenu: true,
  },

  {
    title: "Innovación",
    subtitle: "Transformación, tecnología y nuevos modelos de negocio.",
    slug: "innovacion",
    description:
      "Análisis sobre innovación, inteligencia artificial, transformación digital y nuevos modelos empresariales.",
    showInMenu: true,
  },

  {
    title: "Sostenibilidad",
    subtitle: "Creación de valor con una visión de largo plazo.",
    slug: "sostenibilidad",
    description:
      "Perspectivas sobre sostenibilidad, finanzas verdes, resiliencia y crecimiento responsable.",
    showInMenu: true,
  },

  {
    title: "Liderazgo",
    subtitle: "Decisiones, cultura y dirección en contextos complejos.",
    slug: "liderazgo",
    description:
      "Ideas sobre liderazgo ejecutivo, gobierno corporativo, talento y capacidad organizacional.",
    showInMenu: true,
  },

  {
    title: "Regional Insights",
    subtitle: "Una mirada empresarial a América Latina.",
    slug: "regional-insights",
    description:
      "Análisis de tendencias económicas, empresariales y competitivas relevantes para América Latina.",
    showInMenu: true,
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
      `${response.status} ${response.statusText}\\n${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  }

  return data;
}

async function seed() {
  console.log("🌱 Creando páginas...\\n");

  for (const page of pages) {
    try {
      const existing = await request(
        `/api/pages?filters[slug][$eq]=${encodeURIComponent(
          page.slug
        )}`
      );

      if (existing.data?.length > 0) {
        console.log(`⏭️ Ya existe: ${page.title}`);
        continue;
      }

      await request("/api/pages", {
        method: "POST",
        body: JSON.stringify({
          data: page,
        }),
      });

      console.log(`✅ ${page.title}`);
    } catch (error) {
      console.error(`❌ Error con ${page.title}`);
      console.error(error.message);
    }
  }

  console.log("\\n🎉 Seed de páginas terminado.");
}

seed();