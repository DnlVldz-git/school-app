import { createSlice } from "@reduxjs/toolkit";

import { StudentSlice } from "slices/StudentSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import {
  IStudent,
  StudentFilled,
  StudentInitial,
} from "interfaces/Formik/IStudent";
import Student from "models/Student";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Student>(),
  itemSelected: StudentInitial,
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    selectStudent: (state, action) => {
      const student = StudentFilled(
        new Student(state.items.find((lev) => lev.user.id === action.payload))
      );
      state.itemSelected = <IStudent>{ ...student };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      StudentSlice.endpoints.createStudent.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Estudiante agregado");
      }
    );
    builder.addMatcher(
      StudentSlice.endpoints.createStudent.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      StudentSlice.endpoints.getAllStudents.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      StudentSlice.endpoints.updateStudent.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (student) => student.id === action.meta.arg.originalArgs.studentId
        );
        state.items[foundIndex] = action.payload;
        successToast("Estudiante actualizado");
      }
    );
    builder.addMatcher(
      StudentSlice.endpoints.updateStudent.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      StudentSlice.endpoints.deleteStudent.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (student) => student.user.id === action.meta.arg.originalArgs
        );
        state.items.splice(foundIndex, 1);

        successToast("Estudiante eliminado");
      }
    );
    builder.addMatcher(
      StudentSlice.endpoints.deleteStudent.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
