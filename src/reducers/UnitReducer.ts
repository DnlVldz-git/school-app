import { createSlice } from "@reduxjs/toolkit";

import Unit from "models/Unit";

import { UnitSlice } from "slices/UnitSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { UnitInitial } from "interfaces/Formik/IUnit";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Unit>(),
  itemSelected: UnitInitial,
};

export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    selectUnit: (state, action) => {
      const unit = state.items.find((lev) => lev.id === action.payload);
      state.itemSelected = <Unit>{ ...unit };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UnitSlice.endpoints.createUnit.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Unidad agregada");
      }
    );
    builder.addMatcher(
      UnitSlice.endpoints.createUnit.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      UnitSlice.endpoints.getAllUnits.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      UnitSlice.endpoints.getAllUnitsByLevel.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      UnitSlice.endpoints.updateUnit.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (unit) => unit.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        successToast("Unidad actualizada");
      }
    );
    builder.addMatcher(
      UnitSlice.endpoints.updateUnit.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      UnitSlice.endpoints.deleteUnit.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (unit) => unit.id === Number(action.meta.arg.originalArgs)
        );
        state.items.splice(foundIndex, 1);

        successToast("Unidad eliminada");
      }
    );
    builder.addMatcher(
      UnitSlice.endpoints.deleteUnit.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectUnit } = unitsSlice.actions;

export default unitsSlice.reducer;
