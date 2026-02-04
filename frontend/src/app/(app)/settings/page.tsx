"use client";

import PageHeader from "@/components/page-header";
import { patchClientJson } from "@/lib/client-api";
import { useSettings } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

export default function SettingsPage() {
  const { data, error, isLoading } = useSettings();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const handleSave = async () => {
    if (!session?.user?.organizationId) {
      alert("No organization available for this account.");
      return;
    }
    if (!session.accessToken) {
      alert("No access token available. Please sign in again.");
      return;
    }

    const key = window.prompt("Setting key");
    if (!key) {
      return;
    }

    const value = window.prompt("Setting value");
    if (value === null) {
      return;
    }

    await patchClientJson(
      "/v1/settings",
      {
        organizationId: session.user.organizationId,
        key,
        value,
      },
      session.accessToken
    );

    await mutate("/v1/settings");
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
        Unable to load settings. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Settings"
        title="Tune your workspace."
        description="Customize alerts, defaults, and reporting preferences."
        actions={
          <>
            <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30">
              Reset defaults
            </button>
            <button
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
              onClick={handleSave}
            >
              Save changes
            </button>
          </>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Workspace defaults
          </p>
          <div className="mt-6 space-y-4">
            {data.settings.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
              >
                <span>{item.label}</span>
                <span className="text-white/60">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Notifications
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/80">
            {data.notifications.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
