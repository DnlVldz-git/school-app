import { ApiSlice } from "./ApiSlice";

import User from "models/User";
import { ILogin } from "interfaces/ILogin";
import { IVerify } from "interfaces/IVerify";
import { IUser, UserWithoutRole } from "interfaces/Formik/IUser";

export const AuthSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: ILogin) => ({
        url: "/auth/signin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    signUp: builder.mutation({
      query: (user: IUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...UserWithoutRole(user) },
      }),
    }),
    verify: builder.mutation({
      query: ({ email, code }: IVerify) => ({
        url: "/auth/verify",
        method: "POST",
        body: { email, code },
      }),
    }),
    resendCode: builder.mutation({
      query: (email: string) => ({
        url: "/auth/resendCode",
        method: "POST",
        body: { email },
      }),
    }),
    findProfile: builder.mutation({
      query: (id: string) => ({
        url: `/auth/profile/${id}`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (user: User) => ({
        url: "/auth/profile/update",
        method: "PUT",
        body: { ...user },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useResendCodeMutation,
  useVerifyMutation,
  useFindProfileMutation,
  useUpdateProfileMutation,
} = AuthSlice;
