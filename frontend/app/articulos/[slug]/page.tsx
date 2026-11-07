import { ArticleHeader } from "@/components/article/article-header";
import { ArticleContent } from "@/components/article/article-content";
import { ReferencesBlock } from "@/components/article/references-block";
import { AuthorCard } from "@/components/article/author-card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ContentBlock = {
  id: number;
  __component: string;
  [key: string]: any;
};

type Author = {
  id: number;
  honorific?: string;
  name: string;
  slug: string;
  headline: string;
  bio?: string;
  linkedinUrl?: string;

  photo?: {
    url: string;
    alternativeText?: string | null;
  };

  contributorType?: {
    name: string;
    slug: string;
  };
};

export default async function ArticlePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const apiUrl = process.env.STRAPI_INTERNAL_URL;
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl || !publicApiUrl) {
    throw new Error(
      "Las URLs de Strapi no están configuradas."
    );
  }

  /* =========================
     QUERIES
  ========================== */

  const baseQuery =
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate=*`;

  const nestedQuery =
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate[content][on][article.list-block][populate][items]=true` +
    `&populate[content][on][article.image-block][populate][image]=true`;

  const editionQuery =
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate=edicion`;

  const authorsQuery =
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate[authors][populate][photo]=true` +
    `&populate[authors][populate][contributorType]=true`;

  /* =========================
     FETCH
  ========================== */

  const [
    baseResponse,
    nestedResponse,
    editionResponse,
    authorsResponse,
  ] = await Promise.all([
    fetch(`${apiUrl}/api/posts?${baseQuery}`, {
      cache: "no-store",
    }),

    fetch(`${apiUrl}/api/posts?${nestedQuery}`, {
      cache: "no-store",
    }),

    fetch(`${apiUrl}/api/posts?${editionQuery}`, {
      cache: "no-store",
    }),

    fetch(`${apiUrl}/api/posts?${authorsQuery}`, {
      cache: "no-store",
    }),
  ]);

  /* =========================
     ERROR HANDLING
  ========================== */

  if (!baseResponse.ok) {
    const errorText = await baseResponse.text();

    console.error(
      "Base Strapi status:",
      baseResponse.status
    );

    console.error(
      "Base Strapi response:",
      errorText
    );

    throw new Error(
      `No se pudo cargar el artículo. Strapi respondió ${baseResponse.status}`
    );
  }

  if (!nestedResponse.ok) {
    const errorText = await nestedResponse.text();

    console.error(
      "Nested Strapi status:",
      nestedResponse.status
    );

    console.error(
      "Nested Strapi response:",
      errorText
    );

    throw new Error(
      `No se pudo cargar el contenido anidado. Strapi respondió ${nestedResponse.status}`
    );
  }

  if (!editionResponse.ok) {
    const errorText = await editionResponse.text();

    console.error(
      "Edition Strapi status:",
      editionResponse.status
    );

    console.error(
      "Edition Strapi response:",
      errorText
    );

    throw new Error(
      `No se pudo cargar la edición. Strapi respondió ${editionResponse.status}`
    );
  }

  if (!authorsResponse.ok) {
    const errorText = await authorsResponse.text();

    console.error(
      "Authors Strapi status:",
      authorsResponse.status
    );

    console.error(
      "Authors Strapi response:",
      errorText
    );

    throw new Error(
      `No se pudieron cargar los autores. Strapi respondió ${authorsResponse.status}`
    );
  }

  /* =========================
     JSON
  ========================== */

  const baseResult =
    await baseResponse.json();

  const nestedResult =
    await nestedResponse.json();

  const editionResult =
    await editionResponse.json();

  const authorsResult =
    await authorsResponse.json();

  /* =========================
     POST
  ========================== */

  const post =
    baseResult.data?.[0];

  const nestedPost =
    nestedResult.data?.[0];

  const editionPost =
    editionResult.data?.[0];

  const authorsPost =
    authorsResult.data?.[0];

  if (!post) {
    return (
      <>
        <SiteHeader />

        <main className="article-container">
          <h1>Artículo no encontrado</h1>

          <p>
            No existe un artículo con el slug:{" "}
            <strong>{slug}</strong>
          </p>
        </main>

        <SiteFooter />
      </>
    );
  }

  /* =========================
     EDITION
  ========================== */

  const editionLabel =
    editionPost?.edicion
      ? `Volumen ${editionPost.edicion.volume}`
      : undefined;

  /* =========================
     CONTENT
  ========================== */

  const nestedBlocks =
    new Map<string, ContentBlock>(
      (nestedPost?.content ?? []).map(
        (block: ContentBlock) => [
          `${block.__component}-${block.id}`,
          block,
        ]
      )
    );

  const content =
    (post.content ?? []).map(
      (block: ContentBlock) => {
        const key =
          `${block.__component}-${block.id}`;

        const nestedBlock =
          nestedBlocks.get(key);

        if (!nestedBlock) {
          return block;
        }

        const mergedBlock = {
          ...block,
          ...nestedBlock,
        };

        if (
          mergedBlock.__component ===
            "article.image-block" &&
          mergedBlock.image?.url
        ) {
          mergedBlock.image = {
            ...mergedBlock.image,

            url:
              mergedBlock.image.url.startsWith(
                "http"
              )
                ? mergedBlock.image.url
                : `${publicApiUrl}${mergedBlock.image.url}`,
          };
        }

        return mergedBlock;
      }
    );

  /* =========================
     AUTHORS
  ========================== */

  const authors: Author[] =
    authorsPost?.authors ?? [];

  /* =========================
     RENDER
  ========================== */

  return (
    <>
      <SiteHeader />

      <main className="article-page">
        <div className="article-container">

          <ArticleHeader
            editionLabel={editionLabel}
            readingMinutes={
              post.readingMinutes
            }
            title={post.title}
            subtitle={post.subtitle}
            summary={post.summary}
          />

          {authors.map((author) => {
            const photoUrl =
              author.photo?.url
                ? author.photo.url.startsWith(
                    "http"
                  )
                  ? author.photo.url
                  : `${publicApiUrl}${author.photo.url}`
                : undefined;

            return (
              <AuthorCard
                key={author.id}
                honorific={
                  author.honorific
                }
                name={author.name}
                headline={
                  author.headline
                }
                bio={author.bio}
                contributorType={
                  author.contributorType
                    ?.name
                }
                photoUrl={photoUrl}
                linkedinUrl={
                  author.linkedinUrl
                }
              />
            );
          })}

          <ArticleContent
            content={content}
          />

          <ReferencesBlock
            references={
              post.references ?? []
            }
          />

        </div>
      </main>

      <SiteFooter />
    </>
  );
}