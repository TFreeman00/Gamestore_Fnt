import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGames, fetchCovers, fetchVideos } from "../api/productApi";

const initialState = {
  games: [],
  covers: [],
  videos: [],
  loading: false,
  error: null,
};

export const fetchGamesAsync = createAsyncThunk(
  "games/fetchGames",
  async () => {
    return await fetchGames();
  }
);

export const fetchCoversAsync = createAsyncThunk(
  "covers/fetchCovers",
  async () => {
    return await fetchCovers();
  }
);

export const fetchVideosAsync = createAsyncThunk(
  "videos/fetchVideos",
  async () => {
    return await fetchVideos();
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

    builder.addCase(fetchCoversAsync.fulfilled, (state, action) => {
      state.covers = action.payload;
    });

    builder.addCase(fetchVideosAsync.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
  },
});

export const selectGames = (state) => state.games.games;
export const selectCovers = (state) => state.games.covers;
export const selectVideos = (state) => state.games.videos;
export const selectLoading = (state) => state.games.loading;
export const selectError = (state) => state.games.error;



export default gamesSlice.reducer;

