"use client";

import { useEffect, useState } from "react";
import { getDoctorQueue } from "@/src/api/doctor.api";
import { checkAuth } from "@/src/utils/auth";
import Link from "next/link";

export default function DoctorQueue() {
  const [data, setData] = useState<any[]>([]);

  const load = async () => {
    const res = await getDoctorQueue();
    setData(res);
  };

  useEffect(() => {
    checkAuth();
    load();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Doctor Queue</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Appointment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((q) => (
            <tr key={q.id}>
              <td>{q.tokenNumber}</td>
              <td>{q.patientName}</td>
              <td>{q.status}</td>
              <td>{q.appointmentId}</td>
              <td>
                <Link href={`/doctor/prescription?appointmentId=${q.appointmentId}`}>
                  Add medicine
                </Link>
                {" "}
                <Link href={`/doctor/report?appointmentId=${q.appointmentId}`}>
                  Add report
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
