import { createSlice } from "@reduxjs/toolkit";
import Plan from "models/Plan";
import { findAllActive } from "services/PlanService";

const initialState = {
  plans: new Array<Plan>(),
  state: "idle",
};

export const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllActive.pending, (state) => {
        state.state = "loading";
      })
      .addCase(findAllActive.fulfilled, (state, action) => {
        state.plans = action.payload;
        state.state = "success";
      })
      .addCase(findAllActive.rejected, (state, action) => {
        console.log(action.error.message);
        state.state = "failed";
      });
  },
});

export default planSlice.reducer;
