import { AnyAction, Draft, createSlice } from "@reduxjs/toolkit";

import Auth from "models/Auth";
import { AuthSlice } from "slices/AuthSlice";
import { deleteItemsFromStorage, errorToast, successToast } from "utils";

import { IPayloadError } from "interfaces/IPayloadError";

import * as SecureStore from "expo-secure-store";

type AuthState = {
  user: Auth | null;
};

const saveItemsToStorage = (state: Draft<AuthState>, action: AnyAction) => {
  const { user, accessToken } = action.payload;
  state.user = user;

  SecureStore.setItemAsync("_accessToken", JSON.stringify(accessToken)).then(
    () => {}
  );

  SecureStore.setItemAsync(
    "_refreshToken",
    JSON.stringify(user.refreshToken)
  ).then(() => {});

  SecureStore.setItemAsync("_user", JSON.stringify(user)).then(() => {});
};

export const authSlice = createSlice({
  name: "auth",
  initialState: <AuthState>{
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      saveItemsToStorage(state, action);
    },

    addSession: (state, action) => {
      const { student } = action.payload;
      if (student.studentId === state.user?.studentId) {
        const { student, teacher, ...session } = action.payload;
        state.user?.sessions.push(session);
      }
    },

    addSubscription: (state, action) => {
      const { studentId, sub } = action.payload;
      if (studentId === state.user?.studentId) {
        if (!state.user?.subscriptions && state.user) {
          state.user.subscriptions = [];
          state.user?.subscriptions.push(sub);
        } else {
          state.user?.subscriptions.push(sub);
        }
      }
    },

    addEventualityToSelf: (state, action) => {
      const { teacherId, eventuality } = action.payload;
      if (teacherId === state.user?.teacherId) {
        state.user?.eventualities.push(eventuality);
      }
    },

    updateSubscriptions: (state, action) => {
      if (state.user) {
        if (!state.user.subscriptions) {
          state.user.subscriptions = [];
        }
        state.user.subscriptions = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        saveItemsToStorage(state, action);
        successToast("Bienvenido de vuelta");
      }
    );
    builder.addMatcher(
      AuthSlice.endpoints.login.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      AuthSlice.endpoints.signUp.matchFulfilled,
      (state, action) => {
        saveItemsToStorage(state, action);
      }
    );
    builder.addMatcher(
      AuthSlice.endpoints.signUp.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      AuthSlice.endpoints.verify.matchFulfilled,
      (state, action) => {
        saveItemsToStorage(state, action);
        successToast("Cuenta verificada");
      }
    );
    builder.addMatcher(
      AuthSlice.endpoints.verify.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      AuthSlice.endpoints.resendCode.matchFulfilled,
      (state, action) => {
        saveItemsToStorage(state, action);
        successToast("Se envió un nuevo código a tu correo");
      }
    );
    builder.addMatcher(
      AuthSlice.endpoints.resendCode.matchRejected,
      (state, action) => {
        state.user = null;
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      AuthSlice.endpoints.findProfile.matchFulfilled,
      (state, action) => {
        saveItemsToStorage(state, action);
      }
    );
    builder.addMatcher(
      AuthSlice.endpoints.findProfile.matchRejected,
      (state, action) => {
        state.user = null;
        deleteItemsFromStorage();
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      AuthSlice.endpoints.updateProfile.matchFulfilled,
      (state, action) => {
        saveItemsToStorage(state, action);
        successToast("Perfil actualizado");
      }
    );
    builder.addMatcher(
      AuthSlice.endpoints.updateProfile.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(AuthSlice.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      deleteItemsFromStorage();
    });
    builder.addMatcher(AuthSlice.endpoints.logout.matchRejected, (state) => {
      state.user = null;
      deleteItemsFromStorage();
    });
  },
});

export const {
  setCredentials,
  addSession,
  addSubscription,
  addEventualityToSelf,
  updateSubscriptions,
} = authSlice.actions;

export default authSlice.reducer;
