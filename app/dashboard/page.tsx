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
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Admin Dashboard
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            {clinic.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Clinic Code: {clinic.code}</p>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
          Status: Active
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-xs uppercase tracking-wide text-slate-400">Total Users</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {clinic.userCount}
          </p>
          <p className="mt-2 text-sm text-slate-500">Doctors, patients, and staff</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-xs uppercase tracking-wide text-slate-400">Appointments</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {clinic.appointmentCount}
          </p>
          <p className="mt-2 text-sm text-slate-500">Booked within clinic</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <p className="text-xs uppercase tracking-wide text-slate-400">Queue Today</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">
            {clinic.queueCount}
          </p>
          <p className="mt-2 text-sm text-slate-500">Live queue entries</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Quick actions</h3>
          <p className="mt-2 text-sm text-slate-500">
            Manage users and control your clinic setup.
          </p>
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

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm">
          <p className="text-xs uppercase tracking-wide text-indigo-200">Reminder</p>
          <h3 className="mt-3 text-lg font-semibold">Daily checklist</h3>
          <ul className="mt-4 space-y-3 text-sm text-indigo-100/90">
            <li>Review receptionist queue updates</li>
            <li>Confirm doctor availability</li>
            <li>Verify patient bookings for today</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
