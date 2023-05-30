import { IComment } from "interfaces/IComment";
import { ApiSlice } from "./ApiSlice";

interface IRemoveComment {
  commentId: number;
  userId: string;
  parentId: number;
}

export const CommentSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (comment: IComment) => ({
        url: "/comments",
        method: "POST",
        body: { ...comment },
      }),
    }),
    updateComment: builder.mutation({
      query: (comment: IComment) => ({
        url: "/comments",
        method: "PUT",
        body: { ...comment },
      }),
    }),
    getCommentsByPost: builder.query({
      query: (postId: string) => ({
        url: `/comments/post/${postId}`,
        method: "GET",
      }),
    }),
    getChildComments: builder.query({
      query: (parentCommentId: number) => ({
        url: `/comments/childComments/${parentCommentId}`,
        method: "GET",
      }),
    }),
    deleteComment: builder.mutation({
      query: (id: number) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
    }),
    removeMyComment: builder.mutation({
      query: ({ commentId, userId, parentId }: IRemoveComment) => ({
        url: `/comments/removeMyComment/${commentId}`,
        method: "DELETE",
        body: { userId, parentId },
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsByPostQuery,
  useUpdateCommentMutation,
  useLazyGetCommentsByPostQuery,
  useGetChildCommentsQuery,
  useLazyGetChildCommentsQuery,
  useRemoveMyCommentMutation,
} = CommentSlice;
