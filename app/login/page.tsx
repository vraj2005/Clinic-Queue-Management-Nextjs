"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/src/api/auth.api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-12 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="mb-10 flex w-full max-w-lg flex-col justify-center text-white lg:mb-0">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">
            Clinic Queue Management
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Welcome back, Admin
          </h1>
          <p className="mt-4 text-base text-indigo-100/80">
            Sign in to manage your clinic, users, and daily queue in one place.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-indigo-100/80">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase text-indigo-200">Secure</p>
              <p className="mt-2 font-medium">Token based access</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase text-indigo-200">Fast</p>
              <p className="mt-2 font-medium">Realtime queue updates</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md self-center rounded-3xl border border-white/15 bg-white/10 p-8 text-white shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-semibold">
              CM
            </div>
            <div>
              <p className="text-lg font-semibold">Admin Login</p>
              <p className="text-sm text-indigo-100/80">Use your institute credentials</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-indigo-100/80">
                Email ID
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-indigo-100/60 focus:border-indigo-300 focus:outline-none"
                placeholder="24010101666@darshan.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-indigo-100/80">
                Password
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-indigo-100/60 focus:border-indigo-300 focus:outline-none"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-indigo-100"
          >
            Sign in
          </button>

          <p className="mt-6 text-center text-xs text-indigo-100/70">
            Make sure you log in before opening dashboard pages.
          </p>
        </div>
      </div>
    </div>
  );
}
