import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getPlayer } from "../../api/playersApi";
// import PlayerForm from "../Forms/PlayerForm";
import { useFetchPlayers } from "../../hooks/usePlayers";
import { axiosInstance } from "../../lib/axios";
import Sidebar from "../../components/Layout/Sidebar";
import toast from "react-hot-toast";
const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editPlayer } = useFetchPlayers();

  type PlayerFormFields = {
    name: string;
    telephone: string;
    position: string;
    age: number;
    major: string;
    [key: string]: string | number; // Add index signature
  };

  const [formData, setFormData] = useState<PlayerFormFields>({
    name: "",
    telephone: "",
    position: "",
    age: 0,
    major: "",
  });

  useEffect(() => {
    axiosInstance.get(`/api/players/${id}`).then((response) => {
      const data = response.data.data;
      setFormData({
        name: data.name,
        telephone: data.telephone,
        position: data.position,
        age: data.age,
        major: data.major,
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
        await editPlayer(Number(id), formData);
        navigate("/players");
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
          {["name", "telephone", "position", "major"].map((field) => (
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
          <div>
            <label className="block mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
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
