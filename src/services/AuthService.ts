import { createAsyncThunk } from "@reduxjs/toolkit";

import httpClient from "./HttpClient";
import User from "models/User";

const prefix = "/auth";

export const register = createAsyncThunk("auth/signup", async (user: User) => {
  return (await httpClient.post(`${prefix}/signup`, user)).data;
});

export const login = createAsyncThunk(
  "auth/signin",
  async (params: { email: string; password: string }) => {
    return (await httpClient.post(`${prefix}/signin`, params)).data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return (await httpClient.get(`${prefix}/logout`)).data;
});

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
