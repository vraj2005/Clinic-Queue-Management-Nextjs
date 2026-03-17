"use client";

import { useEffect, useState } from "react";
import { addPrescription } from "@/src/api/doctor.api";
import { checkAuth } from "@/src/utils/auth";

export default function AddPrescription() {
  const [appointmentId, setAppointmentId] = useState("");
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const submit = async () => {
    await addPrescription(Number(appointmentId), {
      medicines: [
        {
          name: medicine,
          dosage: dosage,
          duration: duration,
        },
      ],
      notes,
    });

    alert("Prescription added");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Prescription</h2>

      <input
        placeholder="Appointment ID"
        onChange={(e) => setAppointmentId(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Medicine"
        onChange={(e) => setMedicine(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Dosage"
        onChange={(e) => setDosage(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Duration"
        onChange={(e) => setDuration(e.target.value)}
      />
      <br />
      <br />

      <input placeholder="Notes" onChange={(e) => setNotes(e.target.value)} />
      <br />
      <br />

      <button onClick={submit}>Save</button>
    </div>
  );
}
