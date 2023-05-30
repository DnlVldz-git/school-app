import { ApiSlice } from "./ApiSlice";

export const ZoomSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSignature: builder.mutation({
      query: ({
        meet,
        role,
        topic,
        password,
      }: {
        meet: string;
        role: string;
        topic: string;
        password: string;
      }) => ({
        url: "/zoom/getSignature",
        method: "POST",
        body: { meet, role, topic, password },
      }),
    }),
  }),
});

export const { useGetSignatureMutation } = ZoomSlice;
