import Sidebar from "../components/Layout/Sidebar";
import { useState, useEffect } from "react";
import * as api from "../api/playersApi";
import { getTeamsCount } from "../api/teamsApi";
import { getUser, logout } from "../Auth/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const Dashboard = () => {
  const [playersCount, setPlayersCount] = useState<number>(0);
  const [teamsCount, setTeamsCount] = useState<number>(0);
  const [userName, setUserName] = useState<any>("anonymous");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getPlayersCount()
      .then((res) => {
        setPlayersCount(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch players count:", err);
      });
  }, []);

  useEffect(() => {
    getTeamsCount()
      .then((response: { data: { data: number } }) => {
        setTeamsCount(response.data.data);
      })
      .catch((error: unknown) => {
        console.error("Failed to fetch teams count:", error);
      });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseName = await getUser();
        setUserName(responseName.data);
      } catch (error) {
        console.error("Failed to fetch username");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // logout API dulu
      localStorage.setItem("auth_user", "false"); // baru update localStorage
      navigate("/");
      toast.success("Logout Successfully");
    } catch (error) {
      console.error("Failed To logout:", error);
      toast.error("Failed to Logout");
    }
  };

  return (
    <>
      <div className="min-h-screen left-0 flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-end items-center mb-6">
            <span className="mr-4 font-medium text-gray-700">
              {/* Ganti dengan nama user dari state/auth context */}
              Selamat datang, <span className="font-bold">{userName.name}</span>
            </span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
              <div className="rounded-full p-4 mb-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 4a2 2 0 11-4 0 2 2 0 014 0zm-14 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Statistik</h2>
              <p className="text-gray-600">Jumlah Pemain:</p>
              <span className="text-3xl font-bold text-blue-600">
                {playersCount}
              </span>
            </div>

            {/* Teams Count */}
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
              <div className="rounded-full p-4 mb-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 4a2 2 0 11-4 0 2 2 0 014 0zm-14 0a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Statistik</h2>
              <p className="text-gray-600">Jumlah Tim:</p>
              <span className="text-3xl font-bold text-blue-600">
                {teamsCount}
              </span>
            </div>
            {/* Tambahkan card statistik lain di sini jika diperlukan */}
          </div>
        </div>
      </div>
    </>
  );
};
