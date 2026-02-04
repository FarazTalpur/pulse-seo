"use client";

import EmptyState from "@/components/empty-state";
import { useReports } from "@/lib/hooks";

export default function ReportsPage() {
  const { data, error, isLoading } = useReports();

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
        Unable to load reports. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Reports
        </p>
        <h2 className="text-3xl font-semibold text-white">
          Reports your stakeholders actually read.
        </h2>
        <p className="max-w-2xl text-sm text-[color:var(--muted)]">
          Automate story-driven SEO reports with clear narratives and
          recommendations.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-3xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Scheduled reports
              </p>
              <h3 className="mt-2 text-2xl text-white">Delivery pipeline</h3>
            </div>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
              New report
            </button>
          </div>
          <div className="mt-6 space-y-3 text-sm text-white/80">
            {data.reports.map((report) => (
              <div
                key={report.name}
                className="grid grid-cols-[1.2fr_0.8fr_1fr_0.6fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
              >
                <span className="text-white">{report.name}</span>
                <span>{report.cadence}</span>
                <span>{report.recipients}</span>
                <span className="text-white/60">{report.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Report templates
          </p>
          <div className="mt-6 space-y-3">
            {data.templates.map((template) => (
              <div
                key={template}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
              >
                {template}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Recent exports
        </p>
        <div className="mt-6 space-y-3 text-sm text-white/80">
          {data.exports.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-[1.3fr_0.4fr_0.6fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
            >
              <span className="text-white">{item.name}</span>
              <span>{item.type}</span>
              <span className="text-white/60">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Custom templates
          </p>
          <EmptyState
            title="No custom templates yet"
            description="Save a report to create a reusable template."
            action="Save as template"
          />
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            One-off exports
          </p>
          <EmptyState
            title="No exports queued"
            description="Generate a one-time export to share with stakeholders."
            action="Generate export"
          />
        </div>
      </section>
    </div>
  );
}
