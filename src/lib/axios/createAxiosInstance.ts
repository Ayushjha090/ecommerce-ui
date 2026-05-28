import axios, { type AxiosInstance } from "axios";

import { appConfig } from "../../config";

export const createAxiosInstance = (baseURL = appConfig.apiUrl): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: appConfig.apiTimeoutMs,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};
