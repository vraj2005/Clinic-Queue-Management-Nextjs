import api from "./axios";

export const bookAppointment = async (data: unknown) => {
  const res = await api.post("/appointments", data);
  return res.data;
};

export const getMyAppointments = async () => {
  const res = await api.get("/appointments/my");
  return res.data;
};

export const getAppointmentDetails = async (id: number) => {
  const res = await api.get(`/appointments/${id}`);
  return res.data;
};

export const getMyPrescriptions = async () => {
  const res = await api.get("/prescriptions/my");
  return res.data;
};

export const getMyReports = async () => {
  const res = await api.get("/reports/my");
  return res.data;
};
