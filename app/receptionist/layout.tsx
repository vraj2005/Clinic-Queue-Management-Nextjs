import ReceptionistNavbar from "@/src/components/ReceptionistNavbar";

export default function ReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReceptionistNavbar />
      {children}
    </>
  );
}
