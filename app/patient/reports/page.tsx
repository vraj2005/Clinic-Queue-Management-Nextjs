"use client";

import { useEffect, useState } from "react";
import { getMyReports } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function MyReports() {
  const [data, setData] = useState<any[]>([]);

  const formatDate = (value: string) => value?.split("T")[0] || value;

  const load = async () => {
    const res = await getMyReports();
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
            My Reports
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Medical reports
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review diagnosis and recommended tests.
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          {data.length === 0 ? (
            <p className="px-6 py-10 text-sm text-slate-500">No reports yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-emerald-50/60 text-xs uppercase tracking-wider text-emerald-700">
                <tr>
                  <th className="px-5 py-3">Appointment</th>
                  <th className="px-5 py-3">Diagnosis</th>
                  <th className="px-5 py-3">Test Recommended</th>
                  <th className="px-5 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60">
                {data.map((r) => (
                  <tr key={r.id} className="hover:bg-emerald-50/40">
                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(r.appointment?.appointmentDate)} {r.appointment?.timeSlot}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="font-semibold text-slate-800">Diagnosis:</span> {r.diagnosis}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="font-semibold text-slate-800">Test:</span>{" "}
                      {r.testRecommended || "-"}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="font-semibold text-slate-800">Remarks:</span> {r.remarks || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
