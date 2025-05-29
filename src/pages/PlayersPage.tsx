import { useEffect } from "react";
import { useFetchPlayers } from "../hooks/usePlayers";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";

const PlayersPage = () => {
  const navigate = useNavigate();
  const { fetchPlayers, players, isLoading, playersError, removePlayer } =
    useFetchPlayers();

  const handleDeletePlayer = async (playerId: any) => {
    await removePlayer(playerId);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

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

            <div className="mb-4">
              <Link to="/addPlayers">
                <button className="w-30 flex items-end rounded-2xl bg-red-700 py-2 px-4 mb-10 text-white">
                  Add Player
                </button>
              </Link>
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
                    {players.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-8 text-center text-gray-400"
                        >
                          No players found.
                        </td>
                      </tr>
                    ) : (
                      players.map((player, idx) => (
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayersPage;
