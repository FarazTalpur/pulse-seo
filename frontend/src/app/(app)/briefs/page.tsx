"use client";

import EmptyState from "@/components/empty-state";
import { postClientJson } from "@/lib/client-api";
import { useBriefs } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

export default function BriefsPage() {
  const { data, error, isLoading } = useBriefs();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const handleCreateBrief = async () => {
    if (!session?.user?.organizationId) {
      alert("No organization available for this account.");
      return;
    }
    if (!session.accessToken) {
      alert("No access token available. Please sign in again.");
      return;
    }
    const projectId = window.prompt("Project ID for this brief");
    if (!projectId) {
      return;
    }

    const title = window.prompt("Brief title", "New content brief") ?? "New content brief";

    await postClientJson(
      "/v1/briefs",
      {
        projectId,
        title,
        status: "draft",
        type: "guide",
        owner: "Content Team",
      },
      session.accessToken
    );

    await mutate("/v1/briefs");
  };

  if (isLoading) {
    return (
      <div className="glass rounded-3xl p-6">
        <div className="skeleton h-4 w-40 rounded-full" />
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
        Unable to load briefs. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Content briefs
        </p>
        <h2 className="text-3xl font-semibold text-white">
          Briefs that ship faster.
        </h2>
        <p className="max-w-2xl text-sm text-[color:var(--muted)]">
          Auto-generate outlines, intent guidance, and internal link maps for every
          priority topic.
        </p>
      </header>

      <section className="glass rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Active briefs
            </p>
            <h3 className="mt-2 text-2xl text-white">This week’s content queue</h3>
          </div>
          <button
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
            onClick={handleCreateBrief}
          >
            New brief
          </button>
        </div>
        <div className="mt-6 space-y-3 text-sm text-white/80">
          {data.briefs.map((brief) => (
            <div
              key={brief.title}
              className="grid grid-cols-[1.3fr_0.7fr_0.7fr_0.6fr_0.6fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
            >
              <span className="text-white">{brief.title}</span>
              <span>{brief.type}</span>
              <span>{brief.status}</span>
              <span>{brief.owner}</span>
              <span className="text-white/60">{brief.due}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Brief quality score
          </p>
          <div className="mt-6 space-y-4">
            {["Intent coverage", "Outline depth", "SERP parity", "Internal links"].map(
              (item, index) => (
                <div key={item} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>{item}</span>
                    <span>{86 + index * 3}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-[color:var(--accent)]"
                      style={{ width: `${86 + index * 3}%` }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Brief playbooks
          </p>
          <div className="mt-6 space-y-4">
            {data.playbooks.map((play) => (
              <div
                key={play.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm text-white">{play.name}</p>
                <p className="mt-2 text-xs text-[color:var(--muted)]">
                  {play.desc}
                </p>
                <button className="mt-4 text-xs text-[color:var(--accent)]">
                  Run playbook
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Archived briefs
          </p>
          <EmptyState
            title="No archived briefs yet"
            description="Publish your first brief to start building a library."
            action="Create archive"
          />
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Reviewer queue
          </p>
          <EmptyState
            title="No reviews waiting"
            description="Incoming drafts will appear here for approval."
          />
        </div>
      </section>
    </div>
  );
}
