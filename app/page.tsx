import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Clinic Queue Management</h1>
      <p>Use the navigation bar or jump straight to login.</p>

      <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}
