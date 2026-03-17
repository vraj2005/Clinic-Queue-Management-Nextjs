"use client";

import { useEffect, useState } from "react";
import { getQueue, updateQueueStatus } from "@/src/api/queue.api";
import { checkAuth } from "@/src/utils/auth";

export default function QueuePage() {
  const [date, setDate] = useState("");
  const [queue, setQueue] = useState<any[]>([]);

  const statusClass = (status: string) => {
    if (status === "waiting") return "bg-amber-50 text-amber-700 border-amber-200";
    if (status === "in-progress" || status === "in_progress")
      return "bg-sky-50 text-sky-700 border-sky-200";
    if (status === "done") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (status === "skipped") return "bg-rose-50 text-rose-700 border-rose-200";
    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  useEffect(() => {
    checkAuth();
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (!date) return;
    load();
  }, [date]);

  const load = async () => {
    const data = await getQueue(date);

    setQueue(data);
  };

  const changeStatus = async (id: number, status: string) => {
    await updateQueueStatus(id, status);

    alert("Updated");
    load();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">
              Queue (manage)
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
              Daily queue
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a date to load patient tokens and update status.
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-emerald-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-emerald-50/60 text-xs uppercase tracking-wider text-emerald-700">
              <tr>
                <th className="px-5 py-3">Token</th>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Time slot</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-100/60">
              {queue.map((q) => (
                <tr key={q.id} className="hover:bg-emerald-50/40">
                  {(() => {
                    const currentStatus = q.status;
                    const normalizedStatus =
                      currentStatus === "in_progress" ? "in-progress" : currentStatus;
                    const isWaiting = normalizedStatus === "waiting";
                    const isInProgress = normalizedStatus === "in-progress";

                    return (
                      <>
                        <td className="px-5 py-4 text-slate-600">{q.tokenNumber}</td>
                        <td className="px-5 py-4 text-slate-600">
                          {q.appointment?.patient?.name}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {q.appointment?.patient?.phone || "-"}
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {q.appointment?.timeSlot}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                              normalizedStatus,
                            )}`}
                          >
                            {normalizedStatus}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {isWaiting ? (
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => changeStatus(q.id, "in-progress")}
                                className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-500"
                              >
                                In progress
                              </button>
                              <button
                                onClick={() => changeStatus(q.id, "skipped")}
                                className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:border-rose-300"
                              >
                                Skip
                              </button>
                            </div>
                          ) : null}

                          {isInProgress ? (
                            <button
                              onClick={() => changeStatus(q.id, "done")}
                              className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-sky-500"
                            >
                              Done
                            </button>
                          ) : null}
                        </td>
                      </>
                    );
                  })()}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
