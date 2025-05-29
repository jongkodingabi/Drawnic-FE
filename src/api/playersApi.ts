import { axiosInstance } from "../lib/axios";

// Api Call Read
export const getPlayers = () => axiosInstance.get("/api/players");

// Api Call Edit
export const getPlayer = (id: number) =>
  axiosInstance.get(`/api/players/${id}`);

// Api Call create
export const createPlayer = (data: any) =>
  axiosInstance.post("/api/players", data);

// Api Call Delete
export const deletePlayer = (id: number) =>
  axiosInstance.delete(`/api/players/${id}`);

// Api Call Update
export const updatePlayer = (id: number, data: any) => {
  return axiosInstance.patch(`/api/players/${id}`, data);
};

// Api call count
export const getPlayersCount = () => axiosInstance.get("/api/players/count");
