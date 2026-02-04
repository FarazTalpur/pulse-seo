"use client";

import EmptyState from "@/components/empty-state";
import { useAudits } from "@/lib/hooks";

export default function AuditsPage() {
  const { data, error, isLoading } = useAudits();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="glass rounded-3xl p-5">
            <div className="skeleton h-3 w-20 rounded-full" />
            <div className="mt-4 skeleton h-8 w-2/3 rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="glass rounded-3xl p-6 text-sm text-white/80">
        Unable to load audits. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Audits
        </p>
        <h2 className="text-3xl font-semibold text-white">
          Real-time technical health.
        </h2>
        <p className="max-w-2xl text-sm text-[color:var(--muted)]">
          Monitor crawl depth, indexation, and site quality scores across every
          property.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.issueBuckets.map((bucket) => (
          <div key={bucket.label} className="glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              {bucket.label}
            </p>
            <p className="mt-4 text-3xl text-white">{bucket.count}</p>
            <div className="mt-4 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-2 rounded-full"
                style={{ width: "70%", backgroundColor: bucket.color }}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Latest audit runs
            </p>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70">
              Start new crawl
            </button>
          </div>
          <div className="mt-6 space-y-3 text-sm text-white/80">
            {data.auditRuns.map((run) => (
              <div
                key={run.site}
                className="grid grid-cols-[1.4fr_0.6fr_0.5fr_0.5fr_0.8fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
              >
                <span className="text-white">{run.site}</span>
                <span>{run.status}</span>
                <span>{run.issues} issues</span>
                <span>{run.score ? `${run.score}%` : "—"}</span>
                <span className="text-white/60">{run.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Priority recommendations
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {data.recommendations.map((rec) => (
              <li
                key={rec}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Crawl history
          </p>
          <EmptyState
            title="No historical crawls yet"
            description="Archive past crawls here once weekly runs complete."
            action="Set retention rules"
          />
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Unassigned fixes
          </p>
          <EmptyState
            title="All fixes assigned"
            description="When new issues arrive, they will appear here for triage."
          />
        </div>
      </section>
    </div>
  );
}
