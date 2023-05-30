import { createSlice } from "@reduxjs/toolkit";

import { TagSlice } from "slices/TagsSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { TagInitial } from "interfaces/Formik/ITag";
import Tag from "models/Tag";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Tag>(),
  itemSelected: TagInitial,
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    selectTag: (state, action) => {
      const tag = state.items.find((tag) => tag.id === action.payload);
      state.itemSelected = <Tag>{ ...tag };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      TagSlice.endpoints.createTag.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Tag agregado");
      }
    );
    builder.addMatcher(
      TagSlice.endpoints.createTag.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      TagSlice.endpoints.getAllTags.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      TagSlice.endpoints.updateTag.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (tag) => tag.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        successToast("Tag actualizado");
      }
    );
    builder.addMatcher(
      TagSlice.endpoints.updateTag.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      TagSlice.endpoints.deleteTag.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (tag) => tag.id === Number(action.meta.arg.originalArgs)
        );
        state.items.splice(foundIndex, 1);

        successToast("Tag eliminado");
      }
    );
    builder.addMatcher(
      TagSlice.endpoints.deleteTag.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectTag } = tagsSlice.actions;

export default tagsSlice.reducer;
