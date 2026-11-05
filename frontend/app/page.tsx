import { FeaturedArticle } from "@/components/editorial/featured-article";
import { ArticleCard } from "@/components/editorial/article-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type Author = {
  id: number;
  honorific?: string;
  name: string;

  photo?: {
    url: string;
  };

  contributorType?: {
    name: string;
  };
};

type Post = {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  summary?: string;
  readingMinutes?: number;
  isFeatured?: boolean;

  heroImage?: {
    url: string;

    formats?: {
      large?: {
        url: string;
      };

      medium?: {
        url: string;
      };

      small?: {
        url: string;
      };
    };
  };

  authors?: Author[];
};

export default async function HomePage() {
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

  const featuredQuery =
    `filters[isFeatured][$eq]=true` +
    `&populate=heroImage`;

  const latestQuery =
    `filters[isFeatured][$ne]=true` +
    `&sort=publishedAt:desc` +
    `&pagination[pageSize]=6` +
    `&populate[heroImage]=true` +
    `&populate[authors][populate][photo]=true` +
    `&populate[authors][populate][contributorType]=true`;

  /* =========================
     FETCH
  ========================== */

  const [
    featuredResponse,
    latestResponse,
  ] = await Promise.all([
    fetch(
      `${apiUrl}/api/posts?${featuredQuery}`,
      {
        cache: "no-store",
      }
    ),

    fetch(
      `${apiUrl}/api/posts?${latestQuery}`,
      {
        cache: "no-store",
      }
    ),
  ]);

  /* =========================
     ERROR HANDLING
  ========================== */

  if (!featuredResponse.ok) {
    const errorText =
      await featuredResponse.text();

    console.error(
      "Featured post status:",
      featuredResponse.status
    );

    console.error(
      "Featured post response:",
      errorText
    );

    throw new Error(
      `No se pudo cargar el artículo destacado. Strapi respondió ${featuredResponse.status}`
    );
  }

  if (!latestResponse.ok) {
    const errorText =
      await latestResponse.text();

    console.error(
      "Latest posts status:",
      latestResponse.status
    );

    console.error(
      "Latest posts response:",
      errorText
    );

    throw new Error(
      `No se pudieron cargar los artículos recientes. Strapi respondió ${latestResponse.status}`
    );
  }

  /* =========================
     DATA
  ========================== */

  const featuredResult =
    await featuredResponse.json();

  const latestResult =
    await latestResponse.json();

  const featuredPost: Post | undefined =
    featuredResult.data?.[0];

  const latestPosts: Post[] =
    latestResult.data ?? [];

  /* =========================
     HELPERS
  ========================== */

  function getMediaUrl(
    path?: string
  ): string | undefined {
    if (!path) return undefined;

    return path.startsWith("http")
      ? path
      : `${publicApiUrl}${path}`;
  }

  function getHeroImageUrl(
    post: Post
  ): string | undefined {
    const imagePath =
      post.heroImage?.formats?.large?.url ??
      post.heroImage?.formats?.medium?.url ??
      post.heroImage?.url;

    return getMediaUrl(imagePath);
  }

  /* =========================
     RENDER
  ========================== */

  return (
    <>
    <SiteHeader />
      <main>
        {featuredPost ? (
          <FeaturedArticle
            slug={featuredPost.slug}
            title={featuredPost.title}
            subtitle={
              featuredPost.subtitle
            }
            summary={
              featuredPost.summary
            }
            readingMinutes={
              featuredPost.readingMinutes
            }
            imageUrl={
              getHeroImageUrl(
                featuredPost
              )
            }
            editionLabel="Historia de portada"
          />
        ) : null}

        <section className="latest-articles">
          <div className="container">
            <header className="latest-articles__header">
              <span className="latest-articles__eyebrow">
                Actualidad editorial
              </span>

              <h2 className="latest-articles__title">
                Lo más reciente
              </h2>
            </header>

            {latestPosts.length > 0 ? (
              <div className="latest-articles__grid">
                {latestPosts.map(
                  (post) => {
                    const author =
                      post.authors?.[0];

                    const authorPhotoUrl =
                      getMediaUrl(
                        author?.photo?.url
                      );

                    return (
                      <ArticleCard
                        key={post.id}
                        slug={post.slug}
                        title={post.title}
                        summary={
                          post.summary
                        }
                        readingMinutes={
                          post.readingMinutes
                        }
                        category="Estrategia"
                        imageUrl={
                          getHeroImageUrl(
                            post
                          )
                        }
                        author={
                          author
                            ? {
                                honorific:
                                  author.honorific,
                                name:
                                  author.name,
                                contributorType:
                                  author
                                    .contributorType
                                    ?.name,
                                photoUrl:
                                  authorPhotoUrl,
                              }
                            : undefined
                        }
                      />
                    );
                  }
                )}
              </div>
            ) : (
              <p className="latest-articles__empty">
                Todavía no hay artículos recientes.
              </p>
            )}
          </div>
        </section>
        <SiteFooter />
      </main>
      </>
  );
}