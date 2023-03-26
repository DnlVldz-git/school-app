import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { findProfile, login, updateProfile } from "services/AuthService";

import User from "models/User";

const initialState = {
  user: {} as User,
  state: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = new User();
      state.state = "idle";
      SecureStore.deleteItemAsync("_token").then(() => {});
      SecureStore.deleteItemAsync("_user").then(() => {});
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.state = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        SecureStore.setItemAsync("_token", JSON.stringify(token)).then(
          () => {}
        );
        SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error.message);
        state.state = "failed";
      });

    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.state = "success";
        state.user = user;

        SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
      })
      .addCase(updateProfile.rejected, (state) => {
        state.state = "failed";
      });

    builder
      .addCase(findProfile.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.state = "success";

        SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
      })
      .addCase(findProfile.rejected, (state) => {
        state.state = "failed";
        state.user = new User();

        SecureStore.deleteItemAsync("_token").then(() => {});
        SecureStore.deleteItemAsync("_user").then(() => {});
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
