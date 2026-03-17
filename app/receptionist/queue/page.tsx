"use client";

import { useEffect, useState } from "react";
import { getQueue, updateQueueStatus } from "@/src/api/queue.api";
import { checkAuth } from "@/src/utils/auth";

export default function QueuePage() {
  const [date, setDate] = useState("");
  const [queue, setQueue] = useState<any[]>([]);

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
    <div style={{ padding: "30px" }}>
      <h2>Daily Queue</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <table border={1}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Patient</th>
            <th>Phone</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {queue.map((q) => (
            <tr key={q.id}>
              {(() => {
                const currentStatus = q.status;
                const normalizedStatus = currentStatus === "in_progress" ? "in-progress" : currentStatus;
                const isWaiting = normalizedStatus === "waiting";
                const isInProgress = normalizedStatus === "in-progress";

                return (
                  <>
                    <td>{q.tokenNumber}</td>
                    <td>{q.appointment?.patient?.name}</td>
                    <td>{q.appointment?.patient?.phone || "-"}</td>
                    <td>{q.appointment?.timeSlot}</td>
                    <td>{q.status}</td>
                    <td>
                      {isWaiting ? (
                        <>
                          <button onClick={() => changeStatus(q.id, "in-progress")}>
                            In progress
                          </button>
                          <button onClick={() => changeStatus(q.id, "skipped")}>
                            Skip
                          </button>
                        </>
                      ) : null}

                      {isInProgress ? (
                        <button onClick={() => changeStatus(q.id, "done")}>
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
  );
}
