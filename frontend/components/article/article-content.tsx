import { TextBlock } from "./text-block";
import { SectionHeader } from "./section-header";
import { ImpactMessage } from "./impact-message";
import { ImageBlock } from "./image-block";
import { ListBlock } from "./list-block";

type ArticleContentBlock =
  | {
      __component: "article.text-block";
      id: number;
      body: {
        type: "paragraph";
        children: {
          type: "text";
          text: string;
          bold?: boolean;
          italic?: boolean;
          underline?: boolean;
        }[];
      }[];
      dropCap?: boolean;
    }
  | {
      __component: "article.section-header";
      id: number;
      index: number;
      title: string;
    }
  | {
      __component: "article.impact-message";
      id: number;
      quote: string;
      author: string;
      affiliation?: string;
    }
  | {
      __component: "article.image-block";
      id: number;
      image: {
        url: string;
      };
      caption?: string;
      altText?: string;
    }
  | {
      __component: "article.list-block";
      id: number;
      items: {
        id: number;
        title: string;
        description: string;
      }[];
    };

type ArticleContentProps = {
  content: ArticleContentBlock[];
};

export function ArticleContent({
  content,
}: ArticleContentProps) {
  return (
    <>
      {content.map((block) => {
        const key = `${block.__component}-${block.id}`;

        switch (block.__component) {
          case "article.text-block":
            return (
              <TextBlock
                key={key}
                body={block.body}
                dropCap={block.dropCap}
              />
            );

          case "article.section-header":
            return (
              <SectionHeader
                key={key}
                index={block.index}
                title={block.title}
              />
            );

          case "article.impact-message":
            return (
              <ImpactMessage
                key={key}
                quote={block.quote}
                author={block.author}
                affiliation={block.affiliation}
              />
            );

          case "article.image-block":
            return (
              <ImageBlock
                key={key}
                src={block.image.url}
                alt={block.altText ?? ""}
                caption={block.caption}
              />
            );

          case "article.list-block":
            return (
              <ListBlock
                key={key}
                items={block.items}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}