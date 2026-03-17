"use client";

import { useEffect, useState } from "react";
import { addPrescription } from "@/src/api/doctor.api";
import { checkAuth } from "@/src/utils/auth";
import { useSearchParams } from "next/navigation";

export default function AddPrescription() {
  const searchParams = useSearchParams();
  const [appointmentId, setAppointmentId] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    checkAuth();
    const idFromQuery = searchParams.get("appointmentId");
    if (idFromQuery) {
      setAppointmentId(idFromQuery);
    }
  }, []);

  const updateMedicine = (
    index: number,
    field: "name" | "dosage" | "duration",
    value: string,
  ) => {
    const next = [...medicines];
    next[index] = { ...next[index], [field]: value };
    setMedicines(next);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const removeMedicine = (index: number) => {
    const next = medicines.filter((_, i) => i !== index);
    setMedicines(next.length ? next : [{ name: "", dosage: "", duration: "" }]);
  };

  const submit = async () => {
    await addPrescription(Number(appointmentId), {
      medicines,
      notes,
    });

    alert("Prescription added");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">
            Add Prescription
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Patient medicines
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add medicines and notes for this appointment.
          </p>

          <div className="mt-6">
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

          <div className="mt-6 space-y-5">
            <p className="text-sm font-semibold text-slate-700">Medicines</p>
            {medicines.map((medicine, index) => (
              <div key={`${medicine.name}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    placeholder="Medicine"
                    value={medicine.name}
                    onChange={(e) => updateMedicine(index, "name", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-emerald-300 focus:outline-none"
                  />
                  <input
                    placeholder="Dosage"
                    value={medicine.dosage}
                    onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-emerald-300 focus:outline-none"
                  />
                  <input
                    placeholder="Duration"
                    value={medicine.duration}
                    onChange={(e) => updateMedicine(index, "duration", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-emerald-300 focus:outline-none"
                  />
                </div>

                {medicines.length > 1 ? (
                  <button
                    onClick={() => removeMedicine(index)}
                    className="mt-3 rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:border-rose-300"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <button
            onClick={addMedicine}
            className="mt-4 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300"
          >
            Add medicine
          </button>

          <div className="mt-6">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Notes (optional)
            </label>
            <input
              placeholder="After food"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
            />
          </div>

          <button
            onClick={submit}
            className="mt-6 rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Save prescription
          </button>
        </div>
      </div>
    </div>
  );
}
