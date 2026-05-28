import { AxiosError } from "axios";

import { createAxiosInstance } from "./createAxiosInstance";
import { getAccessToken, removeAccessToken } from "../storage/tokenStorage";

export const adminAxios = createAxiosInstance();

adminAxios.interceptors.request.use((config) => {
  if (config.requiresAuth) {
    const token = getAccessToken("admin");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

adminAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      removeAccessToken("admin");
    }

    return Promise.reject(error);
  },
);
