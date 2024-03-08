import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../slice/gameSlice";
import { usersApi } from "./usersApi";
import { authApi } from "./authApi";
import usersSlice from "../slice/usersSlice";
import authSlice from "../slice/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    usersSlice,
    authSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    games: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, authApi.middleware),
});

export default store;
setupListeners(store.dispatch);
