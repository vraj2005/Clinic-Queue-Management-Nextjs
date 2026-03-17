"use client";

import { useEffect, useState } from "react";
import { addPrescription } from "@/src/api/doctor.api";
import { checkAuth } from "@/src/utils/auth";
import { useSearchParams } from "next/navigation";

export default function AddPrescription() {
  const searchParams = useSearchParams();
  const [appointmentId, setAppointmentId] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    checkAuth();
    const idFromQuery = searchParams.get("appointmentId");
    if (idFromQuery) {
      setAppointmentId(idFromQuery);
    }
  }, []);

  const updateMedicine = (
    index: number,
    field: "name" | "dosage" | "duration",
    value: string,
  ) => {
    const next = [...medicines];
    next[index] = { ...next[index], [field]: value };
    setMedicines(next);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const removeMedicine = (index: number) => {
    const next = medicines.filter((_, i) => i !== index);
    setMedicines(next.length ? next : [{ name: "", dosage: "", duration: "" }]);
  };

  const submit = async () => {
    await addPrescription(Number(appointmentId), {
      medicines,
      notes,
    });

    alert("Prescription added");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Prescription</h2>

      <input
        placeholder="Appointment ID"
        value={appointmentId}
        onChange={(e) => setAppointmentId(e.target.value)}
      />
      <br />
      <br />

      {medicines.map((medicine, index) => (
        <div key={`${medicine.name}-${index}`}>
          <input
            placeholder="Medicine"
            value={medicine.name}
            onChange={(e) => updateMedicine(index, "name", e.target.value)}
          />
          <br />
          <br />

          <input
            placeholder="Dosage"
            value={medicine.dosage}
            onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
          />
          <br />
          <br />

          <input
            placeholder="Duration"
            value={medicine.duration}
            onChange={(e) => updateMedicine(index, "duration", e.target.value)}
          />
          <br />
          <br />

          {medicines.length > 1 ? (
            <button onClick={() => removeMedicine(index)}>Remove</button>
          ) : null}
          <br />
          <br />
        </div>
      ))}

      <button onClick={addMedicine}>Add medicine</button>
      <br />
      <br />

      <input
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <br />
      <br />

      <button onClick={submit}>Save</button>
    </div>
  );
}
