import { authApi } from "../api/authApi";
import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";

//session storage key
// const CREDENTIALS = "credentials";

// function storeToken(state, { payload }) {
//   state.credentials = { token: payload.token, user: { ...payload.user } };
//   window.sessionStorage.setItem(
//     CREDENTIALS,
//     JSON.stringify({
//       token: payload.token,
//       user: { ...payload.user },
//     })
//   );
// }

const authSlice = createSlice({
  name: "authSlice",
  initialState: { users: null, token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.users = payload.user;
        state.token = payload.token;
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.users = payload.user;
        state.token = payload.token;
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
        // console.log(payload);
        // state.users = state.users.map((user) => {
        //   if (user.id === payload.user.id) {
        //     return payload.user;
        //   }
        //   return user;
        // });
        // return state;
        console.log(payload);
        state.users = payload;
        // return { ...state, users: payload };
      }
    );
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
