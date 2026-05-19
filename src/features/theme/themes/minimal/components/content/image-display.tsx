export function ImageDisplay({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg" style={{ border: "1px solid var(--mag-border)" }}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-xs" style={{ color: "var(--mag-text-muted)" }}>
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
