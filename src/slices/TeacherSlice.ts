import { ApiSlice } from "./ApiSlice";

export const TeacherSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: () => "/teachers",
    }),
    getOneTeacher: builder.query({
      query: (id: string) => `/teachers/${id}`,
    }),
  }),
});

export const {
  useGetAllTeachersQuery,
  useLazyGetAllTeachersQuery,
  useGetOneTeacherQuery,
  useLazyGetOneTeacherQuery,
} = TeacherSlice;
