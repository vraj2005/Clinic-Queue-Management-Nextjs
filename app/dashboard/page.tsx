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
    <div className="relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-8 h-72 w-72 rounded-full bg-slate-200/60 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Admin Dashboard
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              {clinic.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Clinic Code: <span className="font-semibold text-slate-700">{clinic.code}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
              Status: Active
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
              Updated: Today
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-indigo-100" />
            <p className="text-xs uppercase tracking-wide text-slate-400">Total Users</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {clinic.userCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">Doctors, patients, and staff</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-emerald-100" />
            <p className="text-xs uppercase tracking-wide text-slate-400">Appointments</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {clinic.appointmentCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">Booked within clinic</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-amber-100" />
            <p className="text-xs uppercase tracking-wide text-slate-400">Queue Today</p>
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              {clinic.queueCount}
            </p>
            <p className="mt-2 text-sm text-slate-500">Live queue entries</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Clinic overview</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Key highlights for today's operations.
                </p>
              </div>
              <div className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">
                Reports ready
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs uppercase text-slate-400">Doctors</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">12</p>
                <p className="mt-1 text-xs text-slate-500">On duty</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs uppercase text-slate-400">Reception</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">4</p>
                <p className="mt-1 text-xs text-slate-500">Active desks</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs uppercase text-slate-400">Patients</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">86</p>
                <p className="mt-1 text-xs text-slate-500">Expected today</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                href="/users"
              >
                View users
              </a>
              <a
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
                href="/users/create"
              >
                Add new user
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-indigo-900 p-6 text-white shadow-sm">
            <p className="text-xs uppercase tracking-wide text-indigo-200">Live focus</p>
            <h3 className="mt-3 text-lg font-semibold">Today’s checklist</h3>
            <ul className="mt-5 space-y-3 text-sm text-indigo-100/90">
              <li>Review receptionist queue updates</li>
              <li>Confirm doctor availability</li>
              <li>Verify patient bookings for today</li>
              <li>Export daily performance report</li>
            </ul>
            <button className="mt-6 w-full rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20">
              Mark day as reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
