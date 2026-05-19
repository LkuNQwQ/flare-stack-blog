import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Eye } from "lucide-react";
import { useMemo } from "react";
import { resolveSocialHref, SOCIAL_PLATFORMS } from "@/features/config/utils/social-platforms";
import { useViewCounts } from "@/features/pageview/queries";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { useRouteContext } from "@tanstack/react-router";

function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function HomePage({ posts, pinnedPosts, popularPosts }: HomePageProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });

  const displayPosts = useMemo(() => {
    const pinned = (pinnedPosts ?? []).map((p) => ({ ...p, isPinned: true }));
    const regular = posts.map((p) => ({ ...p, isPinned: false }));
    const seen = new Set<number>();
    const merged = [];
    for (const p of [...pinned, ...regular]) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
    return merged;
  }, [posts, pinnedPosts]);

  const allSlugs = useMemo(() => displayPosts.map((p) => p.slug), [displayPosts]);
  const { data: viewCounts } = useViewCounts(allSlugs);

  const featured = displayPosts[0];
  const rest = displayPosts.slice(1);

  return (
    <div className="mx-auto px-6" style={{ maxWidth: "var(--mag-page-width)" }}>
      {/* Hero: site intro */}
      <section className="py-16 md:py-24 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--mag-text)" }}>
          {siteConfig.title}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "var(--mag-text-secondary)" }}>
          {siteConfig.description}
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          {siteConfig.social.filter((l) => l.url).map((link, i) => {
            const preset = link.platform !== "custom" ? SOCIAL_PLATFORMS[link.platform] : null;
            const Icon = preset?.icon;
            const label = preset?.label ?? link.label ?? "";
            const href = resolveSocialHref(link.platform, link.url);
            return (
              <a
                key={`${link.platform}-${i}`}
                href={href}
                target={link.platform === "email" ? undefined : "_blank"}
                rel={link.platform === "email" ? undefined : "noreferrer"}
                className="mag-social-icon"
                aria-label={label}
              >
                {Icon ? <Icon size={18} strokeWidth={1.5} /> : <img src={link.icon} alt={label} className="w-4 h-4" />}
              </a>
            );
          })}
        </div>
      </section>

      <div className="mag-divider" />

      {/* Featured post (hero card) */}
      {featured && (
        <section className="py-12">
          <Link to="/post/$slug" params={{ slug: featured.slug }} className="mag-card group block">
            <div className="p-8 md:p-12 space-y-4">
              <div className="flex items-center gap-3">
                <span className="mag-tag">Featured</span>
                {featured.tags?.map((tag) => (
                  <span key={tag.id} className="mag-tag">{tag.name}</span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:underline underline-offset-4" style={{ color: "var(--mag-text)" }}>
                {featured.title}
              </h2>
              {featured.summary && (
                <p className="text-base leading-relaxed max-w-3xl" style={{ color: "var(--mag-text-secondary)" }}>
                  {featured.summary}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm" style={{ color: "var(--mag-text-muted)" }}>
                <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTimeInMinutes} min</span>
                <span>{formatDate(featured.publishedAt ?? featured.createdAt)}</span>
                {viewCounts?.[featured.slug] != null && (
                  <span className="flex items-center gap-1"><Eye size={14} /> {viewCounts[featured.slug]}</span>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Post grid */}
      {rest.length > 0 && (
        <section className="pb-16 space-y-8">
          <h2 className="mag-heading-accent text-xl font-bold" style={{ color: "var(--mag-text)" }}>
            Latest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.id} to="/post/$slug" params={{ slug: post.slug }} className="mag-card group block">
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span key={tag.id} className="mag-tag">{tag.name}</span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold leading-snug group-hover:underline underline-offset-3" style={{ color: "var(--mag-text)" }}>
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--mag-text-secondary)" }}>
                      {post.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--mag-text-muted)" }}>
                    <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTimeInMinutes} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              to="/posts"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--mag-accent)" }}
            >
              View all posts <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Popular posts sidebar-style section */}
      {popularPosts && popularPosts.length > 0 && (
        <section className="pb-16 space-y-8">
          <h2 className="mag-heading-accent text-xl font-bold" style={{ color: "var(--mag-text)" }}>
            Popular
          </h2>
          <div className="space-y-4">
            {popularPosts.map((post, i) => (
              <Link key={post.id} to="/post/$slug" params={{ slug: post.slug }} className="mag-card group flex items-center gap-6 p-5">
                <span className="text-3xl font-bold shrink-0 w-10 text-center" style={{ color: "var(--mag-text-muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 space-y-1">
                  <h3 className="font-bold truncate group-hover:underline underline-offset-3" style={{ color: "var(--mag-text)" }}>
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--mag-text-muted)" }}>
                    <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTimeInMinutes} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
