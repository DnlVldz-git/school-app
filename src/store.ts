import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "reducers/AuthReducer";

import PlansReducer from "reducers/PlansReducer";
import SessionsReducer from "reducers/SessionsReducer";
import SubscriptionsReducer from "reducers/SubscriptionsReducer";

export const store = configureStore({
  reducer: {
    // Reducer for auth management
    auth: AuthReducer,
    // Reducers for app content
    sessions: SessionsReducer,
    plans: PlansReducer,
    subscriptions: SubscriptionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
