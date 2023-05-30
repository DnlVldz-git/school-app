import { ApiSlice } from "./ApiSlice";
import { ISession } from "interfaces/Formik/ISession";

export const SessionSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: (session: ISession) => ({
        url: "/sessions",
        method: "POST",
        body: { ...session },
      }),
    }),
    createTrialSession: builder.mutation({
      query: (studentId: string) => ({
        url: "/sessions/trial",
        method: "POST",
        body: { studentId },
      }),
    }),
    getAllSessions: builder.query({
      query: () => ({
        url: "/sessions",
        method: "GET",
      }),
    }),
    getAllSessionsByStudent: builder.query({
      query: (studentId: string) => ({
        url: `/sessions/student/${studentId}`,
        method: "GET",
      }),
    }),
    getAllSessionsByTeacher: builder.query({
      query: (teacherId: string) => ({
        url: `/sessions/teacher/${teacherId}`,
        method: "GET",
      }),
    }),
    getAllTeachersSessionsByLevel: builder.query({
      query: (params: string) => `/sessions/level/${params}`,
    }),
    getAllSessionsBetweenDates: builder.query({
      query: (params: string) => `/sessions/schedule/${params}`,
    }),
    updateSession: builder.mutation({
      query: (session: ISession) => ({
        url: "/sessions",
        method: "PUT",
        body: { ...session },
      }),
    }),
    deleteSession: builder.mutation({
      query: (id: number) => ({
        url: `/sessions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSessionMutation,
  useCreateTrialSessionMutation,
  useGetAllSessionsQuery,
  useLazyGetAllSessionsQuery,
  useGetAllSessionsByStudentQuery,
  useLazyGetAllSessionsByStudentQuery,
  useGetAllSessionsByTeacherQuery,
  useLazyGetAllSessionsByTeacherQuery,
  useGetAllSessionsBetweenDatesQuery,
  useLazyGetAllSessionsBetweenDatesQuery,
  useGetAllTeachersSessionsByLevelQuery,
  useLazyGetAllTeachersSessionsByLevelQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = SessionSlice;
