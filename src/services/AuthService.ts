import { createAsyncThunk } from "@reduxjs/toolkit";

import httpClient from "./HttpClient";
import User from "models/User";

const prefix = "/auth";

export const login = createAsyncThunk(
  "auth/login",
  async (params: { email: string; password: string }) => {
    return (await httpClient.post(`${prefix}/login`, params)).data;
  }
);

export const findProfile = createAsyncThunk(
  "auth/findProfile",
  async (id: Number) => {
    return (await httpClient.get(`${prefix}/findProfile/${id}`)).data;
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (user: User) => {
    return (await httpClient.put(`${prefix}/updateProfile/${user.id}`, user))
      .data;
  }
);
