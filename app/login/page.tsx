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

      const role = data.user?.role;

      if (role === "admin") {
        router.push("/dashboard");
      } else if (role === "patient") {
        router.push("/patient/dashboard");
      } else if (role === "doctor") {
        router.push("/doctor/queue");
      } else if (role === "receptionist") {
        router.push("/receptionist/queue");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_60%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-12 lg:flex-row">
        <div className="w-full max-w-lg">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">
            Clinic Queue Management
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl font-semibold text-slate-900 sm:text-5xl">
            Welcome back, Admin
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Keep your clinic operations steady with one clean workspace for users,
            appointments, and queue updates.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs uppercase text-emerald-500">Secure</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Token based access
              </p>
              <p className="mt-1 text-xs text-slate-500">Role guarded endpoints</p>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs uppercase text-sky-600">Reliable</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Real time queue flow
              </p>
              <p className="mt-1 text-xs text-slate-500">Sync across roles</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-semibold text-white">
              CM
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Admin Login</p>
              <p className="text-sm text-slate-500">Use your institute credentials</p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email ID
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
                placeholder="24010101666@darshan.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none"
                type="password"
                placeholder="password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="mt-8 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Sign in
          </button>

          <p className="mt-6 text-center text-xs text-slate-400">
            Log in before opening protected pages.
          </p>
        </div>
      </div>
    </div>
  );
}
