import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Layout/Sidebar";
const PlayersByTeamPage = () => {
  const [teams, setTeams] = useState([]); // untuk daftar tim dari API
  const [team, setTeam] = useState(""); // tim yang dipilih
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch daftar tim saat pertama kali load
  const fetchTeams = async () => {
    try {
      const res = await axiosInstance.get("/api/teams");
      setTeams(res.data.data);
      if (res.data.data.length > 0) {
        setTeam(res.data.data[0].id); // Set default tim pertama
      }
    } catch (error) {
      console.error("Gagal mengambil daftar tim", error);
    }
  };

  // Fetch pemain berdasarkan tim
  const fetchPlayers = async () => {
    if (!team) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/player-by-team?team=${team}`);
      console.log(res);
      setDatas(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data pemain", error);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan saat halaman pertama kali load
  useEffect(() => {
    fetchTeams();
  }, []);

  // Fetch pemain setiap kali tim berubah
  useEffect(() => {
    fetchPlayers();
  }, [team]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Daftar Pemain Tim {team}</h1>

          <div className="mb-4">
            <label className="mr-2">Pilih Tim:</label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="border p-2 rounded"
            >
              {teams.map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border-b">#</th>
                  <th className="py-2 px-4 border-b">Nama Pemain</th>
                  <th className="py-2 px-4 border-b">Tim</th>
                </tr>
              </thead>
              <tbody>
                {datas.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      Tidak ada pemain di tim ini.
                    </td>
                  </tr>
                ) : (
                  datas.map((item: any, index: number) => (
                    <tr key={item.player.id}>
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{item.player.name}</td>
                      <td className="py-2 px-4 border-b">{item.team.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayersByTeamPage;
