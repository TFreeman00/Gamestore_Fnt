import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames} from "../api/productApi";

const initialState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGamesAsync = createAsyncThunk(
  "games/fetchGames",
  async () => {
    return await fetchGames(); 
  }
);


const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGamesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    
  },
});

export const selectGames = (state) => state.games.games;
export const selectLoading = (state) => state.games.loading;
export const selectError = (state) => state.games.error;

export default gamesSlice.reducer;
