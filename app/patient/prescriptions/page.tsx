"use client";

import { useEffect, useState } from "react";
import { getMyPrescriptions } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function MyPrescriptions() {
  const [data, setData] = useState<any[]>([]);

  const load = async () => {
    const res = await getMyPrescriptions();
    setData(res);
  };

  useEffect(() => {
    checkAuth();
    load();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Prescriptions</h2>

      {data.length === 0 ? (
        <p>No prescriptions yet.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Appointment</th>
              <th>Medicines</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.appointment?.appointmentDate} {p.appointment?.timeSlot}
                </td>
                <td>
                  {p.medicines?.map((m: any, index: number) => (
                    <div key={`${m.name}-${index}`}>
                      {m.name} - {m.dosage} - {m.duration}
                    </div>
                  ))}
                </td>
                <td>{p.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
