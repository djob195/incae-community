import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";


type PageData = {
  id: number;
  title: string;
  subtitle?: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
    formats?: {
      large?: {
        url: string;
      };
      medium?: {
        url: string;
      };
    };
  };
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DynamicPage({
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

  const query =
    `filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate=image`;

  const response = await fetch(
    `${apiUrl}/api/pages?${query}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error(
      "Page status:",
      response.status
    );

    notFound();
  }

  const result = await response.json();

  const page: PageData | undefined =
    result.data?.[0];

  if (!page) {
    notFound();
  }

  const imagePath =
    page.image?.formats?.large?.url ??
    page.image?.formats?.medium?.url ??
    page.image?.url;

  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${publicApiUrl}${imagePath}`
    : undefined;

  return (
    <>
      <SiteHeader />

      <main className="simple-page">
        <div className="simple-page__inner">
          <header className="simple-page__header">
            <span className="simple-page__eyebrow">
              America&apos;s Business Review
            </span>

            <h1 className="simple-page__title">
              {page.title}
            </h1>

            {page.subtitle ? (
              <p className="simple-page__subtitle">
                {page.subtitle}
              </p>
            ) : null}
          </header>

          {imageUrl ? (
            <div className="simple-page__media">
              <img
                src={imageUrl}
                alt={page.title}
                className="simple-page__image"
              />
            </div>
          ) : null}

          {page.description ? (
            <div className="simple-page__content">
              <p>{page.description}</p>
            </div>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}