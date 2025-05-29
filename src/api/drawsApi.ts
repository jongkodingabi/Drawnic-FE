import { axiosInstance } from "../lib/axios";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

export const drawPlayers = async () => {
  // Ambil CSRF cookie terlebih dahulu
  await axiosInstance.get("/sanctum/csrf-cookie");

  // Ambil token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  return axiosInstance.post(
    "/api/draw",
    {},
    {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
      },
      withCredentials: true,
    }
  );
};

export const getDrawResults = async () => {
  return axiosInstance.get("/api/draw/results");
};
