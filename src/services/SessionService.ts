import { createAsyncThunk } from "@reduxjs/toolkit";

import httpClient from "./HttpClient";

const prefix = "/sessions";

export const findAllByStudentId = createAsyncThunk(
  `${prefix}/findAll`,
  async (studentId: string) => {
    return (await httpClient.get(`${prefix}/student/${studentId}`)).data;
  }
);
