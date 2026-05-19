import type { VerifyEmailPageProps } from "@/features/theme/contract/pages";

export function VerifyEmailPage({ status, error }: VerifyEmailPageProps) {
  return (
    <div className="text-center space-y-4">
      {status === "ANALYZING" && (
        <>
          <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Verifying...</h1>
          <p className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>Please wait while we verify your email.</p>
        </>
      )}
      {status === "SUCCESS" && (
        <>
          <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Email verified!</h1>
          <p className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>Your email has been verified successfully.</p>
        </>
      )}
      {status === "ERROR" && (
        <>
          <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Verification failed</h1>
          <p className="text-sm" style={{ color: "var(--mag-accent)" }}>{error ?? "An error occurred."}</p>
        </>
      )}
    </div>
  );
}
