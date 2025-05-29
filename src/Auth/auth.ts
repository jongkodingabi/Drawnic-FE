import { axiosInstance } from "../lib/axios";

// Helper function to get cookie value by name
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const login = async (email: string, password: string) => {
  // 1. Ambil cookie CSRF
  await axiosInstance.get("/sanctum/csrf-cookie");

  // 2. Dapatkan nilai token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  // 3. Kirim token dalam header
  return axiosInstance.post(
    "/login",
    { email, password },
    {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
      },
    }
  );
};

export const getUser = async () => {
  return axiosInstance.get("/api/user");
};

export const logout = async () => {
  // Dapatkan XSRF token dulu
  await axiosInstance.get("/sanctum/csrf-cookie");

  // Ambil token dari cookie
  const xsrfToken = getCookie("XSRF-TOKEN");

  return axiosInstance.post(
    "/logout",
    {},
    {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken || ""),
      },
    }
  );
};
