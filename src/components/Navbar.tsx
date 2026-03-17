"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "16px",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        alignItems: "center",
      }}
    >
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/users">Users</Link>
      <Link href="/users/create">Create User</Link>
      <button
        onClick={handleLogout}
        style={{
          marginLeft: "auto",
          padding: "6px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          background: "white",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
