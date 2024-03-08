// productApi.js

const BASE_URL = "http://localhost:3000"; // Update with your server URL

// Function to handle errors from fetch requests
const handleErrors = async (response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response.json();
};

// Function to fetch all products (games)
const getAllGames = async () => {
  const response = await fetch(`${BASE_URL}/games`);
  return handleErrors(response);
};

// Function to fetch a single product (game) by ID
const getGameById = async (gameId) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}`);
  return handleErrors(response);
};

// Function to create a new product (game)
const createGame = async (gameData) => {
  const response = await fetch(`${BASE_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });
  return handleErrors(response);
};

// Function to update an existing product (game)
const updateGame = async (gameId, gameData) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gameData),
  });
  return handleErrors(response);
};

// Function to delete a product (game)
const deleteGame = async (gameId) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}`, {
    method: "DELETE",
  });
  return handleErrors(response);
};

// Export the functions to be used in other modules
export { getAllGames, getGameById, createGame, updateGame, deleteGame };
