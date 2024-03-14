import { createSlice } from "@reduxjs/toolkit";
import { gamesApi } from "../api/gamesApi";

const gameSlice = createSlice({
  name: "gameSlice",
  initialState: { games: [], game: null },
  reducers: {
    createGameSuccess: (state, action) => {
      state.games.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      gamesApi.endpoints.getAllGames.matchFulfilled,
      (state, { payload }) => {
        // console.log(payload);
        return { ...state, games: payload };
      }
    );

    builder.addMatcher(
      gamesApi.endpoints.getGameById.matchFulfilled,
      (state, { payload }) => {
        // console.log(payload);
        return { ...state, game: payload };
      }
    );

    builder.addMatcher(
      gamesApi.endpoints.updateGame.matchFulfilled,
      (state, { payload }) => {
        state.game = payload;
        console.log(payload);
        state.games = state.games.map((game) => {
          return game.id === payload.id ? payload : game;
        });
      }
    );
  },
});

export const { createGameSuccess } = gameSlice.actions;
export default gameSlice.reducer;
