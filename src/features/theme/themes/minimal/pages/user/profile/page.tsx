import type { ProfilePageProps } from "@/features/theme/contract/pages";

export function ProfilePage({ user, profileForm, passwordForm, notification, logout }: ProfilePageProps) {
  return (
    <div className="max-w-xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold" style={{ color: "var(--mag-text)" }}>Profile</h1>

      {/* Profile info */}
      <section className="space-y-5">
        <h2 className="text-lg font-bold" style={{ color: "var(--mag-text)" }}>Account</h2>
        <form onSubmit={profileForm.handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Name</label>
            <input {...profileForm.register("name")} className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
            {profileForm.errors.name && <p className="text-xs" style={{ color: "var(--mag-accent)" }}>{profileForm.errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Email</label>
            <input value={user.email} disabled className="w-full px-4 py-2.5 rounded-lg text-sm opacity-60" style={{ background: "var(--mag-tag-bg)", border: "1px solid var(--mag-border)", color: "var(--mag-text-secondary)" }} />
          </div>
          <button type="submit" disabled={profileForm.isSubmitting} className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50" style={{ background: "var(--mag-accent)" }}>
            {profileForm.isSubmitting ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>

      {/* Password */}
      {passwordForm && (
        <section className="space-y-5">
          <h2 className="text-lg font-bold" style={{ color: "var(--mag-text)" }}>Change Password</h2>
          <form onSubmit={passwordForm.handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Current Password</label>
              <input {...passwordForm.register("currentPassword")} type="password" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>New Password</label>
              <input {...passwordForm.register("newPassword")} type="password" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--mag-text-secondary)" }}>Confirm New Password</label>
              <input {...passwordForm.register("confirmPassword")} type="password" className="w-full px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text)" }} />
            </div>
            <button type="submit" disabled={passwordForm.isSubmitting} className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50" style={{ background: "var(--mag-accent)" }}>
              {passwordForm.isSubmitting ? "Updating..." : "Update password"}
            </button>
          </form>
        </section>
      )}

      {/* Notifications */}
      {notification.available && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: "var(--mag-text)" }}>Notifications</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--mag-text-secondary)" }}>Email notifications</span>
            <button
              onClick={notification.toggle}
              disabled={notification.isPending}
              className="relative w-11 h-6 rounded-full transition-colors"
              style={{ background: notification.enabled ? "var(--mag-accent)" : "var(--mag-border)" }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                style={{ transform: notification.enabled ? "translateX(1.25rem)" : "translateX(0)" }}
              />
            </button>
          </div>
        </section>
      )}

      {/* Logout */}
      <section>
        <button onClick={logout} className="px-5 py-2 rounded-lg text-sm font-medium transition-colors" style={{ border: "1px solid var(--mag-border)", color: "var(--mag-text-secondary)" }}>
          Log out
        </button>
      </section>
    </div>
  );
}
