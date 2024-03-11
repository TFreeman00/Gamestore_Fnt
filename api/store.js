import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "../api/ordersApi";
import { cartApi } from "../api/cartApi";
import { usersApi } from "../api/usersApi";
import { authApi } from "../api/authApi";
import { gamesApi } from "./gamesApi";
import orderSlice from "../slice/orderSlice";
import cartSlice from "../slice/cartSlice";
import usersSlice from "../slice/usersSlice";
import authSlice from "../slice/authSlice";
import gameSlice from "../slice/gameSlice";

const store = configureStore({
  reducer: {
    orderSlice,
    cartSlice,
    usersSlice,
    authSlice,
    gameSlice,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },

  middleware: (
    getDefaultMiddleware //allows you to use is loading
  ) =>
    getDefaultMiddleware().concat(
      ordersApi.middleware,
      cartApi.middleware,
      usersApi.middleware,
      authApi.middleware,
      gamesApi.middleware
    ),
});

export default store;
