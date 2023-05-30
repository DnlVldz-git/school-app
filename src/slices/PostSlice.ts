import { ApiSlice } from "./ApiSlice";
import { IPost } from "interfaces/Formik/IPost";

export const PostSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (post: IPost) => ({
        url: "/posts",
        method: "POST",
        body: { ...post },
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    getOnePost: builder.query({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),
    countPosts: builder.query({
      query: () => ({
        url: "/posts/count",
        method: "GET",
      }),
    }),
    findPostsByPage: builder.query({
      query: (id: number) => ({
        url: `/posts/page/${id}`,
        method: "GET",
      }),
    }),
    updatePost: builder.mutation({
      query: (post: IPost) => ({
        url: "/posts",
        method: "PUT",
        body: { ...post },
      }),
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetOnePostQuery,
  useLazyGetOnePostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useFindPostsByPageQuery,
  useLazyFindPostsByPageQuery,
  useCountPostsQuery,
  useLazyCountPostsQuery,
} = PostSlice;
