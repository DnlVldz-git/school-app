import { createAsyncThunk } from "@reduxjs/toolkit";

import httpClient from "./HttpClient";

const prefix = "/plans";

export const findAllActive = createAsyncThunk(`${prefix}/active`, async () => {
  return (await httpClient.get(`${prefix}/active`)).data;
});
