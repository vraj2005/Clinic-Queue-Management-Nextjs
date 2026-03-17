"use client";

import { useEffect, useState } from "react";
import { bookAppointment } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function BookAppointment() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const submit = async () => {
    await bookAppointment({
      appointmentDate: date,
      timeSlot: slot,
    });

    alert("Appointment booked");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Book Appointment</h2>

      <input type="date" onChange={(e) => setDate(e.target.value)} />

      <br />
      <br />

      <input
        placeholder="Time Slot (10:00-10:15)"
        onChange={(e) => setSlot(e.target.value)}
      />

      <br />
      <br />

      <button onClick={submit}>Book</button>
    </div>
  );
}
