"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Command center", href: "/dashboard", match: "/dashboard" },
  { label: "Audits", href: "/audits", match: "/audits" },
  { label: "Content briefs", href: "/briefs", match: "/briefs" },
  { label: "Reports", href: "/reports", match: "/reports" },
  { label: "Automations", href: "/automations", match: "/automations" },
  { label: "Integrations", href: "/integrations", match: "/integrations" },
  { label: "Team", href: "/team", match: "/team" },
  { label: "Settings", href: "/settings", match: "/settings" },
  { label: "API status", href: "/status", match: "/status" }
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-3 text-sm text-[color:var(--muted)]">
      {navItems.map((item) => {
        const isActive = pathname === item.match;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 transition ${
              isActive ? "bg-white/10 text-white" : "hover:bg-white/5"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-xs text-white/40">›</span>
          </Link>
        );
      })}
    </nav>
  );
}
