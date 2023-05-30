import { createSlice } from "@reduxjs/toolkit";

import { SessionSlice } from "slices/SessionSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { ISession, SessionInitial } from "interfaces/Formik/ISession";
import Session from "models/Session";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Session>(),
  itemSelected: SessionInitial,
};

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    selectSession: (state, action) => {
      const session = state.items.find((lev) => lev.id === action.payload);
      state.itemSelected = <ISession>{ ...session };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      SessionSlice.endpoints.createSession.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Sesión agendada");
      }
    );
    builder.addMatcher(
      SessionSlice.endpoints.createSession.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      SessionSlice.endpoints.createTrialSession.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Clase muestra agendada");
      }
    );
    builder.addMatcher(
      SessionSlice.endpoints.createTrialSession.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      SessionSlice.endpoints.getAllSessions.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      SessionSlice.endpoints.updateSession.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (session) => session.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        successToast("Sesión actualizada");
      }
    );
    builder.addMatcher(
      SessionSlice.endpoints.updateSession.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      SessionSlice.endpoints.deleteSession.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (session) => session.id === action.meta.arg.originalArgs
        );
        state.items.splice(foundIndex, 1);

        successToast("Sesión eliminada");
      }
    );
    builder.addMatcher(
      SessionSlice.endpoints.deleteSession.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectSession } = sessionsSlice.actions;

export default sessionsSlice.reducer;
