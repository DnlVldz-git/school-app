import { createSlice } from "@reduxjs/toolkit";

import { IPayloadError } from "interfaces/IPayloadError";

import { errorToast, successToast } from "utils";
import Comment from "models/Comment";
import { commentInitial } from "interfaces/IComment";
import { CommentSlice } from "slices/CommentSlice";

const initialState = {
  items: new Array<Comment>(),
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      CommentSlice.endpoints.createComment.matchFulfilled,
      (state, action) => {
        const index = state.items.findIndex(
          (comment) => comment.id === action.payload.parentComment
        );

        if (index === -1) {
          state.items.push({ ...action.payload, count: 0 });
        } else {
          state.items[index] = {
            ...state.items[index],
            replies: state.items[index].replies
              ? [...state.items[index].replies, action.payload]
              : [action.payload],
            count: state.items[index].count + 1,
          };
        }
      }
    );

    builder.addMatcher(
      CommentSlice.endpoints.createComment.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      CommentSlice.endpoints.getCommentsByPost.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );

    builder.addMatcher(
      CommentSlice.endpoints.getChildComments.matchFulfilled,
      (state, action) => {
        const index = state.items.findIndex(
          (comment) => comment.id === action.meta.arg.originalArgs
        );

        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            replies: action.payload,
          };
        }
      }
    );

    builder.addMatcher(
      CommentSlice.endpoints.removeMyComment.matchFulfilled,
      (state, action) => {
        const commentId = action.meta.arg.originalArgs.commentId;
        const parentId = action.meta.arg.originalArgs.parentId;

        if (commentId === parentId) {
          const foundIndex = state.items.findIndex(
            (comment) => comment.id === commentId
          );
          if (foundIndex !== -1) {
            state.items.splice(foundIndex, 1);
          }
        } else {
          const parentComment = state.items.findIndex(
            (comment) => comment.id === parentId
          );

          const childIndex = state.items[parentComment].replies.findIndex(
            (comment) => comment.id === commentId
          );

          state.items[parentComment].count--;
          state.items[parentComment].replies.splice(childIndex, 1);
        }
      }
    );

    builder.addMatcher(
      CommentSlice.endpoints.removeMyComment.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );

    builder.addMatcher(
      CommentSlice.endpoints.updateComment.matchFulfilled,
      (state, action) => {
        const commentId = action.payload.id;
        const parentId = action.payload.parentComment;

        if (parentId === null) {
          const foundIndex = state.items.findIndex(
            (comment) => comment.id === commentId
          );
          if (foundIndex !== -1) {
            state.items[foundIndex] = {
              ...action.payload,
              replies: state.items[foundIndex].replies,
              count: state.items[foundIndex].count,
            };
          }
        } else {
          const parentComment = state.items.findIndex(
            (comment) => comment.id === parentId
          );

          const childIndex = state.items[parentComment].replies.findIndex(
            (comment) => comment.id === commentId
          );

          state.items[parentComment].replies[childIndex] = action.payload;
        }
      }
    );

    builder.addMatcher(
      CommentSlice.endpoints.updateComment.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export default commentsSlice.reducer;
