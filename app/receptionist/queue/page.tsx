"use client";

import { useEffect, useState } from "react";
import { getQueue, updateQueueStatus } from "@/src/api/queue.api";
import { checkAuth } from "@/src/utils/auth";

export default function QueuePage() {
  const [date, setDate] = useState("");
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const load = async () => {
    const data = await getQueue(date);

    setQueue(data);
  };

  const changeStatus = async (id: number, status: string) => {
    await updateQueueStatus(id, status);

    alert("Updated");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Daily Queue</h2>

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <button onClick={load}>Load Queue</button>

      <table border={1}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {queue.map((q) => (
            <tr key={q.id}>
              <td>{q.tokenNumber}</td>
              <td>{q.appointment.patient.name}</td>
              <td>{q.status}</td>
              <td>
                <button onClick={() => changeStatus(q.id, "in-progress")}>
                  Start
                </button>

                <button onClick={() => changeStatus(q.id, "done")}>Done</button>

                <button onClick={() => changeStatus(q.id, "skipped")}>
                  Skip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
