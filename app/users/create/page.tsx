"use client";

import { useState } from "react";
import { createUser } from "@/src/api/admin.api";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    await createUser(form);

    alert("User created");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Create User</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <br />
      <br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <br />

      <input name="password" placeholder="Password" onChange={handleChange} />
      <br />
      <br />

      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <br />
      <br />

      <select name="role" onChange={handleChange}>
        <option value="doctor">Doctor</option>
        <option value="receptionist">Receptionist</option>
        <option value="patient">Patient</option>
      </select>

      <br />
      <br />

      <button onClick={submit}>Create</button>
    </div>
  );
}
