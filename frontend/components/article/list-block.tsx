type ListItem = {
  title: string;
  description: string;
};

type ListBlockProps = {
  items: ListItem[];
};

export function ListBlock({ items }: ListBlockProps) {
  return (
    <div className="list-block">
      {items.map((item, index) => (
        <article className="list-block__item" key={index}>
          <h3 className="list-block__title">
            <span className="list-block__number">
              {index + 1}.
            </span>

            {item.title}
          </h3>

          <p className="list-block__description">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}