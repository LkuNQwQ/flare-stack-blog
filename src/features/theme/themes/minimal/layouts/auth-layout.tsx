import type { AuthLayoutProps } from "@/features/theme/contract/layouts";

export function AuthLayout({ onBack, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--mag-bg)" }}>
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-8 text-sm transition-colors hover:opacity-80"
          style={{ color: "var(--mag-text-secondary)" }}
        >
          &larr; Back
        </button>
        {children}
      </div>
    </div>
  );
}
