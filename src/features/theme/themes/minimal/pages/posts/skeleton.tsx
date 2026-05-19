export function PostsPageSkeleton() {
  return (
    <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--mag-page-width)" }}>
      <header className="mb-10 space-y-4">
        <div className="mag-skeleton h-8 w-40" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mag-skeleton h-6 w-16 rounded-full" />
          ))}
        </div>
      </header>
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mag-card p-6 md:p-8 space-y-3">
            <div className="mag-skeleton h-4 w-20" />
            <div className="mag-skeleton h-6 w-3/4" />
            <div className="mag-skeleton h-4 w-full" />
            <div className="mag-skeleton h-3 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
