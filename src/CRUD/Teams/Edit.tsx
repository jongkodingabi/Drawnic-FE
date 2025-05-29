import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getPlayer } from "../../api/playersApi";
// import PlayerForm from "../Forms/PlayerForm";
import { axiosInstance } from "../../lib/axios";
import Sidebar from "../../components/Layout/Sidebar";
import toast from "react-hot-toast";
import { useTeams } from "../../hooks/useTeams";
const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editTeam } = useTeams();
  type TeamType = {
    name: string;
    color: string;
    [key: string]: string | number; // Add index signature
  };

  const [formData, setFormData] = useState<TeamType>({
    name: "",
    color: "",
  });

  useEffect(() => {
    axiosInstance.get(`/api/teams/${id}`).then((response) => {
      const data = response.data.data;
      setFormData({
        name: data.name,
        color: data.color,
      });
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      try {
        await editTeam(Number(id), formData);
        navigate("/teams");
        toast.success("Player updated successfully!");
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Failed to update player.");
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-md mx-auto mt-10 rounded-lg shadow-lg p-2 bg-white">
        <h1 className="text-2xl font-bold mb-6">Edit Player</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-2 gap-4"
        >
          {["name", "color"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>{" "}
    </div>
  );
};
export default EditPlayer;
