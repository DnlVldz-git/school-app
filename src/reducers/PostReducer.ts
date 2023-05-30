import { createSlice } from "@reduxjs/toolkit";

import { PostSlice } from "slices/PostSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { PostInitial } from "interfaces/Formik/IPost";
import Post from "models/Post";

import { errorToast, successToast } from "utils";

const initialState = {
  state: "idle",
  items: new Array<Post>(),
  itemSelected: PostInitial,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    selectPost: (state, action) => {
      const post = state.items.find((post) => post.id === action.payload);
      state.itemSelected = <Post>{ ...post };
    },
    idleState: (state, action) => {
      console.log("action", action);
      console.log("entraaaaaaaa");
      state.state = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      PostSlice.endpoints.createPost.matchFulfilled,
      (state, action) => {
        state.state = "ok";
        state.items.push(action.payload);
        successToast("Post agregado");
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.createPost.matchRejected,
      (state, action) => {
        state.state = "error";
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.getAllPosts.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.getOnePost.matchFulfilled,
      (state, action) => {
        state.itemSelected = <Post>{ ...action.payload };
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.findPostsByPage.matchFulfilled,
      (state, action) => {
        state.items = action.payload[0];
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.findPostsByPage.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.updatePost.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (post) => post.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        state.state = "ok";
        successToast("Post actualizado");
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.updatePost.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        state.state = "error";
        errorToast(error);
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.deletePost.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (post) => post.id === action.meta.arg.originalArgs + ""
        );
        state.items.splice(foundIndex, 1);

        successToast("Post eliminado");
      }
    );
    builder.addMatcher(
      PostSlice.endpoints.deletePost.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectPost, idleState } = postsSlice.actions;

export default postsSlice.reducer;
