"use client";

import { useEffect, useState } from "react";
import { getClinicInfo } from "@/src/api/admin.api";
import Loader from "@/src/components/Loader";

export default function Dashboard() {
  const [clinic, setClinic] = useState<any>(null);

  const loadClinic = async () => {
    const data = await getClinicInfo();

    setClinic(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadClinic();
  }, []);

  if (!clinic) return <Loader />;

  return (
    <div className="relative overflow-hidden bg-[#f6f8f5]">
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-5 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
              Admin Dashboard
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-slate-900">
              {clinic.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Clinic Code: <span className="font-semibold text-slate-700">{clinic.code}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
              Status: Active
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-xs font-semibold text-sky-700">
              Updated: Today
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-emerald-100" />
            <p className="text-xs uppercase tracking-wide text-emerald-500">Total Users</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {clinic.userCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">Doctors, patients, and staff</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-sky-100" />
            <p className="text-xs uppercase tracking-wide text-sky-600">Appointments</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {clinic.appointmentCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">Booked within clinic</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-emerald-100" />
            <p className="text-xs uppercase tracking-wide text-emerald-600">Queue Today</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {clinic.queueCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">Live queue entries</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-semibold text-slate-900">
                  Clinic overview
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Key highlights for today's operations.
                </p>
              </div>
              <div className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                Reports ready
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-4">
                <p className="text-xs uppercase text-emerald-500">Doctors</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">12</p>
                <p className="mt-1 text-xs text-slate-500">On duty</p>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-4">
                <p className="text-xs uppercase text-sky-600">Reception</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">4</p>
                <p className="mt-1 text-xs text-slate-500">Active desks</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-4">
                <p className="text-xs uppercase text-emerald-500">Patients</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">86</p>
                <p className="mt-1 text-xs text-slate-500">Expected today</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
                href="/users"
              >
                View users
              </a>
              <a
                className="rounded-full border border-emerald-200 px-5 py-2 text-sm font-medium text-emerald-700 transition hover:border-emerald-300"
                href="/users/create"
              >
                Add new user
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-600 to-sky-600 p-6 text-white shadow-sm">
            <p className="text-xs uppercase tracking-wide text-white/80">Live focus</p>
            <h3 className="mt-3 font-[var(--font-display)] text-lg font-semibold">
              Today&apos;s checklist
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/90">
              <li>Review receptionist queue updates</li>
              <li>Confirm doctor availability</li>
              <li>Verify patient bookings for today</li>
              <li>Export daily performance report</li>
            </ul>
            <button className="mt-6 w-full rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25">
              Mark day as reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
