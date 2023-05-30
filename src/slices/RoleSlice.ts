import { ApiSlice } from "./ApiSlice";
import { IRole } from "interfaces/Formik/IRole";

export const RoleSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (role: IRole) => ({
        url: "/roles",
        method: "POST",
        body: { ...role },
      }),
    }),
    getAllRoles: builder.query({
      query: () => ({
        url: "/roles",
        method: "GET",
      }),
    }),
    updateRole: builder.mutation({
      query: (role: IRole) => ({
        url: "/roles",
        method: "PUT",
        body: { ...role },
      }),
    }),
    deleteRole: builder.mutation({
      query: (id: number) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useLazyGetAllRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = RoleSlice;
