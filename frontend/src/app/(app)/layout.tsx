import type { ReactNode } from "react";
import SidebarNav from "@/components/sidebar-nav";
import Topbar from "@/components/topbar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0b0f16] text-white">
      <div className="noise absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-64 grid-mask opacity-60" />

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        <aside className="glass hidden w-72 flex-col gap-8 border-r border-white/5 px-6 py-8 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_top,#6cf6ff,transparent_60%)] text-black shadow-[0_0_20px_rgba(108,246,255,0.55)]">
              P
            </div>
            <div>
              <p className="text-lg font-semibold">PulseSEO</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Workspace
              </p>
            </div>
          </div>

          <SidebarNav />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-[color:var(--muted)]">
            <p className="text-white">Weekly audit scheduled</p>
            <p className="mt-2">Next run: Wed 7:00 AM</p>
            <button className="mt-4 w-full rounded-full bg-[color:var(--accent)] py-2 text-xs font-semibold text-black">
              View run plan
            </button>
          </div>
        </aside>

        <main className="flex-1 px-6 pb-10 pt-8 lg:px-10">
          <Topbar />
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
