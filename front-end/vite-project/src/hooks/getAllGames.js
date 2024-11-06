import axios from 'axios';

export async function getAllGames() {
  try {
    const response = await axios.get("http://localhost:8000/api/games", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}