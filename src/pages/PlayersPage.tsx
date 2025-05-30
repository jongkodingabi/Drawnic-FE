import { useEffect, useState, useMemo } from "react";
import { useFetchPlayers } from "../hooks/usePlayers";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

const PlayersPage = () => {
  const navigate = useNavigate();
  const { fetchPlayers, players, isLoading, playersError, removePlayer } =
    useFetchPlayers();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleDeletePlayer = async (playerId: any) => {
    try {
      await removePlayer(playerId);
      toast.success("successfully deleted player");
    } catch (error) {
      console.error("Failed to delete player:", error);
      toast.error("Failed tob delete player");
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Filter players by search
  const filteredPlayers = useMemo(() => {
    return players.filter((player: any) =>
      player.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [players, search]);

  // Pagination
  const totalPages = Math.ceil(filteredPlayers.length / PAGE_SIZE);
  const paginatedPlayers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPlayers.slice(start, start + PAGE_SIZE);
  }, [filteredPlayers, page]);

  // Reset page if search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="w-full flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            📋 Players Page
          </h1>

          <div className="bg-gray-200 rounded-2xl shadow-2xl p-8">
            {isLoading && (
              <p className="text-blue-600 mb-4">🔄 Sedang mengambil data...</p>
            )}
            {playersError && (
              <p className="text-red-600 mb-4">
                ❌ Gagal mendapatkan data players
              </p>
            )}

            <div className="mb-4 flex items-center gap-4">
              <Link to="/addPlayers">
                <button className="w-30 flex items-end rounded-2xl bg-red-700 py-2 px-4 mb-0 text-white">
                  Add Player
                </button>
              </Link>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg px-3 py-2 border border-gray-300"
              />
            </div>

            <div className="w-full rounded-2xl bg-white shadow-lg overflow-x-auto">
              <div style={{ maxHeight: "700px" }}>
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Telephone
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Major
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPlayers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-8 text-center text-gray-400"
                        >
                          No players found.
                        </td>
                      </tr>
                    ) : (
                      paginatedPlayers.map((player, idx) => (
                        <tr
                          key={player.id || idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {player.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {player.telephone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {player.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {player.age}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {player.major}
                          </td>
                          <td className="px-6 py-4 flex gap-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeletePlayer(player.id)}
                              className="text-red-700 hover:underline font-medium"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/players/${player.id}/edit`)
                              }
                              className="text-blue-600 hover:underline font-medium"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? "bg-red-700 text-white" : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayersPage;
