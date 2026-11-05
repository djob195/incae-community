type ArticleHeaderProps = {
  title: string;
  subtitle?: string;
  summary?: string;
  readingMinutes?: number;
  editionLabel?: string;
};

export function ArticleHeader({
  title,
  subtitle,
  summary,
  readingMinutes,
  editionLabel,
}: ArticleHeaderProps) {
  return (
    <header className="article-header">
      <div className="article-header__meta">
        {editionLabel ? (
          <span className="article-header__edition">
            {editionLabel}
          </span>
        ) : null}

        {readingMinutes ? (
          <span className="article-header__reading">
            {readingMinutes} min de lectura
          </span>
        ) : null}
      </div>

      <h1 className="article-header__title">
        {title}
      </h1>

      {subtitle ? (
        <p className="article-header__subtitle">
          {subtitle}
        </p>
      ) : null}

      {summary ? (
        <p className="article-header__summary">
          {summary}
        </p>
      ) : null}
    </header>
  );
}