import { ApiSlice } from "./ApiSlice";
import { ISubscription } from "interfaces/Formik/ISubscription";

export const SubscriptionSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (subscription: ISubscription) => ({
        url: "/subscriptions",
        method: "POST",
        body: { ...subscription },
      }),
    }),
    getAllSubscriptions: builder.query({
      query: () => ({
        url: "/subscriptions",
        method: "GET",
      }),
    }),
    getAllByStudent: builder.query({
      query: (studentId: string) => ({
        url: `/subscriptions/student/${studentId}`,
        method: "GET",
      }),
    }),
    getOneSubscription: builder.query({
      query: (id: string) => ({
        url: `/subscriptions/${id}`,
        method: "GET",
      }),
    }),
    cancelSubscription: builder.mutation({
      query: (studentId: string) => ({
        url: `/subscriptions/unsuscribe/${studentId}`,
        method: "PUT",
        body: {},
      }),
    }),
    updateSubscription: builder.mutation({
      query: (subscription: ISubscription) => ({
        url: "/subscriptions",
        method: "PUT",
        body: { ...subscription },
      }),
    }),
    deleteSubscription: builder.mutation({
      query: (id: number) => ({
        url: `/subscriptions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionsQuery,
  useLazyGetAllSubscriptionsQuery,
  useGetAllByStudentQuery,
  useLazyGetAllByStudentQuery,
  useGetOneSubscriptionQuery,
  useLazyGetOneSubscriptionQuery,
  useCancelSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = SubscriptionSlice;
