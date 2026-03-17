"use client";

import { useEffect, useState } from "react";
import { bookAppointment } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function BookAppointment() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const slots = Array.from({ length: 40 }, (_, index) => {
    const startMinutes = 9 * 60 + index * 15;
    const endMinutes = startMinutes + 15;
    const startHour = Math.floor(startMinutes / 60);
    const startMinute = startMinutes % 60;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;

    const start = `${String(startHour).padStart(2, "0")}:${String(
      startMinute,
    ).padStart(2, "0")}`;
    const end = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
      2,
      "0",
    )}`;

    return `${start}-${end}`;
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const submit = async () => {
    await bookAppointment({
      appointmentDate: date,
      timeSlot: slot,
    });

    alert("Appointment booked");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
            Book Appointment
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-semibold text-slate-900">
            Choose a slot
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Select your preferred date and a 15 minute time slot.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date
              </label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Time slot
              </label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
              >
                <option value="">Select time slot</option>
                {slots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={submit}
            className="mt-6 rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Book appointment
          </button>
        </div>
      </div>
    </div>
  );
}
