import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { FetchArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

import {
  baseURL,
  deleteItemsFromStorage,
  getAccessToken,
  getRefreshToken,
} from "utils";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "same-origin",
  prepareHeaders: async (headers) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      headers.set("authorization", `Bearer ${JSON.parse(accessToken)}`);
    }
    return headers;
  },
});

const baseQueryForRefresh = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "same-origin",
  prepareHeaders: async (headers) => {
    const refreshToken = await getRefreshToken();

    if (refreshToken) {
      headers.set("authorization", `Bearer ${JSON.parse(refreshToken)}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQueryForRefresh(
      "/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      //api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/auth/logout", api, extraOptions);
      deleteItemsFromStorage();
    }
  }

  return result;
};

export const ApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
