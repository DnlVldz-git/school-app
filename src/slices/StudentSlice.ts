import { ApiSlice } from "./ApiSlice";

import { IStudent, StudentWithoutPassword } from "interfaces/Formik/IStudent";

export const StudentSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (student: IStudent) => ({
        url: "/students",
        method: "POST",
        body: { ...StudentWithoutPassword(student) },
      }),
    }),
    getAllStudents: builder.query({
      query: () => "/students",
    }),
    getOneStudent: builder.query({
      query: (id: string) => `/students/${id}`,
    }),
    updateStudent: builder.mutation({
      query: (student: IStudent) => ({
        url: "/students",
        method: "PUT",
        body: { ...StudentWithoutPassword(student) },
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id: string) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useLazyGetAllStudentsQuery,
  useGetOneStudentQuery,
  useLazyGetOneStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = StudentSlice;
