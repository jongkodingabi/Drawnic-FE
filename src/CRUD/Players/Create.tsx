import PlayerForm from "../../components/Forms/PlayerForm";
import { useFetchPlayers } from "../../hooks/usePlayers";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import toast from "react-hot-toast";
const AddPlayer = () => {
  const { addPlayer } = useFetchPlayers();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await addPlayer(data);
      navigate("/players");
      toast.success("Player added successfully!");
    } catch (error) {
      console.error("Add player failed:", error);
      toast.error("Failed to add player.");
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 w-full">
          <h1>Tambah Player</h1>
          <PlayerForm onSubmit={handleSubmit}></PlayerForm>
        </div>
      </div>
    </>
  );
};

export default AddPlayer;
