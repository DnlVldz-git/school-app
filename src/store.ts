import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "reducers/AuthReducer";
import SessionsReducer from "reducers/SessionsReducer";

export const store = configureStore({
  reducer: {
    // Reducers for auth and actions
    auth: AuthReducer,
    // Reducers for app content
    sessions: SessionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
