import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import * as SecureStore from "expo-secure-store";

const baseURL = "http://175.1.35.170:8080";

const getAccessToken = async () => {
  return await SecureStore.getItemAsync("_accessToken");
};

const setAccessToken = async (token: string) => {
  await SecureStore.setItemAsync("_accessToken", token);
};

const getRefreshToken = async () => {
  return await SecureStore.getItemAsync("_refreshToken");
};

const setRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync("_refreshToken", token);
};

const httpClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAuthLogic = async (failedRequest: any) => {
  const token = await getRefreshToken();
  if (token) {
    axios
      .post(
        `${baseURL}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: "Bearer " + JSON.parse(token),
          },
        }
      )
      .then(async (tokenRefreshResponse) => {
        console.log(tokenRefreshResponse);
        setAccessToken(tokenRefreshResponse.data.accessToken);
        setRefreshToken(tokenRefreshResponse.data.user.refreshToken);

        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + tokenRefreshResponse.data.accessToken;
        return Promise.resolve();
      });
  }
};

createAuthRefreshInterceptor(httpClient, refreshAuthLogic);

httpClient.interceptors.request.use(
  async function (config) {
    const token = await getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        await SecureStore.deleteItemAsync("_accessToken");
        await SecureStore.deleteItemAsync("_refreshToken");
        await SecureStore.deleteItemAsync("_user");
      }
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        status: 500,
        message: "Error de conexión con el servidor.",
      });
    }
  }
);

const httpFormDataClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

httpFormDataClient.interceptors.request.use(
  async function (config) {
    const token = await getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }

    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { httpFormDataClient };

export default httpClient;
