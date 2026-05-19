import { Link } from "@tanstack/react-router";
import type { UserLayoutProps } from "@/features/theme/contract/layouts";

export function UserLayout({
  isAuthenticated,
  navOptions,
  user,
  isSessionLoading,
  logout,
  children,
}: UserLayoutProps) {
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--mag-bg)" }}>
        <div className="text-center space-y-4">
          <p style={{ color: "var(--mag-text-secondary)" }}>Please log in to continue.</p>
          <Link to="/login" className="inline-block px-6 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "var(--mag-accent)" }}>
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--mag-bg)" }}>
      <header className="mag-nav sticky top-0 z-50">
        <div className="mx-auto flex items-center justify-between px-6 py-3" style={{ maxWidth: "var(--mag-page-width)" }}>
          <span className="text-lg font-bold" style={{ color: "var(--mag-text)" }}>
            {user?.name ?? "User"}
          </span>
          <div className="flex items-center gap-4">
            {navOptions.map((opt) => (
              <Link key={opt.id} to={opt.to} className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--mag-text-secondary)" }}>
                {opt.label}
              </Link>
            ))}
            {!isSessionLoading && (
              <button onClick={logout} className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--mag-text-muted)" }}>
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full px-6 py-10" style={{ maxWidth: "var(--mag-page-width)" }}>
        {children}
      </main>
    </div>
  );
}
