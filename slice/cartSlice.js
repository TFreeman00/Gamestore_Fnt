import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../api/cartApi";
import { ordersApi } from "../api/ordersApi";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart: [], cartItemCount: 0 },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      state.cartItemCount = action.payload.length;
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
        state.cartItemCount = payload.length;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.addToCart.matchFulfilled,
      (state, { payload }) => {
        state.cart = payload;
        state.cartItemCount = payload.length;
      }
    );
    builder.addMatcher(
      cartApi.endpoints.deleteCart.matchFulfilled,
      (state, { payload }) => {
        state.cart = payload;
        state.cartItemCount = payload.length;
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.createOrder.matchFulfilled,
      (state) => {
        state.cart = [];
        state.cartItemCount = 0;
        return state;
      }
    );
  },
});

export const { setCart, updateCartItemCount } = cartSlice.actions;
export default cartSlice.reducer;
