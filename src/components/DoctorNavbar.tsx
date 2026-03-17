"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DoctorNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-sky-200 bg-sky-700 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-6 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-semibold text-sky-700">
            CQ
          </div>
          <div>
            <p className="text-sm font-semibold">Clinic Queue</p>
            <p className="text-xs text-sky-100">Doctor</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-sky-50">
          <Link className="transition hover:text-white" href="/doctor/queue">
            Queue
          </Link>
          <Link className="transition hover:text-white" href="/doctor/prescription">
            Add Prescription
          </Link>
          <Link className="transition hover:text-white" href="/doctor/report">
            Add Report
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="ml-auto rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
