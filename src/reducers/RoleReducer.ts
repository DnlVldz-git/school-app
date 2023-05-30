import { createSlice } from "@reduxjs/toolkit";

import { RoleSlice } from "slices/RoleSlice";

import { IPayloadError } from "interfaces/IPayloadError";
import { RoleInitial } from "interfaces/Formik/IRole";
import Role from "models/Role";

import { errorToast, successToast } from "utils";

const initialState = {
  items: new Array<Role>(),
  itemSelected: RoleInitial,
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    selectRole: (state, action) => {
      const role = state.items.find((lev) => lev.id === action.payload);
      state.itemSelected = <Role>{ ...role };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      RoleSlice.endpoints.createRole.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
        successToast("Rol agregado");
      }
    );
    builder.addMatcher(
      RoleSlice.endpoints.createRole.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      RoleSlice.endpoints.getAllRoles.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
    builder.addMatcher(
      RoleSlice.endpoints.updateRole.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (role) => role.id === action.meta.arg.originalArgs.id
        );
        state.items[foundIndex] = action.payload;
        successToast("Rol actualizado");
      }
    );
    builder.addMatcher(
      RoleSlice.endpoints.updateRole.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
    builder.addMatcher(
      RoleSlice.endpoints.deleteRole.matchFulfilled,
      (state, action) => {
        const foundIndex = state.items.findIndex(
          (role) => role.id === Number(action.meta.arg.originalArgs)
        );
        state.items.splice(foundIndex, 1);

        successToast("Rol eliminado");
      }
    );
    builder.addMatcher(
      RoleSlice.endpoints.deleteRole.matchRejected,
      (state, action) => {
        const error = action.payload?.data as IPayloadError;
        errorToast(error);
      }
    );
  },
});

export const { selectRole } = rolesSlice.actions;

export default rolesSlice.reducer;
