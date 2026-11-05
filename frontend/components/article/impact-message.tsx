type ImpactMessageProps = {
  quote: string;
  author: string;
  affiliation?: string;
};

export function ImpactMessage({
  quote,
  author,
  affiliation,
}: ImpactMessageProps) {
  return (
    <blockquote className="impact-message">
      <span className="impact-message__mark" aria-hidden="true">
        “
      </span>

      <p className="impact-message__quote">«{quote}»</p>

      <footer className="impact-message__footer">
        <strong className="impact-message__author">{author}</strong>

        {affiliation ? (
          <span className="impact-message__affiliation">{affiliation}</span>
        ) : null}
      </footer>
    </blockquote>
  );
}