"use client";

import { useEffect, useState } from "react";
import { getQueue } from "@/src/api/queue.api";
import { checkAuth } from "@/src/utils/auth";

export default function QueueTvDisplay() {
  const [date, setDate] = useState("");
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (!date) return;

    const load = async () => {
      const data = await getQueue(date);
      setQueue(data);
    };

    load();
    const interval = setInterval(load, 15000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
              TV display
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-4xl font-semibold text-slate-900">
              Queue Display
            </h1>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base focus:border-emerald-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
          <table className="w-full text-left text-2xl">
            <thead className="bg-emerald-50/60 text-sm uppercase tracking-wider text-emerald-700">
              <tr>
                <th className="px-6 py-4">Token</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Time Slot</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100/60">
              {queue.map((q) => (
                <tr key={q.id} className="hover:bg-emerald-50/40">
                  <td className="px-6 py-5 text-slate-800">{q.tokenNumber}</td>
                  <td className="px-6 py-5 text-slate-800">
                    {q.appointment?.patient?.name}
                  </td>
                  <td className="px-6 py-5 text-slate-800">{q.appointment?.timeSlot}</td>
                  <td className="px-6 py-5 text-slate-800">{q.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
