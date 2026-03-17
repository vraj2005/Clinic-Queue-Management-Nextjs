"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PatientNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-200/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-6 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-semibold text-white">
            CQ
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Clinic Queue</p>
            <p className="text-xs text-emerald-600">Patient Portal</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600">
          <Link className="transition hover:text-emerald-700" href="/patient/dashboard">
            Dashboard
          </Link>
          <Link className="transition hover:text-emerald-700" href="/patient/book">
            Book Appointment
          </Link>
          <Link className="transition hover:text-emerald-700" href="/patient/appointments">
            My Appointments
          </Link>
          <Link className="transition hover:text-emerald-700" href="/patient/prescriptions">
            My Prescriptions
          </Link>
          <Link className="transition hover:text-emerald-700" href="/patient/reports">
            My Reports
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="ml-auto rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
