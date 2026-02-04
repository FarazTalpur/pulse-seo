import type { ReactNode } from "react";

export default function PageHeader({
  title,
  eyebrow,
  description,
  actions,
}: {
  title: string;
  eyebrow: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
        {eyebrow}
      </p>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm text-[color:var(--muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex gap-3">{actions}</div> : null}
      </div>
    </header>
  );
}
