import { getAllGames } from "./getAllGames";
import axios from 'axios';

export async function useCreateGame(game, players) {
  try {
    const response = await axios.post("http://localhost:8000/api/create_game", {
      name: game,
      players: players
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}