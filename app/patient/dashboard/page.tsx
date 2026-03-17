"use client";

import { useEffect } from "react";
import { checkAuth } from "@/src/utils/auth";

export default function PatientDashboard() {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_60%)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
                Patient Dashboard
              </p>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-slate-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Book appointments, track queue status, and view prescriptions or
                reports in one place.
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              Patient
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs uppercase text-emerald-600">Quick action</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Book your next appointment
              </p>
              <a
                href="/patient/book"
                className="mt-4 inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Book Appointment
              </a>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4">
              <p className="text-xs uppercase text-sky-600">Stay informed</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Review your latest visit details
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="/patient/appointments"
                  className="rounded-full border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:border-sky-300"
                >
                  My Appointments
                </a>
                <a
                  href="/patient/prescriptions"
                  className="rounded-full border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:border-sky-300"
                >
                  My Prescriptions
                </a>
                <a
                  href="/patient/reports"
                  className="rounded-full border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:border-sky-300"
                >
                  My Reports
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
