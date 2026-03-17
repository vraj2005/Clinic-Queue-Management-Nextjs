import type { ReactNode } from "react";
import Navbar from "@/src/components/Navbar";

export default function UsersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
