import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as gameApi from "../api/gameApi"; // Changed import from productApi to gameApi

// Thunk to fetch all games
export const fetchAllGames = createAsyncThunk(
  "games/fetchAllGames",
  async () => {
    const games = await gameApi.getAllGames(); // Changed function call from productApi.getAllGames to gameApi.getAllGames
    return games;
  }
);

// Thunk to fetch a single game by ID
export const fetchGameById = createAsyncThunk(
  "games/fetchGameById",
  async (gameId) => {
    const game = await gameApi.getGameById(gameId); // Changed function call from productApi.getGameById to gameApi.getGameById
    return game;
  }
);

// Thunk to create a new game
export const createNewGame = createAsyncThunk(
  "games/createNewGame",
  async (gameData) => {
    const newGame = await gameApi.createGame(gameData); // Changed function call from productApi.createGame to gameApi.createGame
    return newGame;
  }
);

// Thunk to update an existing game
export const updateExistingGame = createAsyncThunk(
  "games/updateExistingGame",
  async ({ gameId, gameData }) => {
    const updatedGame = await gameApi.updateGame(gameId, gameData); // Changed function call from productApi.updateGame to gameApi.updateGame
    return updatedGame;
  }
);

// Thunk to delete a game
export const deleteGame = createAsyncThunk(
  "games/deleteGame",
  async (gameId) => {
    await gameApi.deleteGame(gameId); // Changed function call from productApi.deleteGame to gameApi.deleteGame
    return gameId;
  }
);

// Define the initial state
const initialState = {
  games: [],
  status: "idle",
  error: null,
};

// Create a slice for products
const gameSlice = createSlice({
  name: "games", // Changed name from products to games
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.games = action.payload;
        state.error = null;
      })
      .addCase(fetchAllGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGameById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.games = [action.payload];
        state.error = null;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewGame.fulfilled, (state, action) => {
        state.games.push(action.payload);
      })
      .addCase(updateExistingGame.fulfilled, (state, action) => {
        const updatedGame = action.payload;
        const index = state.games.findIndex(
          (game) => game.id === updatedGame.id
        );
        if (index !== -1) {
          state.games[index] = updatedGame;
        }
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = state.games.filter((game) => game.id !== action.payload);
      });
  },
});

// Export the reducer
export default gameSlice.reducer;
