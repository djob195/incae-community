type ImageBlockProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function ImageBlock({
  src,
  alt,
  caption,
}: ImageBlockProps) {
  return (
    <figure className="image-block">
      <div className="image-block__media">
        <img
          className="image-block__image"
          src={src}
          alt={alt}
          loading="lazy"
        />
      </div>

      {caption ? (
        <figcaption className="image-block__caption">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}