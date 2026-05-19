import type { ResetPasswordPageProps } from "@/features/theme/contract/pages";

export function ResetPasswordPage({ resetPasswordForm, token, error }: ResetPasswordPageProps) {
  if (error) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Error</h1>
        <p className="text-sm" style={{ color: "var(--mag-accent)" }}>{error}</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-center">
        <p style={{ color: "var(--mag-text-secondary)" }}>Invalid or missing token.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Reset password</h1>
        <p className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>Enter your new password</p>
      </div>
      <form onSubmit={resetPasswordForm.handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>New Password</label>
          <input {...resetPasswordForm.register("password")} type="password" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
          {resetPasswordForm.errors.password && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{resetPasswordForm.errors.password.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Confirm Password</label>
          <input {...resetPasswordForm.register("confirmPassword")} type="password" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
          {resetPasswordForm.errors.confirmPassword && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{resetPasswordForm.errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" disabled={resetPasswordForm.isSubmitting} className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50" style={{ background: "var(--mag-accent)" }}>
          {resetPasswordForm.isSubmitting ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
