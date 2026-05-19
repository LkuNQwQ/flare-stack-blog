import { ArrowLeft, Search } from "lucide-react";
import type { SearchPageProps } from "@/features/theme/contract/pages";

export function SearchPage({ query, results, isSearching, onQueryChange, onSelectPost, onBack }: SearchPageProps) {
  return (
    <div className="mx-auto px-6 py-12" style={{ maxWidth: "var(--mag-page-width)" }}>
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--mag-text-muted)" }}>
        <ArrowLeft size={14} /> Back
      </button>

      <div className="relative max-w-2xl mx-auto mb-10">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--mag-text-muted)" }} />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-12 pr-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2"
          style={{
            background: "var(--mag-surface)",
            border: "1px solid var(--mag-border)",
            color: "var(--mag-text)",
            // @ts-expect-error CSS custom property
            "--tw-ring-color": "var(--mag-accent)",
          }}
          autoFocus
        />
      </div>

      {isSearching && (
        <div className="text-center py-12">
          <div className="mag-skeleton h-5 w-32 mx-auto" />
        </div>
      )}

      {!isSearching && query && results.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: "var(--mag-text-muted)" }}>No results found for "{query}"</p>
        </div>
      )}

      <div className="space-y-4 max-w-2xl mx-auto">
        {results.map((result) => (
          <button
            key={result.post.id}
            onClick={() => onSelectPost(result.post.slug)}
            className="mag-card block w-full text-left p-6 space-y-2"
          >
            <h3 className="font-bold" style={{ color: "var(--mag-text)" }}>{result.post.title}</h3>
            {result.post.summary && (
              <p className="text-sm line-clamp-2" style={{ color: "var(--mag-text-secondary)" }}>{result.post.summary}</p>
            )}
            <div className="flex items-center gap-2">
              {result.post.tags.map((tag) => (
                <span key={tag} className="mag-tag">{tag}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
