import { ApiSlice } from "./ApiSlice";
import { ILesson } from "interfaces/Formik/ILesson";

export const LessonSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: (lesson: ILesson) => ({
        url: "/lessons",
        method: "POST",
        body: { ...lesson },
      }),
    }),
    getAllLessons: builder.query({
      query: () => ({
        url: "/lessons",
        method: "GET",
      }),
    }),
    getAllLessonsByUnit: builder.query({
      query: (unitId: number) => ({
        url: `/lessons/unit/${unitId}`,
        method: "GET",
      }),
    }),
    updateLesson: builder.mutation({
      query: (lesson: ILesson) => ({
        url: "/lessons",
        method: "PUT",
        body: { ...lesson },
      }),
    }),
    deleteLesson: builder.mutation({
      query: (id: number) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetAllLessonsQuery,
  useLazyGetAllLessonsQuery,
  useGetAllLessonsByUnitQuery,
  useLazyGetAllLessonsByUnitQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = LessonSlice;
