import type { LoginPageProps } from "@/features/theme/contract/pages";

export function LoginPage({ isEmailConfigured, loginForm, socialLogin, turnstileElement }: LoginPageProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Welcome back</h1>
        <p className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>Log in to your account</p>
      </div>

      {/* GitHub login */}
      <button
        onClick={socialLogin.handleGithubLogin}
        disabled={socialLogin.isLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-opacity disabled:opacity-50"
        style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
        Continue with GitHub
      </button>

      {isEmailConfigured && (
        <>
          <div className="relative">
            <div className="mag-divider" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 text-xs" style={{ background: "var(--mag-bg)", color: "var(--mag-text-muted)" }}>
              or
            </span>
          </div>

          <form onSubmit={loginForm.handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Email</label>
              <input
                {...loginForm.register("email")}
                type="email"
                className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
                style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }}
              />
              {loginForm.errors.email && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{loginForm.errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Password</label>
              <input
                {...loginForm.register("password")}
                type="password"
                className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
                style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }}
              />
              {loginForm.errors.password && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{loginForm.errors.password.message}</p>}
            </div>

            {turnstileElement}

            <button
              type="submit"
              disabled={loginForm.isSubmitting}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50"
              style={{ background: "var(--mag-accent)" }}
            >
              {loginForm.isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
