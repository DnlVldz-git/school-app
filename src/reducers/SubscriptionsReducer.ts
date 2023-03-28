import { createSlice } from "@reduxjs/toolkit";
import Subscription from "models/Subscription";

import { findAllActive } from "services/PlanService";

const initialState = {
  subscriptions: new Array<Subscription>(),
  state: "idle",
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllActive.pending, (state) => {
        state.state = "loading";
      })
      .addCase(findAllActive.fulfilled, (state, action) => {
        state.subscriptions = action.payload;
        state.state = "success";
      })
      .addCase(findAllActive.rejected, (state, action) => {
        console.log(action.error.message);
        state.state = "failed";
      });
  },
});

export default subscriptionSlice.reducer;
