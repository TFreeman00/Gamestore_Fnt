import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "../api/ordersApi";
import { cartApi } from "../api/cartApi";
import { usersApi } from "../api/usersApi";
import { authApi } from "../api/authApi";
import orderSlice from "../slice/orderSlice";
import cartSlice from "../slice/cartSlice";
import usersSlice from "../slice/usersSlice";
import authSlice from "../slice/authSlice";
import { getAllGames } from "./GameApi";
import gameReducer from "../slice/gameSlice";
// import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    orderSlice,
    cartSlice,
    usersSlice,
    authSlice,
    games: gameReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (
    getDefaultMiddleware //allows you to use is loading
  ) =>
    getDefaultMiddleware().concat(
      ordersApi.middleware,
      cartApi.middleware,
      usersApi.middleware,
      authApi.middleware
    ),
});

export default store;
