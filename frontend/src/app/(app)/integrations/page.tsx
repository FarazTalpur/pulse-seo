"use client";

import PageHeader from "@/components/page-header";
import { useIntegrations } from "@/lib/hooks";

export default function IntegrationsPage() {
  const { data, error, isLoading } = useIntegrations();

  if (isLoading) {
    return (
      <div className="glass rounded-3xl p-6">
        <div className="skeleton h-4 w-36 rounded-full" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton h-10 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass rounded-3xl p-6 text-sm text-white/80">
        Unable to load integrations. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Integrations"
        title="Everything your SEO stack needs."
        description="Connect data sources and send insights to the tools your team already uses."
        actions={
          <>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30">
              Manage keys
            </button>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
              Add integration
            </button>
          </>
        }
      />

      <section className="glass rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Connected sources
        </p>
        <div className="mt-6 space-y-3 text-sm text-white/80">
          {data.integrations.map((integration) => (
            <div
              key={integration.name}
              className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.4fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
            >
              <span className="text-white">{integration.name}</span>
              <span>{integration.status}</span>
              <span>{integration.owner}</span>
              <button className="text-[color:var(--accent)]">Edit</button>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Destinations
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/80">
            {data.destinations.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Data freshness
          </p>
          <div className="mt-6 space-y-4">
            {["GSC sync", "GA4 ingestion", "Rank tracking"].map((metric, index) => (
              <div key={metric} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>{metric}</span>
                  <span>{30 - index * 8} min ago</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-[color:var(--accent)]"
                    style={{ width: `${86 - index * 8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
