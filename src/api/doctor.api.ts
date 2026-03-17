import api from "./axios";

export const getDoctorQueue = async () => {
  const res = await api.get("/doctor/queue");
  return res.data;
};

export const addPrescription = async (appointmentId: number, data: unknown) => {
  const res = await api.post(`/prescriptions/${appointmentId}`, data);
  return res.data;
};

export const addReport = async (appointmentId: number, data: unknown) => {
  const res = await api.post(`/reports/${appointmentId}`, data);
  return res.data;
};
