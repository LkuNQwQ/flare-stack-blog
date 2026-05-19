import { Link } from "@tanstack/react-router";
import { Clock, Loader2 } from "lucide-react";
import type { PostsPageProps } from "@/features/theme/contract/pages";

function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function PostsPage({
  posts,
  tags,
  selectedTag,
  onTagClick,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PostsPageProps) {
  return (
    <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--mag-page-width)" }}>
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--mag-text)" }}>
          All Posts
        </h1>

        {/* Tag filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            className={`mag-tag ${!selectedTag ? "ring-1" : ""}`}
            style={!selectedTag ? { background: "var(--mag-accent)", color: "white", "--ring-color": "var(--mag-accent)" } as React.CSSProperties : undefined}
            onClick={() => onTagClick("")}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              className={`mag-tag ${selectedTag === tag.name ? "ring-1" : ""}`}
              style={selectedTag === tag.name ? { background: "var(--mag-accent)", color: "white" } : undefined}
              onClick={() => onTagClick(tag.name)}
            >
              {tag.name} ({tag.postCount})
            </button>
          ))}
        </div>
      </header>

      {/* Post list */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="mag-card group block p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags?.map((tag) => (
                    <span key={tag.id} className="mag-tag">{tag.name}</span>
                  ))}
                </div>
                <h2 className="text-xl font-bold tracking-tight group-hover:underline underline-offset-4" style={{ color: "var(--mag-text)" }}>
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--mag-text-secondary)" }}>
                    {post.summary}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs shrink-0 md:text-right md:flex-col md:items-end md:gap-1" style={{ color: "var(--mag-text-muted)" }}>
                <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTimeInMinutes} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      {hasNextPage && (
        <div className="text-center pt-10">
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text-secondary)" }}
          >
            {isFetchingNextPage ? (
              <><Loader2 size={16} className="animate-spin" /> Loading...</>
            ) : (
              "Load more"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
