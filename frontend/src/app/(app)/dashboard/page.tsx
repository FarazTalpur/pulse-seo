"use client";

import EmptyState from "@/components/empty-state";
import { useDashboard } from "@/lib/hooks";

export default function DashboardPage() {
  const { data, error, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="glass rounded-3xl p-6">
          <div className="skeleton h-3 w-40 rounded-full" />
          <div className="mt-4 skeleton h-8 w-2/5 rounded-2xl" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="glass rounded-3xl p-5">
              <div className="skeleton h-3 w-24 rounded-full" />
              <div className="mt-4 skeleton h-8 w-2/3 rounded-2xl" />
              <div className="mt-3 skeleton h-3 w-1/2 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass rounded-3xl p-6 text-sm text-white/80">
        Unable to load dashboard data. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Command center
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Good morning, Faraz.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30">
            Share report
          </button>
          <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
            New automation
          </button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <div key={stat.label} className="glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              {stat.label}
            </p>
            <p className="mt-4 text-3xl text-white">{stat.value}</p>
            <p className="mt-2 text-xs text-[color:var(--muted)]">
              {stat.note}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Visibility pulse
              </p>
              <h3 className="mt-2 text-2xl text-white">
                Organic performance snapshot
              </h3>
            </div>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70">
              Last 30 days
            </button>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.6fr_0.4fr]">
            <div className="flex h-52 items-end gap-3">
              {[20, 45, 32, 55, 40, 65, 58, 72].map((value) => (
                <div key={value} className="flex-1 rounded-full bg-white/10">
                  <div
                    className="rounded-full bg-gradient-to-t from-[color:var(--accent)] to-[color:var(--accent-2)]"
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-[color:var(--muted)]">Top mover</p>
                <p className="mt-2 text-lg text-white">/solutions/ai</p>
                <p className="text-xs text-[color:var(--accent)]">+18 positions</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-[color:var(--muted)]">Decay risk</p>
                <p className="mt-2 text-lg text-white">/blog/seo-trends</p>
                <p className="text-xs text-[color:var(--accent-3)]">Needs refresh</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Priority alerts
          </p>
          <div className="mt-6 space-y-4">
            {data.alerts.map((alert) => (
              <div
                key={alert.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center justify-between text-sm text-white">
                  <span>{alert.title}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${
                      alert.level === "high"
                        ? "bg-[#ff6b6b]/20 text-[#ff6b6b]"
                        : alert.level === "medium"
                        ? "bg-[#ffb86b]/20 text-[#ffb86b]"
                        : "bg-[#6cf6ff]/20 text-[#6cf6ff]"
                    }`}
                  >
                    {alert.level}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  {alert.detail}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {alert.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              High-impact tasks
            </p>
            <button className="text-xs text-[color:var(--accent)]">
              View all
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {data.tasks.map((task) => (
              <div
                key={task.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{task.title}</p>
                    <p className="text-xs text-[color:var(--muted)]">
                      {task.detail}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                    {task.status}
                  </span>
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Owner: {task.owner}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Top opportunities
          </p>
          <div className="mt-6 space-y-4">
            {data.opportunities.map((item) => (
              <div
                key={item.page}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm text-white">{item.page}</p>
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  {item.reason}
                </p>
                <p className="mt-3 text-xs text-[color:var(--accent)]">
                  {item.gain}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Content briefs
          </p>
          <div className="mt-6 space-y-4">
            {data.briefs.map((brief) => (
              <div
                key={brief.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm text-white">{brief.title}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-[color:var(--muted)]">
                  <span>{brief.status}</span>
                  <span className="text-white/60">ETA {brief.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="clusters" className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Keyword clusters
            </p>
            <button className="text-xs text-[color:var(--accent)]">
              Export
            </button>
          </div>
          <div className="mt-6 space-y-3 text-sm text-white/80">
            {data.clusters.map((cluster) => (
              <div
                key={cluster.keyword}
                className="grid grid-cols-[1.4fr_0.6fr_0.6fr_0.8fr_0.6fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
              >
                <span className="text-white">{cluster.keyword}</span>
                <span>{cluster.volume}</span>
                <span>{cluster.difficulty}</span>
                <span>{cluster.intent}</span>
                <span className="text-[color:var(--accent)]">{cluster.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="automation" className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Automation queue
            </p>
            <button className="text-xs text-[color:var(--accent)]">Edit</button>
          </div>
          <div className="mt-6 space-y-4">
            {data.automations.map((automation) => (
              <div
                key={automation.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm text-white">{automation.title}</p>
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  {automation.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="integrations" className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Integrations
          </p>
          <div className="mt-6 space-y-4">
            {data.integrations.map((integration) => (
              <div
                key={integration.title}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm text-white">{integration.title}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Experiments
          </p>
          <EmptyState
            title="No experiments running"
            description="Spin up A/B tests for titles or meta descriptions."
            action="Create experiment"
          />
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Alerts inbox
          </p>
          <EmptyState
            title="Inbox cleared"
            description="New alerts will appear here as they arrive."
          />
        </div>
      </section>
    </div>
  );
}
