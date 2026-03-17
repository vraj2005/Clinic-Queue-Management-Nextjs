"use client";

import { useEffect, useState } from "react";
import { getMyAppointments } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";
import Link from "next/link";

export default function MyAppointments() {
  const [data, setData] = useState<any[]>([]);

  const formatDate = (value: string) => value?.split("T")[0] || value;

  const statusClass = (status: string) => {
    if (status === "waiting") return "bg-amber-50 text-amber-700 border-amber-200";
    if (status === "in-progress" || status === "in_progress")
      return "bg-sky-50 text-sky-700 border-sky-200";
    if (status === "done") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "skipped") return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  const load = async () => {
    const res = await getMyAppointments();
    setData(res);
  };

  useEffect(() => {
    checkAuth();
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">
              My Appointments
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
              Appointment history
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track upcoming visits and queue status in one place.
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-emerald-50/60 text-xs uppercase tracking-wider text-emerald-700">
              <tr>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3">Token</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-100/60">
              {data.map((a) => {
                const status = a.queueEntry?.status || a.status;
                return (
                  <tr key={a.id} className="hover:bg-emerald-50/40">
                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(a.appointmentDate)}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{a.timeSlot}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {a.queueEntry?.tokenNumber ?? "-"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                          status,
                        )}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300"
                        href={`/patient/appointments/${a.id}`}
                      >
                        Medicines & report
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
