import type { AppConfig } from '../types/config.types';

export const appConfig: AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  defaultPageSize: 20,
  apiTimeoutMs: 10000,
};

export default appConfig;
