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
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "16px" }}>Queue Display</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <label style={{ fontSize: "20px" }}>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginLeft: "12px", fontSize: "18px" }}
          />
        </label>
      </div>

      <table style={{ width: "100%", fontSize: "22px" }} border={1} cellPadding={12}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Patient</th>
            <th>Time Slot</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((q) => (
            <tr key={q.id}>
              <td>{q.tokenNumber}</td>
              <td>{q.appointment?.patient?.name}</td>
              <td>{q.appointment?.timeSlot}</td>
              <td>{q.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
