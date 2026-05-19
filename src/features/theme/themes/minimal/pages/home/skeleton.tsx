export function HomePageSkeleton() {
  return (
    <div className="mx-auto px-6" style={{ maxWidth: "var(--mag-page-width)" }}>
      {/* Hero skeleton */}
      <section className="py-16 md:py-24 text-center space-y-6">
        <div className="mag-skeleton h-10 w-64 mx-auto" />
        <div className="mag-skeleton h-5 w-96 mx-auto" />
      </section>
      <div className="mag-divider" />
      {/* Featured skeleton */}
      <section className="py-12">
        <div className="mag-card p-8 md:p-12 space-y-4">
          <div className="mag-skeleton h-5 w-20" />
          <div className="mag-skeleton h-8 w-3/4" />
          <div className="mag-skeleton h-4 w-full" />
          <div className="mag-skeleton h-4 w-2/3" />
        </div>
      </section>
      {/* Grid skeleton */}
      <section className="pb-16 space-y-8">
        <div className="mag-skeleton h-6 w-24" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mag-card p-6 space-y-3">
              <div className="mag-skeleton h-4 w-16" />
              <div className="mag-skeleton h-5 w-full" />
              <div className="mag-skeleton h-4 w-2/3" />
              <div className="mag-skeleton h-3 w-32" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
