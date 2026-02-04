"use client";

import PageHeader from "@/components/page-header";
import { postClientJson } from "@/lib/client-api";
import { useTeam } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

export default function TeamPage() {
  const { data, error, isLoading } = useTeam();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const handleInvite = async () => {
    if (!session?.user?.organizationId) {
      alert("No organization available for this account.");
      return;
    }

    const email = window.prompt("Invite email address");
    if (!email) {
      return;
    }

    const name = window.prompt("Name (optional)") ?? undefined;
    const role = window.prompt("Role (admin/analyst/viewer)", "analyst") ?? "analyst";

    await postClientJson("/v1/team", {
      organizationId: session.user.organizationId,
      email,
      name,
      role,
    });

    await mutate("/v1/team");
  };

  if (isLoading) {
    return (
      <div className="glass rounded-3xl p-6">
        <div className="skeleton h-4 w-32 rounded-full" />
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
        Unable to load team. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Team"
        title="Bring your SEO squad together."
        description="Invite teammates, assign roles, and keep everyone synced on priorities."
        actions={
          <>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30">
              Manage roles
            </button>
            <button
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
              onClick={handleInvite}
            >
              Invite teammate
            </button>
          </>
        }
      />

      <section className="glass rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Team members
        </p>
        <div className="mt-6 space-y-3 text-sm text-white/80">
          {data.team.map((member) => (
            <div
              key={member.name}
              className="grid grid-cols-[1.2fr_0.7fr_0.5fr_0.4fr] gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs"
            >
              <span className="text-white">{member.name}</span>
              <span>{member.role}</span>
              <span>{member.status}</span>
              <button className="text-[color:var(--accent)]">Edit</button>
            </div>
          ))}
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Roles
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
          {data.roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
            >
              {role}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
