import { createAsyncThunk } from "@reduxjs/toolkit";
import Subscription from "models/Subscription";

import httpClient from "./HttpClient";

const prefix = "/subscriptions";

export const create = createAsyncThunk(
  `${prefix}/`,
  async (sub: Subscription) => {
    return (await httpClient.post(`${prefix}`, sub)).data;
  }
);

export const findAll = createAsyncThunk(
  `${prefix}/findAll`,
  async (id: string) => {
    return (await httpClient.get(`${prefix}/student/${id}`)).data;
  }
);

export const cancel = createAsyncThunk(`${prefix}/`, async (id: string) => {
  return (await httpClient.put(`${prefix}/unsubscribe/${id}`)).data;
});
