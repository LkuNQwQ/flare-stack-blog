import type { ForgotPasswordPageProps } from "@/features/theme/contract/pages";

export function ForgotPasswordPage({ forgotPasswordForm, turnstileElement }: ForgotPasswordPageProps) {
  if (forgotPasswordForm.isSent) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Check your email</h1>
        <p className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>
          We sent a reset link to <strong>{forgotPasswordForm.sentEmail}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Forgot password</h1>
        <p className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>Enter your email to receive a reset link</p>
      </div>
      <form onSubmit={forgotPasswordForm.handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Email</label>
          <input {...forgotPasswordForm.register("email")} type="email" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
          {forgotPasswordForm.errors.email && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{forgotPasswordForm.errors.email.message}</p>}
        </div>
        {turnstileElement}
        <button type="submit" disabled={forgotPasswordForm.isSubmitting} className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50" style={{ background: "var(--mag-accent)" }}>
          {forgotPasswordForm.isSubmitting ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}
