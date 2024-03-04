import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../slice/productSlice";
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
    games: gamesReducer,
  },
  middleware: (
    getDefaultMiddleware //allows you to use is loading
  ) => getDefaultMiddleware().concat(usersApi.middleware, authApi.middleware),
});

export default store;
setupListeners(store.dispatch);
