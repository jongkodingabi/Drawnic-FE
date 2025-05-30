import { useEffect, useState } from "react";
import { drawPlayers, getDrawResults } from "../api/drawsApi";
import Sidebar from "../components/Layout/Sidebar";
import toast from "react-hot-toast";

const DrawPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleDraw = async () => {
    setLoading(true);
    try {
      const response = await drawPlayers();
      setMessage(response.data.message);

      const res = await getDrawResults();
      setResults(res.data);
      toast.success("Successfully Drawing Players");
    } catch (error) {
      console.error("Failed to draw player", error);
      setMessage("Gagal melakukan pengundian.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const responseResult = await getDrawResults();
        setResults(responseResult.data);
      } catch (error) {
        console.error("Failed to get data:", error);
      }
    };
    fetchResults();
  }, []);

  const filteredResults = results.filter((item: any) =>
    item.player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="grid grid-cols-2 gap-2 justify-items-center items-center ml-50">
        <div className="p-6 bg-gray-100 rounded-xl shadow-xl">
          <h1 className="text-xl font-bold mb-4">Undi Pemain ke Tim</h1>
          <button
            className="bg-blue-600 rounded-full p-4 w-30"
            onClick={handleDraw}
            disabled={loading}
          >
            {loading ? "Mengundi..." : "Mulai Undi"}
          </button>

          <div className="mt-6 ">
            <h2 className="text-lg font-semibold">Hasil Undian:</h2>
            {results.map((item: any, index) => (
              <p key={index}>
                <strong>{item.player.name}</strong> masuk ke tim{" "}
                <strong>{item.team.name}</strong>
              </p>
            ))}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Hasil Undian Pemain ke Tim
          </h2>

          <input
            type="text"
            placeholder="Cari pemain..."
            className="mb-4 p-2 border rounded w-full md:w-1/2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset ke halaman pertama saat pencarian berubah
            }}
          />

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Nama Pemain</th>
                <th className="py-2 px-4 border-b">Nama Tim</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResults.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Tidak ada hasil ditemukan.
                  </td>
                </tr>
              ) : (
                paginatedResults.map((item: any, index: number) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-2 px-4 border-b">{item.player.name}</td>
                    <td className="py-2 px-4 border-b">{item.team.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="px-2 py-1">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawPage;
