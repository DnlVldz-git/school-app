import { ApiSlice } from "./ApiSlice";
import { IPlan } from "interfaces/Formik/IPlan";

export const PlanSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlan: builder.mutation({
      query: (plan: IPlan) => ({
        url: "/plans",
        method: "POST",
        body: { ...plan },
      }),
    }),
    getAllPlans: builder.query({
      query: () => "/plans",
    }),
    getAllActivePlans: builder.query({
      query: () => "/plans/active",
    }),
    getOnePlan: builder.query({
      query: (id: number) => `/plans/${id}`,
    }),
    updatePlan: builder.mutation({
      query: (plan: IPlan) => ({
        url: "/plans",
        method: "PUT",
        body: { ...plan },
      }),
    }),
    deletePlan: builder.mutation({
      query: (id: number) => ({
        url: `/plans/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useGetAllPlansQuery,
  useLazyGetAllPlansQuery,
  useGetAllActivePlansQuery,
  useLazyGetAllActivePlansQuery,
  useGetOnePlanQuery,
  useLazyGetOnePlanQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = PlanSlice;
