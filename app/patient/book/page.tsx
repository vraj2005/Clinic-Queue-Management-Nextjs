"use client";

import { useEffect, useState } from "react";
import { bookAppointment } from "@/src/api/patient.api";
import { checkAuth } from "@/src/utils/auth";

export default function BookAppointment() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const slots = Array.from({ length: 40 }, (_, index) => {
    const startMinutes = 9 * 60 + index * 15;
    const endMinutes = startMinutes + 15;
    const startHour = Math.floor(startMinutes / 60);
    const startMinute = startMinutes % 60;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;

    const start = `${String(startHour).padStart(2, "0")}:${String(
      startMinute,
    ).padStart(2, "0")}`;
    const end = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
      2,
      "0",
    )}`;

    return `${start}-${end}`;
  });

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

      <select value={slot} onChange={(e) => setSlot(e.target.value)}>
        <option value="">Select time slot</option>
        {slots.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={submit}>Book</button>
    </div>
  );
}
