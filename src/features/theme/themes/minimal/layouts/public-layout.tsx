import { Link, useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";

export function PublicLayout({
  children,
  navOptions,
  user,
  isSessionLoading,
  logout,
}: PublicLayoutProps) {
  const { siteConfig } = useRouteContext({ from: "__root__" });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--mag-bg)" }}>
      {/* Navbar */}
      <header className="mag-nav sticky top-0 z-50">
        <div className="mx-auto flex items-center justify-between px-6 py-3" style={{ maxWidth: "var(--mag-page-width)" }}>
          <Link to="/" className="text-lg font-bold tracking-tight" style={{ color: "var(--mag-text)" }}>
            {siteConfig.title}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navOptions.map((opt) => (
              <Link
                key={opt.id}
                to={opt.to}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--mag-text-secondary)" }}
                activeProps={{ style: { color: "var(--mag-accent)" } }}
              >
                {opt.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!isSessionLoading && user && (
              <button
                onClick={logout}
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--mag-text-secondary)" }}
              >
                {user.name}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-0.5 rounded transition-transform" style={{ background: "var(--mag-text)", transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none" }} />
              <span className="block w-5 h-0.5 rounded transition-opacity" style={{ background: "var(--mag-text)", opacity: mobileOpen ? 0 : 1 }} />
              <span className="block w-5 h-0.5 rounded transition-transform" style={{ background: "var(--mag-text)", transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3">
            {navOptions.map((opt) => (
              <Link
                key={opt.id}
                to={opt.to}
                className="block text-sm font-medium py-2 border-b transition-colors"
                style={{ color: "var(--mag-text-secondary)", borderColor: "var(--mag-border)" }}
                onClick={() => setMobileOpen(false)}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="mag-divider mt-16">
        <div className="mx-auto px-6 py-10" style={{ maxWidth: "var(--mag-page-width)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: "var(--mag-text-muted)" }}>
              &copy; {new Date().getFullYear()} {siteConfig.title}
            </p>
            <nav className="flex items-center gap-5">
              {navOptions.map((opt) => (
                <Link
                  key={opt.id}
                  to={opt.to}
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--mag-text-muted)" }}
                >
                  {opt.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
