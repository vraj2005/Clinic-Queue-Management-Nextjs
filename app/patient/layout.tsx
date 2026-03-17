import type { ReactNode } from "react";
import PatientNavbar from "@/src/components/PatientNavbar";

export default function PatientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PatientNavbar />
      {children}
    </>
  );
}
