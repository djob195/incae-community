type AuthorCardProps = {
  honorific?: string;
  name: string;
  headline: string;
  bio?: string;
  contributorType?: string;
  photoUrl?: string;
  linkedinUrl?: string;
};

export function AuthorCard({
  honorific,
  name,
  headline,
  bio,
  contributorType,
  photoUrl,
  linkedinUrl,
}: AuthorCardProps) {
  const fullName = [honorific, name]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="author-card">
      <div className="author-card__photo-wrapper">
        {photoUrl ? (
          <img
            className="author-card__photo"
            src={photoUrl}
            alt={fullName}
          />
        ) : (
          <div className="author-card__photo-placeholder" />
        )}
      </div>

      <div className="author-card__content">
        <div className="author-card__identity">
          <h3 className="author-card__name">
            {fullName}
          </h3>

          {contributorType ? (
            <span className="author-card__type">
              {contributorType}
            </span>
          ) : null}
        </div>

        <p className="author-card__headline">
          {headline}
        </p>

        {bio ? (
          <p className="author-card__bio">
            {bio}
          </p>
        ) : null}

        {linkedinUrl ? (
          <a
            className="author-card__linkedin"
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span
              className="author-card__linkedin-icon"
              aria-hidden="true"
            >
              in
            </span>

            Conectar en LinkedIn
          </a>
        ) : null}
      </div>
    </article>
  );
}