import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import {
  findProfile,
  login,
  logout,
  updateProfile,
} from "services/AuthService";

import User from "models/User";

const initialState = {
  user: {} as User,
  state: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.state = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        SecureStore.setItemAsync(
          "_accessToken",
          JSON.stringify(accessToken)
        ).then(() => {});

        SecureStore.setItemAsync(
          "_refreshToken",
          JSON.stringify(user.refreshToken)
        ).then(() => {});

        SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error.message);
        state.state = "failed";
      });

    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        SecureStore.setItemAsync(
          "_accessToken",
          JSON.stringify(accessToken)
        ).then(() => {});

        SecureStore.setItemAsync(
          "_refreshToken",
          JSON.stringify(user.refreshToken)
        ).then(() => {});

        SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
      })
      .addCase(updateProfile.rejected, (state) => {
        state.state = "failed";
      });

    builder
      .addCase(findProfile.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        SecureStore.setItemAsync(
          "_accessToken",
          JSON.stringify(accessToken)
        ).then(() => {});

        SecureStore.setItemAsync(
          "_refreshToken",
          JSON.stringify(user.refreshToken)
        ).then(() => {});

        SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
      })
      .addCase(findProfile.rejected, (state) => {
        state.state = "failed";
        state.user = new User();

        SecureStore.deleteItemAsync("_accessToken").then(() => {});
        SecureStore.deleteItemAsync("_refreshToken").then(() => {});
        SecureStore.deleteItemAsync("_user").then(() => {});
      });

    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.user = new User();
        state.state = "idle";

        SecureStore.deleteItemAsync("_accessToken").then(() => {});
        SecureStore.deleteItemAsync("_refreshToken").then(() => {});
        SecureStore.deleteItemAsync("_user").then(() => {});
      })
      .addCase(logout.rejected, (state) => {
        state.user = new User();
        state.state = "idle";

        SecureStore.deleteItemAsync("_accessToken").then(() => {});
        SecureStore.deleteItemAsync("_refreshToken").then(() => {});
        SecureStore.deleteItemAsync("_user").then(() => {});
      });
  },
});

export default authSlice.reducer;
