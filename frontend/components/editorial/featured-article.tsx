type FeaturedArticleProps = {
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  readingMinutes?: number;
  imageUrl?: string;
  editionLabel?: string;
};

export function FeaturedArticle({
  slug,
  title,
  subtitle,
  summary,
  readingMinutes,
  imageUrl,
  editionLabel,
}: FeaturedArticleProps) {
  return (
    <section className="featured-article">
      <div className="featured-article__content">
        <div className="featured-article__meta">
          <span className="featured-article__edition">
            Historia de portada · Edición 48
          </span>

          {readingMinutes ? (
            <span className="featured-article__reading">
              {readingMinutes} min de lectura
            </span>
          ) : null}
        </div>

        <h1 className="featured-article__title">
          {title}
        </h1>

        {subtitle ? (
          <p className="featured-article__subtitle">
            {subtitle}
          </p>
        ) : null}

        {summary ? (
          <p className="featured-article__summary">
            {summary}
          </p>
        ) : null}

        <a
          href={`/articulos/${slug}`}
          className="featured-article__cta"
        >
          Leer artículo
        </a>
      </div>

      {imageUrl ? (
        <div className="featured-article__media">
          <img
            src={imageUrl}
            alt={title}
            className="featured-article__image"
          />
        </div>
      ) : null}
    </section>
  );
}