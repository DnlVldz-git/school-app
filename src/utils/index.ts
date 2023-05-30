import {
  API,
  URL,
  PAYPAL_KEY,
  PAYPAL_SECRET,
  ZOOM_SDK_CLIENT_ID,
  ZOOM_SDK_CLIENT_SECRET,
  ZOOM_SDK_KEY,
  ZOOM_SDK_SECRET,
} from "@env";

import Auth from "models/Auth";
import Session from "models/Session";

import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";
import { IPayloadError } from "interfaces/IPayloadError";

export const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const MILI_IN_HOUR = 60 * 60 * 1000;
export const MILI_IN_DAY = 1000 * 3600 * 24;
export const PHONE_REG_EXP =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const baseURL = API;
export const clientURL = URL;

export const paypalKey = PAYPAL_KEY;
export const paypalSecret = PAYPAL_SECRET;

export const zoomClientId = ZOOM_SDK_CLIENT_ID;
export const zoomClientSecret = ZOOM_SDK_CLIENT_SECRET;

export const zoomSDK = ZOOM_SDK_KEY;
export const zoomSDKSecret = ZOOM_SDK_SECRET;

export const loadingToast = (message: string | undefined) => {
  showMessage({
    message: message ?? "",
    type: "default",
  });
};

export const successToast = (message: string | undefined) => {
  showMessage({
    message: message ?? "",
    type: "success",
  });
};

export const errorToast = (error: IPayloadError) => {
  const finalMessage =
    error.message === "Unauthorized" ? "Inicia sesión" : error.message;
  showMessage({
    message: finalMessage ?? "Error",
    type: "danger",
  });
};

export const successOrFailToast = (
  successMessage: string,
  failedMessage: string,
  result: boolean
) => {
  showMessage({
    message: result ? successMessage : failedMessage,
    type: result ? "success" : "danger",
  });
};

export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getSessionName = (session: Session | undefined) => {
  if (!session) return `Clase ${new Date().toLocaleDateString()}`;

  const title = new Date(session.sessionDate).toLocaleDateString();
  return `Clase ${title}`;
};

export const getFullName = (user: Auth | null) => {
  return user ? `${user.firstName} ${user.lastName}` : "";
};

export const getEmailForZoom = (
  user: Auth | null,
  session: Session | undefined
) => {
  if (!user || !session) return "logralahad@gmail.com";

  return user.role === "PROFESOR" ? user.email : session.teacher.email;
};

export const truncateString = (source: string, size: number) => {
  if (!source) return "N/D";
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
};

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync("_accessToken");
};

export const setAccessToken = async (token: string) => {
  await SecureStore.setItemAsync("_accessToken", token);
};

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync("_refreshToken");
};

export const setRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync("_refreshToken", token);
};

export const deleteItemsFromStorage = () => {
  SecureStore.deleteItemAsync("_accessToken").then(() => {});
  SecureStore.deleteItemAsync("_refreshToken").then(() => {});
  SecureStore.deleteItemAsync("_user").then(() => {});
};
