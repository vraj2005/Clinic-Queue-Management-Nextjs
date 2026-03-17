"use client";

import { useEffect, useState } from "react";
import { getClinicInfo } from "@/src/api/admin.api";
import Loader from "@/src/components/Loader";

export default function Dashboard() {
  const [clinic, setClinic] = useState<any>(null);

  const loadClinic = async () => {
    const data = await getClinicInfo();

    setClinic(data);
  };

  useEffect(() => {
    loadClinic();
  }, []);

  if (!clinic) return <Loader />;

  return (
    <div style={{ padding: "30px" }}>
      <h2>Clinic Dashboard</h2>

      <p>
        <b>Name:</b> {clinic.name}
      </p>
      <p>
        <b>Code:</b> {clinic.code}
      </p>
      <p>
        <b>Total Users:</b> {clinic.userCount}
      </p>
      <p>
        <b>Total Appointments:</b> {clinic.appointmentCount}
      </p>
      <p>
        <b>Total Queue:</b> {clinic.queueCount}
      </p>
    </div>
  );
}
