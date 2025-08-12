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
      await logout();
      toast.success("Logout Successfully");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to Logout");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.setItem("auth_user", "false");
      navigate("/");
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 p-8 md:pl-70">
          <div className="flex justify-end items-center mb-8 left-0">
            <span className="mr-4 font-medium text-gray-700">
              Selamat datang,{" "}
              <span className="font-bold text-indigo-700">{userName.name}</span>
            </span>
            <button
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2 rounded-lg shadow transition font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight drop-shadow">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Players Count Card */}
            <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col items-center border-t-4 border-blue-400 hover:scale-105 transition-transform duration-200">
              <div className="rounded-full bg-blue-100 p-5 mb-5 shadow">
                <svg
                  className="w-10 h-10 text-blue-500"
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
              <h2 className="text-lg font-semibold mb-1 text-blue-700">
                Jumlah Pemain
              </h2>
              <span className="text-4xl font-bold text-blue-600 mb-1">
                {playersCount}
              </span>
              <p className="text-gray-500">Total pemain terdaftar</p>
            </div>
            {/* Teams Count Card */}
            <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col items-center border-t-4 border-indigo-400 hover:scale-105 transition-transform duration-200">
              <div className="rounded-full bg-indigo-100 p-5 mb-5 shadow">
                <svg
                  className="w-10 h-10 text-indigo-500"
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
              <h2 className="text-lg font-semibold mb-1 text-indigo-700">
                Jumlah Tim
              </h2>
              <span className="text-4xl font-bold text-indigo-600 mb-1">
                {teamsCount}
              </span>
              <p className="text-gray-500">Total tim terdaftar</p>
            </div>
            {/* Example: Add more cards here */}
            <div className="bg-gradient-to-br from-pink-100 to-yellow-100 shadow-xl rounded-3xl p-8 flex flex-col items-center border-t-4 border-yellow-400 hover:scale-105 transition-transform duration-200">
              <div className="rounded-full bg-yellow-200 p-5 mb-5 shadow">
                <svg
                  className="w-10 h-10 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-1 text-yellow-700">
                Info Lainnya
              </h2>
              <span className="text-2xl font-bold text-yellow-600 mb-1">
                Segera Hadir
              </span>
              <p className="text-gray-500">Fitur tambahan akan tersedia</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
