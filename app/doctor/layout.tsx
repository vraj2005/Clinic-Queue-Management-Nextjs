import type { ReactNode } from "react";
import DoctorNavbar from "@/src/components/DoctorNavbar";

export default function DoctorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <DoctorNavbar />
      {children}
    </>
  );
}
