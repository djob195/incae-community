type ReferenceItem = {
  citation: string;
  url?: string;
};

type ReferencesBlockProps = {
  title?: string;
  references: ReferenceItem[];
};

export function ReferencesBlock({
  title = "Citas académicas & fuentes del ensayo",
  references,
}: ReferencesBlockProps) {
  if (!references.length) return null;

  return (
    <section className="references-block">
      <h2 className="references-block__title">
        {title}
      </h2>

      <ol className="references-block__list">
        {references.map((reference, index) => (
          <li className="references-block__item" key={index}>
            {reference.url ? (
              <a
                className="references-block__link"
                href={reference.url}
                target="_blank"
                rel="noreferrer"
              >
                {reference.citation}
              </a>
            ) : (
              <span>{reference.citation}</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}