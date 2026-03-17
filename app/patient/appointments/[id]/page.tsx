"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAppointmentDetails } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";
import Link from "next/link";

export default function AppointmentDetails() {
  const params = useParams();
  const appointmentId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [details, setDetails] = useState<any>(null);

  const loadDetails = async (id: number) => {
    const data = await getAppointmentDetails(id);
    setDetails(data);
  };

  useEffect(() => {
    checkAuth();

    if (appointmentId) {
      loadDetails(Number(appointmentId));
    }
  }, [appointmentId]);

  if (!details) {
    return <p style={{ padding: "30px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Appointment Details</h2>

      <p>
        <Link href="/patient/appointments">Back to appointments</Link>
      </p>

      <div style={{ marginTop: "20px", border: "1px solid #e5e7eb", padding: "16px" }}>
        <h4>Appointment</h4>
        <p>
          <b>Date:</b> {details.appointmentDate} &nbsp; <b>Time:</b> {details.timeSlot}
        </p>
        <p>
          <b>Token:</b> {details.queueEntry?.tokenNumber ?? "-"} &nbsp; <b>Status:</b>{" "}
          {details.queueEntry?.status || details.status}
        </p>
      </div>

      <div style={{ marginTop: "16px", border: "1px solid #e5e7eb", padding: "16px" }}>
        <h4>Medicines (Prescription)</h4>
        {details.prescription?.medicines?.length ? (
          <ul>
            {details.prescription.medicines.map((m: any, index: number) => (
              <li key={`${m.name}-${index}`}>
                {m.name} - {m.dosage} - {m.duration}
              </li>
            ))}
          </ul>
        ) : (
          <p>No prescription added for this appointment yet.</p>
        )}
        {details.prescription?.notes ? <p><b>Notes:</b> {details.prescription.notes}</p> : null}
      </div>

      <div style={{ marginTop: "16px", border: "1px solid #e5e7eb", padding: "16px" }}>
        <h4>Medical Report</h4>
        {details.report ? (
          <div>
            <p>
              <b>Diagnosis:</b> {details.report.diagnosis}
            </p>
            <p>
              <b>Test Recommended:</b> {details.report.testRecommended}
            </p>
            <p>
              <b>Remarks:</b> {details.report.remarks}
            </p>
          </div>
        ) : (
          <p>No report added for this appointment yet.</p>
        )}
      </div>
    </div>
  );
}
