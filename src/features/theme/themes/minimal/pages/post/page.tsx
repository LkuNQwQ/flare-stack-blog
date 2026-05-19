import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUp, Pencil, Share2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import type { PostPageProps } from "@/features/theme/contract/pages";
import { ContentRenderer } from "../../components/content/content-renderer";
import { CommentSection } from "../../components/comments/comment-section";
import { authClient } from "@/lib/auth/auth.client";
import { RelatedPosts, RelatedPostsSkeleton } from "./components/related-posts";
import TableOfContents from "./components/table-of-contents";

function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function PostPage({ post }: PostPageProps) {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mx-auto px-6 pb-20" style={{ maxWidth: "var(--mag-page-width)" }}>
      {/* Back */}
      <nav className="py-10 flex items-center justify-between">
        <button
          onClick={() => navigate({ to: "/posts" })}
          className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--mag-text-muted)" }}
        >
          <ArrowLeft size={14} /> Back to posts
        </button>
        {session?.user.role === "admin" && (
          <Link
            to="/admin/posts/edit/$id"
            params={{ id: String(post.id) }}
            className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--mag-text-muted)" }}
          >
            <Pencil size={14} /> Edit
          </Link>
        )}
      </nav>

      <article className="space-y-12">
        {/* Header */}
        <header className="space-y-6 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {post.tags?.map((tag) => (
              <Link key={tag.id} to="/posts" search={{ tagName: tag.name }} className="mag-tag">
                {tag.name}
              </Link>
            ))}
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            style={{ color: "var(--mag-text)", viewTransitionName: `post-title-${post.slug}` }}
          >
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-sm" style={{ color: "var(--mag-text-muted)" }}>
            <span>{formatDate(post.publishedAt)}</span>
            <span>&middot;</span>
            <span>{post.readTimeInMinutes} min read</span>
          </div>

          {post.summary && (
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--mag-text-secondary)" }}>
              {post.summary}
            </p>
          )}
        </header>

        <div className="mag-divider max-w-3xl mx-auto" />

        {/* Content + TOC layout */}
        <div className="relative">
          <aside className="hidden xl:block absolute left-full ml-10 top-0">
            <div className="sticky top-32 w-56">
              <TableOfContents headers={post.toc} />
            </div>
          </aside>

          <main className="max-w-3xl mx-auto">
            <ContentRenderer content={post.contentJson} />

            {/* Share footer */}
            <footer className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: "1px solid var(--mag-border)" }}>
              <span className="text-sm" style={{ color: "var(--mag-text-muted)" }}>End of article</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    toast.success("Link copied!");
                  });
                }}
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--mag-text-secondary)" }}
              >
                Share <Share2 size={14} />
              </button>
            </footer>
          </main>
        </div>

        {/* Related Posts */}
        <div className="max-w-3xl mx-auto pt-8" style={{ borderTop: "1px solid var(--mag-border)" }}>
          <Suspense fallback={<RelatedPostsSkeleton />}>
            <RelatedPosts slug={post.slug} />
          </Suspense>
        </div>

        {/* Comments */}
        <div className="max-w-3xl mx-auto">
          <CommentSection postId={post.id} />
        </div>
      </article>

      {/* Back to top */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center gap-1 p-3 rounded-full transition-colors"
          style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", boxShadow: "var(--mag-card-shadow)" }}
        >
          <ArrowUp size={16} style={{ color: "var(--mag-text-secondary)" }} />
        </button>
      </div>
    </div>
  );
}
