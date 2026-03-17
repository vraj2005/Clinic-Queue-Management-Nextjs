"use client";

import { useEffect, useState } from "react";
import { addReport } from "@/src/api/doctor.api";
import { checkAuth } from "@/src/utils/auth";

export default function AddReport() {
  const [appointmentId, setAppointmentId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [test, setTest] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const submit = async () => {
    await addReport(Number(appointmentId), {
      diagnosis,
      testRecommended: test,
      remarks,
    });

    alert("Report added");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Report</h2>

      <input
        placeholder="Appointment ID"
        onChange={(e) => setAppointmentId(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Diagnosis"
        onChange={(e) => setDiagnosis(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Test Recommended"
        onChange={(e) => setTest(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Remarks"
        onChange={(e) => setRemarks(e.target.value)}
      />
      <br />
      <br />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
