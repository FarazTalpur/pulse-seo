"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="noise absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-[480px] grid-mask opacity-70" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6">
        <div className="glass w-full max-w-md rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_top,#6cf6ff,transparent_60%)] text-black shadow-[0_0_20px_rgba(108,246,255,0.55)]">
              P
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">PulseSEO</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Sign in
              </p>
            </div>
          </div>

          <h1 className="mt-6 text-2xl text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Use your workspace credentials to access the command center.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Email
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[color:var(--accent)]"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Password
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[color:var(--accent)]"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-[color:var(--accent)] px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-[color:var(--muted)]">
            <p className="text-white">Demo credentials</p>
            <p className="mt-2">Email: admin@pulseseo.com</p>
            <p>Password: demo1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
