import { createSlice } from "@reduxjs/toolkit";

import { LessonSlice } from "slices/LessonSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { LessonInitial } from "interfaces/Formik/ILesson";
import Lesson from "models/Lesson";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Lesson>(),
  itemSelected: LessonInitial,
};

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    selectLesson: (state, action) => {
      const lesson = state.items.find((lev) => lev.id === action.payload);
      state.itemSelected = <Lesson>{ ...lesson };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      LessonSlice.endpoints.createLesson.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Lección agregada");
      }
    );
    builder.addMatcher(
      LessonSlice.endpoints.createLesson.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      LessonSlice.endpoints.getAllLessons.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      LessonSlice.endpoints.getAllLessonsByUnit.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      LessonSlice.endpoints.updateLesson.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (lesson) => lesson.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        successToast("Lección actualizada");
      }
    );
    builder.addMatcher(
      LessonSlice.endpoints.updateLesson.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      LessonSlice.endpoints.deleteLesson.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (lesson) => lesson.id === Number(action.meta.arg.originalArgs)
        );
        state.items.splice(foundIndex, 1);

        successToast("Lección eliminada");
      }
    );
    builder.addMatcher(
      LessonSlice.endpoints.deleteLesson.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectLesson } = lessonsSlice.actions;

export default lessonsSlice.reducer;
