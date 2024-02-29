import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../slice/productSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer, 
  },
});

export default store;
