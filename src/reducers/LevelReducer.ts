import { createSlice } from "@reduxjs/toolkit";

import { LevelSlice } from "slices/LevelSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { LevelInitial } from "interfaces/Formik/ILevel";
import Level from "models/Level";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Level>(),
  itemSelected: LevelInitial,
};

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    selectLevel: (state, action) => {
      const level = state.items.find((lev) => lev.id === action.payload);
      state.itemSelected = <Level>{ ...level };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      LevelSlice.endpoints.createLevel.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Nivel agregado");
      }
    );
    builder.addMatcher(
      LevelSlice.endpoints.createLevel.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      LevelSlice.endpoints.getAllLevels.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      LevelSlice.endpoints.updateLevel.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (level) => level.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        successToast("Nivel actualizado");
      }
    );
    builder.addMatcher(
      LevelSlice.endpoints.updateLevel.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      LevelSlice.endpoints.deleteLevel.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (level) => level.id === Number(action.meta.arg.originalArgs)
        );
        state.items.splice(foundIndex, 1);

        successToast("Nivel eliminado");
      }
    );
    builder.addMatcher(
      LevelSlice.endpoints.deleteLevel.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectLevel } = levelsSlice.actions;

export default levelsSlice.reducer;
