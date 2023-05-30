import { ApiSlice } from "./ApiSlice";
import { ILevel } from "interfaces/Formik/ILevel";

export const LevelSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLevel: builder.mutation({
      query: ({ name, description }: ILevel) => ({
        url: "/levels",
        method: "POST",
        body: { name, description },
      }),
    }),
    getAllLevels: builder.query({
      query: () => ({
        url: "/levels",
        method: "GET",
      }),
    }),
    getOneLevel: builder.query({
      query: (id: number) => ({
        url: `/levels${id}`,
        method: "GET",
      }),
    }),
    updateLevel: builder.mutation({
      query: ({ id, name, description }: ILevel) => ({
        url: "/levels",
        method: "PUT",
        body: { id, name, description },
      }),
    }),
    deleteLevel: builder.mutation({
      query: (id: number) => ({
        url: `/levels/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateLevelMutation,
  useGetAllLevelsQuery,
  useLazyGetAllLevelsQuery,
  useGetOneLevelQuery,
  useLazyGetOneLevelQuery,
  useUpdateLevelMutation,
  useDeleteLevelMutation,
} = LevelSlice;
