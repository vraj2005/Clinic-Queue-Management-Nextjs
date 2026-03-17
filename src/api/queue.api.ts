import api from "./axios";

export const getQueue = async (date: string) => {
  const res = await api.get(`/queue?date=${date}`);
  return res.data;
};

export const updateQueueStatus = async (id: number, status: string) => {
  const res = await api.patch(`/queue/${id}`, { status });
  return res.data;
};
