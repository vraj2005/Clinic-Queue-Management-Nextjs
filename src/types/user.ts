export type UserRole = "doctor" | "receptionist" | "patient" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
};
