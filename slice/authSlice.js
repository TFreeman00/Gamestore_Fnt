import { authApi } from "../api/authApi";
import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    users: window.sessionStorage.getItem("USER")
      ? JSON.parse(window.sessionStorage.getItem("USER")).user
      : null,
    token: window.sessionStorage.getItem("USER")
      ? JSON.parse(window.sessionStorage.getItem("USER")).token
      : null,
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      window.sessionStorage.removeItem("USER");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.users = payload.user;
        state.token = payload.token;
        window.sessionStorage.setItem("USER", JSON.stringify({ ...payload }));
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.users = payload.user;
        state.token = payload.token;
        window.sessionStorage.setItem("USER", JSON.stringify({ ...payload }));
      }
    );
    builder.addMatcher(
      authApi.endpoints.getUserInfo.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        return { ...state, users: payload };
      }
    );
    builder.addMatcher(
      // PUT
      usersApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.users = payload;
      }
    );
  },
});
export default authSlice.reducer;
export const { setToken } = authSlice.actions;