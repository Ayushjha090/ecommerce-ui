import type { AppConfig } from '../types/config.types';

import { env } from "./env";

export const appConfig: AppConfig = {
  apiUrl: env.API_URL,
  defaultPageSize: 20,
  apiTimeoutMs: env.API_TIMEOUT_MS,
  reactQueryStaleTimeMs: env.REACT_QUERY_STALE_TIME_MS,
};

export default appConfig;
