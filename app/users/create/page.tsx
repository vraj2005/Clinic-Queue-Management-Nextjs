"use client";

import { useEffect, useState } from "react";
import { createUser, getUsers } from "@/src/api/admin.api";
import { checkAuth } from "@/src/utils/auth";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    phone: "",
  });
  const [existingEmails, setExistingEmails] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkAuth();
    getUsers().then((users) => {
      const emails = new Set<string>(
        users
          .map((user: any) => user.email)
          .filter((email: string) => typeof email === "string")
          .map((email: string) => email.toLowerCase()),
      );
      setExistingEmails(emails);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    const email = form.email.trim().toLowerCase();

    if (existingEmails.has(email)) {
      alert("Email already exists. Please use another email.");
      return;
    }

    try {
      await createUser({ ...form, email: form.email.trim() });
      alert("User created");
    } catch (err) {
      alert("Could not create user. Email may already exist.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-8">
      <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">
            Admin
          </p>
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Create User
          </h2>
          <p className="text-sm text-slate-500">
            Add new doctors, receptionists, or patients for the clinic.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Full name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </label>
            <input
              name="email"
              placeholder="user@example.com"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Password
            </label>
            <input
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Phone
            </label>
            <input
              name="phone"
              placeholder="9876543210"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-emerald-300 focus:outline-none"
            >
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="patient">Patient</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={submit}
            className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Create user
          </button>
          <a
            href="/users"
            className="rounded-full border border-emerald-200 px-6 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
