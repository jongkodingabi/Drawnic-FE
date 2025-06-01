import { axiosInstance } from "../lib/axios";

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const getTeams = () => axiosInstance.get("/api/teams");

export const getTeam = (id: number) => axiosInstance.get(`/api/teams/${id}`);

export const createTeam = async (data: any) => {
  // 1. Ambil cookie CSRF
  await axiosInstance.get("/sanctum/csrf-cookie");

  // 2. Dapatkan nilai token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  // 3. Kirim token dalam header
  return axiosInstance.post("/api/teams", data, {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
    },
  });
};

export const deleteTeam = async (id: number) => {
  // 1. Ambil cookie CSRF
  await axiosInstance.get("/sanctum/csrf-cookie");

  // 2. Dapatkan nilai token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  // 3. Kirim token dalam header
  return axiosInstance.delete(`/api/teams/${id}`, {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
    },
  });
};
// Api Call Update
export const updateTeam = async (id: number, data: any) => {
  await axiosInstance.get("/sanctum/csrf-cookie");

  // 2. Dapatkan nilai token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  // 3. Kirim token dalam header
  return axiosInstance.patch(`/api/teams/${id}`, data, {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
    },
  });
};

export function getTeamsCount(): Promise<{ data: { data: number } }> {
  return axiosInstance.get("/api/teams/count");
}
