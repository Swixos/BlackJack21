import axios from 'axios';

export async function getOneGame(id) {
  try {
    const response = await axios.get(`http://localhost:8000/api/game/${id}`, {
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