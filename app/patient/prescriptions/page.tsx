"use client";

import { useEffect, useState } from "react";
import { getMyPrescriptions } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function MyPrescriptions() {
  const [data, setData] = useState<any[]>([]);

  const formatDate = (value: string) => value?.split("T")[0] || value;

  const load = async () => {
    const res = await getMyPrescriptions();
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
            My Prescriptions
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Prescription history
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review medicines and notes from your visits.
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          {data.length === 0 ? (
            <p className="px-6 py-10 text-sm text-slate-500">
              No prescriptions yet.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-emerald-50/60 text-xs uppercase tracking-wider text-emerald-700">
                <tr>
                  <th className="px-5 py-3">Appointment</th>
                  <th className="px-5 py-3">Medicines</th>
                  <th className="px-5 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60">
                {data.map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-50/40">
                    <td className="px-5 py-4 text-slate-600">
                      {formatDate(p.appointment?.appointmentDate)} {p.appointment?.timeSlot}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {p.medicines?.map((m: any, index: number) => (
                        <div key={`${m.name}-${index}`}>
                          <span className="font-semibold text-slate-800">Medicine:</span> {m.name}
                          {" | "}
                          <span className="font-semibold text-slate-800">Dosage:</span> {m.dosage}
                          {" | "}
                          <span className="font-semibold text-slate-800">Duration:</span> {m.duration}
                        </div>
                      ))}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{p.notes || "-"}</td>
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
