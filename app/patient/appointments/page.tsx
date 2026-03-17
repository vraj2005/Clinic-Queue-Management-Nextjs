"use client";

import { useEffect, useState } from "react";
import { getMyAppointments } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function MyAppointments() {
  const [data, setData] = useState<any[]>([]);

  const load = async () => {
    const res = await getMyAppointments();
    setData(res);
  };

  useEffect(() => {
    checkAuth();
    load();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Appointments</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Slot</th>
            <th>Status</th>
            <th>Token</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a.id}>
              <td>{a.appointmentDate}</td>
              <td>{a.timeSlot}</td>
              <td>{a.status}</td>
              <td>{a.queueEntry?.tokenNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
