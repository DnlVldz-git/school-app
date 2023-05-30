import { createSlice } from "@reduxjs/toolkit";

import { PlanSlice } from "slices/PlanSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { PlanInitial } from "interfaces/Formik/IPlan";
import Plan from "models/Plan";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Plan>(),
  itemSelected: PlanInitial,
};

export const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    selectPlan: (state, action) => {
      const plan = state.items.find((lev) => lev.id === action.payload);
      state.itemSelected = <Plan>{ ...plan };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      PlanSlice.endpoints.createPlan.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Plan agregado");
      }
    );
    builder.addMatcher(
      PlanSlice.endpoints.createPlan.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      PlanSlice.endpoints.getAllPlans.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      PlanSlice.endpoints.getAllActivePlans.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      PlanSlice.endpoints.updatePlan.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (plan) => plan.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        successToast("Plan actualizado");
      }
    );
    builder.addMatcher(
      PlanSlice.endpoints.updatePlan.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      PlanSlice.endpoints.deletePlan.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (plan) => plan.id === Number(action.meta.arg.originalArgs)
        );
        state.items.splice(foundIndex, 1);

        successToast("Plan eliminado");
      }
    );
    builder.addMatcher(
      PlanSlice.endpoints.deletePlan.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectPlan } = plansSlice.actions;

export default plansSlice.reducer;
