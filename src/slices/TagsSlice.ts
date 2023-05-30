import { ITag } from "interfaces/Formik/ITag";
import { ApiSlice } from "./ApiSlice";

export const TagSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation({
      query: (tag: ITag) => ({
        url: "/tags",
        method: "POST",
        body: { ...tag },
      }),
    }),
    getAllTags: builder.query({
      query: () => ({
        url: "/tags",
        method: "GET",
      }),
    }),
    updateTag: builder.mutation({
      query: (tag: ITag) => ({
        url: "/tags",
        method: "PUT",
        body: { ...tag },
      }),
    }),
    deleteTag: builder.mutation({
      query: (id: number) => ({
        url: `/tags/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTagMutation,
  useGetAllTagsQuery,
  useLazyGetAllTagsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = TagSlice;
