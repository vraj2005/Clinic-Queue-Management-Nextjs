"use client";

import { useEffect, useState } from "react";
import { getDoctorQueue } from "@/src/api/doctor.api";
import { checkAuth } from "@/src/utils/auth";
import Link from "next/link";

export default function DoctorQueue() {
  const [data, setData] = useState<any[]>([]);

  const statusClass = (status: string) => {
    if (status === "waiting") return "bg-amber-50 text-amber-700 border-amber-200";
    if (status === "in-progress" || status === "in_progress")
      return "bg-sky-50 text-sky-700 border-sky-200";
    if (status === "done") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "skipped") return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  const load = async () => {
    const res = await getDoctorQueue();
    setData(res);
  };

  useEffect(() => {
    checkAuth();
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">
            Today&apos;s Queue
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Patient queue
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review appointments and add prescriptions or reports.
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-emerald-50/60 text-xs uppercase tracking-wider text-emerald-700">
              <tr>
                <th className="px-5 py-3">Token</th>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Appointment ID</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-100/60">
              {data.map((q) => {
                const normalizedStatus =
                  q.status === "in_progress" ? "in-progress" : q.status;
                return (
                  <tr key={q.id} className="hover:bg-emerald-50/40">
                    <td className="px-5 py-4 text-slate-600">{q.tokenNumber}</td>
                    <td className="px-5 py-4 text-slate-600">{q.patientName}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                          normalizedStatus,
                        )}`}
                      >
                        {normalizedStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{q.appointmentId}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-500"
                          href={`/doctor/prescription?appointmentId=${q.appointmentId}`}
                        >
                          Add medicine
                        </Link>
                        <Link
                          className="rounded-full border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-700 transition hover:border-sky-300"
                          href={`/doctor/report?appointmentId=${q.appointmentId}`}
                        >
                          Add report
                        </Link>
                      </div>
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
