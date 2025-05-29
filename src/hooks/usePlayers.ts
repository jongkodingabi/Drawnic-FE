import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import * as api from "../api/playersApi";

type PlayersResponse = {
  id: number;
  name: string;
  telephone: string;
  position: string;
  age: number;
  major: string;
  created_at?: string;
  updated_at?: string;
};

type ApiResponse = {
  message: string;
  data: PlayersResponse[];
};

export const useFetchPlayers = () => {
  const [players, setPlayers] = useState<PlayersResponse[]>([]);
  // const [playersCount, setPlayersCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [playersError, setPlayersError] = useState("");

  const fetchPlayers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/api/players");

      setPlayers(response.data.data); // ✅ ini yang benar
    } catch (error) {
      setPlayersError("Failed to fetch data players");
    } finally {
      setIsLoading(false);
    }
  };

  // hooks create player
  const addPlayer = async (data: any) => {
    await api.createPlayer(data);
    fetchPlayers();
  };

  // hooks edit player
  const editPlayer = async (id: number, data: any) => {
    try {
      const response = await api.updatePlayer(id, data);
      console.log("Updated player:", response.data);
      fetchPlayers();
    } catch (error: any) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  // hooks delete player
  const removePlayer = async (id: number) => {
    await api.deletePlayer(id);
    fetchPlayers();
  };

  // // hooks to count players
  // const getPlayersCount = async () => {
  //   try {
  //     const response = await api.getPlayersCount();
  //     setPlayersCount(response.data.count);
  //     return response.data.count;
  //   } catch (error) {
  //     console.error("Failed to fetch players count:", error);
  //     return 0;
  //   }
  // };

  return {
    fetchPlayers,
    players,
    isLoading,
    playersError,
    addPlayer,
    editPlayer,
    removePlayer,
  };
};
