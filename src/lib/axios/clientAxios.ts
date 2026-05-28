import { AxiosError } from "axios";

import { createAxiosInstance } from "./createAxiosInstance";
import { getAccessToken, removeAccessToken } from "../storage/tokenStorage";

export const clientAxios = createAxiosInstance();

clientAxios.interceptors.request.use((config) => {
  if (config.requiresAuth) {
    const token = getAccessToken("client");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

clientAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      removeAccessToken("client");
    }

    return Promise.reject(error);
  },
);
