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
    <nav className="sticky top-0 z-50 border-b border-emerald-200 bg-emerald-700 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-6 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-semibold text-emerald-700">
            CQ
          </div>
          <div>
            <p className="text-sm font-semibold">Clinic Queue</p>
            <p className="text-xs text-emerald-100">Patient</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-emerald-50">
          <Link className="transition hover:text-white" href="/patient/dashboard">
            Dashboard
          </Link>
          <Link className="transition hover:text-white" href="/patient/book">
            Book Appointment
          </Link>
          <Link className="transition hover:text-white" href="/patient/appointments">
            My Appointments
          </Link>
          <Link className="transition hover:text-white" href="/patient/prescriptions">
            My Prescriptions
          </Link>
          <Link className="transition hover:text-white" href="/patient/reports">
            My Reports
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="ml-auto rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
