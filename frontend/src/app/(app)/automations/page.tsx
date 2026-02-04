"use client";

import EmptyState from "@/components/empty-state";
import PageHeader from "@/components/page-header";
import { postClientJson } from "@/lib/client-api";
import { useAutomations } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

export default function AutomationsPage() {
  const { data, error, isLoading } = useAutomations();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const handleCreateAutomation = async () => {
    if (!session?.user?.organizationId) {
      alert("No organization available for this account.");
      return;
    }

    await postClientJson("/v1/automations", {
      organizationId: session.user.organizationId,
      name: "New automation",
      trigger: "0 0 * * 1",
      triggerType: "schedule",
      status: "active",
      owner: session.user.name ?? "Admin",
    });

    await mutate("/v1/automations");
  };

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
        Unable to load automations. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Automation"
        title="Self-running SEO workflows."
        description="Build repeatable playbooks for audits, briefs, and alerts without manual work."
        actions={
          <>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30">
              View logs
            </button>
            <button
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
              onClick={handleCreateAutomation}
            >
              New automation
            </button>
          </>
        }
      />

      <section className="glass rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Active workflows
        </p>
        <div className="mt-6 space-y-3 text-sm text-white/80">
          {data.automations.map((automation) => (
            <div
              key={automation.name}
              className="grid grid-cols-[1.3fr_0.8fr_0.6fr_0.6fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
            >
              <span className="text-white">{automation.name}</span>
              <span>{automation.trigger}</span>
              <span>{automation.status}</span>
              <span className="text-white/60">{automation.owner}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Automation recipes
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/80">
            {data.recipes.map((recipe) => (
              <div
                key={recipe}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {recipe}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Workflow health
          </p>
          <div className="mt-6 space-y-4">
            {["Run success rate", "Average runtime", "Alerts resolved"].map(
              (metric, index) => (
                <div key={metric} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>{metric}</span>
                    <span>{94 - index * 6}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-[color:var(--accent)]"
                      style={{ width: `${94 - index * 6}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Custom playbooks
          </p>
          <EmptyState
            title="No custom playbooks yet"
            description="Save a workflow to reuse it across projects."
            action="Save playbook"
          />
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Failed runs
          </p>
          <EmptyState
            title="No failed runs"
            description="Everything is running smoothly right now."
          />
        </div>
      </section>
    </div>
  );
}
