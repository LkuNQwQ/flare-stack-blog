import { ExternalLink } from "lucide-react";
import type { FriendLinksPageProps } from "@/features/theme/contract/pages";

export function FriendLinksPage({ links }: FriendLinksPageProps) {
  return (
    <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--mag-page-width)" }}>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--mag-text)" }}>
          Friend Links
        </h1>
        <p className="mt-2" style={{ color: "var(--mag-text-secondary)" }}>
          Sites I recommend
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mag-card group block p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              {link.user?.image && (
                <img src={link.user.image} alt={link.siteName} className="w-10 h-10 rounded-full object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-bold truncate group-hover:underline underline-offset-3" style={{ color: "var(--mag-text)" }}>
                  {link.siteName}
                </h3>
              </div>
              <ExternalLink size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--mag-text-muted)" }} />
            </div>
            {link.description && (
              <p className="text-sm line-clamp-2" style={{ color: "var(--mag-text-secondary)" }}>
                {link.description}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

export function FriendLinksPageSkeleton() {
  return (
    <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--mag-page-width)" }}>
      <div className="mb-10 space-y-2">
        <div className="mag-skeleton h-8 w-40" />
        <div className="mag-skeleton h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="mag-card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="mag-skeleton w-10 h-10 rounded-full" />
              <div className="mag-skeleton h-5 w-24" />
            </div>
            <div className="mag-skeleton h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
