import axios from "axios";
const baseUrl = "http://localhost:3000";
export const fetchGames = async () => {
  try {
    const response = await axios.get(`${baseUrl}/games`);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};
export const fetchCovers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/games/cover`);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};
export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${baseUrl}/games/video`);
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};
