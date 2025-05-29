import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import * as api from "../api/teamsApi";
type TeamsResponse = {
  id: number;
  name: string;
  color: string;
  created_at?: string;
  updated_at?: string;
};

type ApiResponse = {
  message: string;
  data: TeamsResponse[];
};

export const useTeams = () => {
  const [teams, setTeams] = useState<TeamsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamsError, setTeamsError] = useState("");
  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/api/teams");
      setTeams(response.data.data);
    } catch (error) {
      setTeamsError("Failed to fetch data teams");
    } finally {
      setIsLoading(false);
    }
  };

  // hooks create team
  const addTeam = async (data: any) => {
    try {
      await api.createTeam(data);
      fetchTeams();
    } catch (error) {
      console.error("Error creating team:", error);
      throw new Error("Failed to create team");
    }
  };

  const deleteTeam = async (id: number) => {
    await api.deleteTeam(id);
    fetchTeams();
  };

  const editTeam = async (id: number, data: any) => {
    try {
      const response = await api.updateTeam(id, data);
      console.log("Updated team:", response.data);
      fetchTeams;
    } catch (error) {
      console.error("Update failed:", error);
      throw new Error("Failed to update team");
    }
  };

  return {
    teams,
    isLoading,
    teamsError,
    fetchTeams,
    addTeam,
    deleteTeam,
    editTeam,
  };
};
