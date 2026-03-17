"use client";

import { useEffect } from "react";
import { checkAuth } from "@/src/utils/auth";

export default function PatientDashboard() {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
                Patient Dashboard
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Welcome
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Use the menu to book an appointment, view your appointments,
                prescriptions, or medical reports.
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              Patient
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/patient/book"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Book Appointment
            </a>
            <a
              href="/patient/appointments"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            >
              My Appointments
            </a>
            <a
              href="/patient/prescriptions"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            >
              My Prescriptions
            </a>
            <a
              href="/patient/reports"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            >
              My Reports
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
