import type { SubmitFriendLinkPageProps } from "@/features/theme/contract/pages";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function SubmitFriendLinkPage({ myLinks, form }: SubmitFriendLinkPageProps) {
  return (
    <div className="mx-auto px-6 py-12" style={{ maxWidth: "640px" }}>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--mag-text)" }}>
        Submit Friend Link
      </h1>

      <form onSubmit={form.handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Site Name</label>
          <input
            {...form.register("siteName")}
            className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }}
          />
          {form.errors.siteName && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{form.errors.siteName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Site URL</label>
          <input
            {...form.register("siteUrl")}
            className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }}
          />
          {form.errors.siteUrl && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{form.errors.siteUrl.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Description</label>
          <textarea
            {...form.register("description")}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 resize-none"
            style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }}
          />
        </div>

        <button
          type="submit"
          disabled={form.isSubmitting}
          className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50"
          style={{ background: "var(--mag-accent)" }}
        >
          {form.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {myLinks.length > 0 && (
        <section className="mt-12 space-y-4">
          <h2 className="text-lg font-bold" style={{ color: "var(--mag-text)" }}>My Submissions</h2>
          <div className="space-y-3">
            {myLinks.map((link) => (
              <div key={link.id} className="mag-card p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: "var(--mag-text)" }}>{link.siteName}</p>
                  <p className="text-xs" style={{ color: "var(--mag-text-muted)" }}>{formatDate(link.createdAt)}</p>
                </div>
                <span
                  className="mag-tag"
                  style={{
                    background: link.status === "approved" ? "#dcfce7" : link.status === "rejected" ? "#fee2e2" : "var(--mag-tag-bg)",
                    color: link.status === "approved" ? "#166534" : link.status === "rejected" ? "#991b1b" : "var(--mag-tag-text)",
                  }}
                >
                  {link.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
