import type { ReactNode } from "react";
import ReceptionistNavbar from "@/src/components/ReceptionistNavbar";

export default function ReceptionistLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ReceptionistNavbar />
      {children}
    </>
  );
}
