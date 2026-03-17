"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAppointmentDetails } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";
import Link from "next/link";

export default function AppointmentDetails() {
  const params = useParams();
  const appointmentId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [details, setDetails] = useState<any>(null);

  const formatDate = (value: string) => value?.split("T")[0] || value;

  const loadDetails = async (id: number) => {
    const data = await getAppointmentDetails(id);
    setDetails(data);
  };

  useEffect(() => {
    checkAuth();

    if (appointmentId) {
      loadDetails(Number(appointmentId));
    }
  }, [appointmentId]);

  if (!details) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <Link
          className="text-sm font-semibold text-emerald-700"
          href="/patient/appointments"
        >
          Back to appointments
        </Link>

        <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold text-slate-900">
          Appointment details
        </h2>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">
            Appointment
          </h4>
          <p className="mt-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Date:</span>{" "}
            {formatDate(details.appointmentDate)}
            <span className="ml-4 font-semibold text-slate-800">Time:</span> {details.timeSlot}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Token:</span>{" "}
            {details.queueEntry?.tokenNumber ?? "-"}
            <span className="ml-4 font-semibold text-slate-800">Status:</span>{" "}
            {details.queueEntry?.status || details.status}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">
            Medicines (Prescription)
          </h4>
          {details.prescription?.medicines?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {details.prescription.medicines.map((m: any, index: number) => (
                <li key={`${m.name}-${index}`}>
                  <span className="font-semibold text-slate-800">Medicine:</span> {m.name}
                  {" | "}
                  <span className="font-semibold text-slate-800">Dosage:</span> {m.dosage}
                  {" | "}
                  <span className="font-semibold text-slate-800">Duration:</span> {m.duration}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No prescription added for this appointment yet.
            </p>
          )}
          {details.prescription?.notes ? (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Notes:</span> {details.prescription.notes}
            </p>
          ) : null}
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-500">
            Medical report
          </h4>
          {details.report ? (
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">Diagnosis:</span>{" "}
                {details.report.diagnosis}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Test Recommended:</span>{" "}
                {details.report.testRecommended}
              </p>
              <p>
                <span className="font-semibold text-slate-800">Remarks:</span>{" "}
                {details.report.remarks}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No report added for this appointment yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
