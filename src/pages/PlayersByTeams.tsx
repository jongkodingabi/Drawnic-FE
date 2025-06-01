import { useEffect, useState, useMemo } from "react";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Layout/Sidebar";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

// const getCookie = (name: string): string | undefined => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift();
// };

const PlayersByTeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState("");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  // Ambil daftar tim
  const fetchTeams = async () => {
    try {
      const res = await axiosInstance.get("/api/teams");
      setTeams(res.data.data);
      if (res.data.data.length > 0) {
        setTeam(res.data.data[0].id);
      }
    } catch (error) {
      console.error("Gagal mengambil daftar tim", error);
    }
  };

  // Ambil data pemain berdasarkan tim
  const fetchPlayers = async () => {
    if (!team) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/player-by-team?team=${team}`);
      setDatas(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data pemain", error);
      setDatas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    fetchPlayers();
    setSearch("");
    setPage(1);
    // setSelectedIds([]);
  }, [team]);

  const filteredDatas = useMemo(() => {
    return datas.filter((item: any) =>
      item.player.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [datas, search]);

  const totalPages = Math.ceil(filteredDatas.length / PAGE_SIZE);
  const paginatedDatas = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredDatas.slice(start, start + PAGE_SIZE);
  }, [filteredDatas, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // // Checkbox helpers
  // const isAllSelected =
  //   paginatedDatas.length > 0 &&
  //   paginatedDatas.every((item: any) => selectedIds.includes(item.player.id));
  // const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

  // const handleSelectAll = () => {
  //   if (isAllSelected) {
  //     setSelectedIds(
  //       selectedIds.filter(
  //         (id) => !paginatedDatas.some((item: any) => item.player.id === id)
  //       )
  //     );
  //   } else {
  //     const newIds = paginatedDatas
  //       .map((item: any) => item.player.id)
  //       .filter((id: string) => !selectedIds.includes(id));
  //     setSelectedIds([...selectedIds, ...newIds]);
  //   }
  // };

  // const handleSelectOne = (id: string) => {
  //   setSelectedIds((prev) =>
  //     prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
  //   );
  // };

  // Helper untuk ambil cookie (XSRF-TOKEN)
  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const handleDelete = async (assignmentId: number) => {
    if (!window.confirm("Yakin hapus assignment ini?")) return;
    setDeleting(true);

    try {
      // 1. Ambil CSRF cookie
      await axiosInstance.get("/sanctum/csrf-cookie");

      // 2. Ambil XSRF token dari cookie
      const xsrfToken = getCookie("XSRF-TOKEN") || "";

      // 3. Kirim DELETE ke endpoint assignment
      await axiosInstance.delete(`/api/player-team-draw/${assignmentId}`, {
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
        },
        withCredentials: true,
      });

      toast.success("Assignment berhasil dihapus");
      // 4. Refresh data (fetch ulang daftar pemain)
      await fetchPlayers();
    } catch (err) {
      console.error("Gagal menghapus assignment:", err);
      toast.error("Gagal menghapus assignment");
    } finally {
      setDeleting(false);
    }
  };

  // Bulk delete
  // const handleBulkDelete = async () => {
  //   if (selectedIds.length === 0) return;
  //   if (!window.confirm("Yakin hapus semua pemain terpilih?")) return;
  //   setDeleting(true);
  //   try {
  //     await axiosInstance.post(
  //       `/api/players/bulk-delete`,
  //       {
  //         ids: selectedIds,
  //       },
  //       {}
  //     );
  //     fetchPlayers();
  //     setSelectedIds([]);
  //   } catch (err) {
  //     alert("Gagal menghapus pemain terpilih");
  //   } finally {
  //     setDeleting(false);
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="w-full flex-1 p-4 md:p-10 md:pl-80">
        <div className="p-2 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
            Daftar Pemain Tim {team}
          </h1>

          <div className="bg-gray-200 rounded-2xl max-w-full md:max-w-7xl shadow-2xl p-4 md:p-8 mb-4 md:mb-6">
            <div className="mb-4 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="teamSelect"
                  className="font-medium whitespace-nowrap"
                >
                  Pilih Tim:
                </label>
                <select
                  id="teamSelect"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="rounded-lg px-3 py-2 border border-gray-300"
                >
                  {teams.map((t: any) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                placeholder="Search by player name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg px-3 py-2 border border-gray-300 md:ml-auto"
              />
            </div>

            {loading ? (
              <p className="text-blue-600 mb-4">🔄 Sedang mengambil data...</p>
            ) : (
              <div className="w-full rounded-2xl bg-white shadow-lg overflow-x-auto">
                <div style={{ maxHeight: "700px" }}>
                  <table className="w-full min-w-[500px] text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-4 md:px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Nama Pemain
                        </th>
                        <th className="px-4 md:px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Tim
                        </th>
                        <th className="px-4 md:px-6 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedDatas.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 md:px-6 py-8 text-center text-gray-400"
                          >
                            Tidak ada pemain yang ditemukan.
                          </td>
                        </tr>
                      ) : (
                        paginatedDatas.map((item: any, idx: number) => (
                          <tr
                            key={item.player.id || idx}
                            className={
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-900">
                              {(page - 1) * PAGE_SIZE + idx + 1}
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-900">
                              {item.player.name}
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-900">
                              {item.team.name}
                            </td>
                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleDelete(item.id)}
                                disabled={deleting}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex flex-wrap justify-center mt-4 gap-2">
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayersByTeamPage;
