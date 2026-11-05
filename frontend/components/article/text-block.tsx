type RichTextChild = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type RichTextBlock = {
  type: "paragraph";
  children: RichTextChild[];
};

type TextBlockProps = {
  body: RichTextBlock[];
  dropCap?: boolean;
};

export function TextBlock({
  body,
  dropCap = false,
}: TextBlockProps) {
  return (
    <div
      className={`text-block ${
        dropCap ? "text-block--drop-cap" : ""
      }`}
    >
      {body.map((block, blockIndex) => {
        if (block.type !== "paragraph") {
          return null;
        }

        return (
          <p className="text-block__body" key={blockIndex}>
            {block.children.map((child, childIndex) => {
              let content: React.ReactNode = child.text;

              if (child.bold) {
                content = <strong>{content}</strong>;
              }

              if (child.italic) {
                content = <em>{content}</em>;
              }

              if (child.underline) {
                content = <u>{content}</u>;
              }

              return (
                <span key={childIndex}>
                  {content}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}