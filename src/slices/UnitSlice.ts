import { ApiSlice } from "./ApiSlice";
import { IUnit } from "interfaces/Formik/IUnit";

export const UnitSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUnit: builder.mutation({
      query: (unit: IUnit) => ({
        url: "/units",
        method: "POST",
        body: { ...unit },
      }),
    }),
    getAllUnits: builder.query({
      query: () => ({
        url: "/units",
        method: "GET",
      }),
    }),
    getAllUnitsByLevel: builder.query({
      query: (levelId: number) => ({
        url: `/units/${levelId}`,
        method: "GET",
      }),
    }),
    updateUnit: builder.mutation({
      query: (unit: IUnit) => ({
        url: "/units",
        method: "PUT",
        body: { ...unit },
      }),
    }),
    deleteUnit: builder.mutation({
      query: (id: number) => ({
        url: `/units/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUnitMutation,
  useGetAllUnitsQuery,
  useLazyGetAllUnitsQuery,
  useGetAllUnitsByLevelQuery,
  useLazyGetAllUnitsByLevelQuery,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = UnitSlice;
