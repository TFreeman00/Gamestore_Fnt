// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../api/cartApi";
import { ordersApi } from "../api/ordersApi";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart: [] },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    updateCartItemCount: (state) => {
      state.cartItemCount = state.cart.length;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        state.cart = payload;
      }
    );

    builder.addMatcher(
      cartApi.endpoints.addToCart.matchFulfilled,
      (state, { payload }) => {
        state.cart = payload;
      }
    );

    builder.addMatcher(
      cartApi.endpoints.deleteCart.matchFulfilled,
      (state, { payload }) => {
        state.cart = payload;
      }
    );

    builder.addMatcher(
      ordersApi.endpoints.createOrder.matchFulfilled,
      (state) => {
        state.cart = [];
        return state;
      }
    );
  },
});

export const { setCart, updateCartItemCount } = cartSlice.actions;
export default cartSlice.reducer;
