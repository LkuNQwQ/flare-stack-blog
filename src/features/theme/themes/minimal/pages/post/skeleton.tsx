export function PostPageSkeleton() {
  return (
    <div className="mx-auto px-6 pb-20" style={{ maxWidth: "var(--mag-page-width)" }}>
      <div className="py-10">
        <div className="mag-skeleton h-4 w-24" />
      </div>
      <article className="space-y-12 max-w-3xl mx-auto">
        <header className="space-y-6 text-center">
          <div className="flex justify-center gap-2">
            <div className="mag-skeleton h-5 w-16 rounded-full" />
            <div className="mag-skeleton h-5 w-20 rounded-full" />
          </div>
          <div className="mag-skeleton h-10 w-3/4 mx-auto" />
          <div className="mag-skeleton h-4 w-48 mx-auto" />
          <div className="mag-skeleton h-5 w-2/3 mx-auto" />
        </header>
        <div className="mag-divider" />
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mag-skeleton h-4 w-full" />
          ))}
        </div>
      </article>
    </div>
  );
}
