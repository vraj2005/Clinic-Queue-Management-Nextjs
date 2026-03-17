import api from "./axios";

export const getClinicInfo = async () => {
  const res = await api.get("/admin/clinic");

  return res.data;
};

export const getUsers = async () => {
  const res = await api.get("/admin/users");

  return res.data;
};

export const createUser = async (data: unknown) => {
  const res = await api.post("/admin/users", data);

  return res.data;
};
