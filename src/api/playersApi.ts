import { axiosInstance } from "../lib/axios";

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

// Api Call Read
export const getPlayers = () => axiosInstance.get("/api/players");

// Api Call Edit
export const getPlayer = (id: number) =>
  axiosInstance.get(`/api/players/${id}`);

// Api Call create
export const createPlayer = async (data: any) => {
  // 1. Ambil cookie CSRF
  await axiosInstance.get("/sanctum/csrf-cookie");

  // 2. Dapatkan nilai token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  // 3. Kirim token dalam header
  return axiosInstance.post("/api/players", data, {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
    },
  });
};

// Api Call Delete
export const deletePlayer = async (id: number) => {
  // 1. Ambil cookie CSRF
  await axiosInstance.get("/sanctum/csrf-cookie");

  // 2. Dapatkan nilai token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  // 3. Kirim token dalam header
  return axiosInstance.delete(`/api/players/${id}`, {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
    },
  });
};

// Api Call Update
export const updatePlayer = async (id: number, data: any) => {
  await axiosInstance.get("/sanctum/csrf-cookie");

  // 2. Dapatkan nilai token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  // 3. Kirim token dalam header
  return axiosInstance.patch(`/api/players/${id}`, data, {
    headers: {
      "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
    },
  });
};

// Api call count
export const getPlayersCount = () => axiosInstance.get("/api/players/count");
