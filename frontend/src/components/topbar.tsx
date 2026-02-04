export default function Topbar() {
  return (
    <div className="flex flex-col gap-4 border-b border-white/5 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          PulseSEO workspace
        </p>
        <h1 className="text-2xl font-semibold text-white">
          Meridian Labs
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
          Live monitoring
        </div>
        <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30">
          Invite team
        </button>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
          New workflow
        </button>
      </div>
    </div>
  );
}
