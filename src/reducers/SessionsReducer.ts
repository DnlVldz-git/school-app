import { createSlice } from "@reduxjs/toolkit";
import Session from "models/Session";

import { findAllByStudentId } from "services/SessionsService";

const initialState = {
  sessions: new Array<Session>(),
  state: "idle",
};

export const sessionsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findAllByStudentId.pending, (state) => {
        state.state = "loading";
      })
      .addCase(findAllByStudentId.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.state = "success";
      })
      .addCase(findAllByStudentId.rejected, (state, action) => {
        console.log(action.error.message);
        state.state = "failed";
      });
  },
});

export default sessionsSlice.reducer;
