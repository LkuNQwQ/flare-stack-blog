import type { RegisterPageProps } from "@/features/theme/contract/pages";

export function RegisterPage({ isEmailConfigured, registerForm, turnstileElement }: RegisterPageProps) {
  if (!isEmailConfigured) {
    return (
      <div className="text-center space-y-4">
        <p style={{ color: "var(--mag-text-secondary)" }}>Registration is not available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Create account</h1>
        <p className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>Register a new account</p>
      </div>

      <form onSubmit={registerForm.handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Name</label>
          <input {...registerForm.register("name")} className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
          {registerForm.errors.name && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{registerForm.errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Email</label>
          <input {...registerForm.register("email")} type="email" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
          {registerForm.errors.email && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{registerForm.errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Password</label>
          <input {...registerForm.register("password")} type="password" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
          {registerForm.errors.password && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{registerForm.errors.password.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Confirm Password</label>
          <input {...registerForm.register("confirmPassword")} type="password" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
          {registerForm.errors.confirmPassword && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{registerForm.errors.confirmPassword.message}</p>}
        </div>
        {turnstileElement}
        <button type="submit" disabled={registerForm.isSubmitting} className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50" style={{ background: "var(--mag-accent)" }}>
          {registerForm.isSubmitting ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
