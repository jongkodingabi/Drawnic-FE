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
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-80 p-6">
        <div className="flex flex-col md:flex-row gap-8 mt-10">
          {/* Box untuk tombol undi */}
          <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-blue-200">
            <h1 className="text-2xl font-extrabold mb-6 text-blue-700 tracking-wide">
              Undi Pemain ke Tim
            </h1>
            <button
              className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full py-3 px-8 shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-200 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
              onClick={handleDraw}
              disabled={loading}
            >
              {loading ? "Mengundi..." : "Mulai Undi"}
            </button>
            {message && (
              <div className="mt-4 text-center text-blue-600 font-medium">
                {message}
              </div>
            )}
            {loading && (
              <div className="mt-8 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 150"
                  className="w-32 h-16"
                >
                  <path
                    fill="none"
                    stroke="#2584FF"
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeDasharray="300 385"
                    strokeDashoffset="0"
                    d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      calcMode="spline"
                      dur="2"
                      values="685;-685"
                      keySplines="0 0 1 1"
                      repeatCount="indefinite"
                    ></animate>
                  </path>
                </svg>
              </div>
            )}
          </div>

          {/* Box untuk tabel hasil */}
          <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8 border border-blue-200">
            <h2 className="text-2xl font-extrabold mb-6 text-blue-700 tracking-wide">
              Hasil Undian Pemain ke Tim
            </h2>
            <input
              type="text"
              placeholder="Cari pemain..."
              className="mb-6 p-3 border border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead>
                  <tr className="bg-blue-100 text-blue-800">
                    <th className="py-3 px-4 border-b font-semibold">#</th>
                    <th className="py-3 px-4 border-b font-semibold">
                      Nama Pemain
                    </th>
                    <th className="py-3 px-4 border-b font-semibold">
                      Nama Tim
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResults.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-6 text-gray-500"
                      >
                        Tidak ada hasil ditemukan.
                      </td>
                    </tr>
                  ) : (
                    paginatedResults.map((item: any, index: number) => (
                      <tr key={item.id} className="hover:bg-blue-50 transition">
                        <td className="py-3 px-4 border-b text-center">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {item.player.name}
                        </td>
                        <td className="py-3 px-4 border-b">{item.team.name}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition"
              >
                Sebelumnya
              </button>
              <span className="text-base text-blue-700 font-medium">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawPage;
