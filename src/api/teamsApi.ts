import { axiosInstance } from "../lib/axios";

export const getTeams = () => axiosInstance.get("/api/teams");

export const getTeam = (id: number) => axiosInstance.get(`/api/teams/${id}`);

export const createTeam = (data: any) => axiosInstance.post("/api/teams", data);

export const deleteTeam = (id: number) =>
  axiosInstance.delete(`/api/teams/${id}`);

export const updateTeam = (id: number, data: any) => {
  return axiosInstance.patch(`/api/teams/${id}`, data);
};

export function getTeamsCount(): Promise<{ data: { data: number } }> {
  return axiosInstance.get("/api/teams/count");
}
