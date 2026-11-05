type ArticleCardProps = {
  slug: string;
  title: string;
  summary?: string;
  readingMinutes?: number;
  category?: string;
  imageUrl?: string;

  author?: {
    honorific?: string;
    name: string;
    contributorType?: string;
    photoUrl?: string;
  };
};

export function ArticleCard({
  slug,
  title,
  summary,
  readingMinutes,
  category,
  imageUrl,
  author,
}: ArticleCardProps) {
  const authorName = author
    ? [author.honorific, author.name].filter(Boolean).join(" ")
    : undefined;

  return (
    <article className="article-card">
      {imageUrl ? (
        <a
          href={`/articulos/${slug}`}
          className="article-card__media"
        >
          <img
            src={imageUrl}
            alt={title}
            className="article-card__image"
          />
        </a>
      ) : null}

      <div className="article-card__content">
        <div className="article-card__meta">
          {category ? (
            <span className="article-card__category">
              {category}
            </span>
          ) : null}

          {readingMinutes ? (
            <span className="article-card__reading">
              {readingMinutes} min de lectura
            </span>
          ) : null}
        </div>

        <h2 className="article-card__title">
          <a href={`/articulos/${slug}`}>
            {title}
          </a>
        </h2>

        {summary ? (
          <p className="article-card__summary">
            {summary}
          </p>
        ) : null}

        {author ? (
          <div className="article-card__author">
            {author.photoUrl ? (
              <img
                src={author.photoUrl}
                alt={authorName}
                className="article-card__author-photo"
              />
            ) : null}

            <div className="article-card__author-info">
              <span className="article-card__author-name">
                {authorName}
              </span>

              {author.contributorType ? (
                <span className="article-card__author-type">
                  {author.contributorType}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        <a
          href={`/articulos/${slug}`}
          className="article-card__link"
        >
          Leer análisis
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}