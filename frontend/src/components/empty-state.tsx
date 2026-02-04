export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-white/70">
      <p className="text-white">{title}</p>
      <p className="mt-2 text-[color:var(--muted)]">{description}</p>
      {action ? (
        <button className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs text-white/80">
          {action}
        </button>
      ) : null}
    </div>
  );
}
