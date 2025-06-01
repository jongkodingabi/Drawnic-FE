import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Layout/Sidebar";

const PER_PAGE = 10;

const ManualAssignPage = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState<Record<number, string>>(
    {}
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async (searchValue = search, pageValue = page) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/unassigned-players", {
        params: {
          search: searchValue,
          page: pageValue,
          per_page: PER_PAGE,
        },
      });
      setPlayers(res.data.data);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Gagal mengambil data player:", err);
    }
    setLoading(false);
  };

  const fetchTeams = async () => {
    try {
      const res = await axiosInstance.get("/api/teams");
      setTeams(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data tim:", err);
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchPlayers();
    // eslint-disable-next-line
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPlayers(search, 1);
  };

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const handleAssign = async (playerId: number) => {
    const teamId = selectedTeams[playerId];
    if (!teamId) return alert("Silakan pilih tim terlebih dahulu.");

    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
      let xsrfToken = getCookie("XSRF-TOKEN");
      if (xsrfToken) {
        xsrfToken = decodeURIComponent(xsrfToken);
      }

      await axiosInstance.post(
        "/api/assign-player-manually",
        {
          player_id: playerId,
          team_id: teamId,
        },
        {
          headers: {
            "X-XSRF-TOKEN": xsrfToken,
          },
        }
      );
      toast.success("Successfully asigned player");
      fetchPlayers(); // refresh player list
    } catch (err) {
      console.error("Gagal assign player:", err);
      alert("Gagal assign player");
    }
  };

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-full max-w-3xl p-8 mt-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Assign Player ke Tim (Manual)
        </h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Cari nama player..."
            className="border border-gray-300 p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cari
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">
                  #
                </th>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">
                  Nama Player
                </th>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">
                  Pilih Tim
                </th>
                <th className="py-3 px-4 border-b font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : players.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    Semua player sudah di-assign.
                  </td>
                </tr>
              ) : (
                players.map((player: any, index: number) => (
                  <tr
                    key={player.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-2 px-4 border-b text-center">
                      {(page - 1) * PER_PAGE + index + 1}
                    </td>
                    <td className="py-2 px-4 border-b">{player.name}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedTeams[player.id] || ""}
                        onChange={(e) =>
                          setSelectedTeams({
                            ...selectedTeams,
                            [player.id]: e.target.value,
                          })
                        }
                      >
                        <option value="">Pilih Tim</option>
                        {teams.map((team: any) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleAssign(player.id)}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded shadow font-medium disabled:opacity-50"
                        disabled={!selectedTeams[player.id]}
                        title={
                          !selectedTeams[player.id]
                            ? "Pilih tim terlebih dahulu"
                            : ""
                        }
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualAssignPage;
