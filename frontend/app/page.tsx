import { FeaturedArticle } from "@/components/editorial/featured-article";
import { ArticleCard } from "@/components/editorial/article-card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type Media = {
  url?: string;
};

type ContributorType = {
  name?: string;
};

type Author = {
  honorific?: string;
  name: string;
  photo?: Media | null;
  contributorType?: ContributorType | null;
};

type Post = {
  id: number;
  documentId?: string;
  title: string;
  subtitle?: string;
  slug: string;
  summary?: string;
  readingMinutes?: number;
  isFeatured?: boolean;
  heroImage?: Media | null;
  authors?: Author[];
};

type StrapiResponse<T> = {
  data: T;
};

function buildImageUrl(
  image: Media | null | undefined,
  publicApiUrl: string
) {
  if (!image?.url) return undefined;

  if (image.url.startsWith("http")) {
    return image.url;
  }

  return `${publicApiUrl}${image.url}`;
}

export default async function Home() {
  const internalApiUrl = process.env.STRAPI_INTERNAL_URL;
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!internalApiUrl || !publicApiUrl) {
    throw new Error("Las URLs de Strapi no están configuradas.");
  }

  /*
   * =====================================================
   * FEATURED ARTICLE
   * =====================================================
   */

  const featuredQuery = [
    "filters[isFeatured][$eq]=true",
    "populate[heroImage]=true",
    "populate[authors][populate][photo]=true",
    "populate[authors][populate][contributorType]=true",
    "pagination[pageSize]=1",
  ].join("&");

  const featuredResponse = await fetch(
    `${internalApiUrl}/api/posts?${featuredQuery}`,
    {
      cache: "no-store",
    }
  );

  const featuredResult: StrapiResponse<Post[]> =
    featuredResponse.ok
      ? await featuredResponse.json()
      : { data: [] };

  const featuredPost = featuredResult.data?.[0];

  /*
   * =====================================================
   * LATEST ARTICLES
   *
   * Solo mostramos 3 en home para mantener
   * la composición editorial del mockup.
   * =====================================================
   */

  const latestQuery = [
    "filters[isFeatured][$eq]=false",
    "sort=publishedAt:desc",
    "pagination[pageSize]=3",
    "populate[heroImage]=true",
    "populate[authors][populate][photo]=true",
    "populate[authors][populate][contributorType]=true",
  ].join("&");

  const latestResponse = await fetch(
    `${internalApiUrl}/api/posts?${latestQuery}`,
    {
      cache: "no-store",
    }
  );

  const latestResult: StrapiResponse<Post[]> =
    latestResponse.ok
      ? await latestResponse.json()
      : { data: [] };

  const latestPosts = latestResult.data ?? [];

  return (
    <>
      <SiteHeader />

      <main>
        {featuredPost && (
          <FeaturedArticle
            slug={featuredPost.slug}
            title={featuredPost.title}
            subtitle={featuredPost.subtitle}
            summary={featuredPost.summary}
            readingMinutes={featuredPost.readingMinutes}
            imageUrl={buildImageUrl(
              featuredPost.heroImage,
              publicApiUrl
            )}
          />
        )}

        <section className="latest-articles">
          <div className="container">
            <div className="latest-articles__header">
              <h2 className="latest-articles__title">
                Lo más reciente
              </h2>
            </div>

            {latestPosts.length > 0 ? (
              <div className="latest-articles__grid">
                {latestPosts.map((post) => {
                  const author = post.authors?.[0];

                  return (
                    <ArticleCard
                      key={post.documentId ?? post.id}
                      slug={post.slug}
                      title={post.title}
                      summary={post.summary}
                      readingMinutes={post.readingMinutes}
                      category="Estrategia"
                      imageUrl={buildImageUrl(
                        post.heroImage,
                        publicApiUrl
                      )}
                      author={
                        author
                          ? {
                              honorific: author.honorific,
                              name: author.name,
                              contributorType:
                                author.contributorType?.name,
                              photoUrl: buildImageUrl(
                                author.photo,
                                publicApiUrl
                              ),
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <p className="latest-articles__empty">
                No hay artículos disponibles todavía.
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}