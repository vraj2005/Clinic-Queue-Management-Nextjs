"use client";

import { useEffect, useState } from "react";
import { getMyReports } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function MyReports() {
  const [data, setData] = useState<any[]>([]);

  const load = async () => {
    const res = await getMyReports();
    setData(res);
  };

  useEffect(() => {
    checkAuth();
    load();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Reports</h2>

      {data.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Appointment</th>
              <th>Diagnosis</th>
              <th>Test Recommended</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.id}>
                <td>
                  {r.appointment?.appointmentDate} {r.appointment?.timeSlot}
                </td>
                <td>{r.diagnosis}</td>
                <td>{r.testRecommended || "-"}</td>
                <td>{r.remarks || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
