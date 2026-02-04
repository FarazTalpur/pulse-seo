"use client";

import PageHeader from "@/components/page-header";
import { useSummary } from "@/lib/hooks";
import { useApi } from "@/lib/hooks";
import { fetchClientJson } from "@/lib/client-api";

const endpoints = [
  { label: "Summary", path: "/api/summary" },
  { label: "Dashboard", path: "/api/dashboard" },
  { label: "Audits", path: "/api/audits" },
  { label: "Briefs", path: "/api/briefs" },
  { label: "Reports", path: "/api/reports" },
  { label: "Automations", path: "/api/automations" },
  { label: "Integrations", path: "/api/integrations" },
  { label: "Settings", path: "/api/settings" },
  { label: "Team", path: "/api/team" }
];

export default function StatusPage() {
  const summary = useSummary();

  const statusChecks = endpoints.map((endpoint) =>
    useApi<Record<string, unknown>>(endpoint.path, () =>
      fetchClientJson<Record<string, unknown>>(endpoint.path)
    )
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="API status"
        title="Mock API health check."
        description="Quickly verify every endpoint used by the dashboard."
      />

      <section className="glass rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Version
            </p>
            {summary.isLoading ? (
              <div className="mt-3 skeleton h-6 w-32 rounded-full" />
            ) : summary.error || !summary.data ? (
              <p className="mt-3 text-sm text-white/60">Unavailable</p>
            ) : (
              <p className="mt-3 text-lg text-white">
                {summary.data.version} · {summary.data.updated}
              </p>
            )}
          </div>
          <p className="text-xs text-[color:var(--muted)]">
            Auto-refreshes on each visit
          </p>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <div className="grid gap-3 text-xs text-white/80">
          {endpoints.map((endpoint, index) => {
            const check = statusChecks[index];
            const ok = !check.error && !!check.data;
            const preview = check.data
              ? JSON.stringify(check.data).slice(0, 120)
              : check.isLoading
              ? "Loading..."
              : "Error";
            return (
              <div
                key={endpoint.path}
                className="grid grid-cols-[0.8fr_0.6fr_0.4fr_1.2fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="text-white">{endpoint.label}</span>
                <span className="text-white/60">{endpoint.path}</span>
                <span
                  className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${
                    ok
                      ? "bg-[#6cf6ff]/20 text-[#6cf6ff]"
                      : check.isLoading
                      ? "bg-white/10 text-white/60"
                      : "bg-[#ff6b6b]/20 text-[#ff6b6b]"
                  }`}
                >
                  {check.isLoading ? "loading" : ok ? "ok" : "error"}
                </span>
                <span className="text-white/60">
                  {preview.length === 120 ? `${preview}…` : preview}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
