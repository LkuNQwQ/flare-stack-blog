import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { relatedPostsQuery } from "@/features/posts/queries";
import { config } from "../../../config";

function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function RelatedPosts({ slug }: { slug: string }) {
  const { data: posts } = useSuspenseQuery(relatedPostsQuery(slug, config.post.relatedPostsLimit));
  if (posts.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="mag-heading-accent text-lg font-bold" style={{ color: "var(--mag-text)" }}>
        Related
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="mag-card group block p-5 space-y-2"
          >
            <div className="text-xs" style={{ color: "var(--mag-text-muted)" }}>
              {formatDate(post.publishedAt)} &middot; {post.readTimeInMinutes} min
            </div>
            <h3 className="font-bold text-sm leading-snug group-hover:underline underline-offset-3" style={{ color: "var(--mag-text)" }}>
              {post.title}
            </h3>
            <div className="flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: "var(--mag-accent)" }}>
              Read <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RelatedPostsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="mag-skeleton h-5 w-20" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mag-card p-5 space-y-2">
            <div className="mag-skeleton h-3 w-24" />
            <div className="mag-skeleton h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
