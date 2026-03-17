"use client";

import { useEffect, useState } from "react";
import { addReport } from "@/src/api/doctor.api";
import { checkAuth } from "@/src/utils/auth";
import { useSearchParams } from "next/navigation";

export default function AddReport() {
  const searchParams = useSearchParams();
  const [appointmentId, setAppointmentId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [test, setTest] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    checkAuth();
    const idFromQuery = searchParams.get("appointmentId");
    if (idFromQuery) {
      setAppointmentId(idFromQuery);
    }
  }, []);

  const submit = async () => {
    await addReport(Number(appointmentId), {
      diagnosis,
      testRecommended: test,
      remarks,
    });

    alert("Report added");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">
            Add Medical Report
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Diagnosis summary
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Capture the diagnosis, tests, and remarks for the appointment.
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Appointment ID
              </label>
              <input
                placeholder="Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Diagnosis
              </label>
              <input
                placeholder="Viral fever"
                onChange={(e) => setDiagnosis(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Test recommended (optional)
              </label>
              <input
                placeholder="Blood test"
                onChange={(e) => setTest(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Remarks (optional)
              </label>
              <input
                placeholder="Rest for 3 days"
                onChange={(e) => setRemarks(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={submit}
            className="mt-6 rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Save report
          </button>
        </div>
      </div>
    </div>
  );
}
