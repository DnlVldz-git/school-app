import { createSlice } from "@reduxjs/toolkit";

import { TeacherSlice } from "slices/TeacherSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import {
  ITeacher,
  TeacherFilled,
  TeacherInitial,
} from "interfaces/Formik/ITeacher";
import Teacher from "models/Teacher";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Teacher>(),
  itemSelected: TeacherInitial,
};

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    selectTeacher: (state, action) => {
      const teacher = TeacherFilled(
        new Teacher(state.items.find((lev) => lev.user.id === action.payload))
      );
      state.itemSelected = <ITeacher>{ ...teacher };
    },
    addEventualityToTeacher: (state, action) => {
      const { teacherId, eventuality } = action.payload;
      if (teacherId === state.itemSelected.teacherId) {
        state.itemSelected.eventualities.push(eventuality);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      TeacherSlice.endpoints.getAllTeachers.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
  },
});

export const { selectTeacher, addEventualityToTeacher } = teachersSlice.actions;

export default teachersSlice.reducer;
