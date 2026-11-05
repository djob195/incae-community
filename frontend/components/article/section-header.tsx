type SectionHeaderProps = {
  index: number;
  title: string;
};

export function SectionHeader({
  index,
  title,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <span className="section-header__index">
        {index.toString().padStart(2, "0")}
      </span>

      <h2 className="section-header__title">
        {title}
      </h2>
    </header>
  );
}