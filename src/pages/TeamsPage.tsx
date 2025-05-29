import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import { useTeams } from "../hooks/useTeams";
import toast from "react-hot-toast";

const PlayersPage = () => {
  const navigate = useNavigate();
  const { fetchTeams, teams, isLoading, deleteTeam, teamsError } = useTeams();

  const handleDeleteteam = async (playerId: any) => {
    try {
      await deleteTeam(playerId);
      fetchTeams();
      toast.success("Team deleted successfully!");
    } catch (error) {
      console.error("Delete team failed:", error);
      toast.error("Failed to delete team.");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main className="w-full flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            📋 Teams Page
          </h1>

          <div className="bg-gray-200 rounded-2xl shadow-2xl p-8">
            {isLoading && (
              <p className="text-blue-600 mb-4">🔄 Sedang mengambil data...</p>
            )}
            {teamsError && (
              <p className="text-red-600 mb-4">
                ❌ Gagal mendapatkan data players
              </p>
            )}

            <div className="mb-4">
              <Link to="/addTeams">
                <button className="w-30 flex items-end rounded-2xl bg-red-700 py-2 px-4 mb-10 text-white">
                  Add Team
                </button>
              </Link>
            </div>

            <div className="w-full rounded-2xl bg-white shadow-lg overflow-x-auto">
              <div style={{ maxHeight: "700px" }}>
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Teams
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Color
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-8 text-center text-gray-400"
                        >
                          No teams found.
                        </td>
                      </tr>
                    ) : (
                      teams.map((team, idx) => (
                        <tr
                          key={team.id || idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {team.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {team.color}
                          </td>

                          <td className="px-6 py-4 flex gap-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteteam(team.id)}
                              className="text-red-700 hover:underline font-medium"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => navigate(`/teams/${team.id}/edit`)}
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
