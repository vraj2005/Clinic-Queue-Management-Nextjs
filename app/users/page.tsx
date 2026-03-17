"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/src/api/admin.api";
import Loader from "@/src/components/Loader";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const data = await getUsers();

    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadUsers();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-500">
            User Management
          </p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl font-semibold text-slate-900">
            Clinic Users
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            View all users registered in your clinic.
          </p>
        </div>
        <a
          className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          href="/users/create"
        >
          Create user
        </a>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-emerald-50/60 text-xs uppercase tracking-wider text-emerald-700">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Phone</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-100/60">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-emerald-50/40">
                <td className="px-5 py-4 font-medium text-slate-900">
                  {u.name}
                </td>
                <td className="px-5 py-4 text-slate-600">{u.email}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
