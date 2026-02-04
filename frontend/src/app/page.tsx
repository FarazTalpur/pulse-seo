import Link from "next/link";

const features = [
  {
    title: "Auto-Audit Streams",
    copy: "Run continuous crawls, index checks, and Core Web Vitals scoring without touching a spreadsheet.",
    tag: "Real-time",
  },
  {
    title: "Briefs That Write Back",
    copy: "Turn SERP intent into content briefs with outlines, gaps, and internal link maps in one click.",
    tag: "AI Assist",
  },
  {
    title: "Smart Prioritization",
    copy: "Focus only on pages with the highest lift using weighted impact + traffic decay modeling.",
    tag: "Impact",
  },
  {
    title: "Visibility Forecasts",
    copy: "Predict keyword wins with visibility simulations and share ready-to-present reports.",
    tag: "Forecast",
  },
  {
    title: "Collaborative Workflows",
    copy: "Assign fixes to devs, writers, and SEO analysts with synced status updates.",
    tag: "Teams",
  },
  {
    title: "Signal-Based Alerts",
    copy: "Get pinged when rankings drop, content decays, or cannibalization emerges.",
    tag: "Alerts",
  },
];

const steps = [
  {
    title: "Connect your properties",
    copy: "Securely link GSC, GA4, and CMS access in minutes.",
  },
  {
    title: "PulseSEO scans the web",
    copy: "We map your entire site against search intent, technical health, and SERP volatility.",
  },
  {
    title: "Automations start running",
    copy: "Briefs, fixes, and forecasts are delivered to your workflow every week.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$79",
    desc: "For solo analysts shipping focused wins.",
    perks: [
      "2 domains",
      "Weekly audits",
      "5 content briefs / mo",
      "Email reports",
    ],
  },
  {
    name: "Studio",
    price: "$249",
    desc: "For growth teams running multiple sites.",
    perks: [
      "10 domains",
      "Daily audits",
      "Unlimited briefs",
      "Slack + Notion sync",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Let’s talk",
    desc: "Custom workflows, SSO, and SLA-backed support.",
    perks: [
      "Unlimited domains",
      "On-prem options",
      "Custom models",
      "Dedicated success",
    ],
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="noise absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-[480px] grid-mask opacity-70" />

      <header className="relative z-10">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_top,#6cf6ff,transparent_60%)] text-black shadow-[0_0_20px_rgba(108,246,255,0.55)]">
              P
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">PulseSEO</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Next-gen automation
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-sm text-[color:var(--muted)] md:flex">
            <a className="transition hover:text-white" href="#features">
              Platform
            </a>
            <a className="transition hover:text-white" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-white" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-white" href="#insights">
              Insights
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white md:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(108,246,255,0.35)] transition hover:-translate-y-0.5"
            >
              Request Demo
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-16">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(108,246,255,0.9)]" />
              Live SERP monitoring
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                SEO analysts deserve a <span className="text-gradient">command center</span>
                .
              </h1>
              <p className="max-w-xl text-lg text-[color:var(--muted)]">
                PulseSEO automates technical audits, content briefs, and ranking
                priorities into a single intelligent workflow. Spend time on
                strategy, not spreadsheets.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="rounded-full bg-[color:var(--accent)] px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5"
              >
                Launch workspace
              </Link>
              <button className="rounded-full border border-white/10 px-6 py-3 text-sm text-white/80 transition hover:border-white/30">
                Watch the 2-min tour
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
              <span>Trusted by growth teams</span>
              <span>20k+ pages monitored</span>
              <span>98% faster reporting</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-6 h-32 w-32 rounded-full bg-[color:var(--accent-2)] opacity-30 blur-[80px]" />
            <div className="absolute -bottom-8 right-4 h-40 w-40 rounded-full bg-[color:var(--accent-3)] opacity-30 blur-[90px]" />
            <div className="glass shimmer relative overflow-hidden rounded-3xl p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
                <span>Visibility Pulse</span>
                <span>Live</span>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm text-white">organic health</p>
                    <p className="text-xs text-[color:var(--muted)]">142 issues detected</p>
                  </div>
                  <p className="text-2xl font-semibold text-[color:var(--accent)]">+18%</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-[color:var(--muted)]">Top opportunity</p>
                    <p className="mt-2 text-lg text-white">/pricing</p>
                    <p className="text-xs text-[color:var(--accent-3)]">+3.4k clicks</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-[color:var(--muted)]">SERP volatility</p>
                    <p className="mt-2 text-lg text-white">Medium</p>
                    <p className="text-xs text-[color:var(--accent)]">Stable</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                    Upcoming automations
                  </p>
                  <div className="mt-3 space-y-2">
                    {["Content refresh brief", "Internal link cluster", "CWV fix pack"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between text-sm text-white/80"
                        >
                          <span>{item}</span>
                          <span className="text-xs text-[color:var(--muted)]">Queued</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="floaty absolute -right-4 -top-6 hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/80 shadow-[0_0_30px_rgba(155,123,255,0.35)] md:block">
              Alert: cannibalization spotted on /blog
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Platform
            </p>
            <h2 className="text-3xl text-white md:text-4xl">
              Built for analysts who ship outcomes, not reports.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass relative rounded-3xl p-6 transition hover:-translate-y-1"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--accent)]">
                  {feature.tag}
                </span>
                <h3 className="mt-4 text-xl text-white">{feature.title}</h3>
                <p className="mt-3 text-sm text-[color:var(--muted)]">
                  {feature.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Workflow
            </p>
            <h2 className="text-3xl text-white md:text-4xl">
              A self-running SEO engine.
            </h2>
            <p className="text-[color:var(--muted)]">
              Connect once, then let PulseSEO deliver prioritized fixes, briefs,
              and forecasts across your team.
            </p>
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="glass relative rounded-2xl p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg text-white">{step.title}</h3>
                    <p className="text-sm text-[color:var(--muted)]">
                      {step.copy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="insights" className="grid gap-8">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Live insights
              </p>
              <h2 className="text-3xl text-white md:text-4xl">
                Instant clarity across every page.
              </h2>
            </div>
            <button className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 md:inline-flex">
              View sample report
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Health score", value: "92", trend: "+6" },
              { label: "Opportunities", value: "128", trend: "+18" },
              { label: "Estimated lift", value: "$48k", trend: "+12" },
            ].map((metric) => (
              <div key={metric.label} className="glass rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  {metric.label}
                </p>
                <div className="mt-6 flex items-end justify-between">
                  <p className="text-4xl text-white">{metric.value}</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-[color:var(--accent)]">
                    {metric.trend}%
                  </span>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                  <div className="h-2 w-4/5 rounded-full bg-[color:var(--accent)]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="grid gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Pricing
            </p>
            <h2 className="text-3xl text-white md:text-4xl">
              Plans that scale with your search velocity.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-6 ${
                  plan.featured
                    ? "glass border border-[color:var(--accent)] shadow-[0_0_45px_rgba(108,246,255,0.25)]"
                    : "border border-white/10 bg-white/5"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-[color:var(--accent)] px-3 py-1 text-xs font-semibold text-black">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {plan.desc}
                </p>
                <p className="mt-6 text-4xl text-white">{plan.price}</p>
                <button className="mt-6 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5">
                  Choose plan
                </button>
                <div className="mt-6 space-y-2 text-sm text-white/70">
                  {plan.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Analyst love
            </p>
            <h3 className="mt-4 text-2xl text-white">
              “PulseSEO turned our weekly audits into a morning ritual. We fix
              more, report less, and ship faster.”
            </h3>
            <p className="mt-6 text-sm text-[color:var(--muted)]">
              — Daria Voss, Head of Growth at Meridian Labs
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8">
            <h3 className="text-2xl text-white">Ready to automate the grind?</h3>
            <p className="mt-3 text-[color:var(--muted)]">
              Start with a 14-day pilot and see the first workflow in under 30
              minutes.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-full bg-[color:var(--accent)] px-6 py-3 font-semibold text-black"
              >
                Start pilot
              </Link>
              <button className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/80">
                Talk to product
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-10 text-sm text-[color:var(--muted)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-white">PulseSEO</p>
            <p className="text-xs uppercase tracking-[0.3em]">Automation studio</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em]">
            <span>Security</span>
            <span>Careers</span>
            <span>Docs</span>
            <span>Contact</span>
          </div>
          <p className="text-xs">© 2026 PulseSEO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
