import TeamsForm from "../../components/Forms/TeamsForm";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import toast from "react-hot-toast";
import { useTeams } from "../../hooks/useTeams";
const AddTeam = () => {
  const { addTeam } = useTeams();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await addTeam(data);
      navigate("/teams");
      toast.success("Team added successfully!");
    } catch (error) {
      console.error("Add team failed:", error);
      toast.error("Failed to add team.");
    }
  };

  return (
    <>
      {/* <div className="flex">
        <Sidebar /> */}
      <div className="flex-1 w-full">
        <h1>Tambah Tim</h1>
        <TeamsForm onSubmit={handleSubmit}></TeamsForm>
      </div>
      {/* </div> */}
    </>
  );
};

export default AddTeam;
