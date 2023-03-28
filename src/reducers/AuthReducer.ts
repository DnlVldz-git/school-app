import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import {
  findProfile,
  login,
  logout,
  register,
  resendCode,
  updateProfile,
  verify,
} from "services/AuthService";

import User from "models/User";
import { showMessage } from "react-native-flash-message";

const initialState = {
  user: {} as User,
  state: "idle",
};

const saveItemsToStorage = (
  accessToken: string,
  refreshToken: string,
  user: User
) => {
  SecureStore.setItemAsync("_accessToken", JSON.stringify(accessToken)).then(
    () => {}
  );

  SecureStore.setItemAsync("_refreshToken", JSON.stringify(refreshToken)).then(
    () => {}
  );

  SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
};

const deleteItemsFromStorage = () => {
  SecureStore.deleteItemAsync("_accessToken").then(() => {});
  SecureStore.deleteItemAsync("_refreshToken").then(() => {});
  SecureStore.deleteItemAsync("_user").then(() => {});
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.state = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        saveItemsToStorage(accessToken, user.refreshToken, user);
      })
      .addCase(register.rejected, (state, action) => {
        showMessage({
          message: action.error.message || "Error",
          type: "danger",
        });
        state.state = "failed";
      });
    builder
      .addCase(login.pending, (state) => {
        state.state = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        saveItemsToStorage(accessToken, user.refreshToken, user);
      })
      .addCase(login.rejected, (state, action) => {
        showMessage({
          message: action.error.message || "Error",
          type: "danger",
        });
        state.state = "failed";
      });

    builder
      .addCase(verify.pending, (state) => {
        state.state = "loading";
      })
      .addCase(verify.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        showMessage({
          message: "Cuenta verificada",
          type: "success",
        });
        saveItemsToStorage(accessToken, user.refreshToken, user);
      })
      .addCase(verify.rejected, (state, action) => {
        showMessage({
          message: action.error.message || "Error",
          type: "danger",
        });
        state.state = "failed";
      });

    builder
      .addCase(resendCode.fulfilled, (state, action) => {
        showMessage({
          message: "Código enviado",
          type: "success",
        });
      })
      .addCase(resendCode.rejected, (state, action) => {
        showMessage({
          message: action.error.message || "Error",
          type: "danger",
        });
        state.state = "failed";
      });

    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        saveItemsToStorage(accessToken, user.refreshToken, user);
      })
      .addCase(updateProfile.rejected, (state) => {
        state.state = "failed";
      });

    builder
      .addCase(findProfile.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.state = "success";
        state.user = { ...user };

        saveItemsToStorage(accessToken, user.refreshToken, user);
      })
      .addCase(findProfile.rejected, (state) => {
        state.state = "failed";
        state.user = new User();

        deleteItemsFromStorage();
      });

    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.user = new User();
        state.state = "idle";
        deleteItemsFromStorage();
      })
      .addCase(logout.rejected, (state) => {
        state.user = new User();
        state.state = "idle";

        deleteItemsFromStorage();
        showMessage({
          message: "Error",
          type: "danger",
        });
      });
  },
});

export default authSlice.reducer;
